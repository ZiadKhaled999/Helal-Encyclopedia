import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Platform } from 'react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(
    Platform.OS === 'web' 
      ? {} 
      : {
          'Fraunces-Bold': require('../assets/fonts/Fraunces-Bold.ttf'),
          'DMSans-Regular': require('../assets/fonts/DM-Sans-Regular.ttf'),
          'DMSans-Medium': require('../assets/fonts/DM-Sans-Medium.ttf'),
          'DMSans-SemiBold': require('../assets/fonts/DM-Sans-SemiBold.ttf'),
          'NotoNaskhArabic-Regular': require('../assets/fonts/Noto-Naskh-Arabic-Regular.ttf'),
          'NotoNaskhArabic-Bold': require('../assets/fonts/Noto-Naskh-Arabic-Bold.ttf'),
          'IBMPlexArabic-Regular': require('../assets/fonts/IBM-Plex-Arabic-Regular.ttf'),
          'IBMPlexArabic-Medium': require('../assets/fonts/IBM-Plex-Arabic-Medium.ttf'),
        }
  );

  // On web, skip font loading check - just render immediately
  if (Platform.OS === 'web') {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}