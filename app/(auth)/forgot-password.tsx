import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!validateEmail(email)) {
      setError('Not a valid email address. Should be your@email.com');
    } else {
      setError('');
      Alert.alert('Link Sent', `A password reset link has been sent to ${email}.`);
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          {/* DIUBAH: Mengganti ikon kembali */}
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Forgot password</Text>
        
        <Text style={styles.subtitle}>
          Please, enter your email address. You will receive a link to create a new password via email.
        </Text>

        <View style={[styles.inputContainer, error ? styles.inputError : {}]}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
             {error ? <Ionicons name="close" size={24} color="#F01F0E" /> : null}
          </View>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
    content: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
    backButton: { position: 'absolute', top: 50, left: 16, zIndex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 5, elevation: 2 },
    title: { fontSize: 34, fontWeight: 'bold', marginBottom: 40, alignSelf: 'flex-start' },
    subtitle: { fontSize: 14, color: '#2D2D2D', marginBottom: 16, lineHeight: 20 },
    inputContainer: { marginBottom: 4, backgroundColor: '#fff', borderRadius: 8, padding: 12, elevation: 1 },
    inputError: { borderColor: '#F01F0E', borderWidth: 1 },
    label: { color: '#9B9B9B', fontSize: 11, marginBottom: 2 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center' },
    input: { flex: 1, height: 40, fontSize: 16, padding: 0 },
    errorText: { color: '#F01F0E', fontSize: 11, marginLeft: 4, marginBottom: 20 },
    button: { backgroundColor: '#DB3022', paddingVertical: 15, borderRadius: 25, alignItems: 'center', marginTop: 30, elevation: 2 },
    buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' }
});