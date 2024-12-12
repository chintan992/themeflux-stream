import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Index from "./pages/Index";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";
import SearchResults from "./pages/SearchResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen bg-background text-foreground">
              <Sidebar />
              <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="mt-16 p-6 flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tv-shows" element={<TvShows />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/search" element={<SearchResults />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;