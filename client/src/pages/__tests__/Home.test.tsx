import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../Home';

// Mock the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const { useQuery } = require('@tanstack/react-query');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Home Page', () => {
  it('should show loading state', () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Home />, { wrapper: createWrapper() });
    
    expect(screen.getByTestId('text-loading')).toHaveTextContent('Loading trending music...');
  });

  it('should show error state', () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Network error'),
    });

    render(<Home />, { wrapper: createWrapper() });
    
    expect(screen.getByTestId('text-error')).toHaveTextContent('Please check your connection and try again.');
  });

  it('should render home content when data is loaded', () => {
    const mockData = {
      result: {
        sections: [
          {
            id: '1',
            type: 'header',
            title: 'Trending Now',
          },
          {
            id: '2',
            type: 'slider_square',
            title: 'Popular Songs',
            items: [
              {
                id: 'song1',
                title: 'Test Song',
                artist: 'Test Artist',
                photo: 'http://example.com/photo.jpg',
                type: 'song'
              }
            ]
          }
        ]
      }
    };

    useQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<Home />, { wrapper: createWrapper() });
    
    expect(screen.getByTestId('text-section-1')).toHaveTextContent('Trending Now');
    expect(screen.getByTestId('text-section-2')).toHaveTextContent('Popular Songs');
  });
});