import React from 'react';
import { Database, FileBarChart, DollarSign, AlertTriangle, Clock, Copy, ArrowUpRight, Eye } from 'lucide-react';
import type { PageState, RiskLevel } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardProps {
  navigate: (state: PageState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const riskDistData = [
    { name: 'Low Risk', value: 14203, color: '#22c55e' },
    { name: 'Moderate', value: 3902, color: '#f59e0b' },
    { name: 'High', value: 200, color: '#f97316' },
    { name: 'Critical', value: 127, color: '#ef4444' }
  ];

  const trendData = [
    { month: 'Apr', critical: 85, high: 158, moderate: 3200 },
    { month: 'May', critical: 92, high: 172, moderate: 3380 },
    { month: 'Jun', critical: 101, high: 185, moderate: 3450 },
    { month: 'Jul', critical: 110, high: 190, moderate: 3620 },
    { month: 'Aug', critical: 118, high: 196, moderate: 3750 },
    { month: 'Sep', critical: 122, high: 200, moderate: 3820 },
    { month: 'Oct', critical: 127, high: 198, moderate: 3890 },
    { month: 'Nov', critical: 119, high: 195, moderate: 3900 },
    { month: 'Dec', critical: 124, high: 199, moderate: 3902 }
  ];

  const priorityAlerts = [
    { pid: 'MP/KA/2024/4821', projectId: '4821', name: 'Construction of Community Hall', constituency: 'Mandya, Karnataka', risk: 87, level: 'critical' as RiskLevel, signal: 'Payment/Progress Gap', status: 'Review' },
    { pid: 'MP/BR/2024/1932', projectId: '1932', name: 'Drain Construction Work', constituency: 'Gaya, Bihar', risk: 84, level: 'critical' as RiskLevel, signal: 'Cost anomaly detected', status: 'Review' },
    { pid: 'MP/AS/2024/7741', projectId: '7741', name: 'Rural Road Construction', constituency: 'Darrang, Assam', risk: 81, level: 'critical' as RiskLevel, signal: 'Duplicate similarity', status: 'Pending' },
    { pid: 'MP/MH/2024/5566', projectId: '5566', name: 'Water Supply Scheme', constituency: 'Nanded, MH', risk: 74, level: 'high' as RiskLevel, signal: 'Expenditure pattern', status: 'In Review' },
    { pid: 'MP/TN/2024/2233', projectId: '2233', name: 'Anganwadi Building Const.', constituency: 'Tiruppur, TN', risk: 69, level: 'high' as RiskLevel, signal: 'Delay signal', status: 'Pending' }
  ];

  const topDistricts = [
    { name: 'Mandya', state: 'Karnataka', count: 142, score: 72 },
    { name: 'Gaya', state: 'Bihar', count: 128, score: 69 },
    { name: 'Darrang', state: 'Assam', count: 116, score: 68 },
    { name: 'Nanded', state: 'Maharashtra', count: 104, score: 67 },
    { name: 'Barpeta', state: 'Assam', count: 96, score: 65 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-[12px]">
          <p className="font-semibold text-slate-700 mb-2">{payload[0].payload.month}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600 capitalize">{entry.name}:</span>
              <span className="font-bold ml-auto">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Data Source Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 text-[12px] text-blue-900">
        <Database className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <div>
            Data is sourced from eSAKSHI through authorized, secure data integration with MoSPI permission. MPLAD Sentinel does not create or modify MPLADS records — it analyzes the authorized data solely to identify anomalies, risks, and trends.
          </div>
          <div className="text-blue-600 text-[11px] mt-1">
            All findings are indicative and intended to support — not replace — official audit and verification processes.
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">MPLADS Monitoring Overview</h1>
          <p className="text-[13.5px] text-slate-500 mt-0.5">
            AI-powered monitoring of project execution, fund utilization and emerging risks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
            <option>All States</option>
            <option>Karnataka</option>
            <option>Bihar</option>
            <option>Maharashtra</option>
          </select>
          <select className="text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
            <option>FY 2023–24</option>
            <option>FY 2022–23</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 leading-tight">
                Projects Monitored
              </div>
              <div className="text-[20px] font-bold tracking-tight leading-none mt-1 font-mono" style={{ color: '#1d4ed8' }}>
                18,432
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1">Across all constituencies</div>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1d4ed815' }}>
              <FileBarChart className="w-4 h-4" style={{ color: '#1d4ed8' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 leading-tight">
                Funds Monitored
              </div>
              <div className="text-[20px] font-bold tracking-tight leading-none mt-1 font-mono" style={{ color: '#0d9488' }}>
                ₹4,821 Cr
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1">Total sanctioned</div>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0d948815' }}>
              <DollarSign className="w-4 h-4" style={{ color: '#0d9488' }} />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate({ page: 'risk-alerts' })}
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 leading-tight">
                High-Risk Projects
              </div>
              <div className="text-[20px] font-bold tracking-tight leading-none mt-1 font-mono" style={{ color: '#dc2626' }}>
                127
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1">Require attention</div>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#dc262615' }}>
              <AlertTriangle className="w-4 h-4" style={{ color: '#dc2626' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 leading-tight">
                Delayed Projects
              </div>
              <div className="text-[20px] font-bold tracking-tight leading-none mt-1 font-mono" style={{ color: '#d97706' }}>
                342
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1">Beyond expected date</div>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#d9770615' }}>
              <Clock className="w-4 h-4" style={{ color: '#d97706' }} />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate({ page: 'duplicate' })}
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 leading-tight">
                Potential Duplicates
              </div>
              <div className="text-[20px] font-bold tracking-tight leading-none mt-1 font-mono" style={{ color: '#7c3aed' }}>
                28
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1">Similar works detected</div>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#7c3aed15' }}>
              <Copy className="w-4 h-4" style={{ color: '#7c3aed' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Risk Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-3">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={128}>
            <PieChart>
              <Pie
                data={riskDistData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={58}
                strokeWidth={2}
                stroke="white"
                dataKey="value"
              >
                {riskDistData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {riskDistData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2 flex-1 truncate">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
                <span className="font-bold font-mono text-slate-800 ml-2 flex-shrink-0">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* High-Risk Works Trend */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">High-Risk Works Trend</h3>
          <ResponsiveContainer width="100%" height={155}>
            <LineChart data={trendData} margin={{ top: 0, right: 16, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} dot={false} name="Critical" />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} dot={false} name="High" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Priority Alerts Table */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[13.5px] font-semibold text-slate-800">Priority Alerts</h3>
            <button
              onClick={() => navigate({ page: 'risk-alerts' })}
              className="flex items-center gap-1 text-[12px] text-blue-600 font-medium hover:text-blue-700"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-100">
                <tr>
                  <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Project</th>
                  <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Constituency</th>
                  <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Risk</th>
                  <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Signal</th>
                  <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Status</th>
                  <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {priorityAlerts.map((alert, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate({ page: 'project-detail', projectId: alert.projectId })}
                  >
                    <td className="px-5 py-3">
                      <div className="font-mono text-[12.5px] font-semibold text-blue-700">{alert.pid}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{alert.name}</div>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600">{alert.constituency}</td>
                    <td className="px-5 py-3">
                      <RiskBadge score={alert.risk} level={alert.level} />
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600">{alert.signal}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                        alert.status === 'Review' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        alert.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-slate-400 hover:text-blue-600">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 text-[11px] text-slate-400 border-t border-slate-100">
            Showing 5 of 42 alerts · Illustrative Demo Data
          </div>
        </div>

        {/* Top Districts by Risk */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[13.5px] font-semibold text-slate-800">Top Districts by Risk</h3>
            <button
              onClick={() => navigate({ page: 'geographic' })}
              className="text-blue-600 hover:text-blue-700"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <div className="px-4 py-4 space-y-3">
            {topDistricts.map((district, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 text-[11px] font-bold text-slate-400">{idx + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[12.5px] font-semibold text-slate-800">{district.name}</span>
                    <span className="text-[11px] font-bold font-mono text-orange-600">{district.score}</span>
                  </div>
                  <div className="text-[10.5px] text-slate-400 mb-1.5">
                    {district.state} · {district.count} high-risk
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${district.score}%`,
                        backgroundColor: district.score >= 70 ? '#f97316' : '#f59e0b'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <button
              onClick={() => navigate({ page: 'geographic' })}
              className="text-[12px] text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
            >
              View All Districts
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
