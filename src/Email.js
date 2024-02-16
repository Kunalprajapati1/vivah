// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import '@react-native-firebase/auth';
// import {initializeApp} from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth'; // Import auth from @react-native-firebase/auth
// import {ScrollView} from 'react-native-gesture-handler';

// const Email = ({navigation, route}) => {
//   const {uniqueId} = route.params; // Uncomment this line to get uniqueId from route.params

//   const [email, setEmail] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [selectedReligion, setSelectedReligion] = useState('');
//   const [password, setPassword] = useState('');
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!isPasswordVisible);
//   };
//   useEffect(() => {
//     const firebaseConfig = {
//       apiKey: 'AIzaSyAAvxsDg18a7O7bVnc_JHFGoX8J3Bo18ZM',
//       authDomain: 'Sanjog-57f3a.firebaseapp.com',
//       projectId: 'Sanjog-57f3a',
//       storageBucket: 'Sanjog-57f3a.appspot.com',
//       messagingSenderId: '916285535946',
//       appId: '1:916285535946:android:25db1a55a9bcf1dd916633',
//     };
//     initializeApp(firebaseConfig, {auth: true}); // Include the auth module
//   }, []);

//   const handleContinue = async () => {
//     if (!selectedReligion) {
//       Alert.alert('Incomplete Information', 'Please select a religion.');
//     } else {
//       try {
//         const userCredential = await auth().createUserWithEmailAndPassword(
//           email,
//           password,
//         );

//         // Access the user details using userCredential.user
//         const user = userCredential.user;

//         const profileForRef = firestore().collection('ProfileFor');

//         // Use uniqueId when updating the document in Firestore
//         await profileForRef.doc(uniqueId).update({
//           email: email,
//           password: password,
//           selectedReligion: selectedReligion,
//           mobileNumber: mobileNumber,
//         });

//         // Navigate to 'City' without showing an alert
//         navigation.navigate('City', {uniqueId});
//       } catch (error) {
//         console.error('Error updating profile data:', error);
//         Alert.alert('Error', 'Failed to submit. Please try again.');
//       }
//     }
//   };

//   return (
//     <ScrollView style={{backgroundColor: '#1c1827'}}>
//       <View style={styles.container}>
//         <Text style={styles.title}>
//           An Active Email and Mobile is important for registration
//         </Text>
        

//         <View style={styles.inputSection}>
//           <Text style={styles.label}>Email </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor='#ffffff33'

//             value={email}
//             onChangeText={text => setEmail(text)}
//             keyboardType="email-address"
//             accessibilityLabel="Email Input"
//           />
//           <Text style={styles.label}>Password</Text>
//           <View style={styles.passwordContainer}>
          
//           <TextInput
//             style={styles.input}
//             placeholderTextColor='#ffffff33'
            
//             placeholder="Password"
//             secureTextEntry={!isPasswordVisible}

//             value={password}
//             onChangeText={text => setPassword(text)}
//           />
//             <TouchableOpacity onPress={togglePasswordVisibility}>
//                 <View style={styles.eyeIcon}>
//                   <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨'}</Text>
//                 </View>
//               </TouchableOpacity>
//         </View>
//         </View>

//         <View style={styles.inputSection2}>
//           <Text style={styles.label}>Mobile Number </Text>
//           <View style={styles.mobileNumberContainer}>
//             {/* <TextInput
//               style={styles.countryCodeInput}
//               placeholder="+91"
//               editable={false}
//               accessibilityLabel="Country Code Input"
//             /> */}
//             <TextInput
//               style={[styles.input, styles.mobileInput]}
//               placeholder="Enter your mobile number"
//               placeholderTextColor='#ffffff33'
              
//               value={mobileNumber}
//               onChangeText={text => setMobileNumber(text)}
//               keyboardType="phone-pad"
//               accessibilityLabel="Mobile Number Input"
//             />
//           </View>
//         </View>

