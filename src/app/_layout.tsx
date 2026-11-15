import { Stack } from 'expo-router';
import { MoviesProvider } from '@/context/MoviesContext';

export default function RootLayout() {
  return (
    <MoviesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[id]" />
      </Stack>
    </MoviesProvider>
  );
}