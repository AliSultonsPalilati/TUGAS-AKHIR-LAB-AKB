import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('muffin.sweet@gmail.com');
  const [password, setPassword] = useState('');
  const isEmailValid = email.includes('@') && email.includes('.');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            {isEmailValid && <Ionicons name="checkmark" size={24} color="green" />}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={[styles.input, styles.inputSingle]} value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <Link href="/forgot-password" asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkText}>Forgot your password?</Text>
            <Ionicons name="arrow-forward" size={16} color="#DB3022" />
          </TouchableOpacity>
        </Link>

        {/* --- TOMBOL INI YANG DIUBAH --- */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        {/* ----------------------------- */}

        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialLoginText}>Or login with social account</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../../assets/images/google-logo.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../../assets/images/facebook-logo.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  content: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
  backButton: { position: 'absolute', top: 50, left: 16, zIndex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 5, elevation: 2 },
  title: { fontSize: 34, fontWeight: 'bold', marginBottom: 40, alignSelf: 'flex-start' },
  inputContainer: { marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 1 },
  label: { color: '#9B9B9B', fontSize: 11, marginBottom: 2 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, height: 40, fontSize: 16, padding: 0 },
  inputSingle: { borderWidth: 0 },
  linkContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 25 },
  linkText: { color: '#2D2D2D', marginRight: 5 },
  button: { backgroundColor: '#DB3022', paddingVertical: 15, borderRadius: 25, alignItems: 'center', marginBottom: 60, elevation: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  socialLoginContainer: { alignItems: 'center' },
  socialLoginText: { marginBottom: 12, color: '#2D2D2D' },
  socialButtons: { flexDirection: 'row', justifyContent: 'center' },
  socialButton: { width: 92, height: 64, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 24, elevation: 2 },
  socialIcon: { width: 30, height: 30, resizeMode: 'contain' }
});