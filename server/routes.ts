import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

const ONE_API_TOKEN = "752295:68ef56c8bd6eb";
const RADIO_JAVAN_BASE_URL = "https://api.one-api.ir/radiojavan/v1";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware for CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Helper function to make requests to Radio Javan API
  const makeRadioJavanRequest = async (endpoint: string, params: any = {}) => {
    try {
      const response = await axios.get(`${RADIO_JAVAN_BASE_URL}${endpoint}`, {
        headers: {
          'accept': '*/*',
          'one-api-token': ONE_API_TOKEN,
        },
        params,
        timeout: 30000,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Radio Javan API Error (${endpoint}):`, error.message);
      throw error;
    }
  };

  // Home endpoint - Get trending playlists and content
  app.get('/api/radiojavan/home', async (req, res) => {
    try {
      const data = await makeRadioJavanRequest('/home');
      res.json(data);
    } catch (error: any) {
      console.error('Home endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch home content',
        message: error.message,
      });
    }
  });

  // Search endpoint - Search for songs, albums, artists, playlists, videos, podcasts
  app.get('/api/radiojavan/search', async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          status: 400,
          error: 'Search query is required',
        });
      }

      const data = await makeRadioJavanRequest('/search', { q });
      res.json(data);
    } catch (error: any) {
      console.error('Search endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to search',
        message: error.message,
      });
    }
  });

  // Playlist details endpoint
  app.get('/api/radiojavan/playlist/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await makeRadioJavanRequest(`/playlist/${id}`);
      res.json(data);
    } catch (error: any) {
      console.error('Playlist endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch playlist',
        message: error.message,
      });
    }
  });

  // Song details endpoint
  app.get('/api/radiojavan/song/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await makeRadioJavanRequest(`/song/${id}`);
      res.json(data);
    } catch (error: any) {
      console.error('Song endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch song',
        message: error.message,
      });
    }
  });

  // Album details endpoint
  app.get('/api/radiojavan/album/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await makeRadioJavanRequest(`/album/${id}`);
      res.json(data);
    } catch (error: any) {
      console.error('Album endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch album',
        message: error.message,
      });
    }
  });

  // Artist details endpoint
  app.get('/api/radiojavan/artist/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await makeRadioJavanRequest(`/artist/${id}`);
      res.json(data);
    } catch (error: any) {
      console.error('Artist endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch artist',
        message: error.message,
      });
    }
  });

  // Video details endpoint
  app.get('/api/radiojavan/video/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await makeRadioJavanRequest(`/video/${id}`);
      res.json(data);
    } catch (error: any) {
      console.error('Video endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch video',
        message: error.message,
      });
    }
  });

  // Podcast details endpoint
  app.get('/api/radiojavan/podcast/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await makeRadioJavanRequest(`/podcast/${id}`);
      res.json(data);
    } catch (error: any) {
      console.error('Podcast endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to fetch podcast',
        message: error.message,
      });
    }
  });

  // Download proxy endpoint
  app.get('/api/radiojavan/download', async (req, res) => {
    try {
      const { url } = req.query;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({
          status: 400,
          error: 'Download URL is required',
        });
      }

      // Stream the file directly to the client
      const response = await axios.get(url, {
        responseType: 'stream',
        timeout: 60000,
      });

      // Set appropriate headers
      res.setHeader('Content-Type', response.headers['content-type'] || 'audio/mpeg');
      res.setHeader('Content-Disposition', 'attachment');
      
      // Pipe the stream
      response.data.pipe(res);
    } catch (error: any) {
      console.error('Download endpoint error:', error.message);
      res.status(error.response?.status || 500).json({
        status: error.response?.status || 500,
        error: 'Failed to download file',
        message: error.message,
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Behimelobot API',
      token_configured: !!ONE_API_TOKEN,
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
