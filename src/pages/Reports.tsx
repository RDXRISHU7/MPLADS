import React, { useState } from 'react';
import { AlertTriangle, FileText, CheckCircle2, FileSpreadsheet, Download, Loader2 } from 'lucide-react';
import type { PageState } from '../types';

interface ReportsProps {
  navigate: (state: PageState) => void;
}

const Reports: React.FC<ReportsProps> = ({ navigate: _navigate }) => {
  const [generatingReports, setGeneratingReports] = useState<Set<string>>(new Set());
  const [generatedReports, setGeneratedReports] = useState<Set<string>>(new Set());

  const handleGenerate = (reportId: string) => {
    setGeneratingReports(prev => new Set([...prev, reportId]));
    setTimeout(() => {
      setGeneratingReports(prev => {
        const next = new Set(prev);
        next.delete(reportId);
        return next;
      });
      setGeneratedReports(prev => new Set([...prev, reportId]));
    }, 1800);
  };

  const reportTypes = [
    {
      id: 'project-risk',
      title: 'Project Risk Report',
      description: 'Comprehensive risk analysis with AI-detected anomalies, evidence and recommended actions for flagged projects',
      icon: AlertTriangle,
      iconColor: '#dc2626',
      iconBg: '#fef2f2',
      formats: ['PDF', 'CSV'],
      lastGenerated: '02 May 2024',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'district-risk',
      title: 'District Risk Summary',
      description: 'State and district-level risk aggregation with top high-risk constituencies and trend analysis',
      icon: FileText,
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      formats: ['PDF', 'CSV'],
      lastGenerated: '01 May 2024',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'constituency',
      title: 'Constituency Monitoring',
      description: 'MP-wise and constituency-wise project portfolio summary with completion rates and fund utilization metrics',
      icon: FileText,
      iconColor: '#7c3aed',
      iconBg: '#f5f3ff',
      formats: ['PDF', 'CSV'],
      lastGenerated: '30 Apr 2024',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'expenditure',
      title: 'Expenditure Analysis',
      description: 'Financial monitoring report with spending anomalies, category breakdown and cost deviation analysis',
      icon: FileSpreadsheet,
      iconColor: '#0d9488',
      iconBg: '#f0fdfa',
      formats: ['PDF', 'CSV', 'XLS'],
      lastGenerated: '30 Apr 2024',
      buttonColor: 'bg-teal-600 hover:bg-teal-700'
    },
    {
      id: 'compliance',
      title: 'Compliance Report',
      description: 'Rule-based compliance checks against MPLADS guidelines with deviation flags and review recommendations',
      icon: CheckCircle2,
      iconColor: '#16a34a',
      iconBg: '#f0fdf4',
      formats: ['PDF'],
      lastGenerated: '28 Apr 2024',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'alert-summary',
      title: 'Alert Summary',
      description: 'Consolidated risk alerts with investigation status, assigned officers and resolution timelines',
      icon: AlertTriangle,
      iconColor: '#d97706',
      iconBg: '#fffbeb',
      formats: ['PDF', 'CSV'],
      lastGenerated: '02 May 2024',
      buttonColor: 'bg-amber-600 hover:bg-amber-700'
    }
  ];

  const recentReports = [
    { name: 'High-Risk Projects Q1 2024', generated: '02 May 2024, 10:42 AM', format: 'PDF', size: '2.4 MB' },
    { name: 'Expenditure Analysis Apr 2024', generated: '30 Apr 2024, 3:28 PM', format: 'CSV', size: '845 KB' },
    { name: 'District Risk Summary Karnataka', generated: '28 Apr 2024, 11:15 AM', format: 'PDF', size: '1.8 MB' },
    { name: 'Compliance Deviation Report', generated: '25 Apr 2024, 9:05 AM', format: 'PDF', size: '3.1 MB' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-slate-900">Report Generation</h1>
        <p className="text-[13.5px] text-slate-500 mt-0.5">Generate and export standardized monitoring reports for official use</p>
      </div>

      {/* SCOPE SELECTOR CARD */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-[13px] font-semibold text-slate-800 mb-3">Report Scope</h3>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">Level</label>
            <select className="w-full text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
              <option>National</option>
              <option>State</option>
              <option>District</option>
              <option>Constituency</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">State</label>
            <select className="w-full text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
              <option>All States</option>
              <option>Karnataka</option>
              <option>Bihar</option>
              <option>Assam</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">District</label>
            <select className="w-full text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
              <option>All Districts</option>
              <option>Mandya</option>
              <option>Gaya</option>
              <option>Darrang</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">Financial Year</label>
            <select className="w-full text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
              <option>FY 2023-24</option>
              <option>FY 2022-23</option>
              <option>FY 2021-22</option>
            </select>
          </div>
        </div>
      </div>

      {/* REPORT TYPE CARDS (grid-cols-2 gap-4) */}
      <div className="grid grid-cols-2 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          const isGenerating = generatingReports.has(report.id);
          const isGenerated = generatedReports.has(report.id);

          return (
            <div key={report.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: report.iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: report.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-900">{report.title}</h3>
                  <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">{report.description}</p>
                </div>
              </div>

              {/* Last Generated */}
              <div className="text-[11px] text-slate-400 mb-3">
                Last generated: {report.lastGenerated}
              </div>

              {/* Footer Actions */}
              <div className="border-t border-slate-100 pt-4 mt-4 flex items-center gap-2">
                {!isGenerated ? (
                  <button
                    onClick={() => handleGenerate(report.id)}
                    disabled={isGenerating}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-[12px] font-semibold transition-colors cursor-pointer ${
                      isGenerating ? 'bg-slate-400 cursor-not-allowed' : report.buttonColor
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Report'
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-[12px] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Ready to Download
                  </div>
                )}

                {isGenerated && (
                  <>
                    {report.formats.map((format) => (
                      <button
                        key={format}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-[12px] font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {format}
                      </button>
                    ))}
                  </>
                )}

                {!isGenerated && !isGenerating && (
                  report.formats.map((format) => (
                    <button
                      key={format}
                      disabled
                      className="px-3 py-2 rounded-lg border border-slate-200 text-slate-400 text-[12px] font-semibold cursor-not-allowed"
                    >
                      {format}
                    </button>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT REPORTS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-[13.5px] font-semibold text-slate-800">Recent Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Report Name</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Generated On</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Format</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Size</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Status</th>
                <th className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Download</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-[12.5px] font-medium text-slate-800">{report.name}</td>
                  <td className="px-5 py-3 text-[12px] text-slate-600">{report.generated}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                      report.format === 'PDF' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {report.format}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[12px] font-mono text-slate-600">{report.size}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      Ready
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-[11.5px] font-semibold hover:bg-blue-100 cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-[11px] text-slate-400 border-t border-slate-100">
          Showing {recentReports.length} recent reports · Illustrative Demo Data
        </div>
      </div>
    </div>
  );
};

export default Reports;
