import React, { useState } from 'react';
import { Building2, Users, Search, TrendingUp, Shield, X } from 'lucide-react';
import type { PageState, Vendor, MP } from '../types';
import { vendors, mps } from '../data/mockData';
import { RiskBadge } from '../components/RiskBadge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts';

interface VendorMPIntelligenceProps {
  navigate?: (state: PageState) => void;
}

const VendorMPIntelligence: React.FC<VendorMPIntelligenceProps> = () => {
  const [activeTab, setActiveTab] = useState<'vendor' | 'mp'>('vendor');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedMP, setSelectedMP] = useState<MP | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');

  const filteredVendors = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRisk = riskFilter === 'all' || v.riskLevel === riskFilter;
    return matchSearch && matchRisk;
  });

  const filteredMPs = mps.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRisk = riskFilter === 'all' || m.riskLevel === riskFilter;
    return matchSearch && matchRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-slate-900">Vendors & MPs Intelligence</h1>
        <p className="text-[13.5px] text-slate-500 mt-0.5">Area-wise monitoring of vendor activity and constituency implementation risk</p>
      </div>

      {/* AMBER DISCLAIMER BANNER */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
        <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-[11.5px] text-amber-900 leading-relaxed">
          <strong>Decision-Support Tool:</strong> Risk ratings are derived from project data patterns and anomaly indicators. They do not establish wrongdoing, corruption, or fraud. All findings require authorized human verification before any action. MP ratings reflect constituency project implementation risk, not personal performance or integrity.
        </div>
      </div>

      {/* AREA-WISE FILTER BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-slate-500" />
          <span className="text-[12px] font-semibold text-slate-700 uppercase tracking-wide">Area-wise Selection</span>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {['State', 'District/IDA', 'Constituency', 'MP', 'Vendor', 'Time Period'].map((label) => (
            <div key={label}>
              <label className="text-[10.5px] font-medium text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
              <select className="w-full text-[12px] border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
                <option>All</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY STATS (grid-cols-4) */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Vendors Monitored</div>
              <div className="text-[20px] font-bold font-mono text-blue-700 mt-1">{vendors.length}</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50">
              <Building2 className="w-4 h-4 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">High/Critical Vendors</div>
              <div className="text-[20px] font-bold font-mono text-red-600 mt-1">2</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
              <Building2 className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">MPs/Constituencies</div>
              <div className="text-[20px] font-bold font-mono text-purple-600 mt-1">{mps.length}</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-50">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Elevated Monitoring</div>
              <div className="text-[20px] font-bold font-mono text-orange-600 mt-1">2</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-50">
              <Shield className="w-4 h-4 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* TABS + SEARCH + RISK FILTER ROW */}
      <div className="flex items-center gap-3">
        {/* Tab switcher */}
        <div className="border border-slate-200 rounded-lg p-1 bg-white flex">
          <button
            onClick={() => { setActiveTab('vendor'); setSelectedVendor(null); setSelectedMP(null); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition-all ${
              activeTab === 'vendor' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Vendor Intelligence
          </button>
          <button
            onClick={() => { setActiveTab('mp'); setSelectedVendor(null); setSelectedMP(null); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition-all ${
              activeTab === 'mp' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            MP / Constituency Intelligence
          </button>
        </div>

        {/* Search */}
        <div className="relative w-52">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Risk filters */}
        {(['all', 'critical', 'high', 'medium', 'low'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setRiskFilter(level)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors capitalize ${
              riskFilter === level
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA (TABLE + SIDE PANEL) */}
      <div className="flex gap-4">
        {/* TABLE */}
        <div className={`${selectedVendor || selectedMP ? 'flex-1' : 'w-full'} bg-white rounded-xl border border-slate-200 overflow-hidden transition-all`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-100 bg-slate-50/50">
                <tr>
                  {activeTab === 'vendor' ? (
                    <>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Vendor Name</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Projects</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Total Amount</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Completed</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Delayed</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">High Risk</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Anomalies</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Risk Rating</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Details</th>
                    </>
                  ) : (
                    <>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">MP Name</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Constituency</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Total Projects</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Total Funds</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Completed</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Delayed</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">High Risk</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Avg Risk Score</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Monitoring Rating</th>
                      <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Details</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'vendor' ? (
                  filteredVendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      onClick={() => setSelectedVendor(vendor)}
                      className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="text-[12.5px] font-semibold text-slate-800">{vendor.name}</div>
                        <div className="text-[11px] text-slate-400">{vendor.type} · {vendor.id}</div>
                      </td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-slate-700">{vendor.projects}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-slate-700">{vendor.totalAmount}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-green-600">{vendor.completed}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-orange-600">{vendor.delayed}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-red-600">{vendor.highRisk}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block bg-red-50 text-red-700 font-mono font-bold text-[11px] px-1.5 py-0.5 rounded">{vendor.anomalies}</span>
                      </td>
                      <td className="px-5 py-3"><RiskBadge score={vendor.riskScore} level={vendor.riskLevel} /></td>
                      <td className="px-5 py-3 text-blue-600 text-[12px] font-medium">View →</td>
                    </tr>
                  ))
                ) : (
                  filteredMPs.map((mp) => (
                    <tr
                      key={mp.id}
                      onClick={() => setSelectedMP(mp)}
                      className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="text-[12.5px] font-semibold text-slate-800">{mp.name}</div>
                        <div className="text-[11px] text-slate-400">{mp.party}</div>
                      </td>
                      <td className="px-5 py-3 text-[12px] text-slate-600">{mp.constituency}, {mp.state}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-slate-700">{mp.totalProjects}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-slate-700">{mp.totalFunds}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-green-600">{mp.completed}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-orange-600">{mp.delayed}</td>
                      <td className="px-5 py-3 text-[12.5px] font-mono text-red-600">{mp.highRisk}</td>
                      <td className="px-5 py-3"><RiskBadge score={mp.avgRiskScore} level={mp.riskLevel} showLabel={false} /></td>
                      <td className="px-5 py-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          mp.monitoringRating.includes('Elevated') ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          mp.monitoringRating.includes('Standard') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {mp.monitoringRating}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-blue-600 text-[12px] font-medium">View →</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* VENDOR DETAIL PANEL (SLIDE-OVER) */}
        {selectedVendor && (
          <div className="w-[480px] flex-shrink-0 bg-white rounded-xl border-2 shadow-2xl overflow-hidden" style={{ borderColor: getRiskColor(selectedVendor.riskLevel) }}>
            {/* Header */}
            <div className="px-5 py-4 border-b" style={{ backgroundColor: `${getRiskColor(selectedVendor.riskLevel)}15` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vendor Detail</span>
                <button onClick={() => setSelectedVendor(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 mb-0.5">{selectedVendor.name}</h3>
              <div className="text-[12px] text-slate-500">{selectedVendor.type} · {selectedVendor.id}</div>
              <div className="mt-2">
                <RiskBadge score={selectedVendor.riskScore} level={selectedVendor.riskLevel} />
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-blue-600">{selectedVendor.projects}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Projects</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-teal-600">{selectedVendor.totalAmount}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Total Expenditure</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-purple-600">
                    {(selectedVendor.totalAmountNum / selectedVendor.projects / 100000).toFixed(1)}L
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Avg Project Cost</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-orange-600">{Math.round(selectedVendor.delayed / selectedVendor.projects * 100)}%</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Delay Rate</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-red-600">{selectedVendor.anomalies}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Anomaly Flags</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-purple-600">{selectedVendor.duplicateAssoc}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Duplicate Assoc.</div>
                </div>
              </div>

              {/* Status Breakdown Bar Chart */}
              <div>
                <h4 className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-2">Project Status Breakdown</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart layout="vertical" data={[
                    { name: 'Completed', value: selectedVendor.completed, color: '#22c55e' },
                    { name: 'In Progress', value: selectedVendor.projects - selectedVendor.completed - selectedVendor.delayed, color: '#2563eb' },
                    { name: 'Delayed', value: selectedVendor.delayed, color: '#f97316' },
                    { name: 'High Risk', value: selectedVendor.highRisk, color: '#ef4444' },
                  ]}>
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                      {[0, 1, 2, 3].map((idx) => (
                        <Cell key={idx} fill={['#22c55e', '#2563eb', '#f97316', '#ef4444'][idx]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Risk Score Gauge */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">Risk Score</span>
                  <span className="text-[14px] font-black font-mono" style={{ color: getRiskColor(selectedVendor.riskLevel) }}>
                    {selectedVendor.riskScore}/100
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative" style={{ background: 'linear-gradient(to right, #4ade80, #facc15, #f97316, #ef4444)' }}>
                  <div className="absolute w-4 h-4 rounded-full bg-white border-2 shadow-sm" style={{ borderColor: getRiskColor(selectedVendor.riskLevel), left: `calc(${selectedVendor.riskScore}% - 8px)`, top: '-2px' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-400">Low</span>
                  <span className="text-[10px] text-slate-400">Moderate</span>
                  <span className="text-[10px] text-slate-400">High</span>
                  <span className="text-[10px] text-slate-400">Critical</span>
                </div>
              </div>

              {/* Factor Breakdown */}
              <div>
                <h4 className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-3">Why this rating?</h4>
                <div className="space-y-2.5">
                  {selectedVendor.factors.map((factor, idx) => {
                    const totalScore = selectedVendor.factors.reduce((sum, f) => sum + f.score, 0);
                    return (
                      <div key={idx}>
                        <div className="flex justify-between items-center text-[12px] mb-1">
                          <span className="font-semibold text-slate-800">{factor.label}</span>
                          <span className="font-black font-mono text-orange-600">+{factor.score}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-orange-500" style={{ width: `${(factor.score / totalScore) * 100}%` }} />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{factor.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Associated Projects Sample */}
              <div>
                <h4 className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-2">Associated Projects (Sample)</h4>
                <div className="space-y-2">
                  {selectedVendor.projectList.map((proj, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[10.5px] font-semibold text-blue-700">{proj.pid}</div>
                        <div className="text-[11.5px] text-slate-700 truncate">{proj.name}</div>
                      </div>
                      <div className="text-[11.5px] font-mono font-bold text-slate-800">{proj.amount}</div>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        proj.status === 'Delayed' ? 'bg-orange-100 text-orange-700' :
                        proj.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {proj.status}
                      </span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white" style={{ backgroundColor: getRiskColor(proj.riskScore >= 81 ? 'critical' : proj.riskScore >= 61 ? 'high' : proj.riskScore >= 41 ? 'medium' : 'low') }}>
                        {proj.riskScore}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amber Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900">
                  Ratings indicate data-driven monitoring risk and do not establish wrongdoing. Final assessment requires authorized human verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MP DETAIL PANEL (similar structure) */}
        {selectedMP && (
          <div className="w-[460px] flex-shrink-0 bg-white rounded-xl border-2 shadow-2xl overflow-hidden" style={{ borderColor: getRiskColor(selectedMP.riskLevel) }}>
            {/* Header */}
            <div className="px-5 py-4 border-b" style={{ backgroundColor: `${getRiskColor(selectedMP.riskLevel)}15` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Constituency Intelligence</span>
                <button onClick={() => setSelectedMP(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 mb-0.5">{selectedMP.name}</h3>
              <div className="text-[12px] text-slate-500">{selectedMP.party} · {selectedMP.constituency}, {selectedMP.state}</div>
              <div className="mt-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  selectedMP.monitoringRating.includes('Elevated') ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  selectedMP.monitoringRating.includes('Standard') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {selectedMP.monitoringRating}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-blue-600">{selectedMP.totalProjects}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Total Projects</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-teal-600">{selectedMP.totalFunds}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Total Funds</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-green-600">{selectedMP.completed}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Completed</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-orange-600">{selectedMP.delayed}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Delayed</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-red-600">{selectedMP.highRisk}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">High Risk</div>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                  <div className="text-[16px] font-black font-mono text-purple-600">{selectedMP.avgRiskScore}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Avg Risk Score</div>
                </div>
              </div>

              {/* Constituency Risk Score Gauge */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">Constituency Risk Score</span>
                  <span className="text-[14px] font-black font-mono" style={{ color: getRiskColor(selectedMP.riskLevel) }}>
                    {selectedMP.avgRiskScore}/100
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative" style={{ background: 'linear-gradient(to right, #4ade80, #facc15, #f97316, #ef4444)' }}>
                  <div className="absolute w-4 h-4 rounded-full bg-white border-2 shadow-sm" style={{ borderColor: getRiskColor(selectedMP.riskLevel), left: `calc(${selectedMP.avgRiskScore}% - 8px)`, top: '-2px' }} />
                </div>
                <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                  This score reflects project implementation risk in the constituency — not the MP's personal conduct or integrity.
                </p>
              </div>

              {/* Factor Breakdown */}
              <div>
                <h4 className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-3">Risk Factor Breakdown</h4>
                <div className="space-y-2.5">
                  {selectedMP.factors.map((factor, idx) => {
                    const totalScore = selectedMP.factors.reduce((sum, f) => sum + f.score, 0);
                    return (
                      <div key={idx}>
                        <div className="flex justify-between items-center text-[12px] mb-1">
                          <span className="font-semibold text-slate-800">{factor.label}</span>
                          <span className="font-black font-mono text-orange-600">+{factor.score}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-orange-500" style={{ width: `${(factor.score / totalScore) * 100}%` }} />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{factor.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Amber Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900">
                  This score reflects project implementation risk in the constituency — not the MP's personal conduct or integrity. Ratings require official verification.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorMPIntelligence;