//         <View style={styles.inputSection3}>
//           <Text style={styles.label}>Religion</Text>
//           <Picker
//             selectedValue={selectedReligion}
//             onValueChange={itemValue => setSelectedReligion(itemValue)}
//             style={styles.picker}
//             accessibilityLabel="Religion Picker">
//             <Picker.Item style={{ color:'#e05654', fontFamily:'Montserrat-Regular'}} label="Select your religion →"  />
//             <Picker.Item style={{ color:'#e05654', fontFamily:'Montserrat-Regular'}}  label="Hindu" value="Hindu" />
//             <Picker.Item  style={{ color:'#e05654', fontFamily:'Montserrat-Regular'}} label="Christian" value="Christian" />
//             <Picker.Item style={{ color:'#e05654', fontFamily:'Montserrat-Regular'}}  label="Muslim" value="Muslim" />
//           </Picker>
//         </View>

//         <TouchableOpacity
//           onPress={handleContinue}
//           style={styles.submitButton}
//           accessibilityLabel="Submit Button">
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   eyeIcon: {
//     marginLeft: -17,
//     marginTop: -10,
//     fontSize: 22,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   container: {
//     marginTop:40,
//     flex: 1,
//     padding: 50,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     top: 20,
//     borderRadius: 50,
//     marginBottom: 30,
//   },
//   inputSection: {
//     marginTop:20,
//     marginBottom: 20,
//     width: '100%',
//     height: 50,
//     borderRadius: 30,
//   },
//   inputSection2: {
//     marginTop: '60%',
//     marginBottom: 30,
//     width: '100%',
//     height: 50, // Set a consistent height
//     borderRadius: 30,
//   },
//   inputSection3: {
//     marginTop: 60,
//     width: '100%',
//     height: 50, // Set a consistent height
//     borderRadius: 30,
//   },
//   mobileNumberContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   countryCodeInput: {
//     width: 70,
//     height: 60,
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 10,
//     marginRight: 10,
//   },
//   title: {
//     marginBottom: '8%',
//     fontSize: 19,
//     fontFamily: 'Montserrat-Regular',
//     textAlign: 'center',
//     color: '#e6716f',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#fbd1d1',
//     fontFamily: 'Montserrat-Regular',

//   },
//   input: {
//     height: 60,
//     borderWidth: 1,
//     borderRadius: 15,
//     marginBottom: 30,
//     padding: 10,
//     fontSize: 16,
//     width: '100%',
//     color: 'white', // Set text color to white
//     borderColor: 'white', // Set border color to white
//     placeholderTextColor: 'white', // Set a consistent width
//     fontFamily: 'Montserrat-Regular'
//   },
//   mobileInput: {
//     fontFamily: 'Montserrat-Regular',
//     flex: 1,
//     height: 60,
//   },
//   picker: {
//     borderWidth: 5,
//     borderRadius: 25,
//     width: '100%',
//     fontFamily: 'Montserrat-Regular'
//   },
//   submitButton: {
//     backgroundColor: '#e05654',
//     padding: 15,
//     borderRadius: 30,
//     width: '80%',
//     marginTop: 80,
//   },
//   submitButtonText: {
//     fontFamily:"Montserrat-Regular",
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default Email;

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Email = ({ navigation, route }) => {
  const { uniqueId } = route.params;

  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      // your firebase config
    };
    initializeApp(firebaseConfig, { auth: true });
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const handleContinue = async () => {
    if (!selectedReligion) {
      Alert.alert('Incomplete Information', 'Please select a religion.');
    } else if (!/^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|icloud\.com|yahoo\.com)$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address .');
    } else {
      try {
        setLoading(true);
  
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
  
        // Send email verification link
        await auth().currentUser.sendEmailVerification();
  
        // Access the user details using userCredential.user
        const user = userCredential.user;
  
        const profileForRef = firestore().collection('ProfileFor');
  
        await profileForRef.doc(uniqueId).update({
          email: email,
          password: password,
          selectedReligion: selectedReligion,
          mobileNumber: mobileNumber,
        });
  
        setLoading(false);
  
        Alert.alert(
          'Success',
          'Account created successfully. Please check your email for verification.',
        );
  
        navigation.navigate('City', { uniqueId });
      } catch (error) {
        console.error('Error updating profile data:', error);
        Alert.alert('Error', 'Failed to submit. Please try again.');
        setLoading(false);
      }
    }
  };
  
  return (
    <ScrollView style={{backgroundColor: '#1c1827'}}>
      <View style={styles.container}>
        <Text style={styles.title}>
          An Active Email and Mobile is important for registration
        </Text>
        

        <View style={styles.inputSection}>
          <Text style={styles.label}>Email </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor='#ffffff33'

            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            accessibilityLabel="Email Input"
          />
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
          
          <TextInput
            style={styles.input}
            placeholderTextColor='#ffffff33'
            
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}

            value={password}
            onChangeText={text => setPassword(text)}
          />
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <View style={styles.eyeIcon}>
                  <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨'}</Text>
                </View>
              </TouchableOpacity>
        </View>
        </View>

        <View style={styles.inputSection2}>
          <Text style={styles.label}>Mobile Number </Text>
          <View style={styles.mobileNumberContainer}>
         
            <TextInput
              style={[styles.input, styles.mobileInput]}
              placeholder="Enter your mobile number"
              placeholderTextColor='#ffffff33'
              
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
              keyboardType="phone-pad"
              accessibilityLabel="Mobile Number Input"
            />
          </View>
        </View>

        <View style={styles.inputSection3}>
          <Text style={styles.label}>Religion</Text>
          <Picker
            selectedValue={selectedReligion}
            onValueChange={itemValue => setSelectedReligion(itemValue)}
            style={styles.picker}
            accessibilityLabel="Religion Picker">
            <Picker.Item style={{ color:'#e05654', fontFamily:'Montserrat-Regular'}} label="Select your religion →"  />
            <Picker.Item style={{ color:'#e05654', fontFamily:'Montserrat-Regular'}}  label="Hindu" value="Hindu" />
           
          </Picker>
        </View>

        
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.submitButton}
          accessibilityLabel="Submit Button"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  eyeIcon: {
    marginLeft: -17,
    marginTop: -10,
    fontSize: 22,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop:40,
    flex: 1,
    padding: 50,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    top: 20,
    borderRadius: 50,
    marginBottom: 30,
  },
  inputSection: {
    marginTop:20,
    marginBottom: 20,
    width: '100%',
    height: 50,
    borderRadius: 30,
  },
  inputSection2: {
    marginTop: '60%',
    marginBottom: 30,
    width: '100%',
    height: 50, // Set a consistent height
    borderRadius: 30,
  },
  inputSection3: {
    marginTop: 60,
    width: '100%',
    height: 50, // Set a consistent height
    borderRadius: 30,
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeInput: {
    width: 70,
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
  },
  title: {
    marginBottom: '8%',
    fontSize: 19,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '#e6716f',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fbd1d1',
    fontFamily: 'Montserrat-Regular',

  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 30,
    padding: 10,
    fontSize: 16,
    width: '100%',
    color: 'white', // Set text color to white
    borderColor: 'white', // Set border color to white
    placeholderTextColor: 'white', // Set a consistent width
    fontFamily: 'Montserrat-Regular'
  },
  mobileInput: {
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    height: 60,
  },
  picker: {
    borderWidth: 5,
    borderRadius: 25,
    width: '100%',
    fontFamily: 'Montserrat-Regular'
  },
  submitButton: {
    backgroundColor: '#e05654',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    marginTop: 80,
  },
  submitButtonText: {
    fontFamily:"Montserrat-Regular",
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Email;
