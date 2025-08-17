import { Redirect } from 'expo-router';
import React from 'react';

/**
 * Ini adalah Pintu Masuk (Entry Point) aplikasi.
 * Tugasnya hanya mengarahkan (redirect) pengguna.
 */
export default function Index() {
  // Di sini Anda akan menempatkan logika pengecekan otentikasi.
  // Contoh sederhana:
  const isAuthenticated = false; // Ganti dengan status login pengguna yang sebenarnya

  // Jika pengguna sudah login, arahkan ke tab 'home'.
  if (isAuthenticated) {
    // Hapus '(tabs)' dari path
    return <Redirect href="/home" />; 
  }

  // Jika belum login, arahkan ke halaman 'signup'.
  // Hapus '(auth)' dari path
  return <Redirect href="/signup" />;
}