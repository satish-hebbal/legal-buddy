import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface PhotoPreviewProps {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
}

const PhotoPreviewSection: React.FC<PhotoPreviewProps> = ({ photo, handleRetakePhoto }) => {
  const handleConfirm = () => {
    console.log('Photo URI being passed:', photo.uri);
    router.push({
      pathname: "/(tabs)/chat",
      params: { photoUri: photo.uri }
    });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: photo.uri }} 
        style={styles.preview} 
      />
      <View style={styles.previewButtonContainer}>
        <TouchableOpacity style={styles.previewButton} onPress={handleRetakePhoto}>
          <Ionicons name="close" size={24} color="white" />
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.previewButton} onPress={handleConfirm}>
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBack = () => {
    router.push("/(tabs)/chat");
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: false,
        });
        console.log("Photo taken:", photo.uri);
        setPhoto(photo);
      } catch (error) {
        console.error('Error taking photo:', error);
        alert('Failed to take photo');
      }
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  if (photo) {
    return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} />;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton}
            onPress={handleTakePhoto}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  captureButton: {
    alignSelf: 'center',
    marginBottom: 40,
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  previewButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});