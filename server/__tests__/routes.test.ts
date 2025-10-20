import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../routes';

// Mock axios
jest.mock('axios');
const axios = require('axios');

describe('API Routes', () => {
  let app: express.Express;
  let server: any;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    server = await registerRoutes(app);
    
    // Set up environment variable
    process.env.ONE_API_TOKEN = '752295:68ef56c8bd6eb';
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        service: 'Behimelobot API',
        token_configured: true,
      });
    });
  });

  describe('GET /api/radiojavan/home', () => {
    it('should return home data successfully', async () => {
      const mockData = {
        status: 200,
        result: {
          sections: [
            {
              id: '1',
              type: 'header',
              title: 'Trending',
            }
          ]
        }
      };

      axios.get.mockResolvedValue({ data: mockData });

      const response = await request(app)
        .get('/api/radiojavan/home')
        .expect(200);

      expect(response.body).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.one-api.ir/radiojavan/v1/home',
        expect.objectContaining({
          headers: {
            'accept': '*/*',
            'one-api-token': '752295:68ef56c8bd6eb',
          }
        })
      );
    });

    it('should handle API errors', async () => {
      axios.get.mockRejectedValue({
        response: { status: 500 },
        message: 'Internal server error'
      });

      const response = await request(app)
        .get('/api/radiojavan/home')
        .expect(500);

      expect(response.body).toEqual({
        status: 500,
        error: 'Failed to fetch home content',
        message: 'Internal server error',
      });
    });
  });

  describe('GET /api/radiojavan/search', () => {
    it('should search successfully with query', async () => {
      const mockData = {
        status: 200,
        result: {
          songs: [
            {
              id: '1',
              title: 'Test Song',
              artist: 'Test Artist'
            }
          ]
        }
      };

      axios.get.mockResolvedValue({ data: mockData });

      const response = await request(app)
        .get('/api/radiojavan/search?q=test')
        .expect(200);

      expect(response.body).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.one-api.ir/radiojavan/v1/search',
        expect.objectContaining({
          params: { q: 'test' }
        })
      );
    });

    it('should return error for missing query', async () => {
      const response = await request(app)
        .get('/api/radiojavan/search')
        .expect(400);

      expect(response.body).toEqual({
        status: 400,
        error: 'Search query is required',
      });
    });
  });

  describe('GET /api/radiojavan/download', () => {
    it('should return error for missing URL', async () => {
      const response = await request(app)
        .get('/api/radiojavan/download')
        .expect(400);

      expect(response.body).toEqual({
        status: 400,
        error: 'Download URL is required',
      });
    });
  });
});