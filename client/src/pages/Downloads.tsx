import { Layout } from "@/components/Layout";
import { Download, Music, Video, Podcast, Trash2, Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePlayerStore } from "@/lib/playerStore";
import { CurrentMedia } from "@shared/schema";

interface DownloadedItem {
  id: string;
  title: string;
  artist?: string;
  type: 'song' | 'video' | 'podcast';
  downloadedAt: string;
  fileSize?: string;
  localPath?: string;
  originalMedia: CurrentMedia;
}

export default function Downloads() {
  const [downloads, setDownloads] = useState<DownloadedItem[]>([]);
  const { currentMedia, isPlaying, setCurrentMedia, togglePlay } = usePlayerStore();

  useEffect(() => {
    // Load downloads from localStorage
    const savedDownloads = localStorage.getItem('behimelobot_downloads');
    if (savedDownloads) {
      try {
        setDownloads(JSON.parse(savedDownloads));
      } catch (error) {
        console.error('Failed to parse downloads from localStorage:', error);
      }
    }
  }, []);

  const handlePlay = (item: DownloadedItem) => {
    if (currentMedia?.id === item.id) {
      togglePlay();
    } else {
      setCurrentMedia(item.originalMedia);
    }
  };

  const handleDelete = (id: string) => {
    const updatedDownloads = downloads.filter(item => item.id !== id);
    setDownloads(updatedDownloads);
    localStorage.setItem('behimelobot_downloads', JSON.stringify(updatedDownloads));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'podcast':
        return Podcast;
      default:
        return Music;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-8 h-8 text-primary neon-glow-sm" />
            <h1 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text">
              Downloads
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your downloaded music, videos, and podcasts
          </p>
        </div>

        {downloads.length === 0 ? (
          <div className="text-center py-20">
            <div className="gradient-bg rounded-2xl p-12 max-w-md mx-auto">
              <Download className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50 floating-animation" />
              <h2 className="text-2xl font-display font-bold mb-4 text-foreground">
                No Downloads Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start downloading your favorite tracks to see them here
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {downloads.map((item) => {
              const IconComponent = getIcon(item.type);
              const isCurrentlyPlaying = currentMedia?.id === item.id && isPlaying;
              
              return (
                <Card key={item.id} className="p-4 hover:neon-glow-sm transition-all group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate group-hover:neon-text transition-all">
                          {item.title}
                        </h3>
                        {item.artist && (
                          <p className="text-sm text-muted-foreground truncate">
                            {item.artist}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Downloaded {formatDate(item.downloadedAt)}</span>
                          {item.fileSize && <span>{item.fileSize}</span>}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handlePlay(item)}
                        className="w-10 h-10 hover:neon-glow-sm transition-all"
                        data-testid={`button-play-${item.id}`}
                      >
                        {isCurrentlyPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 text-destructive hover:text-destructive-foreground hover:bg-destructive transition-all"
                        data-testid={`button-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {downloads.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {downloads.length} item{downloads.length !== 1 ? 's' : ''} downloaded
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}