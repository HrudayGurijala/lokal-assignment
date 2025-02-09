import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import 'react-native-reanimated';

// Set default text props for global font
// const textConfig = {
//   style: {
//     fontFamily: 'Exo2Regular',
//   },
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Exo2Regular: require('../assets/fonts/Exo2-Regular.ttf'),
    Exo2Medium: require('../assets/fonts/Exo2-Medium.ttf'),
    Exo2Bold: require('../assets/fonts/Exo2-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen 
          name="jobs/[id]" 
          options={{
            presentation: 'modal', 
            title: 'Job Details',
            headerTitleStyle: { fontFamily: 'Exo2Bold' },
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}