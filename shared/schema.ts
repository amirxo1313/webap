import { z } from "zod";

// Radio Javan API Response Types

export const playlistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  items_count: z.number().optional(),
  created_at: z.string().optional(),
  type: z.string(),
  subtype: z.string().optional(),
  share_link: z.string().optional(),
  count: z.number().optional(),
  followers: z.number().optional(),
  public: z.boolean().optional(),
  last_updated_at: z.string().optional(),
  bg_color: z.string().optional(),
  custom_photo: z.boolean().optional(),
  show_track_numbers: z.boolean().optional(),
  bg_colors: z.array(z.string()).optional(),
  desc: z.string().optional(),
  photo: z.string().optional(),
  thumbnail: z.string().optional(),
  photo_player: z.string().optional(),
  default_artwork: z.string().optional(),
  created_by: z.string().optional(),
  created_title: z.string().optional(),
  owner: z.object({
    display_name: z.string(),
    photo: z.string(),
    thumb: z.string(),
  }).optional(),
  caption: z.string().optional(),
  myplaylist: z.boolean().optional(),
  collab: z.boolean().optional(),
  artist: z.string().optional(),
  album: z.string().optional(),
  duration: z.string().optional(),
  plays: z.number().optional(),
  likes: z.number().optional(),
  downloads: z.number().optional(),
  link: z.string().optional(),
  hq_link: z.string().optional(),
  hls_link: z.string().optional(),
  photo_cover: z.string().optional(),
  name: z.string().optional(),
  follower_count: z.number().optional(),
  photo_thumb: z.string().optional(),
});

export const sectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string().optional(),
  show_link: z.boolean().optional(),
  items: z.array(playlistItemSchema).optional(),
});

export const homeResponseSchema = z.object({
  status: z.number(),
  result: z.object({
    sections: z.array(sectionSchema),
  }),
});

export const searchResponseSchema = z.object({
  status: z.number(),
  result: z.object({
    songs: z.array(playlistItemSchema).optional(),
    albums: z.array(playlistItemSchema).optional(),
    artists: z.array(playlistItemSchema).optional(),
    playlists: z.array(playlistItemSchema).optional(),
    videos: z.array(playlistItemSchema).optional(),
    podcasts: z.array(playlistItemSchema).optional(),
  }),
});

export const playlistDetailSchema = z.object({
  status: z.number(),
  result: z.object({
    playlist: playlistItemSchema,
    tracks: z.array(playlistItemSchema),
  }),
});

// Export types
export type PlaylistItem = z.infer<typeof playlistItemSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type HomeResponse = z.infer<typeof homeResponseSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type PlaylistDetail = z.infer<typeof playlistDetailSchema>;

// Media types for player
export type MediaType = 'song' | 'video' | 'podcast';

export interface CurrentMedia {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  photo?: string;
  link?: string;
  hq_link?: string;
  hls_link?: string;
  type: MediaType;
  duration?: string;
}
