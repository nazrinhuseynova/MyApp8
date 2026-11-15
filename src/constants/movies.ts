import { Movie } from '@/types/movie';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    name: 'Inception',
    description:
      'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a CEO.',
    imageUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    tags: ['2D', 'IMAX'],
    genre: ['Action', 'Sci-Fi'],
    imdbRating: 8.8,
    duration: '2h 28m',
    rotten: '87%',
    saved: false,
  },
  {
    id: '2',
    name: 'Interstellar',
    description:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
    imageUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    tags: ['2D', '3D', 'IMAX'],
    genre: ['Adventure', 'Drama'],
    imdbRating: 8.6,
    duration: '2h 49m',
    rotten: '72%',
    saved: false,
  },
  {
    id: '3',
    name: 'The Dark Knight',
    description:
      'Batman raises the stakes in his war on crime with the help of Lt. Gordon and Harvey Dent, but faces the Joker.',
    imageUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    tags: ['2D', 'IMAX', '4D'],
    genre: ['Action', 'Crime'],
    imdbRating: 9.0,
    duration: '2h 32m',
    rotten: '94%',
    saved: false,
  },
  {
    id: '4',
    name: 'Avatar',
    description:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following orders and protecting the world he feels is his home.',
    imageUrl: 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
    tags: ['2D', '3D', '4D'],
    genre: ['Adventure', 'Sci-Fi'],
    imdbRating: 7.9,
    duration: '2h 42m',
    rotten: '82%',
    saved: false,
  },
];