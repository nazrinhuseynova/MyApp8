export type Movie = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: ('2D' | '3D' | 'IMAX' | '4D')[];
  genre: string[];
  imdbRating: number;
  duration: string; 
  rotten: string;
  saved: boolean;
};