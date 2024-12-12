import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Sun, Moon, Palette, Filter } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [year, setYear] = useState('');

  const themeIcons = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    purple: <Palette className="h-5 w-5" />,
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        q: searchQuery,
        type: mediaType,
        ...(year && { year }),
      });
      navigate(`/search?${params.toString()}`);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 50 },
    (_, i) => currentYear - i
  );

  return (
    <header className="h-16 fixed top-0 right-0 left-0 md:left-64 bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows..."
                className="w-full h-12 pl-10 pr-4 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Advanced Search</SheetTitle>
                  <SheetDescription>
                    Refine your search with additional filters
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Media Type</label>
                    <Select value={mediaType} onValueChange={setMediaType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="movie">Movies</SelectItem>
                        <SelectItem value="tv">TV Shows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any year</SelectItem>
                        {years.map((y) => (
                          <SelectItem key={y} value={y.toString()}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </form>
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