import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@/constants/theme';

interface ProfileScreenProps {
  userName: string;
  onStartNewChat: () => void;
  onCheckHistory: () => void;
}

export const ProfileScreen = ({ userName, onStartNewChat, onCheckHistory }: ProfileScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={40} color="#fff" />
        </View>
        <Text style={styles.greeting}>Hey, {userName}!</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#475569" />
          <Text style={styles.editText}>Edit personal Information</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onStartNewChat}>
          <Text style={styles.primaryButtonText}>Start New Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onCheckHistory}>
          <Text style={styles.secondaryButtonText}>Check Chat History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      color: '#475569',
      fontSize: 16,
      fontWeight: '500',
    },
    historyContainer: {
      flex: 1,
      backgroundColor: '#475569',
      padding: 20,
    },
    historyTitle: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 20,
    },
    chatItem: {
      marginBottom: 16,
    },
    chatPreview: {
      color: '#fff',
      fontSize: 14,
      marginBottom: 4,
    },
    timestamp: {
      color: '#cbd5e1',
      fontSize: 12,
      alignSelf: 'flex-end',
    },
  });