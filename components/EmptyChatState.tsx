// components/EmptyChatState.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@/constants/theme';


interface EmptyChatStateProps {
  onUploadPress: () => void;
  onCameraPress: () => void;
}

export const EmptyChatState = ({ onUploadPress, onCameraPress }: EmptyChatStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Legal Buddy</Text>
        <Text style={styles.subtitle}>your pocket Advocate</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={onUploadPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text-outline" size={32} color="#666" />
          </View>
          <Text style={styles.optionTitle}>Upload Legal</Text>
          <Text style={styles.optionSubtitle}>Document Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onCameraPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="camera-outline" size={32} color="#666" />
          </View>
          <Text style={styles.optionTitle}>Capture</Text>
          <Text style={styles.optionSubtitle}>Document Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontFamily:fonts.bold,
    fontSize: 24,
    fontWeight: '600',
    color: '#2C5282',
  },
  subtitle: {
    fontFamily:fonts.regular,
    fontSize: 18,
    color: '#718096',
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 20,
    width: '45%',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionTitle: {
    fontFamily:fonts.regular,
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
  },
  optionSubtitle: {
    fontFamily:fonts.regular,
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
});