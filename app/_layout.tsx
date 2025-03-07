import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/components/useColorScheme';
import { MenuProvider } from '@/components/menu/MenuContext';
import { injectGoogleFonts } from '@/constants/Fonts';
import { View, Platform, StyleSheet, ViewStyle } from 'react-native';
import { inject } from '@vercel/analytics';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Phone dimensions
const PHONE_WIDTH = 375;
const PHONE_HEIGHT = 812;
const BREAKPOINT = 640; // Width at which we switch to phone mockup

function WebWrapper() {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('inFrame', 'true');

  return (
    <View style={styles.webContainer}>
      <View style={styles.phoneMockup}>
        <iframe
          src={currentUrl.toString()}
          style={{
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT,
            border: 'none',
            borderRadius: 20,
          }}
        />
      </View>
    </View>
  );
}

export default function RootLayout() {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const isInIframe =
    typeof window !== 'undefined' && window.location.search.includes('inFrame=true');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    injectGoogleFonts();
    SplashScreen.hideAsync();
    inject();
  }, []);

  // If viewport is wider than breakpoint and not in iframe, show the wrapper
  if (windowWidth > BREAKPOINT && !isInIframe) {
    return <WebWrapper />;
  }

  // Normal app render (narrow viewport or inside iframe)
  return (
    <MenuProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </MenuProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  } as ViewStyle,
  phoneMockup: {
    position: 'relative',
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  } as ViewStyle,
});
