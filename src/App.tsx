import { useState } from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  AlertTriangle,
  BarChart2,
  ShieldCheck,
  Copy,
  TrendingUp,
  Map,
  Users,
  FileText,
  Shield,
  HelpCircle,
  User as UserIcon,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';
import type { PageState } from './types';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import RiskAlerts from './pages/RiskAlerts';
import Expenditure from './pages/Expenditure';
import Compliance from './pages/Compliance';
import DuplicateDetection from './pages/DuplicateDetection';
import Analytics from './pages/Analytics';
import GeographicView from './pages/GeographicView';
import VendorMPIntelligence from './pages/VendorMPIntelligence';
import Reports from './pages/Reports';

function App() {
  const [pageState, setPageState] = useState<PageState>({ page: 'overview' });

  const navigate = (newState: PageState) => {
    setPageState(newState);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'risk-alerts', label: 'Risk Alerts', icon: AlertTriangle, badge: 42 },
    { id: 'expenditure', label: 'Expenditure', icon: BarChart2 },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
    { id: 'duplicate', label: 'Duplicate Detection', icon: Copy, badge: 28 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'geographic', label: 'Geographic View', icon: Map },
    { id: 'vendors-mp', label: 'Vendors & MPs', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const currentPage = pageState.page;

  const renderPage = () => {
    switch (pageState.page) {
      case 'overview':
        return <Dashboard navigate={navigate} />;
      case 'projects':
        return <Projects navigate={navigate} />;
      case 'project-detail':
        return <ProjectDetail projectId={pageState.projectId} navigate={navigate} />;
      case 'risk-alerts':
        return <RiskAlerts navigate={navigate} />;
      case 'expenditure':
        return <Expenditure navigate={navigate} />;
      case 'compliance':
        return <Compliance navigate={navigate} />;
      case 'duplicate':
        return <DuplicateDetection navigate={navigate} />;
      case 'analytics':
        return <Analytics navigate={navigate} />;
      case 'geographic':
        return <GeographicView navigate={navigate} />;
      case 'vendors-mp':
        return <VendorMPIntelligence navigate={navigate} />;
      case 'reports':
        return <Reports navigate={navigate} />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-row h-full overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col h-full" style={{ backgroundColor: '#0d1f4c' }}>
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563eb, #0d9488)' }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-white">MPLAD Sentinel</div>
              <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                AI Risk Intelligence
              </div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate({ page: item.id as any })}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: isActive ? 'rgba(37,99,235,0.25)' : 'transparent',
                  borderLeft: isActive ? '3px solid #60a5fa' : '3px solid transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)'
                }}
              >
                <Icon
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.45)' }}
                />
                <span className="text-[13px] font-medium flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(239,68,68,0.25)', color: '#fca5a5' }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Role Card */}
        <div className="px-3 pb-3">
          <div
            className="rounded-lg px-3 py-2.5 border"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Logged in as
            </div>
            <div className="text-white font-semibold text-[13px]">District Authority</div>
            <div className="text-[10.5px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Mandya, Karnataka
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="border-t py-3 px-3 space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] hover:text-white transition-colors cursor-pointer" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <HelpCircle className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.45)' }} />
            Help & Documentation
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] hover:text-white transition-colors cursor-pointer" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <UserIcon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.45)' }} />
            User Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] hover:text-white transition-colors cursor-pointer" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Settings className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.45)' }} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors cursor-pointer hover:bg-red-500/10" style={{ color: 'rgba(239,68,68,0.6)' }}>
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="flex-shrink-0 flex items-center gap-4 px-6 py-3 bg-white border-b border-slate-200 shadow-sm">
          {/* Search */}
          <div className="relative max-w-lg flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, MPs, constituencies..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12.5px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Demo Badge */}
            <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[10.5px] font-semibold px-2 py-1 rounded-full">
              DEMO DATA
            </span>

            {/* Notifications */}
            <button
              onClick={() => navigate({ page: 'risk-alerts' })}
              className="relative p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                7
              </span>
            </button>

            {/* Role Selector */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] bg-blue-50 text-blue-700 border border-blue-200 cursor-pointer">
              <Shield className="w-4 h-4" />
              District Authority
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d9488)' }}
              >
                DA
              </div>
              <div>
                <div className="text-[12.5px] font-semibold text-slate-800">District Admin</div>
                <div className="text-[10.5px] text-slate-500">Mandya, KA</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
