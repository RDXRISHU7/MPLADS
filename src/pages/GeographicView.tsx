import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import type { PageState, StateData, RiskLevel } from '../types';
import { stateData } from '../data/mockData';

interface GeographicViewProps {
  navigate: (state: PageState) => void;
}

const GeographicView: React.FC<GeographicViewProps> = ({ navigate }) => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [activeFilter, setActiveFilter] = useState<RiskLevel | 'all'>('all');

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'critical': return { dot: '#ef4444', border: '#fecaca', bg: '#fef2f2' };
      case 'high': return { dot: '#f97316', border: '#fed7aa', bg: '#fff7ed' };
      case 'medium': return { dot: '#f59e0b', border: '#fcd34d', bg: '#fffbeb' };
      case 'low': return { dot: '#22c55e', border: '#86efac', bg: '#f0fdf4' };
    }
  };

  // 7x6 grid layout for India tile map
  const gridLayout = [
    [null, null, 'J&K', null, null, 'AR'],
    ['PB', 'HP', 'UK', null, 'AS', 'NL'],
    ['HR', null, 'UP', 'BR', 'WB', 'MN'],
    ['RJ', null, 'MP', 'JH', 'OD', 'MZ'],
    ['GJ', 'MH', 'CG', 'TS', 'AP', null],
    [null, null, null, 'KA', null, null],
    [null, null, 'KL', 'TN', null, null]
  ];

  const getStateByAbbr = (abbr: string) => stateData.find(s => s.abbr === abbr);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-slate-900">MPLADS Risk Map</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">State-level risk distribution across India — click a state for details</p>
      </div>

      {/* Risk Filter Buttons */}
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
            activeFilter === 'all'
              ? 'bg-slate-700 text-white border-slate-700'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('critical')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
            activeFilter === 'critical'
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Critical
        </button>
        <button
          onClick={() => setActiveFilter('high')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
            activeFilter === 'high'
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          High
        </button>
        <button
          onClick={() => setActiveFilter('medium')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
            activeFilter === 'medium'
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Moderate
        </button>
        <button
          onClick={() => setActiveFilter('low')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
            activeFilter === 'low'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Low
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Tile Map */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[13.5px] font-semibold text-slate-800">India — State Risk Overview</h3>
            <div className="flex items-center gap-3">
              {['critical', 'high', 'medium', 'low'].map((level) => {
                const color = getRiskColor(level as RiskLevel);
                return (
                  <div key={level} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color.dot }} />
                    <span className="text-[11px] text-slate-600 capitalize">{level}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tile Grid */}
          <div className="space-y-2">
            {gridLayout.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2">
                {row.map((abbr, colIdx) => {
                  if (!abbr) {
                    return <div key={colIdx} className="w-20 h-12" />;
                  }
                  const state = getStateByAbbr(abbr);
                  if (!state) return null;

                  const colors = getRiskColor(state.risk);
                  const isSelected = selectedState?.abbr === abbr;
                  const isFiltered = activeFilter !== 'all' && state.risk !== activeFilter;

                  return (
                    <button
                      key={colIdx}
                      onClick={() => setSelectedState(isSelected ? null : state)}
                      className="w-20 h-12 flex-shrink-0 rounded-lg flex flex-col items-center justify-center border-2 transition-all"
                      style={{
                        borderColor: isSelected ? colors.dot : colors.border,
                        backgroundColor: isSelected ? colors.bg : 'white',
                        opacity: isFiltered ? 0.4 : 1,
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isSelected ? `0 0 0 3px ${colors.dot}22` : 'none'
                      }}
                    >
                      <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: colors.dot }} />
                      <span className="text-[11px] font-bold text-slate-700">{abbr}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 mt-6 text-center">
            Tile map — each cell represents a state. Illustrative Demo Data.
          </div>
        </div>

        {/* Detail Panel */}
        <div>
          {!selectedState ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 min-h-[400px] flex flex-col items-center justify-center">
              <MapPin className="w-10 h-10 text-slate-300 mb-3" />
              <h3 className="text-[14px] font-semibold text-slate-500 mb-2">Select a State</h3>
              <p className="text-[12.5px] text-slate-400 text-center max-w-[180px]">
                Click on any state tile to view detailed risk metrics and district breakdown
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border-2 overflow-hidden" style={{ borderColor: getRiskColor(selectedState.risk).dot }}>
              {/* Header */}
              <div className="px-5 py-4" style={{ backgroundColor: getRiskColor(selectedState.risk).bg }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: getRiskColor(selectedState.risk).dot }} />
                    <h3 className="text-[15px] font-bold text-slate-900">{selectedState.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: getRiskColor(selectedState.risk).bg,
                      borderColor: getRiskColor(selectedState.risk).border,
                      color: getRiskColor(selectedState.risk).dot
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getRiskColor(selectedState.risk).dot }} />
                    {selectedState.score} {selectedState.risk.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    District Overview
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                      <div className="text-[16px] font-black font-mono text-blue-600">{selectedState.projects}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Projects</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                      <div className="text-[16px] font-black font-mono text-red-600">{selectedState.highRisk}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">High Risk</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                      <div className="text-[16px] font-black font-mono text-orange-600">{selectedState.delayed}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Delayed</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                      <div className="text-[16px] font-black font-mono text-teal-600">{selectedState.funds}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Funds</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-slate-500">Risk Score</span>
                    <span className="text-[12px] font-bold font-mono" style={{ color: getRiskColor(selectedState.risk).dot }}>
                      {selectedState.score}/100
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${selectedState.score}%`,
                        backgroundColor: getRiskColor(selectedState.risk).dot
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate({ page: 'risk-alerts' })}
                  className="w-full px-3 py-2 rounded-lg bg-blue-700 text-white text-[12.5px] font-semibold hover:bg-blue-800"
                >
                  View Alerts for {selectedState.name}
                </button>
                <button
                  onClick={() => navigate({ page: 'projects' })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-[12.5px] font-semibold hover:bg-slate-50"
                >
                  View All Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeographicView;
