import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search movies, TV shows..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="bg-muted/50 border border-border rounded-lg px-3 py-1.5"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="purple">Purple</option>
          </select>

          <button className="p-2 hover:bg-accent/10 rounded-full">
            <Bell className="h-5 w-5" />
          </button>

          <button className="p-2 hover:bg-accent/10 rounded-full">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;