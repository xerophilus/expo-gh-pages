import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FAIcon from '@expo/vector-icons/FontAwesome5';
import { Link, router } from 'expo-router';

export default function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
        document.title = "Forgot Password - AlphaOrbit";
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
            <Image source={require('../assets/images/auth-images/your image here-5.png')}/>
          </View>
          <View style={styles.rightColumn}>
                <View style={styles.newUserContainer}>
                    <Text style={styles.newUserText}>
                        New user? <Link href={'/sign-up'}><Text style={styles.createAccountText}>Create an account</Text></Link>
                    </Text>
                </View>
              <View style={{width: "60%", justifyContent: 'center', marginHorizontal: 'auto'}}>
                  <Text style={styles.signInTitle}>Forgot Password</Text>
                  <Text style={{color: '#7A86A1', fontSize: 14, marginVertical: 25, width: "50%"}}>Enter the email address you used when you joined and we'll send you instructions to reset your password.</Text>
                  <View style={{flexDirection: 'row', width: "auto", justifyContent: 'space-between'}}>
                  <View style={styles.inputContainer}>
                        <Text>Your Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tonynguyen@example.com"
                            onChangeText={setEmail}
                            placeholderTextColor={'#7A86A1'}
                        />
                      </View>
                  </View>
                  <TouchableOpacity onPress={() => router.replace('/login')} style={{width: '45%'}}>
                      <LinearGradient
                          colors={['#6149CD', '#A654AC', '#EA5F8B']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={styles.signInButton}
                      >
                          <Text style={{color: '#FFFFFF'}}>Submit</Text>
                      </LinearGradient>
                  </TouchableOpacity>
                  <Link href={'/login'} style={{marginTop: 25}}><FAIcon name='chevron-left' color="#6149CD" style={{marginRight: 5}}/><Text style={styles.createAccountText}>Back to sign in</Text></Link>
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

  scatteredImagesContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    flexDirection: 'column',
  },
  scatteredImage: {
    width: 60,
    height: 60,
    marginVertical: 10,
  },
  colorBurst1: {
    position: 'absolute',
    right: 10,
    top: 150,
    width: '10%',
    height: '10%',
  },
  colorBurst2: {
    position: 'absolute',
    right: 10,
    top: 300,
    width: 150,
    height: 150,
  },
  colorBurst3: {
    position: 'absolute',
    right: 10,
    top: 450,
    width: 150,
    height: 150,
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
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 50,
    padding: 15,
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