import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';
import { getTheme } from '@/theme/theme';
import { NotificationService } from '@/services/NotificationService';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const isDark = colorScheme === 'dark';
  const theme = getTheme(isDark);

  useEffect(() => {
    // Initialiser les notifications push
    const initializeNotifications = async () => {
      try {
        await NotificationService.registerForPushNotificationsAsync();
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <CustomThemeProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="checkout" options={{ headerShown: false }} />
                <Stack.Screen name="order-confirmation" options={{ headerShown: false }} />
                <Stack.Screen name="admin" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style={isDark ? 'light' : 'dark'} />
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </PaperProvider>
    </CustomThemeProvider>
  );
}
