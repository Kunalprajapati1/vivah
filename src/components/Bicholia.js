

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setProfileImage(image.path);
    });
  };

  const isValidEmailDomain = (email) => {
    const allowedDomains = ['gmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1];
    return allowedDomains.includes(emailDomain);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !mobileNumber || !profileImage) {
      Alert.alert('Incomplete Fields', 'Please fill in all the fields and upload a profile image.');
      return;
    }

    if (!isValidEmailDomain(email)) {
      Alert.alert('Invalid Email Domain', 'Please use a Gmail or Outlook email address.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      const imageFileName = `profile_${userCredential.user.uid}.jpg`;
      const storageRef = storage().ref(`profileImages/${imageFileName}`);
      await storageRef.putFile(profileImage);

      const downloadURL = await storageRef.getDownloadURL();

      await firestore().collection('users').doc(userCredential.user.uid).set({
        name,
        email,
        mobileNumber,
        profileImage: downloadURL,
      });

      await userCredential.user.sendEmailVerification();

      Alert.alert(
        'Verification Email Sent',
        'Please check your email and verify your account.'
      );

      navigation.navigate('BicholiaLogin');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome !!!!</Text>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <Text style={styles.label}>Mobile Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          onChangeText={(text) => setMobileNumber(text)}
        />

        <Text style={styles.label}>Profile Image:</Text>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <TouchableOpacity style={styles.profileImagePlaceholder} onPress={openGallery}>
            <Text style={styles.profileImageText}>Add Profile Photo</Text>
          </TouchableOpacity>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BicholiaLogin')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#e05654',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of width and height to make it circular
    marginBottom: 10,
    marginTop: 10,
  },
  profileImagePlaceholder: {
    width: 200,
    height: 190,
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 35,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default SignupScreen;
