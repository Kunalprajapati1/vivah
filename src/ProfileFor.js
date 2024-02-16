// import React, {useState, useEffect} from 'react';
// import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import {RadioButton} from 'react-native-paper';
// import {initializeApp} from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';

// const ProfileFor = ({navigation}) => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [showGenderSection, setShowGenderSection] = useState(false);
//   const [selectedGender, setSelectedGender] = useState('');

//   useEffect(() => {
//     const firebaseConfig = {
//       apiKey: 'AIzaSyAAvxsDg18a7O7bVnc_JHFGoX8J3Bo18ZM',
//       authDomain: 'Sanjog-57f3a.firebaseapp.com',
//       projectId: 'Sanjog-57f3a',
//       storageBucket: 'Sanjog-57f3a.appspot.com',
//       messagingSenderId: '916285535946',
//       appId: '1:916285535946:android:25db1a55a9bcf1dd916633',
//     };
//     initializeApp(firebaseConfig);
//   }, []);

//   const handleOptionChange = value => {
//     setSelectedOption(value);
//     setShowGenderSection(true);
//   };

//   const handleGenderSelection = gender => {
//     setSelectedGender(gender);
//   };

//   let generatedUniqueId = null;

//   const handleContinue = async () => {
//     if (!selectedGender) {
//       Alert.alert('Incomplete Information', 'Please select a gender.');
//     } else {
//       try {
//         const profileForRef = firestore().collection('ProfileFor');

//         // If the unique ID is not generated yet, generate it
//         if (!generatedUniqueId) {
//           // Generate the unique ID using Firebase
//           const docRef = await profileForRef.add({
//             selectedOption: selectedOption,
//             selectedGender: selectedGender,
//           });

//           // Set the generated unique ID to use in the next page
//           generatedUniqueId = docRef.id;
//         }

//         // Navigate to 'NameDetail' with the generated unique ID
//         navigation.navigate('NameDetail', {uniqueId: generatedUniqueId});
//       } catch (error) {
//         console.error('Error adding profile data:', error);
//         Alert.alert('Error', 'Failed to submit. Please try again.');
//       }
//     }
//   };
//   const isContinueDisabled = !selectedGender;

//   return (
//     <View style={styles.container}>
//       {/* <Image
//         source={require('../assets/user.png')}
//         style={styles.profileImage}
//       /> */}

//       <Text
//         style={{
//           fontSize: 30,
//           textAlign: 'center',
//           // fontWeight: 'bold',
//           marginTop: 80,
//           marginVertical: 10,
//           color: '#1a1c1e',
//           fontFamily: 'DMSerifDisplay-Regular',
//         }}>
//        Your are creating profile for
//       </Text>

//       <View style={styles.optionContainer}>
//         <RadioButton.Group
//           onValueChange={handleOptionChange}
//           value={selectedOption}>
//           <View style={styles.option}>
//             <RadioButton value="myself" color="#1a1c1e" />
//             <Text style={styles.optionText}>For Myself</Text>
//           </View>

//           <View style={styles.option}>
//             <RadioButton value="family" color="#1a1c1e" />
//             <Text style={styles.optionText}>For My Family</Text>
//           </View>

//           <View style={styles.option}>
//             <RadioButton value="daughter" color="#1a1c1e" />
//             <Text style={styles.optionText}>For My Daughter</Text>
//           </View>

//           <View style={styles.option}>
//             <RadioButton value="brother" color="#1a1c1e" />
//             <Text style={styles.optionText}>For My Brother</Text>
//           </View>

//           <View style={styles.option}>
//             <RadioButton value="friend" color="#1a1c1e" />
//             <Text style={styles.optionText}>For My Friend</Text>
//           </View>
//         </RadioButton.Group>
//       </View>

//       {showGenderSection && (
//         <View style={styles.genderContainer}>
//           <Text
//             style={{
//               fontSize: 28,
//               // fontWeight: 'bold',
//               // right: '65%',
//               textAlign: 'center',
//               marginVertical: 10,
//               color: '#1a1c1e',

//               fontFamily: 'DMSerifDisplay-Regular',

//             }}>
//             Select Gender
//           </Text>
//           <View style={styles.genderOptions}>
//             <View style={{flexDirection: 'row', alignItems: 'center',marginLeft:120}}>
//               <RadioButton
//                 value="male"
//                 status={selectedGender === 'male' ? 'checked' : 'unchecked'}
//                 onPress={() => handleGenderSelection('male')}
//                 color="#1a1c1e"
//               />
//               <Text style={styles.optionText}>Male</Text>
//             </View>
//             <View style={{flexDirection: 'row', alignItems: 'center', marginLeft:120}}>
//               <RadioButton
//                 value="female"
//                 status={selectedGender === 'female' ? 'checked' : 'unchecked'}
//                 onPress={() => handleGenderSelection('female')}
//                 color="#1a1c1e"
//               />
//               <Text style={styles.optionText}>Female</Text>
//             </View>
//           </View>
//         </View>
//       )}

//       <TouchableOpacity
//         onPress={handleContinue}
//         style={[
//           styles.continueButton,
//           {backgroundColor: isContinueDisabled ? '#e05654' : '#e05654'},
//         ]}
//         disabled={isContinueDisabled}>
//         <Text style={styles.continueButtonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,

