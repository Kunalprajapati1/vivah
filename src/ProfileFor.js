import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const ProfileFor = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showGenderSection, setShowGenderSection] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

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

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setShowGenderSection(true);
  };
 
  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

   let generatedUniqueId = null;

const handleContinue = async () => {
  if (!selectedGender) {
    Alert.alert('Incomplete Information', 'Please select a gender.');
  } else {
    try {
      const profileForRef = firestore().collection('ProfileFor');

      // If the unique ID is not generated yet, generate it
      if (!generatedUniqueId) {
        // Generate the unique ID using Firebase
        const docRef = await profileForRef.add({
          selectedOption: selectedOption,
          selectedGender: selectedGender,
        });

        // Set the generated unique ID to use in the next page
        generatedUniqueId = docRef.id;
      }

      // Navigate to 'NameDetail' with the generated unique ID
      navigation.navigate('NameDetail', { uniqueId: generatedUniqueId });
    } catch (error) {
      console.error('Error adding profile data:', error);
      Alert.alert('Error', 'Failed to submit. Please try again.');
    }
  }
};
  const isContinueDisabled = !selectedGender;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/user.png')}
        style={styles.profileImage}
      />

      <Text style={styles.title}>Whom are you creating the profile for?</Text>

      <View style={styles.optionContainer}>
        <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
          <View style={styles.option}>
            <RadioButton value="myself" color="#3498db" />
            <Text style={styles.optionText}>For Myself</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="family" color="#3498db" />
            <Text style={styles.optionText}>For My Family</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="daughter" color="#3498db" />
            <Text style={styles.optionText}>For My Daughter</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="brother" color="#3498db" />
            <Text style={styles.optionText}>For My Brother</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="friend" color="#3498db" />
            <Text style={styles.optionText}>For My Friend</Text>
          </View>
        </RadioButton.Group>
      </View>

      {showGenderSection && (
        <View style={styles.genderContainer}>
          <Text style={styles.title2}>Select Gender</Text>
          <View style={styles.genderOptions}>
  <RadioButton
    value="male"
    status={selectedGender === 'male' ? 'checked' : 'unchecked'}
    onPress={() => handleGenderSelection('male')}
    color="#3498db"
  />
  <Text style={styles.optionText}>Male</Text>

  <RadioButton
    value="female"
    status={selectedGender === 'female' ? 'checked' : 'unchecked'}
    onPress={() => handleGenderSelection('female')}
    color="#3498db"
  />
  <Text style={styles.optionText}>Female</Text>
</View>
        </View>
      )}

    
      <TouchableOpacity
       onPress={handleContinue} 
        style={[styles.continueButton, { backgroundColor: isContinueDisabled ? '#95a5a6' : '#34d0db' }]}
        disabled={isContinueDisabled}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    textAlign:'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2c3e50',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    right:'15%',
    marginVertical: 10,
    color: '#2c3e50',
  },
  optionContainer: {
    marginTop: 10,
    
   
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    right:'20%',
    borderWidth:1,
    width:'120%',
    backgroundColor:'#c7c1c137',
    borderRadius:20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    
    color: '#2c3e50',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  
  },
  genderButton: {
    padding: 15,
    
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  genderButtonText: {
    color: '#fff',
    fontSize: 16,
    
  },
  genderContainer: {
    marginTop: 20,
  },
  genderOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    right:'40%',
    marginVertical: 10,
  },
  continueButton: {
    backgroundColor: '#e0613a',
    padding: 15,
    width:'80%',
    borderRadius: 35,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProfileFor;
