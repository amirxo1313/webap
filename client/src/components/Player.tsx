import { usePlayerStore } from "@/lib/playerStore";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";

export function Player() {
  const { currentMedia, isPlaying, togglePlay, volume, setVolume } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const mediaRef = currentMedia?.type === 'video' ? videoRef : audioRef;

  useEffect(() => {
    if (!mediaRef.current || !currentMedia) return;

    const media = mediaRef.current;
    const playUrl = currentMedia.hq_link || currentMedia.link || currentMedia.hls_link;

    if (playUrl) {
      media.src = playUrl;
      media.load();
      if (isPlaying) {
        media.play().catch(console.error);
      }
    }
  }, [currentMedia, mediaRef]);

  useEffect(() => {
    if (!mediaRef.current) return;

    const media = mediaRef.current;
    if (isPlaying) {
      media.play().catch(console.error);
    } else {
      media.pause();
    }
  }, [isPlaying, mediaRef]);

  useEffect(() => {
    if (!mediaRef.current) return;
    mediaRef.current.volume = volume;
  }, [volume, mediaRef]);

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return;
    const media = mediaRef.current;
    setCurrentTime(media.currentTime);
    setDuration(media.duration);
    setProgress((media.currentTime / media.duration) * 100);
  };

  const handleProgressChange = (value: number[]) => {
    if (!mediaRef.current) return;
    const media = mediaRef.current;
    const newTime = (value[0] / 100) * media.duration;
    media.currentTime = newTime;
    setProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.5);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = async () => {
    if (!currentMedia) return;
    const downloadUrl = currentMedia.hq_link || currentMedia.link;
    if (!downloadUrl) return;

    try {
      const response = await fetch(`/api/radiojavan/download?url=${encodeURIComponent(downloadUrl)}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentMedia.artist || 'Unknown'} - ${currentMedia.title}.${currentMedia.type === 'video' ? 'mp4' : 'mp3'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!currentMedia) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => togglePlay()}
        className="hidden"
      />
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => togglePlay()}
        className="hidden"
      />

      <div className="fixed bottom-14 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-card-border">
        <div className="absolute top-0 left-0 right-0 -translate-y-full">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="w-full cursor-pointer"
            data-testid="slider-progress"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                {currentMedia.photo ? (
                  <img
                    src={currentMedia.photo}
                    alt={currentMedia.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate" data-testid="text-player-title">
                  {currentMedia.title}
                </div>
                {currentMedia.artist && (
                  <div className="text-sm text-muted-foreground truncate" data-testid="text-player-artist">
                    {currentMedia.artist}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8"
                disabled
                data-testid="button-previous"
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                className="w-12 h-12 rounded-full shadow-neon-purple"
                onClick={togglePlay}
                data-testid="button-play-pause"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8"
                disabled
                data-testid="button-next"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              <span className="text-sm text-muted-foreground tabular-nums">
                {formatTime(currentTime)}
              </span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground tabular-nums">
                {formatTime(duration)}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-8 h-8"
                  onClick={toggleMute}
                  data-testid="button-mute"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.01}
                  className="w-24"
                  data-testid="slider-volume"
                />
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 text-chart-3"
                onClick={handleDownload}
                data-testid="button-download-player"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
