import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Film, Tv, BookmarkCheck, Settings, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from '../Logo';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Trending', icon: TrendingUp, path: '/trending' },
    { name: 'Movies', icon: Film, path: '/movies' },
    { name: 'TV Shows', icon: Tv, path: '/tv-shows' },
    { name: 'Saved', icon: BookmarkCheck, path: '/saved' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const NavContent = () => (
    <>
      <div className="flex items-center mb-8">
        <Logo />
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
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
        onClick={() => {
          setIsMobileMenuOpen(false);
          logout();
        }}
        className="flex items-center px-4 py-2 mt-auto w-full text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
      >
        <LogOut className="h-5 w-5 mr-3" />
        Logout
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen bg-card fixed left-0 top-0 border-r border-border p-4">
        <div className="flex flex-col w-full">
          <NavContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;