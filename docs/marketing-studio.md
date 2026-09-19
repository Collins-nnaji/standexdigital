# Marketing Intelligence module

Open `/studio/marketing` from the Studio section switcher or home page. Existing Writing Lab, Code Lab and Data Hub routes remain available. Studio middleware protects the module; both new AI routes also verify the signed session explicitly.

## Available now

- Responsive left navigation, shared Studio theme, clearly labelled demonstration workspace.
- Client workspaces with reporting currency, target CPA / ROAS, period budget, report accent colour and contact information.
- CSV, TSV and Excel `.xlsx` imports (5 MB, 20,000 rows). Automatic column aliases, editable mapping, five-row preview, strict numeric validation, duplicate exclusion and date warnings. Files are processed in the browser. Importing replaces a workspace's active dataset; importing from the demo creates a new real workspace.
- Aggregate spend, revenue, conversions, weighted CPA, ROAS, CPC, CTR, conversion rate and budget utilisation; campaign comparisons and daily charts.
- Explained, weighted performance score with missing-category coverage. Rules flag unconverted spend, high CPA, campaigns suitable for a small scaling experiment, and evidence-qualified CPA / conversion shifts or possible creative fatigue across matched counts of observed days. Spend flagged for investigation is not claimed to be proven waste.
- Optional AI analyst briefing generated from server-calculated facts. Available via `/api/studio/marketing/analyst`; computed recommendations continue working without AI configuration.
- Computer vision review of PNG/JPEG/WebP creative via `/api/studio/marketing/creative`. The model comments on visible creative evidence and proposes experiments; it must not infer fatigue, demographics or conversion lift from an image.
- Selectable PDF report sections, a daily trend chart, client name / colour / contact details, report snapshots and downloads.
- Integration directory distinguishing supported file workflows from planned OAuth connections; existing Writing Lab links for follow-up copy.

## Configuration

AI analyst briefings use the existing `lib/llm-client.ts` text configuration. Creative review supports a **separate** Azure OpenAI resource and deployment via `AZURE_OPENAI_VISION_ENDPOINT`, `AZURE_OPENAI_VISION_API_KEY`, `AZURE_OPENAI_VISION_DEPLOYMENT` and optional `AZURE_OPENAI_VISION_API_VERSION` (default `2024-10-21`). All three required settings must be present if any is supplied; partial configuration does not silently send data to the writing model. When all are blank, creative review can reuse the existing image-capable chat model. `MARKETING_VISION_MODEL` optionally overrides the standard OpenAI model. These settings never change Writing Lab's model or credentials.

The separate **Extract text & objects** button uses `AZURE_AI_VISION_ENDPOINT`, `AZURE_AI_VISION_KEY` and optional `AZURE_AI_VISION_API_VERSION` (default `2024-02-01`). It calls Azure AI Vision Image Analysis with `read,tags,objects` and returns OCR text, visual tags and object bounding boxes. It does not require the creative-review model. The Azure AI Vision endpoint/key are different from Azure OpenAI's endpoint/key. See [Microsoft's Image Analysis API guide](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image-40).

Credentials are server-only. Provider error payloads and secrets are not returned to the browser. Blank variables have been appended to `.env.local` without changing any existing values. A version-controlled, secret-free template is available at [`config/studio-services.env.example`](../config/studio-services.env.example).

## Data semantics

Required fields: campaign, spend, conversions. Optional: revenue, clicks, impressions, date. Missing optional fields are explicitly unavailable. Dates must be ISO `YYYY-MM-DD`; Excel dates should be exported as text. Imports read the first worksheet and cached formula results. Old binary `.xls` is not supported. Currency conversion, platform attribution reconciliation and campaign-to-order joins are not performed: upload matching currencies and campaign-level figures. Generic Shopify/HubSpot exports need preparation to satisfy the required mapping.

Scores are deterministic heuristics and show their formulas in Performance. Missing categories are excluded and remaining weights renormalised. Daily stability requires three days with conversions. Tracking quality measures import warnings, not verified tracking health. Recommendations contain finding, evidence, impact, action, priority and confidence. Narrative AI drafts need human review.

