import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ChatHistory = ({ chats, onChatSelect }: { 
    chats: Array<{ id: string; preview: string; timestamp: string }>;
    onChatSelect: (id: string) => void;
  }) => {
    return (
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Recent Chats</Text>
        {chats.map((chat) => (
          <TouchableOpacity 
            key={chat.id} 
            style={styles.chatItem}
            onPress={() => onChatSelect(chat.id)}
          >
            <Text style={styles.chatPreview} numberOfLines={1}>
              "{chat.preview}"
            </Text>
            <Text style={styles.timestamp}>{chat.timestamp}</Text>
          </TouchableOpacity>
        ))}
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