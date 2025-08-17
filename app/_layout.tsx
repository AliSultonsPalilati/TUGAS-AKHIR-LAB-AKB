import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Mendaftarkan grup (auth) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
      {/* Mendaftarkan grup (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* PERBAIKAN: Untuk route groups (product), daftarkan sebagai grup, bukan individual route */}
      <Stack.Screen name="(product)" options={{ headerShown: false }} />
    </Stack>
  );
}