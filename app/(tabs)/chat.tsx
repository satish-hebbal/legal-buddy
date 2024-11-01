// (tabs)/chat.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { EmptyChatState } from '@/components/EmptyChatState';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native';
import { fonts } from '@/constants/theme';

export default function ChatTab() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    image?: string;
    isUser: boolean;
    isLoading?: boolean;
  }>>([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const params = useLocalSearchParams<{ photoUri?: string }>();

  useEffect(() => {
    if (params.photoUri) {
      setSelectedImage(params.photoUri);
    }
  }, [params.photoUri]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() && !selectedImage) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      image: selectedImage,
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setSelectedImage(undefined);

    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    setTimeout(() => {
      setMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, {
          id: (Date.now() + 2).toString(),
          text: 'API is not yet chained! mera kaam to hogya!',
          isUser: false,
        }];
      });
    }, 2000);
  };

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleCameraOpen = () => {
    router.push("/(tabs)/camera");
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.chatContainer}>
        {messages.length === 0 ? (
          <EmptyChatState
            onUploadPress={handleImageSelect}
            onCameraPress={handleCameraOpen}
          />
        ) : (
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ChatMessage
                text={item.text}
                image={item.image}
                isUser={item.isUser}
                isLoading={item.isLoading}
              />
            )}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
          />
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          onCameraOpen={handleCameraOpen}
          onClearImage={() => setSelectedImage(undefined)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: fonts.regular,
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
    paddingBottom: 20,
  },
}); 