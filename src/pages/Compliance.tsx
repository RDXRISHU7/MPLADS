import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Info, Filter } from 'lucide-react';
import type { PageState } from '../types';

interface ComplianceProps {
  navigate: (state: PageState) => void;
}

const Compliance: React.FC<ComplianceProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<'All' | 'Compliant' | 'Review Required' | 'Potential Deviation'>('All');

  const checks = [
    {
      pid: 'MP/KA/2024/4821',
      projectId: '4821',
      project: 'Community Hall at Village Halagur',
      activity: 'Second Installment Release',
      rule: 'MPLADS Guideline 3.4.1 (UC submission requirement)',
      result: 'Potential Deviation',
      note: 'Expenditure claimed without certified Utilization Certificate for Installment 1.'
    },
    {
      pid: 'MP/KA/2024/4821',
      projectId: '4821',
      project: 'Community Hall at Village Halagur',
      activity: 'Revised Estimate Approval',
      rule: 'MPLADS Guideline 4.2.2 (Cost ceiling limit)',
      result: 'Potential Deviation',
      note: 'Cost overrun exceeds 10% tolerance without Competent Authority approval.'
    },
    {
      pid: 'MP/BR/2024/1932',
      projectId: '1932',
      project: 'Drain Construction Work Gaya',
      activity: 'Worksite Inspection Record',
      rule: 'MPLADS Guideline 5.1.3 (Mandatory geo-tagging & inspection)',
      result: 'Review Required',
      note: 'Site inspection uploaded with low GPS accuracy (>50m variance).'
    },
    {
      pid: 'MP/AS/2024/7741',
      projectId: '7741',
      project: 'Rural Road Construction – Phase II',
      activity: 'Duplicate Work Verification',
      rule: 'MPLADS Guideline 2.1.4 (Prohibition of duplicate assets)',
      result: 'Potential Deviation',
      note: 'Similar asset recorded in PMGSY database within 1.2km radius.'
    },
    {
      pid: 'MP/MH/2024/5566',
      projectId: '5566',
      project: 'Water Supply Scheme, Ward 4',
      activity: 'Contractor Empanelment',
      rule: 'MPLADS Guideline 6.2.1 (Tendering process compliance)',
      result: 'Review Required',
      note: 'Single tender received; extension of bidding period not documented.'
    },
    {
      pid: 'MP/TN/2024/2233',
      projectId: '2233',
      project: 'Anganwadi Building Construction',
      activity: 'Land Availability Certificate',
      rule: 'MPLADS Guideline 2.3.1 (Land title & non-encumbrance)',
      result: 'Compliant',
      note: 'Clear government land title verified by Tehsildar.'
    },
    {
      pid: 'MP/RJ/2024/3312',
      projectId: '3312',
      project: 'Panchayat Ghar Renovation',
      activity: 'Final Measurement Book Entry',
      rule: 'MPLADS Guideline 5.3.2 (MB recording & verification)',
      result: 'Compliant',
      note: 'Junior Engineer & Executive Engineer sign-offs present.'
    },
    {
      pid: 'MP/UP/2024/6612',
      projectId: '6612',
      project: 'Primary Health Centre, Phulpur',
      activity: 'Asset Handover Certificate',
      rule: 'MPLADS Guideline 7.1.1 (Handover to user department)',
      result: 'Compliant',
      note: 'Handover to Chief Medical Officer completed.'
    },
    {
      pid: 'MP/GJ/2024/9910',
      projectId: '9910',
      project: 'Solarisation of Water Pump',
      activity: 'Environmental & Technical Audit',
      rule: 'MPLADS Guideline 3.8.4 (Renewable energy compliance)',
      result: 'Compliant',
      note: 'MNRE standards adherence certificate on file.'
    }
  ];

  const filteredChecks = checks.filter(item => {
    if (filter === 'All') return true;
    return item.result === filter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-slate-900">Automated Compliance Monitoring</h1>
        <p className="text-[13.5px] text-slate-500 mt-0.5">Rule-based checks against MPLADS guidelines and scheme requirements</p>
      </div>

      {/* SUMMARY CARDS (grid-cols-4) */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Total Checked</div>
              <div className="text-[20px] font-bold font-mono text-blue-700 mt-1">2,840</div>
              <div className="text-[10.5px] text-slate-400 mt-1">Automated rule evaluations</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Compliant</div>
              <div className="text-[20px] font-bold font-mono text-green-600 mt-1">2,603</div>
              <div className="text-[10.5px] text-slate-400 mt-1">91.6% adherence rate</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Review Required</div>
              <div className="text-[20px] font-bold font-mono text-amber-600 mt-1">184</div>
              <div className="text-[10.5px] text-slate-400 mt-1">Documentation gaps</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Potential Deviation</div>
              <div className="text-[20px] font-bold font-mono text-red-600 mt-1">53</div>
              <div className="text-[10.5px] text-slate-400 mt-1">Requires audit validation</div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Blue Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-3 text-blue-900 text-[12px]">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          Compliance signals are generated from configured MPLADS rules and reference data. They highlight items for administrative verification and do not represent formal audit disqualifications.
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400 mr-1" />
        {(['All', 'Compliant', 'Review Required', 'Potential Deviation'] as const).map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
              filter === btn
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Project</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Activity / Check</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Rule Reference</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Result</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecks.map((row, idx) => {
                const isDev = row.result === 'Potential Deviation';
                const isRev = row.result === 'Review Required';

                return (
                  <tr
                    key={idx}
                    onClick={() => navigate({ page: 'project-detail', projectId: row.projectId })}
                    className={`border-b border-slate-50 cursor-pointer transition-colors ${
                      isDev ? 'bg-red-50/30 hover:bg-red-50/50' : isRev ? 'bg-amber-50/20 hover:bg-amber-50/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="font-mono text-[12px] font-semibold text-blue-700">{row.pid}</div>
                      <div className="text-[11.5px] text-slate-600 truncate max-w-[180px]">{row.project}</div>
                    </td>
                    <td className="px-5 py-3 text-[12.5px] font-medium text-slate-800">{row.activity}</td>
                    <td className="px-5 py-3 text-[11.5px] text-slate-500 max-w-[220px]">{row.rule}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        row.result === 'Compliant' ? 'bg-green-50 text-green-700 border-green-200' :
                        row.result === 'Review Required' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {row.result === 'Compliant' && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                        {row.result === 'Review Required' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                        {row.result === 'Potential Deviation' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                        {row.result}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600 max-w-[240px]">{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-[11px] text-slate-400 border-t border-slate-100">
          Showing {filteredChecks.length} compliance evaluations · Illustrative Demo Data
        </div>
      </div>
    </div>
  );
};

export default Compliance;
