import React, { useState } from 'react';
import { Info, ArrowUpRight } from 'lucide-react';
import type { PageState } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';

interface AnalyticsProps {
  navigate: (state: PageState) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'trends' | 'categories' | 'entities' | 'attribution'>('trends');

  const trendData = [
    { month: "Apr'23", critical: 85, high: 158, moderate: 3200 },
    { month: "May'23", critical: 92, high: 172, moderate: 3380 },
    { month: "Jun'23", critical: 101, high: 185, moderate: 3450 },
    { month: "Jul'23", critical: 110, high: 190, moderate: 3620 },
    { month: "Aug'23", critical: 118, high: 196, moderate: 3750 },
    { month: "Sep'23", critical: 122, high: 200, moderate: 3820 },
    { month: "Oct'23", critical: 127, high: 198, moderate: 3890 },
    { month: "Nov'23", critical: 124, high: 199, moderate: 3902 },
  ];

  const categoryRisk = [
    { category: 'Sanitation', score: 72 },
    { category: 'Community Infra', score: 68 },
    { category: 'Roads', score: 61 },
    { category: 'Water', score: 54 },
    { category: 'Education', score: 41 },
    { category: 'Healthcare', score: 38 },
  ];

  const radarData = [
    { subject: 'Cost Control', A: 62, fullMark: 100 },
    { subject: 'Timeline', A: 48, fullMark: 100 },
    { subject: 'Compliance', A: 74, fullMark: 100 },
    { subject: 'Documentation', A: 55, fullMark: 100 },
    { subject: 'Progress Align.', A: 41, fullMark: 100 },
    { subject: 'Uniqueness', A: 69, fullMark: 100 },
  ];

  const attributionData = [
    { name: 'Payment/Progress Gap', share: 28, color: '#2563eb' },
    { name: 'Cost Anomaly', share: 25, color: '#dc2626' },
    { name: 'Delay Signal', share: 20, color: '#f59e0b' },
    { name: 'Similarity/Duplicate', share: 15, color: '#7c3aed' },
    { name: 'Compliance Deviation', share: 12, color: '#0d9488' },
  ];

  const entityPatterns = [
    {
      mp: 'Hon. Suresh Kumar',
      constituency: 'Mandya, KA',
      agency: 'GP Halagur',
      projects: 3,
      avgScore: 72,
      riskLevel: 'high'
    },
    {
      mp: 'Hon. Vijay Prasad',
      constituency: 'Gaya, BR',
      agency: 'MC Gaya',
      projects: 2,
      avgScore: 68,
      riskLevel: 'high'
    },
    {
      mp: 'Hon. Dilip Saikia',
      constituency: 'Darrang, AS',
      agency: 'PWD Assam',
      projects: 4,
      avgScore: 61,
      riskLevel: 'high'
    },
    {
      mp: 'Hon. Pratap Chikhalikar',
      constituency: 'Nanded, MH',
      agency: 'MSEDCL',
      projects: 2,
      avgScore: 45,
      riskLevel: 'medium'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-slate-900">Analytics</h1>
        <p className="text-[13.5px] text-slate-500 mt-0.5">Advanced risk analytics, portfolio health scores and signal attribution</p>
      </div>

      {/* SUMMARY (grid-cols-4) */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Cost Anomalies</div>
          <div className="text-[20px] font-bold font-mono text-red-600 mt-1">1,923</div>
          <div className="text-[10.5px] text-slate-400 mt-1">Across 18.4k works</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Payment Anomalies</div>
          <div className="text-[20px] font-bold font-mono text-orange-600 mt-1">2,876</div>
          <div className="text-[10.5px] text-slate-400 mt-1">Progress mismatch</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Delay Anomalies</div>
          <div className="text-[20px] font-bold font-mono text-amber-600 mt-1">5,247</div>
          <div className="text-[10.5px] text-slate-400 mt-1">&gt;90 days overdue</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Duplicate Works</div>
          <div className="text-[20px] font-bold font-mono text-purple-600 mt-1">1,102</div>
          <div className="text-[10.5px] text-slate-400 mt-1">Overlap candidates</div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'trends', label: 'Risk Trends' },
          { id: 'categories', label: 'Category Analysis' },
          { id: 'entities', label: 'Entity Patterns' },
          { id: 'attribution', label: 'Signal Attribution' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      {activeTab === 'trends' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Risk Score Trend — Monthly</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2.5} dot={false} name="Critical Risk (>80)" />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2.5} dot={false} name="High Risk (61-80)" />
              <Line type="monotone" dataKey="moderate" stroke="#f59e0b" strokeWidth={2} dot={false} name="Moderate Risk (41-60)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-2 gap-5">
          {/* Horizontal BarChart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Average Risk Score by Work Category</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart layout="vertical" data={categoryRisk} margin={{ top: 0, right: 20, bottom: 0, left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip formatter={(val: any) => [`${val} / 100`, 'Avg Risk Score']} />
                <Bar dataKey="score" fill="#2563eb" radius={[0, 3, 3, 0]}>
                  {categoryRisk.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 70 ? '#ef4444' : entry.score >= 60 ? '#f97316' : '#2563eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* RadarChart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Health Score Radar — Portfolio Overview</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart cx="50%" cy="50%" outerRadius={90} data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="Portfolio Health" dataKey="A" stroke="#2563eb" strokeWidth={2} fill="#2563eb" fillOpacity={0.15} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'entities' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-blue-900 leading-relaxed">
              Relationships and entity clusters shown are for analytical pattern-detection purposes only. They assist in cross-verifying agency capacity and geographical distribution across works.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {entityPatterns.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 flex-wrap">
                <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-[12.5px] font-semibold text-blue-800">
                  {item.mp}
                </div>
                <span className="text-slate-400">→</span>
                <div className="px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-lg text-[12.5px] font-semibold text-teal-800">
                  {item.constituency}
                </div>
                <span className="text-slate-400">→</span>
                <div className="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-[12.5px] font-semibold text-purple-800">
                  {item.agency}
                </div>
                <span className="text-slate-400">→</span>
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-[12px] text-slate-600 font-medium">{item.projects} Works Monitored</span>
                  <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full border ${
                    item.avgScore >= 70 ? 'bg-red-50 text-red-700 border-red-200' :
                    item.avgScore >= 60 ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    Avg Risk: {item.avgScore}/100
                  </span>
                  <button
                    onClick={() => navigate({ page: 'vendors-mp' })}
                    className="text-blue-600 hover:text-blue-700 text-[12px] font-semibold flex items-center gap-1"
                  >
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'attribution' && (
        <div className="grid grid-cols-2 gap-5">
          {/* Manual Bar List */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Overall Risk Signal Contribution</h3>
            <div className="space-y-4">
              {attributionData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-[12.5px] mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold" style={{ color: item.color }}>{item.share}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.share}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recharts BarChart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Signal Weight Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="vertical" data={attributionData} margin={{ top: 0, right: 20, bottom: 0, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={130} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Signal Share']} />
                <Bar dataKey="share" radius={[0, 3, 3, 0]}>
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
