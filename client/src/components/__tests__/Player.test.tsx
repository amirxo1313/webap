import { render, screen, fireEvent } from '@testing-library/react';
import { Player } from '../Player';
import { usePlayerStore } from '@/lib/playerStore';

// Mock the player store
jest.mock('@/lib/playerStore');

const mockUsePlayerStore = usePlayerStore as jest.MockedFunction<typeof usePlayerStore>;

describe('Player Component', () => {
  beforeEach(() => {
    mockUsePlayerStore.mockReturnValue({
      currentMedia: null,
      isPlaying: false,
      volume: 0.5,
      togglePlay: jest.fn(),
      setVolume: jest.fn(),
      setCurrentMedia: jest.fn(),
    });
  });

  it('should not render when no media is selected', () => {
    render(<Player />);
    expect(screen.queryByTestId('button-play-pause')).not.toBeInTheDocument();
  });

  it('should render player controls when media is selected', () => {
    mockUsePlayerStore.mockReturnValue({
      currentMedia: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        type: 'song',
        link: 'http://example.com/song.mp3'
      },
      isPlaying: false,
      volume: 0.5,
      togglePlay: jest.fn(),
      setVolume: jest.fn(),
      setCurrentMedia: jest.fn(),
    });

    render(<Player />);
    
    expect(screen.getByTestId('button-play-pause')).toBeInTheDocument();
    expect(screen.getByTestId('text-player-title')).toHaveTextContent('Test Song');
    expect(screen.getByTestId('text-player-artist')).toHaveTextContent('Test Artist');
  });

  it('should toggle play/pause when play button is clicked', () => {
    const mockTogglePlay = jest.fn();
    
    mockUsePlayerStore.mockReturnValue({
      currentMedia: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        type: 'song',
        link: 'http://example.com/song.mp3'
      },
      isPlaying: false,
      volume: 0.5,
      togglePlay: mockTogglePlay,
      setVolume: jest.fn(),
      setCurrentMedia: jest.fn(),
    });

    render(<Player />);
    
    const playButton = screen.getByTestId('button-play-pause');
    fireEvent.click(playButton);
    
    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
  });

  it('should show pause icon when playing', () => {
    mockUsePlayerStore.mockReturnValue({
      currentMedia: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        type: 'song',
        link: 'http://example.com/song.mp3'
      },
      isPlaying: true,
      volume: 0.5,
      togglePlay: jest.fn(),
      setVolume: jest.fn(),
      setCurrentMedia: jest.fn(),
    });

    render(<Player />);
    
    const playButton = screen.getByTestId('button-play-pause');
    expect(playButton.querySelector('svg')).toHaveClass('lucide-pause');
  });
});