export const ENQUIRY_TYPES = [
  "General Enquiry",
  "Digital Growth Management",
  "Google Ads & Paid Acquisition",
  "Analytics & Measurement",
  "Power Platform Solutions",
  "Power BI & Microsoft Fabric",
  "Copilot Studio & AI Agents",
  "Salesforce CRM",
  "AI & Agentic Systems",
  "Training & Academy",
  "Partnership & Collaboration",
  "Careers",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];
