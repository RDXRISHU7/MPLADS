import React, { useState } from 'react';
import { Filter, Search, RefreshCw, AlertTriangle, Clock, User } from 'lucide-react';
import type { PageState, RiskLevel } from '../types';

interface RiskAlertsProps {
  navigate: (state: PageState) => void;
}

const RiskAlerts: React.FC<RiskAlertsProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const alerts = [
    {
      id: 'ALR-4821',
      projectId: '4821',
      pid: 'MP/KA/2024/4821',
      type: 'Cost Anomaly',
      name: 'Community Hall at Village Halagur',
      description: 'Total expenditure of ₹19.8L exceeds sanctioned amount of ₹12L by 65%. No revised sanction order found in records. Payment-progress mismatch: 135% payment against 34% physical completion.',
      risk: 87,
      level: 'critical' as RiskLevel,
      detected: '02 May 2024',
      district: 'Mandya, Karnataka',
      status: 'Pending Review'
    },
    {
      id: 'ALR-1932',
      projectId: '1932',
      pid: 'MP/BR/2024/1932',
      type: 'Payment Anomaly',
      name: 'Drain Construction Work',
      description: 'Expenditure ₹14.2L exceeds sanction ₹8.5L by 67%. Physical progress 41% against 78% fund utilization. Measurement book entries incomplete.',
      risk: 84,
      level: 'critical' as RiskLevel,
      detected: '01 May 2024',
      district: 'Gaya, Bihar',
      status: 'Under Investigation'
    },
    {
      id: 'ALR-7741',
      projectId: '7741',
      pid: 'MP/AS/2024/7741',
      type: 'Duplicate Similarity',
      name: 'Rural Road Construction – Phase II',
      description: 'High similarity (94%) detected with MP/AS/2024/6623 — same location (within 1.2km), overlapping scope, similar timeline. Both works sanctioned under same constituency.',
      risk: 81,
      level: 'critical' as RiskLevel,
      detected: '30 Apr 2024',
      district: 'Darrang, Assam',
      status: 'Flagged'
    },
    {
      id: 'ALR-5566',
      projectId: '5566',
      pid: 'MP/MH/2024/5566',
      type: 'Expenditure Pattern',
      name: 'Water Supply Scheme, Ward 4',
      description: 'Unusual Q3 expenditure concentration (82% of total). Delay of 156 days beyond expected completion. Progress reporting gaps identified.',
      risk: 74,
      level: 'high' as RiskLevel,
      detected: '28 Apr 2024',
      district: 'Nanded, Maharashtra',
      status: 'In Review'
    },
    {
      id: 'ALR-2233',
      projectId: '2233',
      pid: 'MP/TN/2024/2233',
      type: 'Delay Signal',
      name: 'Anganwadi Building Construction',
      description: 'Project delayed by 188 days. Physical progress 29% against expected 85%. Last inspection report dated 3 months ago.',
      risk: 69,
      level: 'high' as RiskLevel,
      detected: '25 Apr 2024',
      district: 'Tiruppur, Tamil Nadu',
      status: 'Pending Review'
    },
    {
      id: 'ALR-8821',
      projectId: '8821',
      pid: 'MP/WB/2024/8821',
      type: 'Compliance Gap',
      name: 'Boat Jetty Construction',
      description: 'Utilization certificate pending for 2nd installment. Environmental clearance documents not uploaded to portal. Minor cost deviation detected.',
      risk: 45,
      level: 'medium' as RiskLevel,
      detected: '20 Apr 2024',
      district: 'South 24 Parganas, West Bengal',
      status: 'Pending Review'
    },
    {
      id: 'ALR-3312',
      projectId: '3312',
      pid: 'MP/RJ/2024/3312',
      type: 'Documentation Issue',
      name: 'Panchayat Ghar Renovation',
      description: 'Work completion certificate uploaded but final utilization certificate pending. Minor documentation gaps in measurement records.',
      risk: 22,
      level: 'low' as RiskLevel,
      detected: '15 Apr 2024',
      district: 'Bhilwara, Rajasthan',
      status: 'Resolved'
    }
  ];

  const tabs = [
    { id: 'All', label: 'All', count: 7 },
    { id: 'Critical', label: 'Critical', count: 3 },
    { id: 'High', label: 'High', count: 2 },
    { id: 'Medium', label: 'Medium', count: 2 },
    { id: 'Resolved', label: 'Resolved', count: 1 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">Risk Alerts</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">AI-detected anomalies requiring investigation or review</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-[12.5px] text-slate-600 bg-white hover:bg-slate-50">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
        <Filter className="w-4 h-4 text-slate-400" />
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button className="px-3 py-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white hover:bg-slate-50">
          All States
        </button>
        <select className="ml-auto text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
          <option>Sort: Newest First</option>
          <option>Sort: Highest Risk</option>
          <option>Sort: Oldest First</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-blue-700 border-blue-600'
                : 'text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const stripColor = alert.level === 'critical' ? '#ef4444' : alert.level === 'high' ? '#f97316' : alert.level === 'medium' ? '#f59e0b' : '#22c55e';

          return (
            <div key={alert.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-1.5 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: stripColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      alert.level === 'critical' ? 'bg-red-50 text-red-700 border-red-200' :
                      alert.level === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      alert.level === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{alert.id}</span>
                    <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">{alert.pid}</span>
                    <span className={`ml-auto text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                      alert.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                      alert.status === 'Under Investigation' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      alert.status === 'Flagged' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {alert.status}
                    </span>
                  </div>

                  <h3 className="text-[14px] font-semibold text-slate-900 mb-2">{alert.name}</h3>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed mb-3">{alert.description}</p>

                  <div className="flex items-center gap-4 text-[12px] text-slate-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" style={{ color: stripColor }} />
                      <span>Risk: <span className="font-bold font-mono" style={{ color: stripColor }}>{alert.risk}/100</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Detected: {alert.detected}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {alert.district}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate({ page: 'project-detail', projectId: alert.projectId })}
                      className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-[12px] font-semibold hover:bg-blue-800"
                    >
                      Investigate
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-[12px] font-semibold hover:bg-slate-50">
                      Assign
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-[12px] font-semibold hover:bg-slate-50">
                      Mark for Review
                    </button>
                    {alert.status !== 'Resolved' && (
                      <button className="ml-auto px-3 py-1.5 rounded-lg border border-green-200 text-green-600 text-[12px] font-semibold hover:bg-green-50">
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskAlerts;
