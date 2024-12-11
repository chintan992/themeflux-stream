import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Calendar, Film, History, BookmarkCheck, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Trending', icon: TrendingUp, path: '/trending' },
    { name: 'Schedule', icon: Calendar, path: '/schedule' },
    { name: 'Movies', icon: Film, path: '/movies' },
    { name: 'History', icon: History, path: '/history' },
    { name: 'Saved', icon: BookmarkCheck, path: '/saved' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-card fixed left-0 top-0 border-r border-border p-4">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Let's Stream</h1>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent/10"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => logout()}
        className="flex items-center px-4 py-2 mt-auto w-full text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
      >
        <LogOut className="h-5 w-5 mr-3" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;