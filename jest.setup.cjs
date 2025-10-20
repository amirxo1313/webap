import '@testing-library/jest-dom';

// Mock environment variables
process.env.ONE_API_TOKEN = '752295:68ef56c8bd6eb';
process.env.NODE_ENV = 'test';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock window.URL for downloads
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock fetch
global.fetch = jest.fn();

// Mock audio/video elements
global.HTMLMediaElement.prototype.load = jest.fn();
global.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
global.HTMLMediaElement.prototype.pause = jest.fn();
global.HTMLMediaElement.prototype.addTextTrack = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};