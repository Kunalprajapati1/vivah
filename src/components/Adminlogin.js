import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const AdminLogin = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleAdminLogin = async () => {
      try {
        if (!password) {
          Alert.alert('Invalid Input', 'Please enter the admin password to log in.');
          return;
        }
  
        setLoading(true);
  
        // Check if the entered password matches the admin password
        if (password === 'Kunal@2002') {
          // Perform any admin-specific actions if needed
  
          // For demonstration purposes, just navigate to a placeholder screen
          navigation.navigate('AdminScreen');
        } else {
          Alert.alert('Error', 'Invalid admin password');
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error during admin login:', error);
        Alert.alert('Error', 'Failed to log in as admin. Please try again.');
        setLoading(false);
      }
    };
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.loginText}>Admin Login</Text>
  
        <View style={styles.cont}>
          <TextInput
            style={styles.input}
            placeholder="Admin Password"
            placeholderTextColor="#e05654"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
  
          <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e05654',
  },
  cont: {
    width: '93%',
    padding: 20,
    height: '70%',
    borderTopLeftRadius: 2,
    alignItems: 'center',
  },
  loginText: {
    marginTop: 50,
    textAlign:'center',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 35,
    marginTop: 20,
    width: '100%',
  },
});

export default AdminLogin;
