

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Import Firestore from Firebase
import { Linking } from 'react-native';
import { useColorScheme } from 'react-native';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const colorScheme = useColorScheme();
  // const textColor = colorScheme === 'dark' ? '#000000' : '#ffffff';
  const textColor = colorScheme === 'dark' ? '#000000' : '#000000';


  const handleSubmit = () => {
    // Validate if all fields are filled
    if (!name || !email || !phoneNumber || !message) {
      Alert.alert('All fields are required');
      return;
    }

    // Save the details to Firestore
    firestore()
      .collection('contactForms') // Specify the collection in Firestore
      .add({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        message: message,
      })
      .then(() => {
        console.log('Contact form submitted successfully!');
        // Open default email client with pre-filled details
        Linking.openURL(`mailto:skparjapati125@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone Number: ${phoneNumber}%0D%0AMessage: ${message}`);
      })
      .catch(error => {
        console.error('Error submitting contact form: ', error);
      });
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/app_images/Contact.jpg')} style={styles.image2} />


      {/* <Text style={[styles.title]}>Contact Us</Text> */}
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Your Name *"
  placeholderTextColor="black"

        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Your Email *"
  placeholderTextColor="black"

        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Your Phone Number *"
  placeholderTextColor="black"

        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={[styles.input, { height: 100, color: textColor }]}
        placeholder="Type your message here *"
        value={message}
  placeholderTextColor="black"

        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={[styles.submitButtonText, { color: textColor }]}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',

    bottom:50,
    // padding: 20,
  },
  title: {
    // marginTop:30,

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
  },
  image2: {
    width: '110%',
    height: 150,
  },
  input: {
    top:10,
    width: '95%',
    
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 70,
    backgroundColor: '#e05654',

  },
  submitButtonText: {
    fontSize: 18,
  },
});

export default Contact;
