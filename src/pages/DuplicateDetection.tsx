import React, { useState } from 'react';
import { Copy, Shield, MapPin, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { PageState } from '../types';

interface DuplicateDetectionProps {
  navigate: (state: PageState) => void;
}

const DuplicateDetection: React.FC<DuplicateDetectionProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<'All' | 'Pending Review' | 'Flagged' | 'In Review' | 'Cleared'>('All');

  const [pairs, setPairs] = useState([
    {
      id: 'DUP-101',
      similarity: 94,
      note: 'Exact location & scope overlap within 1.2km radius',
      status: 'Flagged',
      coords: '26.4478° N, 92.0298° E (Distance: 1.2 km)',
      projectA: {
        id: '7741',
        pid: 'MP/AS/2024/7741',
        name: 'Rural Road Construction – Phase II',
        location: 'Darrang, Assam',
        sanctioned: '₹24,00,000',
        agency: 'PWD Assam (Rural Works)',
        date: '12 Jan 2024',
      },
      projectB: {
        id: '6623',
        pid: 'MP/AS/2024/6623',
        name: 'Kharupetia Link Road Upgrade',
        location: 'Darrang, Assam',
        sanctioned: '₹22,50,000',
        agency: 'Block Development Office',
        date: '08 Dec 2023',
      },
      breakdown: {
        description: 96,
        location: 98,
        activity: 92,
        timeProximity: 90,
      }
    },
    {
      id: 'DUP-102',
      similarity: 87,
      note: 'High similarity in community hall construction within same ward',
      status: 'Pending Review',
      coords: '12.5218° N, 77.0514° E (Distance: 2.1 km)',
      projectA: {
        id: '4821',
        pid: 'MP/KA/2024/4821',
        name: 'Community Hall at Village Halagur',
        location: 'Mandya, Karnataka',
        sanctioned: '₹12,00,000',
        agency: 'Gram Panchayat Halagur',
        date: '15 May 2023',
      },
      projectB: {
        id: '4890',
        pid: 'MP/KA/2023/4890',
        name: 'Halagur Multipurpose Social Hall',
        location: 'Mandya, Karnataka',
        sanctioned: '₹10,50,000',
        agency: 'Taluk Panchayat Malavalli',
        date: '18 Mar 2023',
      },
      breakdown: {
        description: 89,
        location: 88,
        activity: 91,
        timeProximity: 80,
      }
    },
    {
      id: 'DUP-103',
      similarity: 79,
      note: 'Drainage network overlap in adjoining wards',
      status: 'In Review',
      coords: '24.7914° N, 85.0002° E (Distance: 3.4 km)',
      projectA: {
        id: '1932',
        pid: 'MP/BR/2024/1932',
        name: 'Drain Construction Work Gaya',
        location: 'Gaya, Bihar',
        sanctioned: '₹8,50,000',
        agency: 'Municipal Corp Gaya',
        date: '22 Jun 2023',
      },
      projectB: {
        id: '1944',
        pid: 'MP/BR/2023/1944',
        name: 'Stormwater Drainage Ward 12 & 14',
        location: 'Gaya, Bihar',
        sanctioned: '₹9,20,000',
        agency: 'Urban Development Dept',
        date: '14 May 2023',
      },
      breakdown: {
        description: 78,
        location: 82,
        activity: 85,
        timeProximity: 71,
      }
    },
    {
      id: 'DUP-104',
      similarity: 71,
      note: 'Borewell & pump installation in nearby hamlets',
      status: 'Cleared',
      coords: '19.1383° N, 77.3210° E (Distance: 4.8 km)',
      projectA: {
        id: '5566',
        pid: 'MP/MH/2024/5566',
        name: 'Water Supply Scheme, Ward 4',
        location: 'Nanded, Maharashtra',
        sanctioned: '₹15,50,000',
        agency: 'MSEDCL & Zilla Parishad',
        date: '10 Aug 2023',
      },
      projectB: {
        id: '5580',
        pid: 'MP/MH/2023/5580',
        name: 'Solar Pumping System Ward 3-4',
        location: 'Nanded, Maharashtra',
        sanctioned: '₹14,00,000',
        agency: 'Rural Water Supply Div',
        date: '02 Jul 2023',
      },
      breakdown: {
        description: 72,
        location: 70,
        activity: 75,
        timeProximity: 67,
      }
    }
  ]);

  const getScoreColor = (val: number) => {
    if (val >= 90) return '#ef4444';
    if (val >= 80) return '#f97316';
    if (val >= 70) return '#f59e0b';
    return '#22c55e';
  };

  const handleFlag = (id: string) => {
    setPairs(prev => prev.map(p => p.id === id ? { ...p, status: 'Flagged' } : p));
  };

  const handleClear = (id: string) => {
    setPairs(prev => prev.map(p => p.id === id ? { ...p, status: 'Cleared' } : p));
  };

  const filteredPairs = pairs.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header & Stats */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">Potential Duplicate Works</h1>
          <p className="text-[13.5px] text-slate-500 mt-0.5">
            AI-detected similar works that may overlap in scope, location or timeline across schemes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-right">
            <span className="text-[11px] text-slate-500 uppercase font-medium block">Pairs Detected</span>
            <span className="font-mono font-bold text-[18px] text-purple-600">28 Pairs</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-right">
            <span className="text-[11px] text-slate-500 uppercase font-medium block">High Similarity</span>
            <span className="font-mono font-bold text-[18px] text-red-600">4 High</span>
          </div>
        </div>
      </div>

      {/* AMBER WARNING BANNER */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
        <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-[12px] text-amber-900">
          <strong>Decision-Support Notice:</strong> Duplicate detection flags works that are potentially overlapping using geospatial coordinates, work descriptions, and sanction dates. A high score suggests administrative review before fund sanction — it does not establish irregular claiming.
        </div>
      </div>

      {/* STATUS FILTER BUTTONS */}
      <div className="flex items-center gap-2">
        {(['All', 'Pending Review', 'Flagged', 'In Review', 'Cleared'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors ${
              filter === tab
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4 PAIR CARDS */}
      <div className="space-y-4">
        {filteredPairs.map((pair) => {
          const simColor = getScoreColor(pair.similarity);

          return (
            <div key={pair.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              {/* HEADER */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    <Copy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold font-mono" style={{ color: simColor }}>
                      Similarity: {pair.similarity}%
                    </span>
                    <span className="text-[12px] text-slate-500 ml-2">· {pair.note}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  pair.status === 'Flagged' ? 'bg-red-50 text-red-700 border-red-200' :
                  pair.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  pair.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {pair.status}
                </span>
              </div>

              {/* BODY */}
              <div className="p-5 space-y-4">
                {/* 2-column project comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Project A */}
                  <div className="rounded-xl border border-slate-200 p-4 relative bg-white">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center absolute top-3 right-3">
                      A
                    </div>
                    <div className="font-mono text-[12px] font-semibold text-blue-700 mb-1">{pair.projectA.pid}</div>
                    <h4 className="text-[13px] font-semibold text-slate-900 pr-8 mb-3">{pair.projectA.name}</h4>
                    <div className="space-y-1 text-[11.5px] text-slate-600">
                      <div><span className="text-slate-400">Location:</span> {pair.projectA.location}</div>
                      <div><span className="text-slate-400">Sanctioned:</span> <span className="font-mono font-medium text-slate-800">{pair.projectA.sanctioned}</span></div>
                      <div><span className="text-slate-400">Agency:</span> {pair.projectA.agency}</div>
                      <div><span className="text-slate-400">Sanction Date:</span> {pair.projectA.date}</div>
                    </div>
                  </div>

                  {/* Project B */}
                  <div className="rounded-xl border border-slate-200 p-4 relative bg-white">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center absolute top-3 right-3">
                      B
                    </div>
                    <div className="font-mono text-[12px] font-semibold text-purple-700 mb-1">{pair.projectB.pid}</div>
                    <h4 className="text-[13px] font-semibold text-slate-900 pr-8 mb-3">{pair.projectB.name}</h4>
                    <div className="space-y-1 text-[11.5px] text-slate-600">
                      <div><span className="text-slate-400">Location:</span> {pair.projectB.location}</div>
                      <div><span className="text-slate-400">Sanctioned:</span> <span className="font-mono font-medium text-slate-800">{pair.projectB.sanctioned}</span></div>
                      <div><span className="text-slate-400">Agency:</span> {pair.projectB.agency}</div>
                      <div><span className="text-slate-400">Sanction Date:</span> {pair.projectB.date}</div>
                    </div>
                  </div>
                </div>

                {/* SIMILARITY BREAKDOWN */}
                <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-4 border border-slate-100">
                  <div>
                    <div className="flex justify-between items-center text-[11.5px] mb-1">
                      <span className="text-slate-600">Description Semantic Match</span>
                      <span className="font-mono font-bold" style={{ color: getScoreColor(pair.breakdown.description) }}>
                        {pair.breakdown.description}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pair.breakdown.description}%`, backgroundColor: getScoreColor(pair.breakdown.description) }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11.5px] mb-1">
                      <span className="text-slate-600">Geospatial Proximity</span>
                      <span className="font-mono font-bold" style={{ color: getScoreColor(pair.breakdown.location) }}>
                        {pair.breakdown.location}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pair.breakdown.location}%`, backgroundColor: getScoreColor(pair.breakdown.location) }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11.5px] mb-1">
                      <span className="text-slate-600">Activity Code Overlap</span>
                      <span className="font-mono font-bold" style={{ color: getScoreColor(pair.breakdown.activity) }}>
                        {pair.breakdown.activity}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pair.breakdown.activity}%`, backgroundColor: getScoreColor(pair.breakdown.activity) }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11.5px] mb-1">
                      <span className="text-slate-600">Sanction Time Proximity</span>
                      <span className="font-mono font-bold" style={{ color: getScoreColor(pair.breakdown.timeProximity) }}>
                        {pair.breakdown.timeProximity}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pair.breakdown.timeProximity}%`, backgroundColor: getScoreColor(pair.breakdown.timeProximity) }} />
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS & LOCATION NOTE */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate({ page: 'project-detail', projectId: pair.projectA.id })}
                      className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-[12px] font-semibold hover:bg-blue-100 flex items-center gap-1"
                    >
                      View Project A
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate({ page: 'project-detail', projectId: pair.projectB.id === '6623' ? '4821' : pair.projectB.id })}
                      className="px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 text-[12px] font-semibold hover:bg-purple-100 flex items-center gap-1"
                    >
                      View Project B
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {pair.status !== 'Cleared' && (
                      <button
                        onClick={() => handleFlag(pair.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[12px] font-semibold hover:bg-red-700 flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Flag for Verification
                      </button>
                    )}

                    {pair.status === 'Flagged' && (
                      <button
                        onClick={() => handleClear(pair.id)}
                        className="px-3 py-1.5 rounded-lg border border-green-200 text-green-700 bg-green-50 text-[12px] font-semibold hover:bg-green-100 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark as Cleared
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{pair.coords}</span>
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

export default DuplicateDetection;
