import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AuthGuard from '../../../components/AuthGuard';

// Game colors for hexagons
const COLORS = ['#FF5252', '#448AFF', '#66BB6A', '#FFCA28', '#AB47BC', '#26C6DA'];

export default function HexFling() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state will be implemented in future updates

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <AuthGuard>
      <View className="flex-1 bg-gradient-to-br from-purple-500 to-pink-300">
        {/* Title bar with game info */}
        <View className="bg-blue-800 px-4 py-2 border-b border-gray-600 flex-row justify-between items-center">
          <TouchableOpacity onPress={handleBackToHome} className="p-2">
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold font-mono text-white">HexFling</Text>
          <View className="bg-gray-100 px-3 py-1 rounded-sm border border-gray-400">
            <Text className="font-mono text-sm">Score: {score}</Text>
          </View>
        </View>

        {/* Game container */}
        <View className="flex-1 justify-center items-center p-4">
          {gameOver ? (
            <View className="bg-gray-100 p-6 border-2 border-gray-400 shadow-lg">
              <Text className="text-2xl font-bold text-center mb-4">Game Over!</Text>
              <Text className="text-xl text-center mb-6">Final Score: {score}</Text>
              <TouchableOpacity
                className="bg-blue-800 p-3 w-40 self-center"
                onPress={() => setGameOver(false)}
              >
                <Text className="text-white text-center font-bold">Play Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="w-full h-4/5 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-300">
              {/* Game board will be implemented in future updates */}
              <Text className="text-white text-center mt-10">
                Game implementation coming soon!
              </Text>
              <Text className="text-white text-center mt-4">
                Fling hexagons upward and match three of the same color
              </Text>
            </View>
          )}
        </View>

        {/* Controls area */}
        <View className="bg-gray-100 p-4 border-t-2 border-gray-400">
          <Text className="text-center text-sm text-gray-600 font-mono">
            Swipe up to fling hexagons • Match 3 of same color
          </Text>
        </View>
      </View>
    </AuthGuard>
  );
}
