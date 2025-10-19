import { create } from 'zustand';
import { CurrentMedia } from '@shared/schema';

interface PlayerState {
  currentMedia: CurrentMedia | null;
  isPlaying: boolean;
  volume: number;
  setCurrentMedia: (media: CurrentMedia) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentMedia: null,
  isPlaying: false,
  volume: 0.5,
  setCurrentMedia: (media) => set({ currentMedia: media, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
}));
