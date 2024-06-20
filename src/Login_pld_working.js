import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   checkIfLoggedIn();

  //   // Add event listener for hardware back button
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  //   return () => {
  //     // Remove event listener when component is unmounted
  //     backHandler.remove();
  //   };
  // }, []);

  const checkIfLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // User is already logged in, navigate to 'User' screen
        navigation.navigate('User', { uniqueId: userToken });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleBackPress = () => {
    // Navigate back to 'Land' page when the hardware back button is pressed
    navigation.navigate('Land');
    return true; // Prevent default behavior (closing the app)
  };

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userToken = userCredential.user.uid;

      // Save the user token and email securely
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userEmail', email);

      // Navigate to 'User' screen
      navigation.navigate('User', { uniqueId: userToken });
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.loginText}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Login" onPress={handleLogin} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Login;
