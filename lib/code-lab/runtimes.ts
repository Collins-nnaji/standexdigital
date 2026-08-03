/**
 * Browser runtimes for the Studio Code Lab.
 *
 * Both Python (Pyodide) and SQL (sql.js) execute entirely in the user's browser.
 * Nothing is sent to a server, so untrusted code can never touch our infrastructure.
 * Assets are served from /wasm on our own origin — see scripts/copy-wasm.mjs.
 */

export type CodeLanguage = "python" | "sql";

export type RunResult = {
  ok: boolean;
  /** stdout / textual output */
  output: string;
  error?: string;
  /** Tabular result, used by SQL SELECTs */
  table?: { columns: string[]; rows: unknown[][] };
  durationMs: number;
};

const PYODIDE_BASE = "/wasm/pyodide/";
const SQLJS_BASE = "/wasm/sqljs/";

type PyodideApi = {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
};

let pyodidePromise: Promise<PyodideApi> | null = null;

/** Loads Pyodide once per page and reuses the interpreter across runs. */
export async function loadPython(): Promise<PyodideApi> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const mod = await import(/* webpackIgnore: true */ `${PYODIDE_BASE}pyodide.mjs`);
      return (await mod.loadPyodide({ indexURL: PYODIDE_BASE })) as PyodideApi;
    })().catch((err) => {
      // Let a later attempt retry instead of caching the failure forever.
      pyodidePromise = null;
      throw err;
    });
  }
  return pyodidePromise;
}

export async function runPython(code: string): Promise<RunResult> {
  const started = performance.now();
  const chunks: string[] = [];
  try {
    const py = await loadPython();
    py.setStdout({ batched: (s) => chunks.push(s) });
    py.setStderr({ batched: (s) => chunks.push(s) });

    const value = await py.runPythonAsync(code);
    // Surface a bare trailing expression the way a REPL would.
    if (value !== undefined && value !== null) chunks.push(String(value));

    return { ok: true, output: chunks.join("\n"), durationMs: performance.now() - started };
  } catch (err) {
    return {
      ok: false,
      output: chunks.join("\n"),
      error: err instanceof Error ? err.message : String(err),
      durationMs: performance.now() - started,
    };
  }
}

type SqlDatabase = {
  exec: (sql: string) => { columns: string[]; values: unknown[][] }[];
};

let sqlDbPromise: Promise<SqlDatabase> | null = null;

/**
 * Creates an in-memory SQLite database seeded with a small sample schema so
 * there is always something to query on first load.
 */
export async function loadSql(): Promise<SqlDatabase> {
  if (!sqlDbPromise) {
    sqlDbPromise = (async () => {
      // sql.js ships a UMD bundle; load it as a classic script and read the global.
      if (!(window as unknown as { initSqlJs?: unknown }).initSqlJs) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `${SQLJS_BASE}sql-wasm.js`;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Could not load the SQL engine."));
          document.head.appendChild(script);
        });
      }

      const initSqlJs = (window as unknown as {
        initSqlJs: (cfg: { locateFile: (f: string) => string }) => Promise<{
          Database: new () => SqlDatabase;
        }>;
      }).initSqlJs;

      const SQL = await initSqlJs({ locateFile: (file) => `${SQLJS_BASE}${file}` });
      const db = new SQL.Database();
      db.exec(SAMPLE_SCHEMA);
      return db;
    })().catch((err) => {
      sqlDbPromise = null;
      throw err;
    });
  }
  return sqlDbPromise;
}

export async function runSql(code: string): Promise<RunResult> {
  const started = performance.now();
  try {
    const db = await loadSql();
    const results = db.exec(code);
    const last = results[results.length - 1];

    if (!last) {
      return {
        ok: true,
        output: "Statement executed. No rows returned.",
        durationMs: performance.now() - started,
      };
    }

    return {
      ok: true,
      output: `${last.values.length} row${last.values.length === 1 ? "" : "s"} returned.`,
      table: { columns: last.columns, rows: last.values },
      durationMs: performance.now() - started,
    };
  } catch (err) {
    return {
      ok: false,
      output: "",
      error: err instanceof Error ? err.message : String(err),
      durationMs: performance.now() - started,
    };
  }
}

/** Resets the SQLite database back to the seeded sample data. */
export function resetSqlDatabase() {
  sqlDbPromise = null;
}

export const SAMPLE_SCHEMA = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hired_on TEXT NOT NULL
);

INSERT INTO employees (id, name, department, salary, hired_on) VALUES
  (1, 'Ada Okafor',    'Engineering', 92000, '2021-03-14'),
  (2, 'Ben Adeyemi',   'Engineering', 78000, '2022-07-01'),
  (3, 'Chloe Mensah',  'Data',        85000, '2020-11-23'),
  (4, 'Daniel Eze',    'Data',        71000, '2023-01-09'),
  (5, 'Ella Nwosu',    'Design',      68000, '2022-05-30'),
  (6, 'Femi Balogun',  'Sales',       64000, '2021-09-17');

CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES employees(id),
  status TEXT NOT NULL
);

INSERT INTO projects (id, name, owner_id, status) VALUES
  (1, 'Billing migration', 1, 'active'),
  (2, 'Customer dashboard', 3, 'active'),
  (3, 'Brand refresh',      5, 'done'),
  (4, 'Sales pipeline',     6, 'paused');
`;

export const STARTER_CODE: Record<CodeLanguage, string> = {
  python: `# Python runs entirely in your browser.
# Try editing this, then press Run.

def average(numbers):
    return sum(numbers) / len(numbers)

salaries = [92000, 78000, 85000, 71000, 68000]
print("Employees:", len(salaries))
print("Average salary:", round(average(salaries), 2))
`,
  sql: `-- A sample database is already loaded.
-- Tables: employees, projects

SELECT department,
       COUNT(*)        AS headcount,
       ROUND(AVG(salary)) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
`,
};
