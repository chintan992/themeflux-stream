import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { theme, setTheme, proxy, setProxy } = useTheme();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2"
          >
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
            <option value="purple">Purple Theme</option>
          </select>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Proxy Settings</h3>
          <input
            type="text"
            value={proxy}
            onChange={(e) => setProxy(e.target.value)}
            placeholder="Enter proxy URL (optional)"
            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;