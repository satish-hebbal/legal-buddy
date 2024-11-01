// components/ChatInput.tsx
import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSendMessage: (text: string, image?: string) => void;
  selectedImage?: string;
  onImageSelect: () => void;
  onCameraOpen: () => void;
  onClearImage?: () => void; // Add this new prop
}

export const ChatInput = ({ 
  onSendMessage, 
  selectedImage, 
  onImageSelect, 
  onCameraOpen,
  onClearImage 
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    if (message.trim() || selectedImage) {
      onSendMessage(message, selectedImage);
      setMessage('');
    }
  };

  const handleClearImage = (e: any) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onClearImage) {
      onClearImage();
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
  <View style={styles.selectedImageContainer}>
    <Image
      source={{ uri: selectedImage }}
      style={styles.selectedImage}
      resizeMode="cover"
    />
    <TouchableOpacity
      style={styles.clearButton}
      onPress={() => onClearImage?.()}
    >
      <Ionicons name="close-circle" size={24} color="white" />
    </TouchableOpacity>
  </View>
)}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onImageSelect} style={styles.iconButton}>
          <Ionicons name="document-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCameraOpen} style={styles.iconButton}>
          <Ionicons name="camera-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedImageWrapper: {
    marginBottom: 10,
  },
  selectedImageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  clearButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
});