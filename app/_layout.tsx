import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Mendaftarkan grup auth */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
      {/* Mendaftarkan grup tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* DIUBAH: Mendaftarkan grup product, bukan file di dalamnya */}
      <Stack.Screen name="(product)" options={{ headerShown: false }} />
    </Stack>
  );
}
