
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker'; // Import image picker library
import { ScrollView } from 'react-native-gesture-handler';


const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [aadharImage, setAadharImage] = useState(null);

  const launchCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setAadharImage(image.path);
    });
  };

  const launchGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setAadharImage(image.path);
    });
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !mobileNumber || !address || !state || !city || !aadharImage) {
      Alert.alert('Incomplete Fields', 'Please fill in all the fields and upload Aadhar image.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Upload image to Firebase Storage
      const imageFileName = `aadhar_${userCredential.user.uid}.jpg`;
      const storageRef = storage().ref(`aadharImages/${imageFileName}`);
      await storageRef.putFile(aadharImage);

      // Get the download URL of the uploaded image
      const downloadURL = await storageRef.getDownloadURL();

      // Store user details in Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        name,
        email,
        mobileNumber,
        address,
        state,
        city,
        aadharImage: downloadURL,
      });

      // Send email verification
      await userCredential.user.sendEmailVerification();

      Alert.alert(
        'Verification Email Sent',
        'Please check your email and verify your account.'
      );

      // Navigate to "BicholiaLogin" screen after signup
      navigation.navigate('BicholiaLogin');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
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

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        onChangeText={(text) => setAddress(text)}
      />

      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your state"
        onChangeText={(text) => setState(text)}
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        onChangeText={(text) => setCity(text)}
      />

      <Text style={styles.label}>Aadhar Image:</Text>
      {aadharImage && (
        <Image source={{ uri: aadharImage }} style={styles.aadharImage} />
      )}
      <Button title="Launch Camera" onPress={launchCamera} />
      <Button title="Open Gallery" onPress={launchGallery} />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={()=> navigation.navigate('BicholiaLogin')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  signupButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  aadharImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default SignupScreen;
