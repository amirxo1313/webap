# 🎵 Behimelobot - Persian Music Streaming Web App

A responsive, dark-themed, high-performance music web app for streaming, searching, and downloading multimedia content from Radio Javan through One-API.

![Behimelobot](https://img.shields.io/badge/Behimelobot-Music%20Streaming-purple?style=for-the-badge&logo=music)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-cyan?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🎯 Core Functionality
- **🔍 Advanced Search**: Search songs, albums, artists, podcasts, and videos
- **🎵 Media Streaming**: Play music and videos directly in the browser
- **📥 Download Support**: Download MP3/MP4 files with progress tracking
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🌙 Dark Theme**: Black background with purple/neon accents for immersive experience

### 🎨 User Experience
- **Modern UI**: Inspired by Spotify and SoundCloud with neon effects
- **Smooth Animations**: CSS transitions and Framer Motion animations
- **Floating Player**: Always-on media player with full controls
- **Downloads Manager**: Track and manage downloaded content
- **Real-time Progress**: Live download progress and media playback status

### ⚡ Performance & Quality
- **Caching System**: Smart caching for reduced API calls and faster loading
- **Error Handling**: Comprehensive error recovery and user feedback
- **Testing Coverage**: Unit and integration tests with Jest
- **Production Ready**: Docker deployment with Nginx reverse proxy

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for production deployment)

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/behimelobot.git
cd behimelobot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your One-API token
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5000`

### Environment Configuration

Create a `.env` file with the following variables:

```env
# One-API Configuration (Required)
ONE_API_TOKEN=752295:68ef56c8bd6eb

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Custom API Base URL
RADIO_JAVAN_BASE_URL=https://api.one-api.ir/radiojavan/v1
```

## 🏗️ Architecture

### Frontend Stack
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with full IntelliSense
- **TailwindCSS**: Utility-first CSS with custom dark theme
- **Zustand**: Lightweight state management for player controls
- **React Query**: Powerful data fetching with caching and error handling
- **Wouter**: Minimal routing library for SPA navigation

### Backend Stack
- **Node.js + Express**: RESTful API server with middleware support
- **Axios**: HTTP client for One-API integration
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Built-in protection against abuse
- **Caching**: In-memory caching for improved performance

### API Integration
- **One-API**: Radio Javan content provider
- **Automatic Headers**: `one-api-token` header injection
- **Error Recovery**: Fallback to cached data on API failures
- **Request Optimization**: Debounced searches and smart caching

## 📱 Pages & Components

### 🏠 Home Page
- Trending playlists and new releases
- Featured artists and popular content
- Responsive grid layout with hover effects
- Skeleton loading states

### 🔍 Search Page
- Multi-category search (songs, albums, artists, videos, podcasts)
- Debounced input for performance
- Real-time results with infinite scroll
- Advanced filtering options

### 📥 Downloads Page
- Downloaded content management
- Local storage persistence
- File size and download date tracking
- Play/delete actions for each item

### 🎵 Player Component
- HTML5 audio/video player
- Progress bar with seek functionality
- Volume control with mute toggle
- Download button with progress indication
- Responsive design for all screen sizes

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: API endpoints and data flow
- **Snapshot Tests**: UI component rendering
- **Error Scenarios**: Network failures and edge cases

### Test Files
```
client/src/components/__tests__/
├── Player.test.tsx
├── MediaCard.test.tsx
└── Layout.test.tsx

client/src/pages/__tests__/
├── Home.test.tsx
├── Search.test.tsx
└── Downloads.test.tsx

server/__tests__/
└── routes.test.ts
```

## 🚀 Production Deployment

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

2. **Check service status**
```bash
docker-compose ps
docker-compose logs -f
```

### VPS Deployment Script

For automated deployment on a Linux VPS:

```bash
chmod +x deploy.sh
./deploy.sh
```

The script will:
- Install Docker and Docker Compose
- Set up SSL certificates with Let's Encrypt
- Configure Nginx reverse proxy
- Start the application services
- Set up log rotation and monitoring

### Manual VPS Setup

1. **Update system and install dependencies**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx
```

2. **Clone and configure**
```bash
git clone https://github.com/your-username/behimelobot.git /opt/behimelobot
cd /opt/behimelobot
cp .env.example .env
# Edit .env with production values
```

3. **Set up SSL certificate**
```bash
sudo certbot --nginx -d yourdomain.com
```

4. **Start services**
```bash
docker-compose up -d
```

## 🔧 Configuration

### Nginx Configuration
- HTTPS redirect and SSL termination
- Rate limiting for API endpoints
- Static file caching
- Security headers
- Gzip compression

### Docker Configuration
- Multi-stage build for optimization
- Non-root user for security
- Health checks for monitoring
- Volume mounts for persistence

### Security Features
- CORS configuration
- Rate limiting
- Input validation
- Secure headers
- SSL/TLS encryption

## 📊 Performance Optimizations

### Frontend Optimizations
- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: Lazy loading and responsive images
- **Caching**: React Query with smart cache invalidation
- **Debouncing**: Search input debouncing to reduce API calls
- **Memoization**: React.memo for expensive components

### Backend Optimizations
- **Response Caching**: In-memory cache with TTL
- **Request Deduplication**: Prevent duplicate API calls
- **Compression**: Gzip compression for responses
- **Connection Pooling**: Efficient HTTP client configuration

### Network Optimizations
- **CDN Ready**: Static assets optimized for CDN delivery
- **HTTP/2**: Modern protocol support
- **Keep-Alive**: Persistent connections
- **Prefetching**: Critical resource preloading

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run test suite
npm run check        # TypeScript type checking
```

### Project Structure
```
behimelobot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── lib/           # Utilities and stores
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server
│   ├── routes.ts          # API route definitions
│   └── index.ts           # Server entry point
├── shared/                # Shared TypeScript schemas
├── docker-compose.yml     # Docker services configuration
├── Dockerfile            # Container build instructions
├── nginx.conf            # Nginx reverse proxy config
└── deploy.sh             # Automated deployment script
```

### Code Style
- **ESLint + Prettier**: Automated code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages
- **Component Documentation**: JSDoc comments for complex logic

## 🔌 API Endpoints

### Radio Javan Integration
All endpoints are proxied through `/api/radiojavan/`:

- `GET /api/radiojavan/home` - Get trending content
- `GET /api/radiojavan/search?q={query}` - Search content
- `GET /api/radiojavan/playlist/{id}` - Get playlist details
- `GET /api/radiojavan/song/{id}` - Get song details
- `GET /api/radiojavan/album/{id}` - Get album details
- `GET /api/radiojavan/artist/{id}` - Get artist details
- `GET /api/radiojavan/video/{id}` - Get video details
- `GET /api/radiojavan/podcast/{id}` - Get podcast details
- `GET /api/radiojavan/download?url={url}` - Download media file

### Health Check
- `GET /api/health` - Service health and configuration status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write tests for new features
- Follow TypeScript best practices
- Use semantic commit messages
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radio Javan**: Content provider and music platform
- **One-API**: API integration service
- **React Community**: Amazing ecosystem and tools
- **TailwindCSS**: Beautiful utility-first CSS framework
- **Open Source Community**: All the amazing libraries used

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/behimelobot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/behimelobot/discussions)
- **Email**: support@behimelobot.com

---

<div align="center">

**🎵 Behimelobot - Discover Persian Music 🎵**

*Product by amirxo 2025*

[![GitHub stars](https://img.shields.io/github/stars/your-username/behimelobot?style=social)](https://github.com/your-username/behimelobot/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/behimelobot?style=social)](https://github.com/your-username/behimelobot/network/members)

</div>