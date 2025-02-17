import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import Win95Button from '../../components/Win95Button';

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
            router.replace('/');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-gradient-to-br from-purple-500 to-pink-300 p-4">
            {/* Window container */}
            <View className="w-full max-w-md border-2 border-gray-300 bg-gray-100 shadow-lg">
                {/* Title bar */}
                <View className="bg-blue-800 px-4 py-2 border-b border-gray-600">
                    <Text className="text-xl font-bold font-mono text-white text-center">
                        Login
                    </Text>
                </View>
                {/* Content area */}
                <View className="p-4 space-y-3">
                    {error ? (
                        <Text className="text-red-500 font-mono text-center">{error}</Text>
                    ) : null}
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        className="w-full bg-gray-50 border border-gray-500 px-3 py-2 mb-4 font-mono text-gray-900"
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="w-full bg-gray-50 border border-gray-500 px-3 py-2 mb-6 font-mono text-gray-900"
                        placeholderTextColor="#555"
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="#3b82f6" />
                    ) : (
                        <Win95Button onPress={handleLogin}>
                            Login
                        </Win95Button>
                    )}
                    <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                        <Text className="text-sm text-blue-500 underline text-center font-mono">
                            Go to Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
