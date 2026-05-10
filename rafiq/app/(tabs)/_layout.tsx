import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'القرآن',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="azkar"
        options={{
          title: 'الأذكار',
          tabBarIcon: ({ color, size }) => <Ionicons name="leaf" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="prayer"
        options={{
          title: 'الصلاة',
          tabBarIcon: ({ color, size }) => <Ionicons name="moon" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'المزيد',
          tabBarIcon: ({ color, size }) => <Ionicons name="apps" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}