

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const checkIfLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // User is already logged in, navigate to 'User' screen
        navigation.navigate('EditSaveProfile', { uniqueId: userToken });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Invalid Input', 'Please enter your email to reset the password.');
        return;
      }

      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  const handleBackPress = () => {
    // Navigate back to 'Land' page when the hardware back button is pressed
    // navigation.navigate('Land');
    return true; // Prevent default behavior (closing the app)
  };
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Invalid Input', 'Please enter both email and password to log in.');
        return;
      }
  
      setLoading(true);
  
      // Check if the entered email and password match the admin credentials
      if (email === 'admin@login.com' && password === 'Kunal@2002') {
        // Navigate to 'AdminLogin' screen
        navigation.navigate('Adminlogin');
      } else {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const userToken = userCredential.user.uid;
  
        // Save the user token and email securely
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userEmail', email);
  
        // Navigate to 'User' screen
        navigation.navigate('Land', { uniqueId: userToken });
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Invalid email or password');
      setLoading(false);
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={{ fontSize:40, color:'white', fontFamily:'Montserrat-SemiBold' }}>Welcome Back!</Text>

      <View style={styles.cont}>
        {/* <Image source={require('../src/assets/app_images/login.png')} style={styles.logo} /> */}
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor='#e05654'

          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor='#e05654'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.for}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.loginButtonText}>Login</Text>}
        </TouchableOpacity>
        <View style={{  top:60,width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/balloon.png')} // Replace with the actual path to your image
          style={{ width:'350%', height:'350%'}} // Define the styles for your image
        />
        </View>
        <View style={{  top:80,width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/balloon.png')} // Replace with the actual path to your image
          style={{ width:'100%', height:'100%'}} // Define the styles for your image
        />
        </View>
        <View style={{  top:80,width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/balloon.png')} // Replace with the actual path to your image
          style={{ width:'150%', height:'150%'}} // Define the styles for your image
        />
        </View>
        <View style={{ marginLeft:'80%',  bottom:45,width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/balloon.png')} // Replace with the actual path to your image
          style={{ width:'150%', height:'150%'}} // Define the styles for your image
        />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginButtonText:{
    fontFamily: "Montserrat-SemiBold",

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e05654',

  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    // borderRightWidth: 18,
    borderRadius: 35,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  loginText: {
    marginTop:50,
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
    color: '#333',
    fontFamily: "Montserrat-Regular",
  },
  cont:{
    width: '93%',
    // backgroundColor: '#e77575',
    // borderRadius: 80,
    padding: 20,
    // borderBottomLeftRadius: 2,
    // borderBottomRightRadius: 2,
    height: '70%',
    borderTopLeftRadius: 2,
    alignItems: 'center',


  },
  logo: {
    height: 130,
    width: 130,
    marginBottom: 20,
  },
  for:{

    fontFamily: 'Montserrat-SemiBold', 
    color: '#ebc5c5', 
    textDecorationLine: 'underline',
    
     letterSpacing: 1,
      fontSize: 14, 
      bottom:'10%',
      marginBottom:20,
      alignSelf:'center',

  },
});

export default Login;
