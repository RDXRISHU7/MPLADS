import type { Project, StateData, Vendor, MP } from '../types';

export const projects: Project[] = [
  {
    id: "4821",
    pid: "MP/KA/2024/4821",
    name: "Community Hall at Village Halagur",
    category: "Community Infrastructure",
    state: "Karnataka",
    district: "Mandya",
    constituency: "Mandya",
    mp: "Hon. Suresh Kumar (Karnataka)",
    agency: "Gram Panchayat, Halagur",
    sanctionDate: "15 May 2023",
    expectedCompletion: "30 Nov 2023",
    status: "Delayed",
    sanctionAmount: "₹12,00,000",
    expenditure: "₹19,80,000",
    paymentReleased: "₹16,20,000",
    progress: 34,
    riskScore: 87,
    signals: [
      { label: "Cost Anomaly", score: 25, color: "#ef4444", desc: "Expenditure ₹19.8L exceeds sanctioned ₹12L by 65%. No revised sanction found." },
      { label: "Payment/Expenditure Pattern", score: 22, color: "#f97316", desc: "135% payment against 34% physical progress indicates payment-progress mismatch." },
      { label: "Delay Signal", score: 18, color: "#f59e0b", desc: "Project delayed by 199 days beyond expected completion date." },
      { label: "Duplicate Similarity", score: 12, color: "#a855f7", desc: "1 similar work detected within 2.1 km with overlapping scope." },
      { label: "Compliance Signal", score: 10, color: "#64748b", desc: "Utilization certificate pending for installment 2." }
    ],
    timeline: [
      { label: "Recommended", date: "Feb 2023", amount: null, state: "completed" },
      { label: "Sanctioned", date: "15 May 2023 · ₹12,00,000", amount: "₹12,00,000", state: "completed" },
      { label: "Work Started", date: "1 Jul 2023", amount: null, state: "completed" },
      { label: "Expenditure", date: "30 Oct 2023 · ₹19,80,000", amount: "₹19,80,000", state: "anomaly" },
      { label: "Progress Update", date: "5 Jan 2024 · 34%", amount: null, state: "delayed" },
      { label: "Completed", date: "Expected: 30 Nov 2023", amount: null, state: "pending" }
    ],
    evidence: [
      {
        item: "Total Expenditure",
        observed: "₹19.8L",
        reference: "₹9.5L–₹12.7L",
        deviation: "+61%",
        source: "PFMS Payment Records",
        confidence: 91
      },
      {
        item: "Physical Progress",
        observed: "34%",
        reference: "82% (utilized)",
        deviation: "-48pp",
        source: "Utilization Certificate",
        confidence: 88
      },
      {
        item: "Completion Days",
        observed: "199d",
        reference: "0 days",
        deviation: "+199d",
        source: "Sanction Order",
        confidence: 95
      },
      {
        item: "Similar Works",
        observed: "1 match",
        reference: "0 expected",
        deviation: "1 dup",
        source: "Geospatial/NIC DB",
        confidence: 82
      }
    ]
  },
  {
    id: "1932",
    pid: "MP/BR/2024/1932",
    name: "Drain Construction Work",
    category: "Sanitation",
    state: "Bihar",
    district: "Gaya",
    constituency: "Gaya",
    mp: "Hon. Vijay Prasad (Bihar)",
    agency: "Municipal Corporation, Gaya",
    sanctionDate: "22 Jun 2023",
    expectedCompletion: "15 Dec 2023",
    status: "Delayed",
    sanctionAmount: "₹8,50,000",
    expenditure: "₹14,20,000",
    paymentReleased: "₹12,80,000",
    progress: 41,
    riskScore: 84,
    signals: [
      { label: "Cost Anomaly", score: 28, color: "#ef4444", desc: "Expenditure exceeds sanction by 67%." },
      { label: "Payment/Expenditure Pattern", score: 20, color: "#f97316", desc: "Payment-progress gap detected." },
      { label: "Delay Signal", score: 16, color: "#f59e0b", desc: "175 days overdue." },
      { label: "Compliance Signal", score: 12, color: "#64748b", desc: "Documentation gaps." },
      { label: "Duplicate Similarity", score: 8, color: "#a855f7", desc: "Low overlap detected." }
    ],
    timeline: [
      { label: "Recommended", date: "Apr 2023", amount: null, state: "completed" },
      { label: "Sanctioned", date: "22 Jun 2023 · ₹8,50,000", amount: "₹8,50,000", state: "completed" },
      { label: "Work Started", date: "10 Aug 2023", amount: null, state: "completed" },
      { label: "Expenditure", date: "18 Nov 2023 · ₹14,20,000", amount: "₹14,20,000", state: "anomaly" },
      { label: "Progress Update", date: "8 Jan 2024 · 41%", amount: null, state: "delayed" },
      { label: "Completed", date: "Expected: 15 Dec 2023", amount: null, state: "pending" }
    ],
    evidence: [
      {
        item: "Total Expenditure",
        observed: "₹14.2L",
        reference: "₹7.8L–₹9.2L",
        deviation: "+67%",
        source: "PFMS Payment Records",
        confidence: 89
      },
      {
        item: "Physical Progress",
        observed: "41%",
        reference: "78% (utilized)",
        deviation: "-37pp",
        source: "Progress Report",
        confidence: 85
      },
      {
        item: "Completion Days",
        observed: "175d",
        reference: "0 days",
        deviation: "+175d",
        source: "Sanction Order",
        confidence: 94
      }
    ]
  }
];

