import React, { createContext, useContext, useState } from 'react';
import { Movie } from '@/types/movie';
import { INITIAL_MOVIES } from '@/constants/movies';

type Ctx = {
  movies: Movie[];
  toggleSave: (id: string) => void;
  addMovie: (movie: Omit<Movie, 'id' | 'saved'>) => void;
};

const MoviesContext = createContext<Ctx | null>(null);

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);

  const toggleSave = (id: string) =>
    setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, saved: !m.saved } : m)));

  const addMovie = (movie: Omit<Movie, 'id' | 'saved'>) =>
    setMovies((prev) => [{ ...movie, id: Date.now().toString(), saved: false }, ...prev]);

  return (
    <MoviesContext.Provider value={{ movies, toggleSave, addMovie }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error('useMovies must be used inside MoviesProvider');
  return ctx;
}