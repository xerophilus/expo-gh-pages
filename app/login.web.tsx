import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';

export default function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        if(Platform.OS === 'web'){
            document.title = "Sign In - AlphaOrbit";
        }
    })
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#8A2BE2', '#FF69B4']}
          style={styles.gradient}
        >
          <View style={styles.leftColumn}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/AlphaOrbit.png')} // Update this path
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={{fontSize: 30, color: 'white'}}>AlphaOrbit</Text>
            </View>
            <Text style={styles.title}>Invest like a Pro.</Text>
            <Image source={require('../assets/images/loginO.png')}/>
          </View>
          <View style={styles.rightColumn}>
                <View style={styles.newUserContainer}>
                    <Text style={styles.newUserText}>
                        New user? <Link href={'/sign-up'}><Text style={styles.createAccountText}>Create an account</Text></Link>
                    </Text>
                </View>
              <View style={{width: "60%", justifyContent: 'center', marginHorizontal: 'auto'}}>
                  <Text style={styles.signInTitle}>Sign In</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <TouchableOpacity style={{flex: 2}}>
                          <LinearGradient
                              colors={['#F9B035', '#F98C4E', '#F96767']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={styles.googleButton}
                              >
                              <Ionicons name='logo-google' size={20} color={'white'} style={{marginHorizontal: 5}}/>
                              <Text style={{color: 'white'}}>Sign in with Google</Text>
                          </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.appleButton}>
                          <Ionicons name='logo-apple' size={20} color={'#6149CD'} style={{marginHorizontal: 5}}/>
                          <Text style={{color: '#6149CD'}}>With Apple</Text>
                      </TouchableOpacity>
                  </View>
                  <Text style={{color: '#7A86A1', fontSize: 14, marginVertical: 25}}>Or sign in using your email address</Text>
                  <View style={{flexDirection: 'row', width: "auto", justifyContent: 'space-between'}}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Tonynguyen@example.com"
                        onChangeText={setEmail}
                        placeholderTextColor={'#7A86A1'}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="********"
                          secureTextEntry
                          onChangeText={setPassword}
                          placeholderTextColor={'#7A86A1'}
                      />
                    </View>
                  </View>
                  <View style={styles.rememberForgotContainer}>
                      <TouchableOpacity 
                          style={styles.rememberMeContainer} 
                          onPress={() => setRememberMe(!rememberMe)}
                      >
                          <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
                              {rememberMe && <Ionicons name="checkmark" size={18} color="#6149CD" />}
                          </View>
                          <Text style={styles.rememberMeText}>Remember me</Text>
                      </TouchableOpacity>
                      <Link href={'/forgot-password'}>
                          <Text style={styles.forgotPassword}>Forgot password?</Text>
                      </Link>
                  </View>
                  <TouchableOpacity onPress={() => router.replace('/(app)/dashboard')} style={{width: '50%'}}>
                      <LinearGradient
                          colors={['#6149CD', '#A654AC', '#EA5F8B']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={styles.signInButton}
                      >
                          <Text style={{color: '#FFFFFF'}}>Sign in</Text>
                      </LinearGradient>
                  </TouchableOpacity>
              </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  rightColumn: {
    flex: 3,
    backgroundColor: 'white',
    padding: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row'
  },
  logo: {
    width: 150,
    height: 40,
    marginBottom: 20,
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    marginRight: 20,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: .1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  appleButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: .1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  appleButtonText: {
    color: 'black',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
  inputContainer: {
    marginBottom: 15,
    width: "45%",
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15
  },
  label: {
    fontFamily: 'ManropeSemiBold',
    fontSize: 15
  },
  signInButton: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: 'auto'
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  forgotPassword: {
    color: '#6149CD',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginHorizontal: 20
  },
  newUserContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    marginHorizontal: 20
  },
  newUserText: {
    color: '#7A86A1',
    fontSize: 14,
  },
  createAccountText: {
    color: '#6149CD',
  },
});