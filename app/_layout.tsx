
import { AppProvider } from '../context/state';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="opportunity/[id]" options={{ title: 'Opportunity Details' }} />
      </Stack>
    </AppProvider>
  );
}
