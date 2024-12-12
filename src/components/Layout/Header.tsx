import React from 'react';
import { Search, Bell, User, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    purple: <Palette className="h-5 w-5" />,
  };

  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search movies, TV shows..."
              className="w-full h-12 pl-10 pr-4 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                {themeIcons[theme]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')} className="touch-active">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="touch-active">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('purple')} className="touch-active">
                <Palette className="mr-2 h-4 w-4" />
                Purple
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="h-12 w-12">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;