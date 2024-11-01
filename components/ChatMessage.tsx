// components/ChatMessage.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { fonts } from '@/constants/theme';

interface ChatMessageProps {
  text: string;
  image?: string;
  isUser: boolean;
  isLoading?: boolean;
}

export const ChatMessage = ({ text, image, isUser, isLoading }: ChatMessageProps) => {
  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      colorAnimation.setValue(0);
    }
  }, [isLoading]);

  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E3E3E3', '#B3D6FF'],
  });

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
        <Animated.View style={[styles.loadingContainer, { backgroundColor }]}>
          <Text style={styles.loadingText}>Summarizing...</Text>
        </Animated.View>
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
    backgroundColor: 'rgba(116, 143, 183, 0.20)',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
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
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  userText: {
    fontFamily: fonts.regular,
    color: '#111A28',
  },
  botText: {
    fontFamily: fonts.regular,
    color: '#465B7A',
  },
  loadingContainer: {
    borderRadius: 30,
    padding: 12,
  },
  loadingText: {
    fontFamily: fonts.regular,
    color: '#465B7A',
  },
});