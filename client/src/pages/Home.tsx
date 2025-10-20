import { useQuery } from "@tanstack/react-query";
import { HomeResponse } from "@shared/schema";
import { Layout } from "@/components/Layout";
import { MediaCard } from "@/components/MediaCard";
import { Music2, TrendingUp, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data, isLoading, error, refetch } = useQuery<HomeResponse>({
    queryKey: ['/api/radiojavan/home'],
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground" data-testid="text-loading">Loading trending music...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center max-w-md gradient-bg">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4 floating-animation" />
            <h2 className="text-xl font-semibold mb-2 neon-text">Unable to load content</h2>
            <p className="text-muted-foreground mb-4" data-testid="text-error">
              {error instanceof Error ? error.message : "Please check your connection and try again."}
            </p>
            <Button 
              onClick={() => refetch()} 
              className="gap-2 neon-glow-sm"
              variant="outline"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  const sections = data?.result?.sections || [];

  return (
    <Layout>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background pointer-events-none" style={{ height: '60vh' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="text-center mb-16 py-20">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Discover Persian Music
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stream and download the latest songs, albums, and playlists from Radio Javan
            </p>
          </div>

          <div className="space-y-16">
            {sections.map((section) => {
              if (section.type === 'header') {
                return (
                  <div key={section.id} className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold" data-testid={`text-section-${section.id}`}>
                      {section.title}
                    </h2>
                  </div>
                );
              }

              if (section.type === 'slider_square' && section.items && section.items.length > 0) {
                return (
                  <div key={section.id} className="space-y-6">
                    {section.title && (
                      <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid={`text-section-${section.id}`}>
                        {section.title}
                      </h2>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {section.items.map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {sections.length === 0 && (
            <div className="text-center py-20">
              <Music2 className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
              <p className="text-xl text-muted-foreground">No content available</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