export const stateData: StateData[] = [
  { abbr: "J&K", name: "Jammu & Kashmir", risk: "medium", projects: 245, highRisk: 32, delayed: 48, funds: "₹52.3Cr", score: 58 },
  { abbr: "HP", name: "Himachal Pradesh", risk: "low", projects: 198, highRisk: 18, delayed: 22, funds: "₹41.2Cr", score: 35 },
  { abbr: "PB", name: "Punjab", risk: "medium", projects: 287, highRisk: 42, delayed: 56, funds: "₹68.4Cr", score: 52 },
  { abbr: "HR", name: "Haryana", risk: "low", projects: 256, highRisk: 28, delayed: 34, funds: "₹58.7Cr", score: 42 },
  { abbr: "UK", name: "Uttarakhand", risk: "low", projects: 176, highRisk: 22, delayed: 28, funds: "₹38.9Cr", score: 38 },
  { abbr: "UP", name: "Uttar Pradesh", risk: "high", projects: 892, highRisk: 118, delayed: 156, funds: "₹198.2Cr", score: 64 },
  { abbr: "RJ", name: "Rajasthan", risk: "medium", projects: 542, highRisk: 68, delayed: 92, funds: "₹124.6Cr", score: 56 },
  { abbr: "MP", name: "Madhya Pradesh", risk: "medium", projects: 612, highRisk: 72, delayed: 98, funds: "₹142.3Cr", score: 54 },
  { abbr: "GJ", name: "Gujarat", risk: "low", projects: 412, highRisk: 38, delayed: 52, funds: "₹94.8Cr", score: 38 },
  { abbr: "MH", name: "Maharashtra", risk: "medium", projects: 724, highRisk: 86, delayed: 112, funds: "₹168.4Cr", score: 55 },
  { abbr: "CG", name: "Chhattisgarh", risk: "medium", projects: 368, highRisk: 48, delayed: 62, funds: "₹82.6Cr", score: 51 },
  { abbr: "BR", name: "Bihar", risk: "high", projects: 678, highRisk: 128, delayed: 148, funds: "₹156.8Cr", score: 69 },
  { abbr: "JH", name: "Jharkhand", risk: "medium", projects: 412, highRisk: 52, delayed: 68, funds: "₹92.4Cr", score: 53 },
  { abbr: "WB", name: "West Bengal", risk: "medium", projects: 598, highRisk: 74, delayed: 96, funds: "₹138.2Cr", score: 54 },
  { abbr: "OD", name: "Odisha", risk: "medium", projects: 482, highRisk: 58, delayed: 76, funds: "₹108.6Cr", score: 52 },
  { abbr: "TS", name: "Telangana", risk: "low", projects: 324, highRisk: 32, delayed: 42, funds: "₹74.8Cr", score: 41 },
  { abbr: "AP", name: "Andhra Pradesh", risk: "medium", projects: 468, highRisk: 56, delayed: 72, funds: "₹106.4Cr", score: 53 },
  { abbr: "KA", name: "Karnataka", risk: "high", projects: 512, highRisk: 142, delayed: 98, funds: "₹118.6Cr", score: 72 },
  { abbr: "KL", name: "Kerala", risk: "low", projects: 298, highRisk: 28, delayed: 36, funds: "₹68.2Cr", score: 36 },
  { abbr: "TN", name: "Tamil Nadu", risk: "medium", projects: 542, highRisk: 64, delayed: 84, funds: "₹124.8Cr", score: 51 },
  { abbr: "AS", name: "Assam", risk: "high", projects: 448, highRisk: 116, delayed: 88, funds: "₹102.4Cr", score: 68 },
  { abbr: "NL", name: "Nagaland", risk: "low", projects: 92, highRisk: 12, delayed: 14, funds: "₹21.2Cr", score: 32 },
  { abbr: "MN", name: "Manipur", risk: "medium", projects: 108, highRisk: 18, delayed: 22, funds: "₹24.8Cr", score: 48 },
  { abbr: "MZ", name: "Mizoram", risk: "low", projects: 68, highRisk: 8, delayed: 12, funds: "₹15.6Cr", score: 28 },
  { abbr: "AR", name: "Arunachal Pradesh", risk: "low", projects: 124, highRisk: 16, delayed: 18, funds: "₹28.4Cr", score: 34 }
];

