import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Item = { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; danger?: boolean };

export default function Profile() {
  const router = useRouter();

  const items: Item[] = [
    { icon: 'heart-outline', label: 'My Saved Movies', onPress: () => router.navigate('/saved' as any) },
    { icon: 'information-circle-outline', label: 'About App', onPress: () => Alert.alert('About', 'Movie App v1.0') },
    { icon: 'settings-outline', label: 'Settings', onPress: () => Alert.alert('Settings', 'Tezliklə...') },
    { icon: 'log-out-outline', label: 'Logout', danger: true, onPress: () => Alert.alert('Logout', 'Çıxış edildi') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.user}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={44} color="#4F46E5" />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.sub}>Movie Lover 🎬</Text>
      </View>

      <View style={styles.menu}>
        {items.map((it, i) => (
          <Pressable key={it.label} style={[styles.item, i > 0 && styles.border]} onPress={it.onPress}>
            <Ionicons name={it.icon} size={22} color={it.danger ? '#E11D48' : '#222'} />
            <Text style={[styles.itemText, it.danger && { color: '#E11D48' }]}>{it.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F5FF', paddingHorizontal: 16 },
  header: { fontSize: 26, fontWeight: '800', marginVertical: 12 },
  user: { alignItems: 'center', marginVertical: 20, gap: 4 },
  avatar: {
    width: 90, height: 90, borderRadius: 45, backgroundColor: '#E0DCFF',
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 22, fontWeight: '800', marginTop: 8 },
  sub: { color: '#666' },
  menu: { backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  border: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E5E5E5' },
  itemText: { flex: 1, fontSize: 15 },
});