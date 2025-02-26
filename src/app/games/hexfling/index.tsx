import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AuthGuard from '../../../components/AuthGuard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Game colors for hexagons
const COLORS = ['#FF5252', '#448AFF', '#66BB6A', '#FFCA28', '#AB47BC', '#26C6DA'];

export default function HexFling() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Game state will be implemented in future updates

  const handleBackToHome = () => {
    router.push('/');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render based on fullscreen mode
  if (isFullscreen) {
    return (
      <AuthGuard>
        <StatusBar hidden={true} />
        <View className="flex-1 bg-gray-800">
          {/* Minimal header with back button */}
          <View 
            style={{ paddingTop: insets.top }}
            className="bg-black bg-opacity-50 px-4 py-2 flex-row justify-between items-center absolute top-0 left-0 right-0 z-10"
          >
            <TouchableOpacity onPress={handleBackToHome} className="p-2">
              <FontAwesome5 name="home" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-bold font-mono text-white">Score: {score}</Text>
            <TouchableOpacity onPress={toggleFullscreen} className="p-2">
              <FontAwesome5 name="compress" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Fullscreen game area */}
          <View className="flex-1 justify-center items-center">
            {gameOver ? (
              <View className="bg-gray-100 p-6 border-2 border-gray-400 shadow-lg w-4/5">
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
              <View className="flex-1 w-full">
                {/* Game board will be implemented in future updates */}
                <Text className="text-white text-center mt-20">
                  Game implementation coming soon!
                </Text>
                <Text className="text-white text-center mt-4">
                  Fling hexagons upward and match three of the same color
                </Text>
              </View>
            )}
          </View>

          {/* Minimal controls indicator */}
          <View 
            style={{ paddingBottom: insets.bottom }}
            className="bg-black bg-opacity-50 py-2 absolute bottom-0 left-0 right-0"
          >
            <Text className="text-center text-sm text-white font-mono">
              Swipe up to fling hexagons • Match 3 of same color
            </Text>
          </View>
        </View>
      </AuthGuard>
    );
  }

  // Regular windowed mode
  return (
    <AuthGuard>
      <StatusBar hidden={false} />
      {/* Outer container with vaporwave gradient background */}
      <View className="flex-1 justify-center items-center bg-gradient-to-br from-purple-500 to-pink-300 p-4">
        {/* Retro "window" container */}
        <View className="w-full h-full border-2 border-gray-300 bg-gray-100 shadow-lg">
          {/* Title bar */}
          <View className="bg-blue-800 px-4 py-2 border-b border-gray-600 flex-row justify-between items-center">
            <TouchableOpacity onPress={handleBackToHome} className="p-2">
              <FontAwesome5 name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-bold font-mono text-white">HexFling</Text>
            <View className="flex-row items-center">
              <View className="bg-gray-100 px-3 py-1 rounded-sm border border-gray-400 mr-2">
                <Text className="font-mono text-sm">Score: {score}</Text>
              </View>
              <TouchableOpacity onPress={toggleFullscreen} className="p-2">
                <FontAwesome5 name="expand" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Game container */}
          <View className="flex-1 justify-center items-center p-4">
            {gameOver ? (
              <View className="bg-gray-100 p-6 border-2 border-gray-400 shadow-lg w-4/5">
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
              <View className="w-full h-full flex-1 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-300">
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

          {/* Controls area - Windows 95 style footer */}
          <View className="bg-gray-100 p-4 border-t-2 border-gray-400">
            <Text className="text-center text-sm text-gray-600 font-mono">
              Swipe up to fling hexagons • Match 3 of same color
            </Text>
          </View>
        </View>
      </View>
    </AuthGuard>
  );
}
