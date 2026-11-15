import { FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMovies } from '@/context/MoviesContext';
import MovieCard from '@/components/MovieCard';

export default function Saved() {
  const { movies } = useMovies();
  const router = useRouter();
  const saved = movies.filter((m) => m.saved);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Saved Movies</Text>
      <FlatList
        data={saved}
        keyExtractor={(m) => m.id}
        ListEmptyComponent={<Text style={styles.empty}>Hələ saxlanmış film yoxdur</Text>}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            showBookmark
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
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});