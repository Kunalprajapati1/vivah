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
        authDomain: 'vivah-57f3a.firebaseapp.com',
        projectId: "vivah-57f3a",
        storageBucket: "vivah-57f3a.appspot.com",
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
        console.error('Error updating donation:', error);
        Alert.alert('Error', 'Failed to submit. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileImage />

      <View style={styles.inputSection}>
        <Text style={styles.title}>Your Details: </Text>
        <InputLabel label="First Name:" value={firstName} onChangeText={setFirstName} />
        <InputLabel label="Last Name:" value={lastName} onChangeText={setLastName} />
      </View>

      <DOBInputContainer
        label="Date of Birth:"
        dayValue={dayOfBirth}
        monthValue={monthOfBirth}
        yearValue={yearOfBirth}
        onDayChange={setDayOfBirth}
        onMonthChange={setMonthOfBirth}
        onYearChange={setYearOfBirth}
      />

      <ContinueButton onPress={handleContinue} disabled={isContinueDisabled} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    bottom: 5,
    color: '#2c3e50',
  },
  label: {
    top: 10,
    fontSize: 16,
    marginBottom: 25,
    color: '#2c3e50',
  },
  label2: {
    top: 10,
    fontSize: 36,
    marginBottom: 25,
    color: '#2c3e50',
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
    padding: 15,
    borderRadius: 35,
    marginTop: 20,
    width: '80%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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
      value={value}
      onChangeText={onChangeText}
    />
  </>
);

const DOBInputContainer = ({ label, dayValue, monthValue, yearValue, onDayChange, onMonthChange, onYearChange }) => (
  <View style={styles.dobContainer}>
    <Text style={styles.label2}>{label}</Text>
    <View style={styles.dobInputs}>
      <DOBInput placeholder="DD" value={dayValue} onChangeText={onDayChange} />
      <DOBInput placeholder="MM" value={monthValue} onChangeText={onMonthChange} />
      <DOBInput placeholder="YYYY" value={yearValue} onChangeText={onYearChange} />
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
    style={[styles.continueButton, { backgroundColor: disabled ? '#95a5a6' : '#34dbcd' }]}
    disabled={disabled}
  >
    <Text style={styles.continueButtonText}>Continue</Text>
  </TouchableOpacity>
);

export default NameDetail;
