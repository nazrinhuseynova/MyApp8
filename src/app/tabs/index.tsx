import { FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMovies } from '@/context/MoviesContext';
import MovieCard from '@/components/MovieCard';

export default function Home() {
  const { movies } = useMovies();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { fontSize: 26, fontWeight: '800', marginVertical: 12 },
});