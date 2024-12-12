import React from 'react';
import { PlayCircle } from 'lucide-react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PlayCircle className="h-8 w-8 text-primary animate-pulse" />
      <span className="font-bold text-xl">Let's Stream</span>
    </div>
  );
};

export default Logo;