import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Home' }} />
    </Stack>
  );
}
