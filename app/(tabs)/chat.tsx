import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatInput } from '@/components/ChatInput';
import * as ImagePicker from 'expo-image-picker';  // Add this import
import { ChatMessage } from '@/components/ChatMessage';
import { router, useLocalSearchParams } from 'expo-router';

type AppRoutes = {
  "/tabs/camera": undefined;
  "/tabs/chat": { photoUri?: string };
};

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
      console.log("Photo URI received:", params.photoUri); // Add this for debugging
      setSelectedImage(params.photoUri);
    }
  }, [params.photoUri]);
  
  const handleSendMessage = (text: string, image?: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: text || '',
      image: selectedImage,
      isUser: true,
    };
    console.log("Sending message with image:", userMessage);
    
    setMessages(prev => [...prev, userMessage]);
    setSelectedImage(undefined);

    // Add loading message
    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Simulate API response after 2 seconds
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, {
          id: (Date.now() + 2).toString(),
          text: 'Congratulations, This is a meme on national figures of india, police are ariving in 10 mins.',
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
  const handleClearImage = () => {
    setSelectedImage(undefined);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.chatContainer}>
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
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
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