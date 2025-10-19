import { PlaylistItem } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Play, Music, Users } from "lucide-react";
import { usePlayerStore } from "@/lib/playerStore";

interface MediaCardProps {
  item: PlaylistItem;
  onClick?: () => void;
}

export function MediaCard({ item, onClick }: MediaCardProps) {
  const setCurrentMedia = usePlayerStore((state) => state.setCurrentMedia);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMedia({
      id: item.id,
      title: item.title,
      artist: item.artist || item.created_by,
      album: item.album,
      photo: item.photo || item.thumbnail,
      link: item.link,
      hq_link: item.hq_link,
      hls_link: item.hls_link,
      type: item.type === 'video' ? 'video' : item.type === 'podcast' ? 'podcast' : 'song',
      duration: item.duration,
    });
  };

  return (
    <Card
      className="group relative overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer"
      onClick={onClick}
      data-testid={`card-media-${item.id}`}
    >
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        {item.photo || item.thumbnail ? (
          <img
            src={item.photo || item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-card flex items-center justify-center">
            <Music className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePlay}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all transform translate-y-2 group-hover:translate-y-0 shadow-neon-purple"
            data-testid={`button-play-${item.id}`}
          >
            <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-foreground truncate mb-1"
          data-testid={`text-title-${item.id}`}
        >
          {item.title}
        </h3>
        {(item.artist || item.created_by || item.caption) && (
          <p className="text-sm text-muted-foreground truncate">
            {item.artist || item.created_by || item.caption}
          </p>
        )}
        {item.followers !== undefined && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{item.followers.toLocaleString()} followers</span>
          </div>
        )}
      </div>
    </Card>
  );
}
