
// // import React, { useState, useEffect } from 'react';
// // import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator,Image, ScrollView } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import auth from '@react-native-firebase/auth';
// // import { initializeApp } from '@react-native-firebase/app';

// // const firebaseConfig = {
// //   // Your Firebase config details
// // };

// // if (!auth().app) {
// //   initializeApp(firebaseConfig);
// // }

// // const ChangePassword = () => {
// //   const [email, setEmail] = useState('');
// //   const [currentPassword, setCurrentPassword] = useState('');
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   useEffect(() => {
// //     const getEmail = async () => {
// //       const storedEmail = await AsyncStorage.getItem('userEmail');
// //       if (storedEmail) {
// //         setEmail(storedEmail);
// //       }
// //     };

// //     getEmail();
// //   }, []);

// //   const reauthenticate = (currentPassword) => {
// //     const user = auth().currentUser;
// //     const cred = auth.EmailAuthProvider.credential(email, currentPassword);
// //     return user.reauthenticateWithCredential(cred);
// //   };
  


// // const handleChangePassword = () => {
// //   if (newPassword !== confirmPassword) {
// //     Alert.alert('Error', 'Passwords do not match');
// //     return;
// //   }

// //   setIsLoading(true);

// //   reauthenticate(currentPassword)
// //     .then(() => {
// //       const user = auth().currentUser;
// //       user.updatePassword(newPassword)
// //         .then(() => {
// //           Alert.alert('Success', 'Password changed successfully');
// //           setCurrentPassword('');
// //           setNewPassword('');
// //           setConfirmPassword('');
// //         })
// //         .catch(error => {
// //           Alert.alert('Error', error.message);
// //         })
// //         .finally(() => {
// //           setIsLoading(false);
// //         });
// //     })
// //     .catch(error => {
// //       if (error.code === 'auth/wrong-password') {
// //         Alert.alert('Error', 'The current password is incorrect');
// //       } else {
// //         Alert.alert('Error', error.message);
// //       }
// //       setIsLoading(false);
// //     });
// // };


// //   const handleTogglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };
// //   return (

// //     <View style={styles.container}>
// //         <Image source={require('../assets/app_images/upp.jpg')} style={styles.image2} />
// //         <ScrollView>

// //       <Text style={styles.headerText}>Changing password for email </Text>
// //       <Text style={styles.headerText2}>"{email}"</Text>


// //       <Text style={styles.label}>Current Password</Text>
// //       <TextInput
// //         style={styles.input}
// //         secureTextEntry={!showPassword}
// //         value={currentPassword}
// //         onChangeText={setCurrentPassword}
// //       />
// //  <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
// //         <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
// //       </TouchableOpacity>
// //       <Text style={styles.label}>New Password</Text>
// //       <TextInput
// //         style={styles.input}
// //         secureTextEntry={!showPassword}

// //         value={newPassword}
// //         onChangeText={setNewPassword}
// //       />
// //  <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
// //         <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
// //       </TouchableOpacity>
// //       <Text style={styles.label}>Confirm New Password</Text>
// //       <TextInput
// //         style={styles.input}
       
// //         value={confirmPassword}
// //         onChangeText={setConfirmPassword}
// //         secureTextEntry={!showPassword}

// //       />
// //  <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
// //         <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={isLoading}>
// //         {isLoading ? (
// //           <ActivityIndicator size="small" color="#fff" />
// //         ) : (
// //           <Text style={styles.buttonText}>Change Password</Text>
// //         )}
// //       </TouchableOpacity>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default ChangePassword;

// // const styles = StyleSheet.create({
// //   container: {

// //     flex: 1,
// //     backgroundColor:'white',
// //     // justifyContent: 'center',
// //     alignItems: 'center',

// //    bottom:40,
// //   },
// //   headerText: {

// //     fontFamily: 'Montserrat-SemiBold',
// //     alignSelf: 'center',
// //     fontSize: 18,

// //     // marginBottom: 20,
// //     color: 'black',
// //   },

// //   headerText2: {

// //     fontFamily: 'Montserrat-SemiBold',
// //     // alignSelf: 'center',
// //     fontSize: 14,
// // marginLeft:50,
// //     marginBottom: 20,
// //     color: '#e05654',
// //   },

// //   label: {
// //     marginTop:20,
// //     alignSelf:'flex-start',
// //     fontFamily: 'Montserrat-SemiBold',
// //     paddingHorizontal: 10,
// //     letterSpacing: 1,
// //     marginBottom: 10,
// //     textDecorationLine: 'underline',
// //     fontSize: 17,
// //     textDecorationColor: 'red',
// //     color:'black',

// //   },
// //   input: {
  
// //     width: '95%',
// //     color:'black',
    
// //     height: 50,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 20,
// //     padding: 10,
// //     marginBottom: 20,
// //   },
// //   button: {
// //     marginTop:40,
// //     paddingVertical: 15,
// //     paddingHorizontal: 100,
// //     borderRadius: 30,

// //     backgroundColor: '#e05654',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //   },
// //   togglePasswordButton: {
// //     alignSelf: 'flex-end',
// //     marginTop: -25,
// //     bottom: 20,
// //   },
// //   togglePasswordButtonText: {
// //     textDecorationLine: 'underline',
// //     right: 30,
// //     bottom: 7,
// //     color: '#000', // Black color for toggle password text
// //   },
// //   image2: {
// //     width: '120%',
// //     height: 180,
// //   },
// // });


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';
// import { initializeApp } from '@react-native-firebase/app';
// import { useNavigation } from '@react-navigation/native';

// useEffect(() => {
//   const handleBackPress = () => {
//     navigation.goBack(); // Navigate to the previous page
//     return true; // Prevent default behavior (closing the app)
//   };

//   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//   return () => {
//     backHandler.remove(); // Cleanup the event listener
//   };
// }, [navigation]);
// const firebaseConfig = {
//   // Your Firebase config details
// };

// if (!auth().app) {
//   initializeApp(firebaseConfig);
// }

// const ChangePassword = () => {
//   const [email, setEmail] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const handleBackPress = () => {
//       // Customize what happens when the back button is pressed
//       ToastAndroid.show('Back button pressed', ToastAndroid.SHORT);
//       return true; // Prevent default behavior (closing the app)
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//     return () => {
//       backHandler.remove(); // Cleanup the event listener
//     };
//   }, []);
//   useEffect(() => {
//     const getEmail = async () => {
//       try {
//         const storedEmail = await AsyncStorage.getItem('userEmail');
//         if (storedEmail) {
//           setEmail(storedEmail);
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load email');
//       } finally {
//         setIsPageLoading(false);
//       }
//     };

//     getEmail();
//   }, []);

//   const reauthenticate = (currentPassword) => {
//     const user = auth().currentUser;
//     const cred = auth.EmailAuthProvider.credential(email, currentPassword);
//     return user.reauthenticateWithCredential(cred);
//   };

//   const handleChangePassword = () => {
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     setIsLoading(true);

//     reauthenticate(currentPassword)
//       .then(() => {
//         const user = auth().currentUser;
//         user.updatePassword(newPassword)
//           .then(() => {
//             Alert.alert('Success', 'Password changed successfully');
//             setCurrentPassword('');
//             setNewPassword('');
//             setConfirmPassword('');
//           })
//           .catch(error => {
//             Alert.alert('Error', error.message);
//           })
//           .finally(() => {
//             setIsLoading(false);
//           });
//       })
//       .catch(error => {
//         if (error.code === 'auth/wrong-password') {
//           Alert.alert('Error', 'The current password is incorrect');
//         } else {
//           Alert.alert('Error', error.message);
//         }
//         setIsLoading(false);
//       });
//   };

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   if (isPageLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#e05654" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/app_images/upp.jpg')} style={styles.image2} />
//       <ScrollView>
//         <Text style={styles.headerText}>Changing password for email </Text>
//         <Text style={styles.headerText2}>"{email}"</Text>
//         <Text style={styles.label}>Current Password</Text>
//         <TextInput
//           style={styles.input}
//           secureTextEntry={!showPassword}
//           value={currentPassword}
//           onChangeText={setCurrentPassword}
//         />
//         <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
//           <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.label}>New Password</Text>
//         <TextInput
//           style={styles.input}
//           secureTextEntry={!showPassword}
//           value={newPassword}
//           onChangeText={setNewPassword}
//         />
//         <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
//           <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.label}>Confirm New Password</Text>
//         <TextInput
//           style={styles.input}
//           secureTextEntry={!showPassword}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />
//         <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
//           <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={isLoading}>
//           {isLoading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Change Password</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default ChangePassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     bottom: 40,
//   },
//   headerText: {
//     fontFamily: 'Montserrat-SemiBold',
//     alignSelf: 'center',
//     fontSize: 18,
//     color: 'black',
//   },
//   headerText2: {
//     fontFamily: 'Montserrat-SemiBold',
//     fontSize: 14,
//     marginLeft: 60,
//     marginBottom: 20,
//     color: '#e05654',
//   },
//   label: {
//     marginTop: 20,
//     alignSelf: 'flex-start',
//     fontFamily: 'Montserrat-SemiBold',
//     paddingHorizontal: 10,
//     letterSpacing: 1,
//     marginBottom: 10,
//     textDecorationLine: 'underline',
//     fontSize: 17,
//     textDecorationColor: 'red',
//     color: 'black',
//   },
//   input: {
//     width: '95%',
//     color: 'black',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     padding: 10,
//     marginBottom: 20,
//   },
//   button: {
//     marginTop: 40,
//     paddingVertical: 15,
//     paddingHorizontal: 100,
//     borderRadius: 30,
//     backgroundColor: '#e05654',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   togglePasswordButton: {
//     alignSelf: 'flex-end',
//     marginTop: -25,
//     bottom: 20,
//   },
//   togglePasswordButtonText: {
//     textDecorationLine: 'underline',
//     right: 30,
//     bottom: 7,
//     color: '#000',
//   },
//   image2: {
//     width: '120%',
//     height: 180,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator, Image, ScrollView, BackHandler, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

const firebaseConfig = {
  // Your Firebase config details
};

if (!auth().app) {
  initializeApp(firebaseConfig);
}

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack(); // Navigate to the previous page
      return true; // Prevent default behavior (closing the app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [navigation]);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load email');
      } finally {
        setIsPageLoading(false);
      }
    };

    getEmail();
  }, []);

  const reauthenticate = (currentPassword) => {
    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    reauthenticate(currentPassword)
      .then(() => {
        const user = auth().currentUser;
        user.updatePassword(newPassword)
          .then(() => {
            Alert.alert('Success', 'Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          })
          .catch(error => {
            Alert.alert('Error', error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'The current password is incorrect');
        } else {
          Alert.alert('Error', error.message);
        }
        setIsLoading(false);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isPageLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#e05654" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/app_images/upp.jpg')} style={styles.image2} />
      <ScrollView>
        <Text style={styles.headerText}>Changing password for email </Text>
        <Text style={styles.headerText2}>"{email}"</Text>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    bottom: 40,
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
  },
  headerText2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginLeft: 60,
    marginBottom: 20,
    color: '#e05654',
  },
  label: {
    marginTop: 20,
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 10,
    letterSpacing: 1,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontSize: 17,
    textDecorationColor: 'red',
    color: 'black',
  },
  input: {
    width: '95%',
    color: 'black',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    backgroundColor: '#e05654',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  togglePasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -25,
    bottom: 20,
  },
  togglePasswordButtonText: {
    textDecorationLine: 'underline',
    right: 30,
    bottom: 7,
    color: '#000',
  },
  image2: {
    width: '120%',
    height: 180,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