//     alignItems: 'center',
//     backgroundColor: '#fbd1d1',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 19,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: '#2c3e50',
//   },
//   title2: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     right: '15%',
//     marginVertical: 10,
//     color: '#2c3e50',
//     fontFamily: 'Montserrat-Regular',
//   },
//   optionContainer: {
//     marginTop: 10,
//     marginLeft: '20%',
//     alignContent: 'center',
//     width: '80%',
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     right: '20%',
//     borderWidth: 1,
//     width: '120%',
//     backgroundColor: '#ffffff86',
//     borderRadius: 20,
//   },
//   optionText: {
//     marginLeft: 5,
//     fontSize: 16,
//     fontFamily: 'Montserrat-SemiBold',

//     color: '#e53371',
//   },
//   genderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   genderButton: {
//     padding: 15,

//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: '#3498db',
//   },
//   genderButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   genderContainer: {
//     marginTop: 20,
//   },
//   genderOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     right: '65%',
//     marginVertical: 10,
//   },
//   continueButton: {
//     backgroundColor: '#e0613a',
//     padding: 15,
//     width: '80%',
//     borderRadius: 35,
//     marginTop: 20,
//   },
//   continueButtonText: {
//     fontFamily: 'Montserrat-Regular',
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default ProfileFor;
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const ProfileFor = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showGenderSection, setShowGenderSection] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [loading, setLoading] = useState(false);
  let generatedUniqueId = null;

  useEffect(() => {
    const firebaseConfig = {
      // Your Firebase configuration
    };
    initializeApp(firebaseConfig);
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value);

    // Automatically set the gender based on the selected option
    switch (value) {
      case 'brother':
        setSelectedGender('male');
        break;
      case 'daughter':
        setSelectedGender('female');
        break;
      default:
        // For other options, reset the selected gender
        setSelectedGender('');
        break;
    }

    setShowGenderSection(true);
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = async () => {
    if (!selectedGender) {
      Alert.alert('Incomplete Information', 'Please select a gender.');
    } else {
      try {
        setLoading(true);

        const profileForRef = firestore().collection('ProfileFor');

        if (!generatedUniqueId) {
          const docRef = await profileForRef.add({
            Option: selectedOption,
            Gender: selectedGender,
          });

          generatedUniqueId = docRef.id;
        }

        navigation.navigate('NameDetail', { uniqueId: generatedUniqueId });
      } catch (error) {
        console.error('Error adding profile data:', error);
        Alert.alert('Error', 'Failed to submit. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const isContinueDisabled = !selectedGender;
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/user.png')}
        style={styles.profileImage}
      /> */}

      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 80,
          marginVertical: 10,
          color: '#1a1c1e',
          fontFamily: 'DMSerifDisplay-Regular',
        }}
      >
        Your are creating profile for
      </Text>

      <View style={styles.optionContainer}>
        <RadioButton.Group
          onValueChange={handleOptionChange}
          value={selectedOption}
        >
          <View style={styles.option}>
            <RadioButton value="myself" color="#1a1c1e" />
            <Text style={styles.optionText}>For Myself</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="family" color="#1a1c1e" />
            <Text style={styles.optionText}>For My Family</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="daughter" color="#1a1c1e" />
            <Text style={styles.optionText}>For My Daughter</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="brother" color="#1a1c1e" />
            <Text style={styles.optionText}>For My Brother</Text>
          </View>

          <View style={styles.option}>
            <RadioButton value="friend" color="#1a1c1e" />
            <Text style={styles.optionText}>For My Friend</Text>
          </View>
        </RadioButton.Group>
      </View>

      {showGenderSection && (
        <View style={styles.genderContainer}>
          <Text
            style={{
              fontSize: 28,
              textAlign: 'center',
              marginVertical: 10,
              color: '#1a1c1e',
              fontFamily: 'DMSerifDisplay-Regular',
            }}
          >
            Select Gender
          </Text>
          <View style={styles.genderOptions}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 120 }}
            >
              <RadioButton
                value="male"
                status={selectedGender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => handleGenderSelection('male')}
                color="#1a1c1e"
              />
              <Text style={styles.optionText}>Male</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 120 }}
            >
              <RadioButton
                value="female"
                status={selectedGender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => handleGenderSelection('female')}
                color="#1a1c1e"
              />
              <Text style={styles.optionText}>Female</Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={handleContinue}
        style={[
          styles.continueButton,
          { backgroundColor: isContinueDisabled ? '#e05654' : '#e05654' },
        ]}
        disabled={isContinueDisabled || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
  
      alignItems: 'center',
      backgroundColor: '#fbd1d1',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    title: {
      fontSize: 19,
      textAlign: 'center',
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#2c3e50',
    },
    title2: {
      fontSize: 20,
      fontWeight: 'bold',
      right: '15%',
      marginVertical: 10,
      color: '#2c3e50',
      fontFamily: 'Montserrat-Regular',
    },
    optionContainer: {
      marginTop: 10,
      marginLeft: '20%',
      alignContent: 'center',
      width: '80%',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      right: '20%',
      borderWidth: 1,
      width: '120%',
      backgroundColor: '#ffffff86',
      borderRadius: 20,
    },
    optionText: {
      marginLeft: 5,
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
  
      color: '#e53371',
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
      right: '65%',
      marginVertical: 10,
    },
    continueButton: {
      backgroundColor: '#e0613a',
      padding: 15,
      width: '80%',
      borderRadius: 35,
      marginTop: 20,
    },
    continueButtonText: {
      fontFamily: 'Montserrat-Regular',
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
  });
  
  export default ProfileFor;