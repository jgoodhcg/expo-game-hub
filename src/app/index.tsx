import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import AuthGuard from '../components/AuthGuard';
import Win95Button from '../components/Win95Button';

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/auth/login');
    };

    return (
        <AuthGuard>
            {/* Outer container with vaporwave gradient background */}
            <View className="flex-1 justify-center items-center bg-gradient-to-br from-purple-500 to-pink-300 p-4">
                {/* Retro "window" container */}
                <View className="w-full max-w-md border-2 border-gray-300 bg-gray-100 shadow-lg">
                    {/* Title bar */}
                    <View className="bg-blue-800 px-4 py-2 border-b border-gray-600">
                        <Text className="text-xl font-bold font-mono text-white text-center">
                            Select a Game!
                        </Text>
                    </View>
                    {/* Content area with game buttons */}
                    <View className="p-4 space-y-3">
                        <Win95Button onPress={() => router.push('/game1')}>
                            <View className="flex-row items-center justify-center space-x-2">
                                <FontAwesome5 name="th" size={20} color="#1a1a1a" />
                                <Text className="font-mono text-lg text-gray-800 tracking-wide">
                                    Falling Hexagon
                                </Text>
                            </View>
                        </Win95Button>
                        <Win95Button onPress={() => router.push('/game2')}>
                            <View className="flex-row items-center justify-center space-x-2">
                                <FontAwesome5 name="chess" size={20} color="#1a1a1a" />
                                <Text className="font-mono text-lg text-gray-800 tracking-wide">
                                    Hex Strategy
                                </Text>
                            </View>
                        </Win95Button>
                        <Win95Button onPress={() => router.push('/game3')}>
                            <View className="flex-row items-center justify-center space-x-2">
                                <FontAwesome5 name="comments" size={20} color="#1a1a1a" />
                                <Text className="font-mono text-lg text-gray-800 tracking-wide">
                                    Social Wavelength
                                </Text>
                            </View>
                        </Win95Button>
                        {/* Logout as a simple text link */}
                        <TouchableOpacity onPress={handleLogout} className="mt-4">
                            <Text className="font-mono text-sm text-blue-900 underline text-center">
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </AuthGuard>
    );
}
