# Behimelobot - Persian Music Streaming Web App

## Overview

Behimelobot is a modern, dark-themed music streaming web application that integrates with Radio Javan's API via One-API. It allows users in Iran to search, stream, and download Persian music, videos, and podcasts without needing their own VPN.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching and caching
- **Zustand** for state management (player state)
- **Tailwind CSS** with custom purple neon theme
- **Shadcn UI** components
- **Lucide React** for icons

### Backend
- **Express.js** proxy server
- **Axios** for API requests
- **CORS** middleware

### Design
- Dark theme with purple (#270 95% 65%) neon accents
- Spotify-inspired UI with Persian aesthetics
- Fully responsive (mobile, tablet, desktop)
- Inter and Vazirmatn fonts for Latin and Persian text
- Montserrat for display/hero text

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx          # Main layout with header and footer
│   │   │   ├── MediaCard.tsx       # Reusable card for playlists/albums/artists
│   │   │   ├── TrackList.tsx       # Track listing with play/download
│   │   │   └── Player.tsx          # Bottom player bar with controls
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Home page with trending content
│   │   │   ├── Search.tsx          # Search results page
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── lib/
│   │   │   ├── playerStore.ts      # Zustand store for player state
│   │   │   └── queryClient.ts      # React Query configuration
│   │   ├── App.tsx                 # Main app with routing
│   │   └── index.css               # Global styles
│   └── index.html
├── server/
│   ├── routes.ts                   # API proxy routes
│   ├── storage.ts                  # Storage interface (unused in this app)
│   └── index.ts                    # Express server setup
├── shared/
│   └── schema.ts                   # TypeScript types and Zod schemas
├── design_guidelines.md            # Design system documentation
└── VPN_SETUP.md                    # VPN configuration guide for deployment
```

## Features

### Implemented
1. **Home Page** - Displays trending playlists, albums, and artists from Radio Javan
2. **Search** - Multi-category search (songs, albums, artists, playlists, videos, podcasts) with tabbed results
3. **Media Player** - HTML5 audio/video player with:
   - Play/pause controls
   - Progress bar with seek
   - Volume control with mute
   - Current track display with artwork
   - Download button
4. **Track Lists** - Interactive track listings with:
   - Play on click
   - Visual indicator for currently playing track
   - Download button per track
   - Hover effects
5. **Responsive Design** - Works on all screen sizes
6. **Dark Theme** - Purple neon accents on dark background

### API Endpoints (Backend Proxy)

All endpoints automatically inject the `one-api-token: 752295:68ef56c8bd6eb` header:

- `GET /api/radiojavan/home` - Get trending content
- `GET /api/radiojavan/search?q=query` - Search for content
- `GET /api/radiojavan/playlist/:id` - Get playlist details
- `GET /api/radiojavan/song/:id` - Get song details
- `GET /api/radiojavan/album/:id` - Get album details
- `GET /api/radiojavan/artist/:id` - Get artist details
- `GET /api/radiojavan/video/:id` - Get video details
- `GET /api/radiojavan/podcast/:id` - Get podcast details
- `GET /api/radiojavan/download?url=file_url` - Download media file
- `GET /api/health` - Health check endpoint

## Design System

### Colors
- **Background**: `0 0% 8%` (near-black)
- **Card**: `0 0% 12%` (elevated surface)
- **Primary**: `270 95% 65%` (purple neon)
- **Foreground**: `0 0% 98%` (white text)
- **Muted**: `270 8% 70%` (secondary text)

### Typography
- **Display**: Montserrat (headings, hero text)
- **Sans**: Inter/Vazirmatn (body text, UI)
- **Sizes**: 
  - Hero: 3xl-7xl
  - Section headers: 2xl-4xl
  - Body: base
  - Metadata: sm

### Effects
- **Neon glow**: `shadow-neon-purple` on interactive elements
- **Hover elevation**: Subtle scale and brightness on cards
- **Smooth transitions**: 200-300ms on all interactive elements

## Development

### Running Locally
```bash
npm install
npm run dev
```

App runs on `http://localhost:5000`

### Building for Production
```bash
npm run build
```

## Deployment

### Prerequisites
- VPS with Linux (Ubuntu/Debian)
- Node.js 20+
- Nginx
- WireGuard or OpenVPN for VPN tunnel

### Steps
1. **Setup VPN** - Follow `VPN_SETUP.md` to configure VPN routing
2. **Install dependencies** - `npm install --production`
3. **Build frontend** - `npm run build`
4. **Configure Nginx** - Setup reverse proxy with SSL
5. **Setup systemd** - Create service for auto-restart
6. **Configure environment** - Set `ONE_API_TOKEN` and `VPN_INTERFACE`

See `VPN_SETUP.md` for detailed deployment instructions.

## Environment Variables

- `ONE_API_TOKEN` - Radio Javan API token (hardcoded: 752295:68ef56c8bd6eb)
- `VPN_INTERFACE` - VPN network interface (e.g., wg0, tun0) - used in production
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)

## API Integration

### Radio Javan via One-API
- **Base URL**: `https://api.one-api.ir/radiojavan/v1`
- **Authentication**: Header `one-api-token: 752295:68ef56c8bd6eb`
- **Docs**: https://docs.one-api.ir/openapi/radiojavan

### VPN Routing
In production, all API requests to Radio Javan are routed through a VPN tunnel configured on the VPS. This allows users in Iran to access the service without their own VPN.

## User Experience

### Player Behavior
- Clicking a track/card starts playback immediately
- Player bar appears at bottom when media is loaded
- Progress bar allows seeking
- Volume control with mute toggle
- Download button streams file to user's device

### Search
- Real-time search as user types
- Tabbed results by category
- Empty state when no results
- Loading states during fetch

### Navigation
- Header with logo, search bar, and home button
- Footer with branding: "Product by amirxo 2025"
- Smooth page transitions

## Future Enhancements

1. **Mini-player** - Floating player that persists across pages
2. **Playlists** - User-created playlists with local storage
3. **Favorites** - Like/save songs
4. **History** - Recently played tracks
5. **RTL mode** - Persian language support with RTL layout
6. **Caching** - Redis for API response caching
7. **Queue** - Play queue with skip forward/back
8. **Lyrics** - Display lyrics when available
9. **Share** - Share songs/playlists
10. **Dark/Light toggle** - While dark is default, add light theme option

## Notes

- This app does not use a database; all data comes from Radio Javan API
- No user authentication required
- All media streaming is handled client-side via HTML5 audio/video elements
- Downloads are proxied through backend to handle CORS
- Designed for Persian music lovers and optimized for users in Iran
