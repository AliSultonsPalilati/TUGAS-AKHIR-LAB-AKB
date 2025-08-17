import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
// DIUBAH: 'router' dihapus karena tidak lagi digunakan
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [name, setName] = useState('Alisultn');
  const [email, setEmail] = useState('sultn25');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* DIHAPUS: Tombol kembali sudah tidak ada di sini */}
        
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            {name.length > 2 && <Ionicons name="checkmark" size={24} color="green" />}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.input, styles.inputSingle]} value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={[styles.input, styles.inputSingle]} value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkText}>Already have an account?</Text>
            <Ionicons name="arrow-forward" size={16} color="#DB3022" />
          </TouchableOpacity>
        </Link>
        
        <TouchableOpacity style={styles.button} onPress={() => console.log('Sign Up pressed')}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
            <Text style={styles.socialLoginText}>Or sign up with social account</Text>
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
  // DIUBAH: padding disesuaikan agar konten tidak terlalu ke atas
  content: { flex: 1, paddingHorizontal: 16, justifyContent: 'center', paddingTop: 60}, 
  // Style backButton bisa dihapus, tapi dibiarkan juga tidak masalah
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