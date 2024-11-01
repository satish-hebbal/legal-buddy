// app/(tabs)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Drawer 
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#f8fafc',
        },
        headerTintColor: '#475569',
        headerTitleStyle: {
          fontFamily: fonts.medium,
        },
        drawerStyle: {
          width: '85%',
          backgroundColor: 'rgba(12, 17, 23, 0.85)',
        },
        drawerActiveTintColor: '#0EA5E9',
        drawerInactiveTintColor: '#94A3B8',
        drawerLabelStyle: {
          fontFamily: fonts.regular,
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="chat"
        options={{
          title: 'Legal Buddy',
          drawerLabel: 'Chat',
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          title: 'Chat History',
          drawerLabel: 'History',
          drawerIcon: ({ color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="camera"
        options={{
          title: 'Camera',
          drawerLabel: 'Camera',
          drawerIcon: ({ color }) => (
            <Ionicons name="camera-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Drawer>
  );
}