import type { CodeLanguage } from "@/lib/code-lab/runtimes";

export type LearningLevel = "beginner" | "intermediate" | "advanced";

export const LEARNING_LEVELS: { id: LearningLevel; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export type LearningModule = {
  id: string;
  title: string;
  /** One-line hint shown under the title in the library. */
  blurb: string;
};

/**
 * Seed topics for the Code Lab library. Selecting one asks the model to build a
 * lesson at the chosen level, so these are prompts for generation rather than
 * fixed content.
 */
export const CODE_LAB_MODULES: Record<CodeLanguage, LearningModule[]> = {
  python: [
    { id: "py-basics", title: "Variables and types", blurb: "Numbers, strings, booleans, and how Python infers types." },
    { id: "py-control", title: "Conditionals and loops", blurb: "if/elif/else, for and while, break and continue." },
    { id: "py-collections", title: "Lists, dicts and sets", blurb: "Choosing the right collection and its trade-offs." },
    { id: "py-functions", title: "Functions and arguments", blurb: "Parameters, defaults, *args and **kwargs, return values." },
    { id: "py-comprehensions", title: "Comprehensions", blurb: "List, dict and set comprehensions, and when to avoid them." },
    { id: "py-errors", title: "Errors and exceptions", blurb: "try/except/finally, raising, and writing useful messages." },
    { id: "py-files", title: "Working with files and JSON", blurb: "Reading, writing, context managers, parsing JSON." },
    { id: "py-oop", title: "Classes and objects", blurb: "Attributes, methods, __init__, inheritance basics." },
    { id: "py-data", title: "Data analysis patterns", blurb: "Grouping, aggregating and cleaning records in plain Python." },
    { id: "py-testing", title: "Testing and debugging", blurb: "Assertions, edge cases, and reading a traceback." },
  ],
  sql: [
    { id: "sql-select", title: "SELECT and filtering", blurb: "Columns, WHERE, comparison and logical operators." },
    { id: "sql-sorting", title: "Sorting and limiting", blurb: "ORDER BY, LIMIT, and finding top or bottom rows." },
    { id: "sql-aggregates", title: "Aggregates and GROUP BY", blurb: "COUNT, SUM, AVG, MIN, MAX and grouping rules." },
    { id: "sql-having", title: "HAVING vs WHERE", blurb: "Filtering before and after aggregation." },
    { id: "sql-joins", title: "Joins", blurb: "INNER, LEFT and self joins, and what each keeps." },
    { id: "sql-subqueries", title: "Subqueries", blurb: "Scalar, IN and correlated subqueries." },
    { id: "sql-cte", title: "CTEs and readability", blurb: "WITH clauses to break a query into readable steps." },
    { id: "sql-window", title: "Window functions", blurb: "ROW_NUMBER, RANK and running totals over partitions." },
    { id: "sql-nulls", title: "NULL handling", blurb: "Three-valued logic, COALESCE, and common mistakes." },
    { id: "sql-modelling", title: "Tables and constraints", blurb: "CREATE TABLE, primary and foreign keys, data types." },
  ],
};
