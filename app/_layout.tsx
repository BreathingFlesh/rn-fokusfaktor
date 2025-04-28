import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: 'Index' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
