import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

type Theme = 'dark' | 'light' | 'purple';

interface UserPreferences {
  theme: Theme;
  proxy?: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  proxy: string;
  setProxy: (proxy: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>('dark');
  const [proxy, setProxyState] = useState<string>('');

  useEffect(() => {
    const loadPreferences = async () => {
      if (user) {
        const docRef = doc(db, 'userPreferences', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as UserPreferences;
          setThemeState(data.theme);
          setProxyState(data.proxy || '');
        }
      }
    };

    loadPreferences();
  }, [user]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    if (user) {
      const docRef = doc(db, 'userPreferences', user.uid);
      await setDoc(docRef, { theme: newTheme, proxy }, { merge: true });
    }
  };

  const setProxy = async (newProxy: string) => {
    setProxyState(newProxy);
    if (user) {
      const docRef = doc(db, 'userPreferences', user.uid);
      await setDoc(docRef, { theme, proxy: newProxy }, { merge: true });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, proxy, setProxy }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};