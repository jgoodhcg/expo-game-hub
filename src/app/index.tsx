import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
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
      <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-800 p-6">
        <Text className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Select a Game!
        </Text>
        <View className="w-full max-w-md space-y-4">
          <TouchableOpacity
            onPress={() => router.push('/game1')}
            className="bg-blue-500 rounded-xl py-4 px-6 shadow-md flex-row items-center justify-center space-x-3"
          >
            <FontAwesome5 name="th" size={24} color="white" />
            <Text className="text-white text-center text-lg">
              Falling Hexagon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/game2')}
            className="bg-blue-500 rounded-xl py-4 px-6 shadow-md flex-row items-center justify-center space-x-3"
          >
            <FontAwesome5 name="chess" size={24} color="white" />
            <Text className="text-white text-center text-lg">
              Hex Strategy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/game3')}
            className="bg-blue-500 rounded-xl py-4 px-6 shadow-md flex-row items-center justify-center space-x-3"
          >
            <FontAwesome5 name="comments" size={24} color="white" />
            <Text className="text-white text-center text-lg">
              Social Wavelength
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} className="mt-6">
            <Text className="text-sm text-white underline">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthGuard>
  );
}