## Neon file saving

`/studio/files` is a shared Files area, available from Studio navigation without replacing Writing Lab, Code Lab or Data Hub. Marketing also has a **Saved files** sidebar entry and save buttons for original campaign exports, creative images, workspace snapshots and generated PDF reports.

Create a **private** Neon Object Storage bucket named `standex-studio` on the branch corresponding to this app's `DATABASE_URL`. Copy the branch storage credential values into server environment settings:

| Variable | Value to provide |
| --- | --- |
| `AWS_ENDPOINT_URL_S3` | Full branch S3 endpoint from Neon |
| `AWS_REGION` | Storage region returned by Neon |
| `AWS_ACCESS_KEY_ID` | Credential `token_id` |
| `AWS_SECRET_ACCESS_KEY` | Credential `s3_secret_access_key` |
| `STUDIO_STORAGE_BUCKET` | `standex-studio`, or your private bucket name |

Use a credential with `storage:read` and `storage:write`. The app uses the official S3 client, path-style requests and `WHEN_REQUIRED` request checksums, as described in [Neon's storage quickstart](https://neon.com/docs/storage/get-started). See also [Neon storage authentication](https://neon.com/docs/storage/authentication). Do not use the Postgres database endpoint as the storage endpoint. No general Neon API key is needed by this app at runtime, and no separate AWS account is required.

Bucket creation and credential provisioning are external setup steps: this change does not create a resource or invent credentials. After filling settings, restart the app and use **Check configuration** in Files. Sign in using the existing Studio account flow. Supported files: CSV, TSV, XLSX, PDF, PNG/JPEG/WebP, TXT, Markdown, JSON and DOCX, up to 5 MB.

Files are stored under `studio/<signed-account-id>/<category>/<uuid>/<filename>`. The server derives the account from signed cookies, validates ownership before reading/deleting, and never accepts an owner supplied by the browser. It lists only the current account prefix. Downloads are authenticated attachments with no public URLs or browser access to storage credentials. File listing is paginated. Deletion requires an explicit in-app confirmation. No new database tables or migrations are needed: the existing StudioAccount records supply identity; the bucket stores the files.

**Save workspace to Files** writes a versioned JSON snapshot with targets, campaign data and validation warnings. **Restore copy** validates that snapshot and creates a new local workspace instead of overwriting an existing one. **Use in analysis** opens a saved campaign export in the normal mapping/validation workflow. These are explicit saves and restores, not automatic cross-device synchronisation. Report snapshots can be downloaded as PDFs or saved to Files. Other Studio tools can upload their exported documents through the shared Files area.

## Launch boundary

The working dataset and last 50 report snapshots remain browser-local under `standex-marketing-v1` until explicitly saved to Files. Images and AI reviews are not automatically persisted. Local storage failures are visible; important work should be saved to Files or downloaded. Local working state is not account-isolated on shared browser profiles.

This is still early access. Before a paid launch, strengthen the existing name-based Studio account authentication, add workspace membership / roles, durable AI rate limits and usage budgets, usage metering, server-side plan entitlements, checkout and verified billing webhooks. Live workspace syncing and team collaboration are not implemented. Agency white-label logos and removal of Standex attribution should be entitlement-controlled. Direct Meta/Google/LinkedIn, GA4, HubSpot, Shopify, Drive and messaging connections need provider OAuth, token storage, attribution design and ingestion jobs. Proposed commercial tiers are labelled as a roadmap, not active subscriptions.

## Verification

```sh
node --import tsx --test lib/marketing/*.test.ts lib/studio-files/*.test.ts
npx eslint components/studio/marketing components/studio/files lib/marketing lib/studio-files app/api/studio/marketing app/api/studio/files app/studio/marketing app/studio/files
npx prisma generate
npx tsc --noEmit --incremental false
npm run build
```

The existing root layout downloads Google Fonts during builds, so production compilation requires access to Google's font endpoints.
