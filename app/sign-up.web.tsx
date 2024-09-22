import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';

export default function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      document.title = "Sign Up - AlphaOrbit";
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
              <Text style={{fontSize: 30, color: 'white', fontFamily: 'ManropeExtraBold'}}>AlphaOrbit</Text>
            </View>
            <Text style={styles.title}>Start Investing Like a Pro today!</Text>
            <Image source={require('../assets/images/loginO.png')}/>
          </View>
          <View style={styles.rightColumn}>
                <View style={styles.newUserContainer}>
                    <Text style={styles.newUserText}>
                        Already a member? <Link href={'/login'}><Text style={styles.createAccountText}>Sign In</Text></Link>
                    </Text>
                </View>
              <View style={{width: "60%", justifyContent: 'center', marginHorizontal: 'auto'}}>
                  <Text style={styles.signInTitle}>Create Your Account</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <TouchableOpacity style={{flex: 2}}>
                          <LinearGradient
                              colors={['#F9B035', '#F98C4E', '#F96767']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={styles.googleButton}
                              >
                              <Ionicons name='logo-google' size={20} color={'white'} style={{marginHorizontal: 5}}/>
                              <Text style={{color: 'white'}}>Sign Up with Google</Text>
                          </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.appleButton}>
                          <Ionicons name='logo-apple' size={20} color={'#6149CD'} style={{marginHorizontal: 5}}/>
                          <Text style={{color: '#6149CD'}}>With Apple</Text>
                      </TouchableOpacity>
                  </View>
                  <Text style={{color: '#7A86A1', fontSize: 14, marginVertical: 25, fontFamily: 'ManropeRegular'}}>Or sign up using your email address</Text>
                  <View style={{flexDirection: 'row', width: "auto", justifyContent: 'space-between'}}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tony Nguyen"
                            onChangeText={setEmail}
                            placeholderTextColor={'#7A86A1'}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="moontheme"
                            secureTextEntry
                            onChangeText={setPassword}
                            placeholderTextColor={'#7A86A1'}
                        />
                      </View>
                  </View>
                  <View style={{flexDirection: 'row', width: "auto", justifyContent: 'space-between'}}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Email</Text>
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
                            placeholder="7+ Characters"
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
                          <Text style={styles.rememberMeText}>I accept the <Link href={"/"}><Text style={styles.termsAndConditions}>Terms and Conditions</Text></Link></Text>
                      </TouchableOpacity>        
                  </View>
                  <TouchableOpacity onPress={() => router.replace('/(app)/dashboard')} style={{width: '30%'}}>
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
    fontFamily: 'ManropeExtraBold'
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
    fontFamily: 'ManropeBold',
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
    fontFamily: 'ManropeBold'
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
    fontFamily: 'ManropeBold'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'ManropeBold'
  },
  appleButtonText: {
    color: 'black',
    fontFamily: 'ManropeBold'
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 50,
    padding: 15,
  },
  inputContainer: {
    marginBottom: 15,
    width: "45%",
  },
  signInButton: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontFamily: 'ManropeSemiBold',
    fontSize: 15
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
    fontFamily: 'ManropeRegular'
  },
  termsAndConditions: {
    color: '#6149CD',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'ManropeRegular'
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
    fontFamily: 'ManropeRegular'
  },
  createAccountText: {
    color: '#6149CD',
    fontFamily: 'ManropeRegular'
  },
});