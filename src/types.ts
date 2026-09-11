export type PageState =
  | { page: "overview" | "projects" | "risk-alerts" | "expenditure" | "compliance" | "duplicate" | "analytics" | "geographic" | "reports" | "vendors-mp" }
  | { page: "project-detail"; projectId: string };

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Signal {
  label: string;
  score: number;
  color: string;
  desc: string;
}

export interface TimelineItem {
  label: string;
  date: string;
  amount: string | null;
  state: "completed" | "anomaly" | "delayed" | "pending";
}

export interface EvidenceItem {
  item: string;
  observed: string;
  reference: string;
  deviation: string;
  source: string;
  confidence: number;
}

export interface Project {
  id: string;
  pid: string;
  name: string;
  category: string;
  state: string;
  district: string;
  constituency: string;
  mp: string;
  agency: string;
  sanctionDate: string;
  expectedCompletion: string;
  status: string;
  sanctionAmount: string;
  expenditure: string;
  paymentReleased: string;
  progress: number;
  riskScore: number;
  signals: Signal[];
  timeline: TimelineItem[];
  evidence: EvidenceItem[];
}

export interface StateData {
  abbr: string;
  name: string;
  risk: RiskLevel;
  projects: number;
  highRisk: number;
  delayed: number;
  funds: string;
  score: number;
}

export interface Factor {
  label: string;
  score: number;
  desc: string;
}

export interface ProjectRef {
  pid: string;
  name: string;
  amount: string;
  status: string;
  riskScore: number;
}

export interface Vendor {
  id: string;
  name: string;
  type: string;
  projects: number;
  totalAmount: string;
  totalAmountNum: number;
  completed: number;
  delayed: number;
  highRisk: number;
  anomalies: number;
  duplicateAssoc: number;
  riskScore: number;
  riskLevel: RiskLevel;
  factors: Factor[];
  projectList: ProjectRef[];
}

export interface MP {
  id: string;
  name: string;
  party: string;
  constituency: string;
  state: string;
  totalProjects: number;
  totalFunds: string;
  completed: number;
  delayed: number;
  highRisk: number;
  avgRiskScore: number;
  riskLevel: RiskLevel;
  monitoringRating: string;
  factors: Factor[];
}
