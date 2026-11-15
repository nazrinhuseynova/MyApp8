import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
  onPress: () => void;
  showBookmark?: boolean;
};

export default function MovieCard({ movie, onPress, showBookmark }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: movie.imageUrl }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.name}</Text>
        <Text style={styles.genre}>{movie.genre.join(', ')}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={14} color="#F5B400" />
          <Text style={styles.rating}>{movie.imdbRating}</Text>
          <Ionicons name="time-outline" size={14} color="#555" style={{ marginLeft: 10 }} />
          <Text style={styles.rating}>{movie.duration}</Text>
        </View>
        <View style={styles.row}>
          {movie.tags.map((t) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
      {showBookmark ? (
        <Ionicons name="bookmark" size={22} color="#4F46E5" />
      ) : (
        <Ionicons name="chevron-forward" size={22} color="#333" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  poster: { width: 70, height: 95, borderRadius: 8, backgroundColor: '#ddd' },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: '700', color: '#111' },
  genre: { fontSize: 12, color: '#777' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  rating: { fontSize: 13, color: '#333' },
  tag: { backgroundColor: '#E8E4FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  tagText: { color: '#4F46E5', fontSize: 11, fontWeight: '600' },
});