export const vendors: Vendor[] = [
  {
    id: "V004",
    name: "Deccan Builders",
    type: "Construction Contractor",
    projects: 18,
    totalAmount: "₹2.67Cr",
    totalAmountNum: 26700000,
    completed: 8,
    delayed: 7,
    highRisk: 6,
    anomalies: 9,
    duplicateAssoc: 2,
    riskScore: 85,
    riskLevel: "critical",
    factors: [
      { label: "High-Risk Project Concentration", score: 32, desc: "6 of 18 projects carry risk score >75" },
      { label: "Cost Anomaly Pattern", score: 28, desc: "Repeated cost overruns in 9 projects" },
      { label: "Delay Rate", score: 15, desc: "39% projects delayed beyond timeline" },
      { label: "Documentation Issues", score: 10, desc: "Missing measurement books in 4 works" }
    ],
    projectList: [
      { pid: "MP/KA/2024/4821", name: "Community Hall", amount: "₹19.80L", status: "Delayed", riskScore: 87 },
      { pid: "MP/KA/2024/3312", name: "Anganwadi Building", amount: "₹8.20L", status: "In Progress", riskScore: 78 },
      { pid: "MP/TN/2023/8821", name: "Drainage Work", amount: "₹12.40L", status: "Delayed", riskScore: 82 }
    ]
  },
  {
    id: "V008",
    name: "Shree Ram Constructions",
    type: "Infrastructure Contractor",
    projects: 14,
    totalAmount: "₹1.82Cr",
    totalAmountNum: 18200000,
    completed: 6,
    delayed: 5,
    highRisk: 4,
    anomalies: 7,
    duplicateAssoc: 1,
    riskScore: 78,
    riskLevel: "high",
    factors: [
      { label: "High-Risk Project Concentration", score: 28, desc: "4 of 14 projects carry risk score >70" },
      { label: "Expenditure Pattern Anomalies", score: 24, desc: "Cost overruns in 7 projects" },
      { label: "Delayed Projects", score: 16, desc: "36% delay rate" },
      { label: "Compliance Alerts", score: 10, desc: "3 pending UC submissions" }
    ],
    projectList: [
      { pid: "MP/BR/2024/1932", name: "Drain Construction", amount: "₹14.20L", status: "Delayed", riskScore: 84 },
      { pid: "MP/UP/2023/5512", name: "Road Repair", amount: "₹9.80L", status: "In Progress", riskScore: 72 }
    ]
  },
  {
    id: "V012",
    name: "Karnataka Infrastructure Ltd",
    type: "Government Contractor",
    projects: 22,
    totalAmount: "₹3.41Cr",
    totalAmountNum: 34100000,
    completed: 14,
    delayed: 4,
    highRisk: 3,
    anomalies: 4,
    duplicateAssoc: 0,
    riskScore: 54,
    riskLevel: "medium",
    factors: [
      { label: "Project Volume", score: 18, desc: "High project count requires monitoring" },
      { label: "Minor Cost Deviations", score: 16, desc: "Small cost variations in 4 projects" },
      { label: "Timeline Management", score: 12, desc: "18% delay rate" },
      { label: "Standard Compliance", score: 8, desc: "Minor documentation gaps" }
    ],
    projectList: [
      { pid: "MP/KA/2023/7741", name: "Rural Road", amount: "₹24.00L", status: "In Progress", riskScore: 45 },
      { pid: "MP/KA/2024/2234", name: "Water Tank", amount: "₹11.50L", status: "Completed", riskScore: 28 }
    ]
  },
  {
    id: "V019",
    name: "Lakshmi Water Works",
    type: "Water Supply Contractor",
    projects: 9,
    totalAmount: "₹1.12Cr",
    totalAmountNum: 11200000,
    completed: 7,
    delayed: 1,
    highRisk: 1,
    anomalies: 1,
    duplicateAssoc: 0,
    riskScore: 29,
    riskLevel: "low",
    factors: [
      { label: "Strong Track Record", score: 8, desc: "78% completion rate" },
      { label: "Low Risk Profile", score: 6, desc: "Only 1 high-risk project" },
      { label: "Cost Control", score: 8, desc: "Minimal cost overruns" },
      { label: "Timely Delivery", score: 7, desc: "11% delay rate" }
    ],
    projectList: [
      { pid: "MP/MH/2024/5566", name: "Water Supply Scheme", amount: "₹15.50L", status: "In Progress", riskScore: 74 },
      { pid: "MP/GJ/2023/8821", name: "Hand Pump Installation", amount: "₹4.20L", status: "Completed", riskScore: 18 }
    ]
  },
  {
    id: "V022",
    name: "Nirmaan Green Projects",
    type: "Green Infrastructure",
    projects: 6,
    totalAmount: "₹0.62Cr",
    totalAmountNum: 6200000,
    completed: 5,
    delayed: 0,
    highRisk: 0,
    anomalies: 0,
    duplicateAssoc: 0,
    riskScore: 12,
    riskLevel: "low",
    factors: [
      { label: "Excellent Performance", score: 4, desc: "83% completion rate" },
      { label: "Zero Risk Projects", score: 3, desc: "No high-risk works" },
      { label: "Budget Adherence", score: 3, desc: "No cost anomalies" },
      { label: "On-Time Delivery", score: 2, desc: "Zero delays" }
    ],
    projectList: [
      { pid: "MP/GJ/2024/9910", name: "Solar Water Pump", amount: "₹6.80L", status: "Completed", riskScore: 12 },
      { pid: "MP/RJ/2023/4421", name: "Tree Plantation", amount: "₹3.20L", status: "Completed", riskScore: 8 }
    ]
  }
];

