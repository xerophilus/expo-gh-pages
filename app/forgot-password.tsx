import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FAIcon from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if(Platform.OS === 'web'){
        document.title = "Forgot Password - AlphaOrbit";
    }
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8A2BE2', '#FF69B4']}
        style={styles.gradient}
      >
        {/* Logo and Title Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/AlphaOrbit.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>AlphaOrbit</Text>
          <Text style={styles.title}>Invest like a Pro.</Text>
          <Image source={require('../assets/images/auth-images/your image here-5.png')} style={styles.authImage} />
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.newUserContainer}>
            <Text style={styles.newUserText}>
              New user? <Link href={'/sign-up'}><Text style={styles.createAccountText}>Create an account</Text></Link>
            </Text>
          </View>

          <Text style={styles.signInTitle}>Forgot Password</Text>

          <Text style={styles.descriptionText}>
            Enter the email address you used when you joined and we'll send you instructions to reset your password.
          </Text>

          {/* Email Input Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tonynguyen@example.com"
              onChangeText={setEmail}
              placeholderTextColor={'#7A86A1'}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <LinearGradient
              colors={['#6149CD', '#A654AC', '#EA5F8B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButtonGradient}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Back to Sign In Link */}
          <Link href={'/login'} style={styles.backToSignIn}>
            <FAIcon name='chevron-left' color="#6149CD" style={styles.backIcon} />
            <Text style={styles.createAccountText}>Back to sign in</Text>
          </Link>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  authImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  newUserContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  newUserText: {
    color: '#7A86A1',
    fontSize: 14,
  },
  createAccountText: {
    color: '#6149CD',
  },
  signInTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionText: {
    color: '#7A86A1',
    fontSize: 14,
    marginVertical: 25,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  submitButton: {
    width: '80%',
  },
  submitButtonGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  backIcon: {
    marginRight: 5,
  },
});