import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';

export default function SignupPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      if(Platform.OS === "web"){
        document.title = "Sign Up - AlphaOrbit";
      }
    });

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#8A2BE2', '#FF69B4']}
                style={styles.gradient}
            >
                {/* Logo and Title Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/AlphaOrbit.png')} // Update this path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.logoText}>AlphaOrbit</Text>
                    <Text style={styles.title}>Start Investing Like a Pro today!</Text>
                    <Image source={require('../assets/images/loginO.png')} style={styles.loginImage} />
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                    <View style={styles.newUserContainer}>
                        <Text style={styles.newUserText}>
                            Already a member? <Link href={'/login'}><Text style={styles.createAccountText}>Sign In</Text></Link>
                        </Text>
                    </View>

                    <Text style={styles.signInTitle}>Create Your Account</Text>

                    {/* Google and Apple Sign Up Buttons */}
                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.googleButton}>
                            <LinearGradient
                                colors={['#F9B035', '#F98C4E', '#F96767']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.socialButtonGradient}
                            >
                                <Ionicons name='logo-google' size={20} color={'white'} style={styles.socialIcon} />
                                <Text style={styles.socialButtonText}>Sign Up with Google</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appleButton}>
                            <Ionicons name='logo-apple' size={20} color={'#6149CD'} style={styles.socialIcon} />
                            <Text style={styles.appleButtonText}>With Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Email and Password Fields */}
                    <Text style={styles.orText}>Or sign up using your email address</Text>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <Text>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tony Nguyen"
                                onChangeText={setEmail}
                                placeholderTextColor={'#7A86A1'}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="moontheme"
                                onChangeText={setPassword}
                                placeholderTextColor={'#7A86A1'}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <Text>Your Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tonynguyen@example.com"
                                onChangeText={setEmail}
                                placeholderTextColor={'#7A86A1'}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="7+ Characters"
                                secureTextEntry
                                onChangeText={setPassword}
                                placeholderTextColor={'#7A86A1'}
                            />
                        </View>
                    </View>

                    {/* Remember Me Checkbox and Terms */}
                    <View style={styles.rememberForgotContainer}>
                        <TouchableOpacity
                            style={styles.rememberMeContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
                                {rememberMe && <Ionicons name="checkmark" size={18} color="#6149CD" />}
                            </View>
                            <Text style={styles.rememberMeText}>I accept the <Link href={"/"}><Text style={styles.termsAndConditions}>Terms and Conditions</Text></Link></Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity onPress={() => router.replace('/(app)/dashboard')} style={styles.signInButton}>
                        <LinearGradient
                            colors={['#6149CD', '#A654AC', '#EA5F8B']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.signInButtonGradient}
                        >
                            <Text style={styles.signInButtonText}>Sign in</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  loginImage: {
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
  socialButtonsContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  googleButton: {
    marginBottom: 10,
  },
  socialButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
  },
  socialIcon: {
    marginRight: 5,
  },
  socialButtonText: {
    color: 'white',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  appleButtonText: {
    color: '#6149CD',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#888',
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'column',
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
    marginBottom: 10,
    width: '100%',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#F0F0F0',
  },
  rememberMeText: {
    color: '#7A86A1',
    fontSize: 14,
  },
  termsAndConditions: {
    color: '#6149CD',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  signInButton: {
    width: '80%',
  },
  signInButtonGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});