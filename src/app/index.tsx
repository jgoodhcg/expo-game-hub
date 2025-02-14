import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import AuthGuard from '../components/AuthGuard';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <AuthGuard>
      <View style={styles.container}>
        <Text style={styles.title}>Game Selection Dashboard</Text>
        <Button
          title="Game 1: Solo Game"
          onPress={() => router.push('/game1')}
        />
        <Button
          title="Game 2: Multiplayer Async"
          onPress={() => router.push('/game2')}
        />
        <Button
          title="Game 3: Multiplayer Async"
          onPress={() => router.push('/game3')}
        />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 24 },
});
