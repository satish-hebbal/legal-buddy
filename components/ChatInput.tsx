// ChatInput.tsx - Simplified version
import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@/constants/theme';


interface ChatInputProps {
  onSendMessage: (text: string) => void;
  selectedImage?: string;
  onImageSelect: () => void;
  onCameraOpen: () => void;
  onClearImage?: () => void;
}

export const ChatInput = ({ 
  onSendMessage, 
  selectedImage, 
  onImageSelect, 
  onCameraOpen,
  onClearImage 
}: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() || selectedImage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image 
            source={{ uri: selectedImage }} 
            style={styles.previewImage} 
          />
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={onClearImage}
          >
            <Ionicons name="close-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onImageSelect} style={styles.button}>
          <Ionicons name="document" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCameraOpen} style={styles.button}>
          <Ionicons name="camera" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={styles.button}>
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
  imagePreview: {
    marginBottom: 10,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
  },
  button: {
    padding: 10,
  },
  input: {
    fontFamily:fonts.regular,
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});