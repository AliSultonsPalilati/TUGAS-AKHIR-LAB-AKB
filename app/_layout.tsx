import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Mendaftarkan grup (auth) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
      {/* Mendaftarkan grup (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* DIUBAH: Mendaftarkan rute produk dengan nama yang benar sesuai sitemap */}
      <Stack.Screen name="(product)/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
