import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  MapPin,
  Shield,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock
} from 'lucide-react';
import type { PageState } from '../types';
import { projects } from '../data/mockData';

interface ProjectDetailProps {
  projectId: string;
  navigate: (state: PageState) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, navigate }) => {
  const [isFlagged, setIsFlagged] = useState(false);
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center text-slate-500">Project not found</div>
      </div>
    );
  }


  const totalSignalScore = project.signals.reduce((sum, s) => sum + s.score, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate({ page: 'projects' })}
        className="flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">{project.pid}</span>
            <span className="text-slate-400">·</span>
            <span className="text-[12px] text-slate-500">{project.category}</span>
          </div>
          <h1 className="text-[20px] font-bold text-slate-900">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFlagged(!isFlagged)}
            className={`px-3 py-2 rounded-lg text-[12.5px] font-semibold border transition-colors ${
              isFlagged
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isFlagged ? 'Flagged' : 'Flag for Review'}
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 text-white text-[12.5px] font-semibold hover:bg-blue-800">
            <AlertTriangle className="w-4 h-4" />
            Create Alert
          </button>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Project Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[12.5px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Project Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400">State / District</div>
                  <div className="text-[12.5px] font-medium text-slate-800">{project.state} / {project.district}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400">Constituency</div>
                  <div className="text-[12.5px] font-medium text-slate-800">{project.constituency}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400">Member of Parliament</div>
                  <div className="text-[12.5px] font-medium text-slate-800">{project.mp}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400">Implementing Agency</div>
                  <div className="text-[12.5px] font-medium text-slate-800">{project.agency}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400">Sanction Date</div>
                  <div className="text-[12.5px] font-medium text-slate-800">{project.sanctionDate}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400">Expected Completion</div>
                  <div className="text-[12.5px] font-medium text-slate-800">{project.expectedCompletion}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[12.5px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Financial Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-600">Sanction Amount</span>
                <span className="text-[13px] font-bold font-mono text-slate-800">{project.sanctionAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-600">Total Expenditure</span>
                <span className="text-[13px] font-bold font-mono text-red-600">{project.expenditure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-600">Payment Released</span>
                <span className="text-[13px] font-bold font-mono text-orange-600">{project.paymentReleased}</span>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] text-slate-500">Physical Progress</span>
                <span className="text-[12px] font-bold font-mono text-amber-600">{project.progress}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1">Payment released: 135%</div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-slate-500 uppercase tracking-wider">Current Status</span>
              <span className="bg-orange-100 text-orange-700 border border-orange-200 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="space-y-4">
          {/* Risk Score */}
          <div className="bg-white rounded-xl border-2 border-red-200 p-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
              style={{ backgroundColor: '#ef4444', transform: 'translate(50%, -50%)' }}
            />
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">
                  AI Risk Score
                </div>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-[56px] font-black leading-none font-mono text-red-600">{project.riskScore}</span>
                  <span className="text-[18px] font-bold text-slate-400 mb-2">/100</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11.5px] font-bold px-3 py-1.5 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" />
                HIGH PRIORITY REVIEW
              </div>
            </div>

            {/* Risk Gradient Gauge */}
            <div className="mb-4">
              <div
                className="h-3 rounded-full overflow-hidden relative"
                style={{ background: 'linear-gradient(to right, #4ade80, #facc15, #f97316, #ef4444)' }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full bg-white border-2 border-red-600 shadow-sm"
                  style={{ left: `calc(${project.riskScore}% - 8px)`, top: '-2px' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-slate-400">Low</span>
                <span className="text-[10px] text-slate-400">Moderate</span>
                <span className="text-[10px] text-slate-400">High</span>
                <span className="text-[10px] text-slate-400">Critical</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 rounded-lg px-3 py-2 border border-red-100 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-slate-500">
                AI-generated risk signal. Final decision remains with authorized officials.
              </p>
            </div>
          </div>

          {/* Risk Factor Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[13.5px] font-semibold text-slate-800 mb-4">Risk Factor Breakdown</h3>
            <div className="space-y-3">
              {project.signals.map((signal, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: signal.color }} />
                      <span className="text-[12.5px] font-semibold text-slate-800">{signal.label}</span>
                    </div>
                    <span
                      className="text-[13px] font-black font-mono"
                      style={{ color: signal.color }}
                    >
                      +{signal.score}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(signal.score / totalSignalScore) * 100}%`,
                        backgroundColor: signal.color
                      }}
                    />
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed">{signal.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action */}
          <div className="bg-white rounded-xl border border-blue-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-[13px] font-semibold text-blue-800">Recommended Action</h3>
            </div>
            <p className="text-[12.5px] text-slate-700 leading-relaxed">
              Field verification recommended. Check measurement book, worksite status and payment justification before further fund release.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Why Flagged - Expandable */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setIsEvidenceExpanded(!isEvidenceExpanded)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="text-left">
                <h3 className="text-[13.5px] font-semibold text-slate-800">Why was this project flagged?</h3>
                <p className="text-[11.5px] text-slate-500 mt-0.5">Observed values vs reference benchmarks</p>
              </div>
              {isEvidenceExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>

            {isEvidenceExpanded && (
              <>
                <div className="border-t border-slate-100 divide-y divide-slate-50">
                  {project.evidence.map((item, idx) => (
                    <div key={idx} className="px-5 py-4">
                      <div className="text-[12.5px] font-semibold text-slate-800 mb-2">{item.item}</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-[11.5px] text-slate-400">Observed</div>
                          <div className="text-[13px] font-bold font-mono text-red-600 mt-0.5">{item.observed}</div>
                        </div>
                        <div>
                          <div className="text-[11.5px] text-slate-400">Reference</div>
                          <div className="text-[13px] font-bold font-mono text-slate-600 mt-0.5">{item.reference}</div>
                        </div>
                        <div>
                          <div className="text-[11.5px] text-slate-400">Deviation</div>
                          <div className="text-[13px] font-bold font-mono text-orange-600 mt-0.5">{item.deviation}</div>
                        </div>
                        <div>
                          <div className="text-[11.5px] text-slate-400">Confidence</div>
                          <div className="text-[13px] font-bold font-mono mt-0.5" style={{ color: '#0d9488' }}>
                            {item.confidence}%
                          </div>
                        </div>
                      </div>
                      <div className="text-[10.5px] text-slate-400 mt-2">Source: {item.source}</div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
                  <div className="text-[12px] font-semibold text-amber-800">Anomaly detected — manual verification recommended.</div>
                  <div className="text-[11px] text-amber-600 mt-0.5">This is a decision-support signal, not a finding of misconduct.</div>
                </div>

                <div className="px-5 py-3 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-[12.5px] font-medium text-blue-600 hover:text-blue-700">
                    <ExternalLink className="w-4 h-4" />
                    View supporting records
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Project Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[12.5px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Project Timeline
            </h3>
            <div className="space-y-0">
              {project.timeline.map((item, idx) => {
                const isLast = idx === project.timeline.length - 1;
                const colors = {
                  completed: { dot: '#22c55e', bg: '#f0fdf4', border: '#86efac', text: '#15803d' },
                  anomaly: { dot: '#ef4444', bg: '#fef2f2', border: '#fecaca', text: '#b91c1c' },
                  delayed: { dot: '#f59e0b', bg: '#fffbeb', border: '#fcd34d', text: '#92400e' },
                  pending: { dot: '#cbd5e1', bg: '#f8fafc', border: '#cbd5e1', text: '#64748b' }
                };
                const color = colors[item.state];

                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{
                          backgroundColor: color.dot,
                          boxShadow: `0 0 0 3px ${color.dot}22`
                        }}
                      />
                      {!isLast && (
                        <div
                          className="w-0.5 flex-1 mt-1"
                          style={{ backgroundColor: `${color.dot}30` }}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div
                        className="rounded-lg border px-3 py-2.5 mb-3"
                        style={{
                          backgroundColor: color.bg,
                          borderColor: color.border
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px] font-semibold" style={{ color: color.text }}>
                            {item.label}
                          </span>
                          <span
                            className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: color.dot,
                              color: 'white'
                            }}
                          >
                            {item.state}
                          </span>
                        </div>
                        <div className="text-[11.5px] text-slate-500">{item.date}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Risk Explanation */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563eb, #0d9488)' }}
              >
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-[13px] font-semibold text-slate-800">AI Risk Explanation</h3>
            </div>
            <div className="space-y-1.5">
              {project.signals.map((signal, idx) => {
                const severity = signal.score >= 22 ? 'High' : signal.score >= 15 ? 'Medium' : 'Low';
                const severityColor = signal.score >= 22 ? '#ef4444' : signal.score >= 15 ? '#f59e0b' : '#22c55e';
                return (
                  <div key={idx} className="flex justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: signal.color }} />
                      <span className="text-slate-700">{signal.label}</span>
                    </div>
                    <span className="font-semibold" style={{ color: severityColor }}>
                      {severity}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 mt-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-[11.5px] text-slate-500">Analysis generated: 02 May 2024, 09:41 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
