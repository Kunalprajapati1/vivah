
// import React, { useState, useEffect } from 'react';
// import auth from '@react-native-firebase/auth';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Image,
//   Alert,
//   BackHandler,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firebase from '@react-native-firebase/app';

// const BicholiaLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();

//   useEffect(() => {
//     checkIfLoggedIn();

//     // Add event listener for hardware back button
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//     return () => {
//       // Remove event listener when component is unmounted
//       backHandler.remove();
//     };
//   }, []);

//   const handleBackPress = () => {
//     // Navigate back to 'Land' page when the hardware back button is pressed
//     navigation.navigate('Land');
//     return true; // Prevent default behavior (closing the app)
//   };
//   const checkIfLoggedIn = async () => {
//     try {
//       const userToken = await AsyncStorage.getItem('userToken');
//       if (userToken) {
//         // User is already logged in, navigate to 'User' screen
//         navigation.navigate('User', { uniqueId: userToken });
//       }
//     } catch (error) {
//       console.error('Error checking login status:', error);
//     }
//   };
//   useEffect(() => {
//     // Check if the user is already logged in
//     const unsubscribe = auth().onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in
//         // navigation.navigate('BicholiaProfile');
//       }
//     });

//     return () => unsubscribe();
//   }, [navigation]);

  

//   const handleLogin = async () => {
//     try {
//       if (!email || !password) {
//         Alert.alert('Invalid Input', 'Please enter both email and password to log in.');
//         return;
//       }
  
//       // Check if the entered email and password match the admin credentials
//       if (email === 'admin@login.com' && password === 'Kunal@2002') {
//         // Navigate to 'AdminLogin' screen
//         navigation.navigate('Adminlogin');
//       } else {
//         const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
//         const user = userCredential.user;
  
//         // Check if the user's email is verified
//         if (user && !user.emailVerified) {
//           Alert.alert('Email Verification', 'Please verify your email before logging in.');
//           // You may also want to provide a button to resend the verification email if needed.
//           return;
//         }
  
//         const userToken = user.uid;
  
//         // Save the user token and email securely
//         await AsyncStorage.setItem('userToken', userToken);
//         await AsyncStorage.setItem('userEmail', email);
  
//         // Navigate to 'User' screen
//         navigation.navigate('BicholiaProfile', { uniqueId: userToken });
//       }
  
//     } catch (error) {
//       console.error('Error during login:', error);
//       Alert.alert('Error', 'Invalid email or password');
//     }
//   };
  
  

//   const handleForgotPassword = async () => {
//     try {
//       if (!email) {
//         Alert.alert('Invalid Input', 'Please enter your email to reset the password.');
//         return;
//       }

//       await firebase.auth().sendPasswordResetEmail(email);
//       Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
//     } catch (error) {
//       console.error('Error sending password reset email:', error);
//       Alert.alert('Error', 'Failed to send password reset email. Please try again.');
//     }
//   };

// return (
//   <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <Text style={{ fontSize:40, color:'white', fontFamily:'Montserrat-SemiBold' }}>Welcome Back!</Text>

//     <View style={styles.cont}>
//       {/* <Image source={require('../src/assets/app_images/login.png')} style={styles.logo} /> */}
//       <Text style={styles.loginText}>Bicholia Login !!</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         placeholderTextColor='#e05654'

//         autoCapitalize="none"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor='#e05654'
//         secureTextEntry={true}
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity onPress={handleForgotPassword}>
//         <Text style={styles.for}>Forgot Password?</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
// <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>
   
//     </View>
//   </KeyboardAvoidingView>
// );
// };

// const styles = StyleSheet.create({
// loginButtonText:{
//   fontFamily: "Montserrat-SemiBold",

// },
// container: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: '#e05654',

// },
// loginButton: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: 'rgba(255, 255, 255, 0.7)',
//   padding: 10,
//   // borderRightWidth: 18,
//   borderRadius: 35,
//   marginTop: 20,
//   width: '100%',
//   justifyContent: 'center',
// },
// loginText: {
//   marginTop:50,
//   fontSize: 20,
//   // fontWeight: 'bold',
//   color: '#ffffff',
//   marginBottom: 16,
//   fontFamily: "Montserrat-SemiBold",
// },
// input: {
//   height: 50,
//   width: '100%',
//   backgroundColor: 'rgba(255, 255, 255, 0.7)',
//   borderRadius: 15,
//   padding: 10,
//   marginBottom: 16,
//   color: '#333',
//   fontFamily: "Montserrat-Regular",
// },
// cont:{
//   width: '93%',

//   padding: 20,

//   height: '70%',
//   borderTopLeftRadius: 2,
//   alignItems: 'center',


// },
// logo: {
//   height: 130,
//   width: 130,
//   marginBottom: 20,
// },
// for:{

//   fontFamily: 'Montserrat-SemiBold', 
//   color: '#ebc5c5', 
//   textDecorationLine: 'underline',
  
//    letterSpacing: 1,
//     fontSize: 14, 
//     bottom:'10%',
//     marginBottom:20,
//     alignSelf:'center',

// },
// });

// export default BicholiaLogin;


import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';

const BicholiaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkIfLoggedIn();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Land');
    return true;
  };

  const checkIfLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        navigation.navigate('User', { uniqueId: userToken });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // navigation.navigate('BicholiaProfile');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (!email || !password) {
        Alert.alert('Invalid Input', 'Please enter both email and password to log in.');
        setIsLoading(false);
        return;
      }

      if (email === 'admin@login.com' && password === 'Kunal@2002') {
        navigation.navigate('Adminlogin');
      } else {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user && !user.emailVerified) {
          Alert.alert('Email Verification', 'Please verify your email before logging in.');
          return;
        }

        const userToken = user.uid;

        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userEmail', email);

        navigation.navigate('BicholiaProfile', { uniqueId: userToken });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Invalid Input', 'Please enter your email to reset the password.');
        return;
      }

      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={{ fontSize: 40, color: 'white', fontFamily: 'Montserrat-SemiBold' }}>
        Welcome Back!
      </Text>

      <View style={styles.cont}>
        <Text style={styles.loginText}>Bicholia Login !!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#e05654"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#e05654"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.for}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator
            animating={true}
            size="large"
            color="#ffffff"
            style={styles.loadingIndicator}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e05654',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 35,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontFamily: 'Montserrat-SemiBold',
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  loginText: {
    marginTop: 50,
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  cont: {
    width: '93%',
    padding: 20,
    height: '70%',
    borderTopLeftRadius: 2,
    alignItems: 'center',
  },
  for: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#ebc5c5',
    textDecorationLine: 'underline',
    letterSpacing: 1,
    fontSize: 14,
    bottom: '10%',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default BicholiaLogin;






























  // const handleLogin = async () => {
  //   try {
  //     if (!email || !password) {
  //       Alert.alert('Invalid Input', 'Please enter both email and password to log in.');
  //       return;
  //     }
  
   
  
  //     // Check if the entered email and password match the admin credentials
  //     if (email === 'admin@login.com' && password === 'Kunal@2002') {
  //       // Navigate to 'AdminLogin' screen
  //       navigation.navigate('Adminlogin');
  //     } else {
  //       const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  //       const userToken = userCredential.user.uid;
  
  //       // Save the user token and email securely
  //       await AsyncStorage.setItem('userToken', userToken);
  //       await AsyncStorage.setItem('userEmail', email);
  
  //       // Navigate to 'User' screen
  //       navigation.navigate('BicholiaProfile', { uniqueId: userToken });
  //     }
  
     
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     Alert.alert('Error', 'Invalid email or password');
    
  //   }
  // };