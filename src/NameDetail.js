import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
const NameDetail = ({ route, navigation }) => {
  const { uniqueId } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dayOfBirth, setDayOfBirth] = useState('');
  const [monthOfBirth, setMonthOfBirth] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

  useEffect(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyAAvxsDg18a7O7bVnc_JHFGoX8J3Bo18ZM",
        authDomain: 'Sanjog-57f3a.firebaseapp.com',
        projectId: "Sanjog-57f3a",
        storageBucket: "Sanjog-57f3a.appspot.com",
        messagingSenderId: '916285535946',
        appId: "1:916285535946:android:25db1a55a9bcf1dd916633",
      };
    initializeApp(firebaseConfig);
  }, []);



  const isContinueDisabled = !firstName || !lastName || !dayOfBirth || !monthOfBirth || !yearOfBirth;
  const handleContinue = async () => {
    if (isContinueDisabled) {
      Alert.alert('Incomplete Information', 'Please fill in all the fields.');
    } else {
      try {
        const donationRef = firestore().collection('ProfileFor');
  
        // Use uniqueId when updating the document in Firestore
        await donationRef.doc(uniqueId).update({
          firstName: firstName,
          lastName: lastName,
          dayOfBirth: dayOfBirth,
          monthOfBirth: monthOfBirth,
          yearOfBirth: yearOfBirth,
        });
  
        navigation.navigate('Email', { uniqueId});
      } catch (error) {
        console.error('Error updating donation', error);
        Alert.alert('Error', 'Failed to submit. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

    <View style={{ marginTop:90}}>
      {/* <ProfileImage /> */}

      <View style={styles.inputSection}>
        <Text style={{   fontSize: 36,
    bottom: 5,
    color: '#e05654',
    fontFamily:'DMSerifDisplay-Regular'
    }}>Enter Your Details </Text>
    <View style={{ marginTop:20 }}>
        <InputLabel  label="First Name" value={firstName} onChangeText={setFirstName} />
        <InputLabel label="Last Name" value={lastName} onChangeText={setLastName} />

    </View>
      </View>

      <DOBInputContainer
        label="Date of Birth"
        dayValue={dayOfBirth}
        monthValue={monthOfBirth}
        yearValue={yearOfBirth}
        onDayChange={setDayOfBirth}
        onMonthChange={setMonthOfBirth}
        onYearChange={setYearOfBirth}
      />

      <ContinueButton onPress={handleContinue} disabled={isContinueDisabled} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fbd1d1',
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
    width: '100%',
  },
  dobContainer: {
    marginBottom: 20,
    width: '100%',
  },
  dobInputs: {
    // backgroundColor:'yellow',
    width: "85%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    bottom: 5,
    color: '#e05654',
    fontFamily:'Montserrat-SemiBold'

  },
  label: {
    top: 10,
    fontSize: 16,
    marginBottom: 25,
    color: '#e05654',
    fontFamily:'Montserrat-SemiBold'

  },
  label2: {
    top: 10,
    fontSize: 16,
    marginBottom: 25,
    color: '#e05654',
    fontFamily:'Montserrat-SemiBold'
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
  },
  dobInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  continueButton: {
paddingHorizontal:20,
    padding: 15,
    borderRadius: 15,
    marginLeft:10,
    marginTop: 20,
    width: '80%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal:80,
    textAlign: 'center',
  },
  dobInputPlaceholder: {
    // other styles for the placeholder
    color: 'white', // Set the placeholder text color to white
  },
});

// Extracted components

const ProfileImage = () => (
  <Image source={require('../assets/user.png')} style={styles.profileImage} />
);

const InputLabel = ({ label, value, onChangeText }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Enter your ${label.toLowerCase().replace(':', '')}`}
      placeholderTextColor='#2b2b2b'
      value={value}
      onChangeText={onChangeText}
    />
  </>
);

const DOBInputContainer = ({ label, dayValue, monthValue, yearValue, onDayChange, onMonthChange, onYearChange }) => (
  <View style={styles.dobContainer}>
    <Text style={styles.label2}>{label}</Text>
    <View style={styles.dobInputs}>
      <DOBInput placeholder="DD" value={dayValue} 
      placeholderTextColor='white'
       onChangeText={onDayChange} />
      <DOBInput placeholder="MM" value={monthValue} 
      placeholderTextColor={styles.dobInputPlaceholder.color}
       onChangeText={onMonthChange} />
      <DOBInput placeholder="YYYY" value={yearValue} 
      placeholderTextColor={styles.dobInputPlaceholder.color}
       onChangeText={onYearChange} />
    </View>
  </View>
);

const DOBInput = ({ placeholder, value, onChangeText }) => (
  <TextInput
    style={[styles.input, styles.dobInput]}
    placeholder={placeholder}
    value={value}
    keyboardType="phone-pad"
    onChangeText={onChangeText}
  />
);

const ContinueButton = ({ onPress, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.continueButton, { backgroundColor: disabled ? '#232337' : '#2e2c4d' }]}
    disabled={disabled}
  >
    <Text style={styles.continueButtonText}>Continue</Text>
  </TouchableOpacity>
);

export default NameDetail;