export const mps: MP[] = [
  {
    id: "MP001",
    name: "Hon. Dilip Saikia",
    party: "BJP",
    constituency: "Darrang",
    state: "Assam",
    totalProjects: 61,
    totalFunds: "₹7.42Cr",
    completed: 38,
    delayed: 14,
    highRisk: 9,
    avgRiskScore: 63,
    riskLevel: "high",
    monitoringRating: "Elevated Monitoring",
    factors: [
      { label: "High-Risk Project Concentration", score: 28, desc: "9 of 61 projects carry risk >75" },
      { label: "Expenditure Pattern Anomalies", score: 22, desc: "Unusual Q3 concentration detected" },
      { label: "Delayed Projects", score: 18, desc: "14 projects beyond timeline" },
      { label: "Compliance Alerts", score: 10, desc: "5 pending UC submissions" }
    ]
  },
  {
    id: "MP002",
    name: "Hon. Suresh Kumar",
    party: "INC",
    constituency: "Mandya",
    state: "Karnataka",
    totalProjects: 48,
    totalFunds: "₹5.82Cr",
    completed: 28,
    delayed: 12,
    highRisk: 8,
    avgRiskScore: 61,
    riskLevel: "high",
    monitoringRating: "Elevated Monitoring",
    factors: [
      { label: "High-Risk Project Concentration", score: 28, desc: "8 of 48 projects carry risk >75" },
      { label: "Expenditure Pattern Anomalies", score: 22, desc: "Unusual Q3 concentration" },
      { label: "Delayed Projects", score: 18, desc: "12 projects beyond timeline" },
      { label: "Compliance Alerts", score: 10, desc: "3 pending UC submissions" }
    ]
  },
  {
    id: "MP003",
    name: "Hon. A. Ganeshamurthi",
    party: "DMK",
    constituency: "Tiruppur",
    state: "Tamil Nadu",
    totalProjects: 39,
    totalFunds: "₹4.71Cr",
    completed: 26,
    delayed: 8,
    highRisk: 4,
    avgRiskScore: 46,
    riskLevel: "medium",
    monitoringRating: "Standard Monitoring",
    factors: [
      { label: "Moderate Risk Portfolio", score: 18, desc: "4 high-risk projects" },
      { label: "Minor Cost Variations", score: 14, desc: "Small deviations in 6 works" },
      { label: "Timeline Delays", score: 10, desc: "8 delayed projects" },
      { label: "Documentation Gaps", score: 4, desc: "Minor compliance issues" }
    ]
  },
  {
    id: "MP004",
    name: "Hon. Vijay Prasad",
    party: "RJD",
    constituency: "Gaya",
    state: "Bihar",
    totalProjects: 52,
    totalFunds: "₹6.14Cr",
    completed: 31,
    delayed: 11,
    highRisk: 6,
    avgRiskScore: 55,
    riskLevel: "medium",
    monitoringRating: "Standard Monitoring",
    factors: [
      { label: "Elevated Risk Count", score: 22, desc: "6 high-risk projects" },
      { label: "Cost Pattern Variations", score: 18, desc: "Cost variations in 8 works" },
      { label: "Delay Signal", score: 12, desc: "11 delayed projects" },
      { label: "Minor Compliance Gaps", score: 8, desc: "Documentation pending" }
    ]
  },
  {
    id: "MP005",
    name: "Hon. Pratap Chikhalikar",
    party: "Shiv Sena",
    constituency: "Nanded",
    state: "Maharashtra",
    totalProjects: 44,
    totalFunds: "₹5.28Cr",
    completed: 32,
    delayed: 6,
    highRisk: 3,
    avgRiskScore: 38,
    riskLevel: "low",
    monitoringRating: "Routine Monitoring",
    factors: [
      { label: "Strong Performance", score: 12, desc: "73% completion rate" },
      { label: "Low Risk Profile", score: 10, desc: "Only 3 high-risk projects" },
      { label: "Minor Delays", score: 8, desc: "6 delayed projects" },
      { label: "Good Compliance", score: 8, desc: "Strong documentation" }
    ]
  }
];
