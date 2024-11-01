// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '@/constants/theme';


export default function ProfileScreen() {
  const handleStartNewChat = () => {
    router.push('/(tabs)/chat');
  };

  const handleCheckHistory = () => {
    router.push('./history');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="#fff" />
          </View>
          <Text style={styles.greeting}>Hey, Satish!</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#475569" />
            <Text style={styles.editText}>Edit personal Information</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleStartNewChat}
          >
            <Text style={styles.primaryButtonText}>Start New Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleCheckHistory}
          >
            <Text style={styles.secondaryButtonText}>Check Chat History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily:fonts.medium,
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editText: {
    fontFamily:fonts.regular,
    color: '#475569',
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#475569',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily:fonts.regular,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  secondaryButtonText: {
    fontFamily:fonts.regular,
    color: '#475569',
    fontSize: 16,
    fontWeight: '500',
  },
});