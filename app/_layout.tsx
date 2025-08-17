import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Mendaftarkan grup (auth) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
      {/* Mendaftarkan grup (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* INI ADALAH BARIS YANG BENAR UNTUK MENDAFTARKAN PRODUK */}
      <Stack.Screen name="(product)" options={{ headerShown: false }} />
    </Stack>
  );
}
