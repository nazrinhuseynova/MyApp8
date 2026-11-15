import { useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet, Image,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMovies } from '@/context/MoviesContext';
import { Movie } from '@/types/movie';

const ALL_TAGS: Movie['tags'] = ['2D', '3D', 'IMAX', '4D'];
const ALL_GENRES = ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Crime', 'Comedy', 'Horror'];

export default function AddMovie() {
  const { addMovie } = useMovies();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<Movie['tags']>(['2D']);
  const [genre, setGenre] = useState<string[]>([]);
  const [imdb, setImdb] = useState('');
  const [rotten, setRotten] = useState('');
  const [duration, setDuration] = useState('');

  const toggle = <T,>(list: T[], item: T) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const reset = () => {
    setImageUrl(''); setName(''); setDescription(''); setTags(['2D']);
    setGenre([]); setImdb(''); setRotten(''); setDuration('');
  };

  const submit = () => {
    if (!name.trim() || !description.trim() || !imdb.trim() || !rotten.trim() || !duration.trim()) {
      return Alert.alert('Xəta', 'Bütün * olan sahələri doldurun');
    }
    if (tags.length === 0) return Alert.alert('Xəta', 'Ən azı bir tag seçin');
    if (genre.length === 0) return Alert.alert('Xəta', 'Ən azı bir janr seçin');
    const rating = parseFloat(imdb.replace(',', '.'));
    if (isNaN(rating) || rating < 0 || rating > 10) {
      return Alert.alert('Xəta', 'IMDb rating 0-10 arası olmalıdır');
    }

    addMovie({
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || 'https://via.placeholder.com/300x450.png?text=No+Image',
      tags,
      genre,
      imdbRating: rating,
      rotten: rotten.trim(),
      duration: duration.trim(),
    });
    reset();
    Alert.alert('Uğurlu', 'Film əlavə olundu');
    router.navigate('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Add Movie</Text>

          <View style={styles.imgRow}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.preview} />
            ) : (
              <View style={styles.preview}>
                <Ionicons name="image-outline" size={32} color="#999" />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                style={styles.input} placeholder="https://..." autoCapitalize="none"
                value={imageUrl} onChangeText={setImageUrl}
              />
            </View>
          </View>

          <Text style={styles.label}>Name *</Text>
          <TextInput style={styles.input} placeholder="Movie name" value={name} onChangeText={setName} />

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
            placeholder="Movie description" multiline value={description} onChangeText={setDescription}
          />

          <Text style={styles.label}>Tags *</Text>
          <View style={styles.wrap}>
            {ALL_TAGS.map((t) => {
              const on = tags.includes(t);
              return (
                <Pressable key={t} style={styles.check} onPress={() => setTags(toggle(tags, t) as Movie['tags'])}>
                  <Ionicons name={on ? 'checkbox' : 'square-outline'} size={22} color="#4F46E5" />
                  <Text>{t}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Genre *</Text>
          <View style={styles.wrap}>
            {ALL_GENRES.map((g) => {
              const on = genre.includes(g);
              return (
                <Pressable
                  key={g} onPress={() => setGenre(toggle(genre, g))}
                  style={[styles.chip, on && styles.chipOn]}
                >
                  <Text style={[styles.chipText, on && { color: '#fff' }]}>{g}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>IMDb Rating *</Text>
              <TextInput style={styles.input} placeholder="8.6" keyboardType="decimal-pad" value={imdb} onChangeText={setImdb} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Rotten *</Text>
              <TextInput style={styles.input} placeholder="72%" value={rotten} onChangeText={setRotten} />
            </View>
          </View>

          <Text style={styles.label}>Duration *</Text>
          <TextInput style={styles.input} placeholder="2h 49m" value={duration} onChangeText={setDuration} />

          <Pressable style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>Add Movie</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, gap: 6, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  imgRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-end' },
  preview: {
    width: 70, height: 70, borderRadius: 10, backgroundColor: '#eee',
    alignItems: 'center', justifyContent: 'center',
  },
  label: { fontSize: 13, fontWeight: '600', marginTop: 10, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, fontSize: 14 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  check: { flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 8 },
  chip: { borderWidth: 1, borderColor: '#4F46E5', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 5 },
  chipOn: { backgroundColor: '#4F46E5' },
  chipText: { color: '#4F46E5', fontSize: 13 },
  btn: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});