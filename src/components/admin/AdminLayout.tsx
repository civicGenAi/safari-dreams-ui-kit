import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  Upload,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
      description: 'Overview & statistics'
    },
    {
      icon: Package,
      label: 'Packages',
      path: '/admin/packages',
      description: 'Manage tour packages'
    },
    {
      icon: Upload,
      label: 'Bulk Import',
      path: '/admin/bulk-import',
      description: 'Upload Word documents'
    },
    {
      icon: FileText,
      label: 'Articles',
      path: '/admin/articles',
      description: 'Manage Wild Tales blog'
    },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="font-display text-xl font-bold">DeMi Tours Admin</h1>
              <p className="text-xs text-muted-foreground">Package Management System</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] bg-white border-r
            transition-transform duration-300 z-40
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-64
          `}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-start gap-3 p-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`font-heading font-semibold ${isActive ? 'text-white' : ''}`}>
                      {item.label}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Help Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-muted/30">
            <div className="text-xs text-muted-foreground mb-2">Need Help?</div>
            <div className="text-xs space-y-1">
              <a href="/SETUP-INSTRUCTIONS.md" className="block hover:text-primary">
                📖 Setup Guide
              </a>
              <a href="#" className="block hover:text-primary">
                💬 Support
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30 top-[73px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
};
