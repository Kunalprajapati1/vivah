



// ButtonContainer.js
import React, { useRef, useState,useEffect } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Animated, ScrollView,BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Front from './Front';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';


const IconButton = ({ onPress, source, style, rotate, focused }) => {
  const rotateValue = useRef(new Animated.Value(rotate ? 1 : 0)).current;
  const navigation = useNavigation();

  const handlePress = () => {
    Animated.timing(rotateValue, {
      toValue: rotateValue._value === 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => onPress());
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate('Land');
      return true; // Prevent default behavior (closing the app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [navigation]);
  return (
    <TouchableHighlight
      style={[styles.button, style]}
      onPress={handlePress}
      underlayColor="transparent"
    >
      <Animated.Image
        source={source}
        style={[
          styles.icon,
          { transform: [{ rotate: spin }], tintColor: focused ? '#e05654' : '#ffffff' },
        ]}
      />
    </TouchableHighlight>
  );
};



  
const ButtonContainer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [storedEmail, setStoredEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [landScreenKey, setLandScreenKey] = useState(0);
  useEffect(() => {
    // Fetch stored email when component mounts
    fetchStoredEmail();
  }, []);
  const navigateToPage = (pageName) => {
    if (pageName === 'Land') {
      // Increment the key to force a refresh of the "Land" screen
      setLandScreenKey((prevKey) => prevKey + 1);
    }

    navigation.navigate(pageName);
  };
  // Function to fetch stored email from AsyncStorage
  const fetchStoredEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email !== null) {
        console.log('Stored Email:', email);
        setStoredEmail(email);
        checkEmailInDatabase(email);
      } else {
        console.log('No email found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error fetching email from AsyncStorage:', error);
    }
  };

  // Function to check if email exists in Firestore users collection
  const checkEmailInDatabase = async (email) => {
    try {
      const snapshot = await firestore().collection('users').where('email', '==', email).get();
      if (snapshot.empty) {
        console.log('Email not found in database.');
        setEmailExists(false);
      } else {
        console.log('Email found in database.');
        setEmailExists(true);
      }
    } catch (error) {
      console.error('Error checking email in database:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.buttonContainer}>
          <IconButton onPress={() => navigateToPage('Land')} focused={isFocused} source={require('../assets/home.gif')} />
          <IconButton
            onPress={() => navigateToPage('Search')}
            source={require('../assets/search.gif')}
            focused={isFocused}
            style={styles.aboutButton}
          />
 {emailExists && (
          <View style={styles.centerIconContainer}>
            <IconButton
              onPress={() => navigateToPage('Upload')}
              source={require('../assets/upload.gif')}
              focused={isFocused}
              style={[styles.donateButton, styles.donateIcon]}
              rotate={true}
            />
          </View>
            )}

             {!emailExists && (
          <View style={styles.centerIconContainer}>
            <IconButton
              onPress={() => navigateToPage('Images')}
              source={require('../assets/upload.gif')}
              focused={isFocused}
              style={[styles.donateButton, styles.donateIcon]}
              rotate={true}
            />
          </View>
            )}

           {/* {emailExists && (
            <View style={styles.centerIconContainer}>
              <IconButton onPress={() => console.log('Button 3 pressed')} source={require('../assets/upload.gif')} focused={isFocused} style={[styles.donateButton, styles.donateIcon]} rotate={true} />
            </View>
          )} */}

          <IconButton
            onPress={() => navigateToPage('Premium')}
            focused={isFocused}
            source={require('../assets/premium.png')}
            style={styles.searchButton}
          />
          <IconButton onPress={() => navigateToPage('EditSaveProfile')} focused={isFocused} source={require('../assets/account.gif')} style={styles.profileButton} />
        </View>
      </View>
      <ScrollView key={landScreenKey}>
        <Front />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Set position to 'relative'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    // marginTop: '190%', // Remove marginTop
  },
  buttonContainer: {
        backgroundColor: '#181b26f7',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: 70,
        width: '100%',
        tintColor:'#e05654',
        borderTopLeftRadius: 50,  // Adjust the value to control the sharpness of the point
        borderTopRightRadius: 50, // Adjust the value to control the sharpness of the point
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        zIndex: 2,
        bottom: 0,},
  men:{
    zIndex: 5,

  },
  centerIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    marginLeft: 5,
  },
  profileButton: {
    marginLeft: 5,
  },
  aboutButton: {
    marginLeft: 5,
  },
  donateIcon: {
    width: 70,
    height: 70,
    borderRadius: 90,
   
   
  },
  icon: {
    width: 24,
    height: 28,
    tintColor: 'white',
  },
});

