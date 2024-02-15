import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const AddUser = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [additionalFieldsVisible, setAdditionalFieldsVisible] = useState(false);

  const [collegeName, setCollegeName] = useState('');
  const [dayOfBirth, setDayOfBirth] = useState('');
  const [diet, setDiet] = useState('');
  const [height, setHeight] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [monthOfBirth, setMonthOfBirth] = useState('');
  const [qualification, setQualification] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSubCommunity, setSelectedSubCommunity] = useState('');
  const [workAs, setWorkAs] = useState('');
  const [workAsOtherDetails, setWorkAsOtherDetails] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

//   const handleSignUp = async () => {
//     try {
//       setLoading(true);

//       // Sign up the user with email and password
//       const { user } = await auth().createUserWithEmailAndPassword(email, password);

//       // Reset input fields after sign up
//       setFirstName('');
//       setLastName('');
//       setEmail('');
//       setPassword('');

//       // Display additional fields after successful signup
//       setAdditionalFieldsVisible(true);

//       Alert.alert('User Created', 'The user has been successfully created.');
//     } catch (error) {
//       console.error('Error creating user:', error);
//       Alert.alert('Error', 'Failed to create the user. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
const handleSignUp = async () => {
    try {
      setLoading(true);
  
      // Sign up the user with email and password
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
  
      // Reset input fields after sign up
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
  
      // Auto-fill the additional fields
      setCollegeName('Default College');
      setDayOfBirth('01');
      setDiet('Default Diet');
      // ... Set other default values for additional fields
  
      // Display additional fields after successful signup
      setAdditionalFieldsVisible(true);
  
      Alert.alert('User Created', 'The user has been successfully created.');
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create the user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Sign Up</Text>
      </View>

   
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />


      {additionalFieldsVisible && (
        <>
          <TextInput
            style={styles.input}
            placeholder="College Name"
            value={collegeName}
            onChangeText={(text) => setCollegeName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Day of Birth"
            value={dayOfBirth}
            onChangeText={(text) => setDayOfBirth(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Diet"
            value={diet}
            onChangeText={(text) => setDiet(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={(text) => setHeight(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Marital Status"
            value={maritalStatus}
            onChangeText={(text) => setMaritalStatus(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Month of Birth"
            value={monthOfBirth}
            onChangeText={(text) => setMonthOfBirth(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Qualification"
            value={qualification}
            onChangeText={(text) => setQualification(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Selected City"
            value={selectedCity}
            onChangeText={(text) => setSelectedCity(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Selected Gender"
            value={selectedGender}
            onChangeText={(text) => setSelectedGender(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Selected Option"
            value={selectedOption}
            onChangeText={(text) => setSelectedOption(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Selected Religion"
            value={selectedReligion}
            onChangeText={(text) => setSelectedReligion(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Selected State"
            value={selectedState}
            onChangeText={(text) => setSelectedState(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Selected Sub Community"
            value={selectedSubCommunity}
            onChangeText={(text) => setSelectedSubCommunity(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Work As"
            value={workAs}
            onChangeText={(text) => setWorkAs(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Work As Other Details"
            value={workAsOtherDetails}
            onChangeText={(text) => setWorkAsOtherDetails(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Year of Birth"
            value={yearOfBirth}
            onChangeText={(text) => setYearOfBirth(text)}
          />
        </>
      )}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#e05654" />
        ) : (
          <Text style={styles.signupButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
 
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
//   header: {
//     fontSize: 24,
//     color: '#ffffff',
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     width: '80%',
//   },
  signupButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#e05654',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  container: {
    flex: 1,
  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e05654',
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
  
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  signupButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom:400,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#e05654',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default AddUser;
