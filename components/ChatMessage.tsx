// components/ChatMessage.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatMessageProps {
  text: string;
  image?: string;
  isUser: boolean;
  isLoading?: boolean;
}

export const ChatMessage = ({ text, image, isUser, isLoading }: ChatMessageProps) => {
  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
      {image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.messageImage}
            resizeMode="cover"
          />
        </View>
      )}
      {isLoading ? (
        <Text style={styles.loadingText}>Summarizing...</Text>
      ) : (
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  imageContainer: {
    marginBottom: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: 'black',
  },
  loadingText: {
    fontStyle: 'italic',
    color: '#666',
  },
});