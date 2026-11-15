import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMovies } from '@/context/MoviesContext';

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movies, toggleSave } = useMovies();
  const router = useRouter();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: '#fff', padding: 20 }}>Film tapılmadı</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: movie.imageUrl }} style={styles.cover} />
        <SafeAreaView style={styles.topBar} edges={['top']}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.topTitle}>Movie Details</Text>
          <View style={{ width: 24 }} />
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{movie.name}</Text>
            <Pressable onPress={() => toggleSave(movie.id)} hitSlop={10}>
              <Ionicons
                name={movie.saved ? 'bookmark' : 'bookmark-outline'}
                size={26}
                color="#fff"
              />
            </Pressable>
          </View>

          <View style={styles.row}>
            {movie.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>⭐ {movie.imdbRating}</Text>
              <Text style={styles.statLabel}>IMDb</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>🍅 {movie.rotten}</Text>
              <Text style={styles.statLabel}>Rotten</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>🕒 {movie.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          </View>

          <Text style={styles.section}>Genre</Text>
          <View style={styles.row}>
            {movie.genre.map((g) => (
              <View key={g} style={styles.genre}>
                <Text style={styles.genreText}>{g}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.section}>Description</Text>
          <Text style={styles.desc}>{movie.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1B33' },
  cover: { width: '100%', height: 320, backgroundColor: '#222' },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 8,
  },
  topTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  body: { padding: 20, gap: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', flex: 1 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  tagText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  stat: { alignItems: 'center', gap: 4 },
  statVal: { color: '#fff', fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#9AA4BF', fontSize: 12 },
  section: { color: '#9AA4BF', fontSize: 15, marginTop: 8 },
  genre: { borderWidth: 1, borderColor: '#4B5A80', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  genreText: { color: '#fff', fontSize: 12 },
  desc: { color: '#CBD2E6', fontSize: 14, lineHeight: 21 },
});