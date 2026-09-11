import React from 'react';
import { DollarSign, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import type { PageState } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ExpenditureProps {
  navigate: (state: PageState) => void;
}

const Expenditure: React.FC<ExpenditureProps> = ({ navigate }) => {
  const monthlyData = [
    { month: 'Apr', Sanctioned: 420, Expenditure: 280 },
    { month: 'May', Sanctioned: 480, Expenditure: 310 },
    { month: 'Jun', Sanctioned: 510, Expenditure: 390 },
    { month: 'Jul', Sanctioned: 530, Expenditure: 410 },
    { month: 'Aug', Sanctioned: 560, Expenditure: 440 },
    { month: 'Sep', Sanctioned: 590, Expenditure: 480 },
    { month: 'Oct', Sanctioned: 620, Expenditure: 510 },
    { month: 'Nov', Sanctioned: 580, Expenditure: 490 },
    { month: 'Dec', Sanctioned: 640, Expenditure: 530 },
  ];

  const categoryData = [
    { name: 'Roads', value: 28, color: '#2563eb' },
    { name: 'Water', value: 19, color: '#0d9488' },
    { name: 'Community', value: 16, color: '#7c3aed' },
    { name: 'Education', value: 14, color: '#16a34a' },
    { name: 'Healthcare', value: 12, color: '#d97706' },
    { name: 'Sanitation', value: 7, color: '#f97316' },
    { name: 'Others', value: 4, color: '#94a3b8' },
  ];

  const constituencyData = [
    { name: 'Mandya (KA)', amount: 48.2 },
    { name: 'Gaya (BR)', amount: 42.1 },
    { name: 'Darrang (AS)', amount: 38.6 },
    { name: 'Nanded (MH)', amount: 34.2 },
    { name: 'Tiruppur (TN)', amount: 31.8 },
    { name: 'Bhilwara (RJ)', amount: 28.5 },
    { name: 'Prayagraj (UP)', amount: 26.4 },
  ];

  const topProjects = [
    { id: '4821', pid: 'MP/KA/2024/4821', name: 'Community Hall Halagur', amount: '₹19.80L', dev: '+65%', flagged: true },
    { id: '7741', pid: 'MP/AS/2024/7741', name: 'Rural Road Phase II', amount: '₹24.00L', dev: '+42%', flagged: true },
    { id: '1932', pid: 'MP/BR/2024/1932', name: 'Drain Construction', amount: '₹14.20L', dev: '+67%', flagged: true },
    { id: '5566', pid: 'MP/MH/2024/5566', name: 'Water Supply Ward 4', amount: '₹15.50L', dev: '+18%', flagged: false },
    { id: '6612', pid: 'MP/UP/2024/6612', name: 'Primary Health Centre', amount: '₹18.00L', dev: '+5%', flagged: false },
  ];

  const anomalies = [
    { pid: 'MP/KA/2024/4821', name: 'Community Hall at Village Halagur', expected: '₹12.0L', observed: '₹19.8L', dev: '+65%', conf: 91, projectId: '4821' },
    { pid: 'MP/BR/2024/1932', name: 'Drain Construction Gaya', expected: '₹8.5L', observed: '₹14.2L', dev: '+67%', conf: 89, projectId: '1932' },
    { pid: 'MP/AS/2024/7741', name: 'Rural Road Darrang', expected: '₹16.9L', observed: '₹24.0L', dev: '+42%', conf: 86, projectId: '4821' },
  ];

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-[12px]">
          <p className="font-semibold text-slate-700 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600">{entry.name}:</span>
              <span className="font-bold ml-auto font-mono">₹{entry.value} Cr</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-slate-900">Expenditure Analytics</h1>
        <p className="text-[13.5px] text-slate-500 mt-0.5">Financial monitoring and anomaly detection across all MPLADS works</p>
      </div>

      {/* SUMMARY CARDS (grid-cols-4) */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Total Sanctioned</div>
              <div className="text-[20px] font-bold font-mono text-blue-700 mt-1">₹4,821 Cr</div>
              <div className="text-[10.5px] text-slate-400 mt-1">All approved works</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50">
              <DollarSign className="w-4 h-4 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Total Expenditure</div>
              <div className="text-[20px] font-bold font-mono text-teal-600 mt-1">₹2,358 Cr</div>
              <div className="text-[10.5px] text-slate-400 mt-1">48.9% fund utilization</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-teal-50">
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Spending Anomalies</div>
              <div className="text-[20px] font-bold font-mono text-red-600 mt-1">1,923</div>
              <div className="text-[10.5px] text-slate-400 mt-1">Flagged for review</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Avg. Deviation</div>
              <div className="text-[20px] font-bold font-mono text-orange-600 mt-1">+28%</div>
              <div className="text-[10.5px] text-slate-400 mt-1">Over sanction baseline</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-50">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 (grid-cols-3) */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left 2/3: Monthly Bar Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Monthly Expenditure vs Sanction (₹ Cr)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Sanctioned" fill="#dbeafe" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Expenditure" fill="#2563eb" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right 1/3: Category Donut */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-2">Expenditure by Category</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                strokeWidth={2}
                stroke="white"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11.5px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-600 truncate">{cat.name}</span>
                </div>
                <span className="font-bold font-mono text-slate-800">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3 (grid-cols-2) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Constituency Bar Chart (horizontal) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Expenditure by Constituency (₹ Cr)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={constituencyData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip formatter={(value: any) => [`₹${value} Cr`, 'Expenditure']} />
              <Bar dataKey="amount" fill="#0d9488" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Top Spending Projects */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-[13.5px] font-semibold text-slate-800 mb-3">Top Spending Projects</h3>
          <div className="space-y-2">
            {topProjects.map((p, idx) => (
              <div
                key={idx}
                onClick={() => navigate({ page: 'project-detail', projectId: p.id })}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer ${
                  p.flagged ? 'bg-red-50/50 border-red-200 hover:bg-red-50' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                }`}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold bg-white text-slate-600 border border-slate-200">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] font-semibold text-blue-700">{p.pid}</div>
                  <div className="text-[12px] text-slate-700 truncate">{p.name}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`font-mono text-[12px] font-bold ${p.flagged ? 'text-red-600' : 'text-slate-800'}`}>
                    {p.amount}
                  </div>
                  <div className={`text-[10.5px] font-mono ${p.flagged ? 'text-red-600' : 'text-slate-400'}`}>
                    {p.dev}
                  </div>
                </div>
                {p.flagged && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPENDING ANOMALY PANEL */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="text-[13.5px] font-semibold text-slate-800">Spending Anomaly Panel</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {anomalies.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[12px] font-semibold text-blue-700">{item.pid}</span>
                <span className="mx-2 text-slate-300">·</span>
                <span className="text-[12.5px] font-medium text-slate-800">{item.name}</span>
              </div>
              <div className="flex items-center gap-6 text-[12px]">
                <div>
                  <span className="text-slate-400 text-[11px] block">Expected</span>
                  <span className="font-mono font-medium text-slate-600">{item.expected}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Observed</span>
                  <span className="font-mono font-bold text-red-600">{item.observed}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Deviation</span>
                  <span className="font-mono font-bold text-orange-600">{item.dev}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Confidence</span>
                  <span className="font-mono font-bold text-teal-600">{item.conf}%</span>
                </div>
                <button
                  onClick={() => navigate({ page: 'project-detail', projectId: item.projectId })}
                  className="px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-700 text-[12px] font-semibold hover:bg-orange-100 flex items-center gap-1"
                >
                  View Records
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
          Benchmarks are derived from historical regional averages and standard Schedule of Rates (SoR) in each state.
        </div>
      </div>
    </div>
  );
};

export default Expenditure;
