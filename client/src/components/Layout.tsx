import { Link, useLocation } from "wouter";
import { Search, Home, Music2, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <a className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-all group" data-testid="link-home">
                <Music2 className="w-8 h-8 text-primary group-hover:neon-glow-sm transition-all" />
                <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text">
                  Behimelobot
                </span>
              </a>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 md:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search songs, artists, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-card border-card-border rounded-full focus:ring-2 focus:ring-primary focus:neon-glow-sm transition-all"
                  data-testid="input-search"
                />
              </div>
            </form>

            <nav className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant={location === "/" ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 transition-all ${location === "/" ? "neon-glow-sm" : "hover:neon-glow-sm"}`}
                  data-testid="button-nav-home"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">Home</span>
                </Button>
              </Link>
              <Link href="/downloads">
                <Button
                  variant={location === "/downloads" ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 transition-all ${location === "/downloads" ? "neon-glow-sm" : "hover:neon-glow-sm"}`}
                  data-testid="button-nav-downloads"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">Downloads</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="text-center py-2 text-xs text-muted-foreground font-mono" data-testid="text-footer">
          <span className="bg-gradient-to-r from-primary/70 to-accent/70 bg-clip-text text-transparent">
            Product by amirxo 2025
          </span>
        </div>
      </footer>
    </div>
  );
}
