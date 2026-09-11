import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import type { PageState, RiskLevel } from '../types';
import { RiskBadge } from '../components/RiskBadge';

interface ProjectsProps {
  navigate: (state: PageState) => void;
}

const Projects: React.FC<ProjectsProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const projectsList = [
    { id: '4821', pid: 'MP/KA/2024/4821', name: 'Community Hall at Village Halagur', category: 'Community Infra', location: 'Mandya, KA', sanctioned: '₹12,00,000', status: 'Delayed', risk: 87, level: 'critical' as RiskLevel },
    { id: '1932', pid: 'MP/BR/2024/1932', name: 'Drain Construction Work', category: 'Sanitation', location: 'Gaya, BR', sanctioned: '₹8,50,000', status: 'Delayed', risk: 84, level: 'critical' as RiskLevel },
    { id: '7741', pid: 'MP/AS/2024/7741', name: 'Rural Road Construction – Phase II', category: 'Roads', location: 'Darrang, AS', sanctioned: '₹24,00,000', status: 'In Progress', risk: 81, level: 'critical' as RiskLevel },
    { id: '5566', pid: 'MP/MH/2024/5566', name: 'Water Supply Scheme, Ward 4', category: 'Water Supply', location: 'Nanded, MH', sanctioned: '₹15,50,000', status: 'In Progress', risk: 74, level: 'high' as RiskLevel },
    { id: '2233', pid: 'MP/TN/2024/2233', name: 'Anganwadi Building Construction', category: 'Education', location: 'Tiruppur, TN', sanctioned: '₹7,20,000', status: 'In Progress', risk: 69, level: 'high' as RiskLevel },
    { id: '3312', pid: 'MP/RJ/2024/3312', name: 'Panchayat Ghar Renovation', category: 'Community Infra', location: 'Bhilwara, RJ', sanctioned: '₹9,00,000', status: 'Completed', risk: 22, level: 'low' as RiskLevel },
    { id: '6612', pid: 'MP/UP/2024/6612', name: 'Primary Health Centre, Phulpur', category: 'Healthcare', location: 'Prayagraj, UP', sanctioned: '₹18,00,000', status: 'Completed', risk: 18, level: 'low' as RiskLevel },
    { id: '8821', pid: 'MP/WB/2024/8821', name: 'Boat Jetty Construction', category: 'Connectivity', location: 'S 24 Parganas', sanctioned: '₹11,00,000', status: 'In Progress', risk: 45, level: 'medium' as RiskLevel },
    { id: '9910', pid: 'MP/GJ/2024/9910', name: 'Solarisation of Water Pump', category: 'Energy', location: 'Anand, GJ', sanctioned: '₹6,80,000', status: 'Completed', risk: 12, level: 'low' as RiskLevel },
    { id: '1102', pid: 'MP/MP/2024/1102', name: 'Check Dam Construction', category: 'Irrigation', location: 'Shivpuri, MP', sanctioned: '₹22,00,000', status: 'Delayed', risk: 62, level: 'high' as RiskLevel }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-slate-900">Projects</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">{projectsList.length} MPLADS works in your jurisdiction</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
          </div>
          <select className="text-[12px] border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-blue-400">
            <option>All States</option>
            <option>Karnataka</option>
            <option>Bihar</option>
            <option>Assam</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 hover:bg-slate-50">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100">
              <tr>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Project ID</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Work Description</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Category</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Location</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Sanctioned</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Status</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 text-left">Risk</th>
                <th className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate({ page: 'project-detail', projectId: project.id })}
                >
                  <td className="px-5 py-3">
                    <div className="font-mono text-[12.5px] font-semibold text-blue-700">{project.pid}</div>
                  </td>
                  <td className="px-5 py-3 text-[12.5px] text-slate-800">{project.name}</td>
                  <td className="px-5 py-3 text-[12px] text-slate-600">{project.category}</td>
                  <td className="px-5 py-3 text-[12px] text-slate-600">{project.location}</td>
                  <td className="px-5 py-3 text-[12.5px] font-mono text-slate-700">{project.sanctioned}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                      project.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                      project.status === 'Delayed' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <RiskBadge score={project.risk} level={project.level} />
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

        {/* Footer */}
        <div className="px-5 py-3 text-[11px] text-slate-400 border-t border-slate-100">
          Showing {projectsList.length} of 10 projects · Illustrative Demo Data
        </div>
      </div>
    </div>
  );
};

export default Projects;
