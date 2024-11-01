// app/(tabs)/history.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { fonts } from '@/constants/theme';


export default function HistoryScreen() {
  // Sample chat history data
  const chats = [
    {
      id: '1',
      preview: 'What are the steps to register...',
      timestamp: '9:41am 01/11/24'
    },
    {
      id: '2',
      preview: 'How can I protect my in...',
      timestamp: '9:41am 01/11/24'
    },
    {
      id: '3',
      preview: 'What are the tenant rights f...',
      timestamp: '9:41am 01/11/24'
    },
    {
      id: '4',
      preview: 'Can a verbal agreement ho...',
      timestamp: '9:41am 01/11/24'
    },
    {
      id: '5',
      preview: 'What are my rights during a t...',
      timestamp: '9:41am 01/11/24'
    }
  ];

  const handleChatSelect = (chatId: string) => {
    // Navigate to specific chat or show chat details
    router.push({
      pathname: '/(tabs)/chat',
      params: { chatId }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Recent Chats</Text>
        {chats.map((chat) => (
          <TouchableOpacity 
            key={chat.id} 
            style={styles.chatItem}
            onPress={() => handleChatSelect(chat.id)}
          >
            <Text style={styles.chatPreview} numberOfLines={1}>
              "{chat.preview}"
            </Text>
            <Text style={styles.timestamp}>{chat.timestamp}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily:fonts.regular,
    flex: 1,
    backgroundColor: '#0C1117',
  },
  historyContainer: {
    flex: 1,
    padding: 20,
  },
  historyTitle: {
    fontFamily:fonts.medium,
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  chatItem: {
    
    marginBottom: 16,
  },
  chatPreview: {
    fontFamily:fonts.regular,
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontFamily:fonts.medium,
    color: '#cbd5e1',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});