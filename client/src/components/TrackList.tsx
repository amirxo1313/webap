import { PlaylistItem } from "@shared/schema";
import { Play, Download, Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/lib/playerStore";
import { useState } from "react";

interface TrackListProps {
  tracks: PlaylistItem[];
}

export function TrackList({ tracks }: TrackListProps) {
  const { currentMedia, isPlaying, setCurrentMedia, togglePlay } = usePlayerStore();

  const handleDownload = async (track: PlaylistItem) => {
    const downloadUrl = track.hq_link || track.link;
    if (!downloadUrl) return;

    try {
      const response = await fetch(`/api/radiojavan/download?url=${encodeURIComponent(downloadUrl)}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${track.artist || 'Unknown'} - ${track.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return '';
    return duration;
  };

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isCurrentTrack = currentMedia?.id === track.id;
        const isTrackPlaying = isCurrentTrack && isPlaying;

        return (
          <div
            key={track.id}
            className={`group flex items-center gap-4 p-3 rounded-md hover-elevate transition-all ${
              isCurrentTrack ? 'bg-primary/10' : ''
            }`}
            data-testid={`track-${track.id}`}
          >
            <div className="w-8 text-center text-sm text-muted-foreground group-hover:opacity-0 transition-opacity">
              {isTrackPlaying ? (
                <div className="flex justify-center">
                  <div className="w-1 h-3 bg-primary animate-pulse mx-0.5"></div>
                  <div className="w-1 h-3 bg-primary animate-pulse mx-0.5 animation-delay-150"></div>
                  <div className="w-1 h-3 bg-primary animate-pulse mx-0.5 animation-delay-300"></div>
                </div>
              ) : (
                index + 1
              )}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity absolute left-3"
              onClick={() => {
                if (isCurrentTrack) {
                  togglePlay();
                } else {
                  setCurrentMedia({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    album: track.album,
                    photo: track.photo || track.thumbnail,
                    link: track.link,
                    hq_link: track.hq_link,
                    hls_link: track.hls_link,
                    type: track.type === 'video' ? 'video' : track.type === 'podcast' ? 'podcast' : 'song',
                    duration: track.duration,
                  });
                }
              }}
              data-testid={`button-play-track-${track.id}`}
            >
              {isTrackPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </Button>

            {(track.photo || track.thumbnail) && (
              <div className="w-10 h-10 flex-shrink-0">
                <img
                  src={track.photo || track.thumbnail}
                  alt={track.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div
                className={`font-medium truncate ${isCurrentTrack ? 'text-primary' : 'text-foreground'}`}
                data-testid={`text-track-title-${track.id}`}
              >
                {track.title}
              </div>
              {track.artist && (
                <div className="text-sm text-muted-foreground truncate">
                  {track.artist}
                </div>
              )}
            </div>

            {track.album && (
              <div className="hidden md:block flex-1 min-w-0 text-sm text-muted-foreground truncate">
                {track.album}
              </div>
            )}

            {track.duration && (
              <div className="text-sm text-muted-foreground tabular-nums">
                {formatDuration(track.duration)}
              </div>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity text-chart-3"
              onClick={() => handleDownload(track)}
              data-testid={`button-download-${track.id}`}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
