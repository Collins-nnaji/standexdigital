export const ENQUIRY_TYPES = [
  "AI & Agentic Systems",
  "Power BI & Microsoft Fabric",
  "Power Platform (Power Apps & Automate)",
  "Copilot Studio & Custom Agents",
  "Data Readiness & AI Audit",
  "Enterprise AI Integration",
  "Salesforce CRM & Integration",
  "Lead Intake & Growth Automation",
  "General Growth Consultation",
  "Training & Academy",
  "General Enquiry",
  "Digital Growth Management",
  "Google Ads & Paid Acquisition",
  "Analytics & Measurement",
  "Power Platform Solutions",
  "Partnership & Collaboration",
  "Careers",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];