export default ButtonContainer;

ButtonContainer.js

// import React, { useRef, useState, useEffect } from 'react';
// import { View, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Animated, ScrollView, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useIsFocused } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore'; // Assuming you are using Firebase Firestore

// const IconButton = ({ onPress, source, style, rotate, focused }) => {
//   const rotateValue = useRef(new Animated.Value(rotate ? 1 : 0)).current;

//   const handlePress = () => {
//     Animated.timing(rotateValue, {
//       toValue: rotateValue._value === 0 ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start(() => onPress());
//   };

//   const spin = rotateValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   return (
//     <TouchableHighlight
//       style={[styles.button, style]}
//       onPress={handlePress}
//       underlayColor="transparent"
//     >
//       <Animated.Image
//         source={source}
//         style={[
//           styles.icon,
//           { transform: [{ rotate: spin }], tintColor: focused ? '#e05654' : '#ffffff' },
//         ]}
//       />
//     </TouchableHighlight>
//   );
// };

// const ButtonContainer = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const [storedEmail, setStoredEmail] = useState('');
//   const [emailExists, setEmailExists] = useState(false);

//   useEffect(() => {
//     // Fetch stored email when component mounts
//     fetchStoredEmail();
//   }, []);

//   // Function to fetch stored email from AsyncStorage
//   const fetchStoredEmail = async () => {
//     try {
//       const email = await AsyncStorage.getItem('userEmail');
//       if (email !== null) {
//         console.log('Stored Email:', email);
//         setStoredEmail(email);
//         checkEmailInDatabase(email);
//       } else {
//         console.log('No email found in AsyncStorage.');
//       }
//     } catch (error) {
//       console.error('Error fetching email from AsyncStorage:', error);
//     }
//   };

//   // Function to check if email exists in Firestore users collection
//   const checkEmailInDatabase = async (email) => {
//     try {
//       const snapshot = await firestore().collection('users').where('email', '==', email).get();
//       if (snapshot.empty) {
//         console.log('Email not found in database.');
//         setEmailExists(false);
//       } else {
//         console.log('Email found in database.');
//         setEmailExists(true);
//       }
//     } catch (error) {
//       console.error('Error checking email in database:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.overlay}>
//         <View style={styles.buttonContainer}>
//           <IconButton onPress={() => console.log('Button 1 pressed')} focused={isFocused} source={require('../assets/home.gif')} />
//           <IconButton onPress={() => console.log('Button 2 pressed')} source={require('../assets/search.gif')} focused={isFocused} style={styles.aboutButton} />
//           {emailExists && (
//             <View style={styles.centerIconContainer}>
//               <IconButton onPress={() => console.log('Button 3 pressed')} source={require('../assets/upload.gif')} focused={isFocused} style={[styles.donateButton, styles.donateIcon]} rotate={true} />
//             </View>
//           )}
//           <IconButton onPress={() => console.log('Button 4 pressed')} focused={isFocused} source={require('../assets/premium.png')} style={styles.searchButton} />
//           <IconButton onPress={() => console.log('Button 5 pressed')} focused={isFocused} source={require('../assets/account.gif')} style={styles.profileButton} />
//         </View>
//       </View>
//       <ScrollView>
//         {/* Your content components */}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     backgroundColor: '#181b26f7',
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     height: 70,
//     width: '100%',
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     zIndex: 2,
//     bottom: 0,
//   },
//   centerIconContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     borderRadius: 20,
//     width: 70,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     width: 24,
//     height: 28,
//     tintColor: 'white',
//   },
//   aboutButton: {
//     marginLeft: 5,
//   },
//   donateButton: {
//     marginLeft: 5,
//   },
//   donateIcon: {
//     width: 70,
//     height: 70,
//     borderRadius: 90,
//   },
//   searchButton: {
//     marginLeft: 5,
//   },
//   profileButton: {
//     marginLeft: 5,
//   },
// });

// export default ButtonContainer;
