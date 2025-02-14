import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace('/');
      }
    };
    checkSession();
  }, []);

  const validateInputs = (): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');
    if (!validateInputs()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-800 p-6">
      <View className="w-full max-w-md bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Login
        </Text>
        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-xl py-3 px-4 mb-4 text-gray-900 dark:text-white"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-xl py-3 px-4 mb-6 text-gray-900 dark:text-white"
          placeholderTextColor="#888"
        />
        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" />
        ) : (
          <TouchableOpacity onPress={handleLogin} className="bg-blue-500 rounded-xl py-4 px-6 shadow-md mb-4">
            <Text className="text-white text-center text-lg font-semibold">Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => router.push('/auth/signup')}>
          <Text className="text-sm text-blue-500 underline text-center">Go to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
