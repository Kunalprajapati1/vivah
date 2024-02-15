// // // ButtonContainer.js
// // import React, { useRef } from 'react';
// // import { View, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Animated, ScrollView } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import Front from './Front';
// // import { useIsFocused } from '@react-navigation/native';
// // // import Menuu from './Menuu';

// // // Reusable IconButton Component
// // const IconButton = ({ onPress, source, style, rotate, focused }) => {
// //   const rotateValue = useRef(new Animated.Value(rotate ? 1 : 0)).current;

// //   const handlePress = () => {
// //     Animated.timing(rotateValue, {
// //       toValue: rotateValue._value === 0 ? 1 : 0,
// //       duration: 200,
// //       useNativeDriver: false,
// //     }).start(() => onPress());
// //   };

// //   const spin = rotateValue.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '360deg'],
// //   });

// //   return (
// //     <TouchableHighlight
// //       style={[styles.button, style]}
// //       onPress={handlePress}
// //       underlayColor="transparent"
// //     >
// //       <Animated.Image
// //         source={source}
// //         style={[
// //           styles.icon,
// //           { transform: [{ rotate: spin }], tintColor: focused ? '#e05654' : '#ffffff' },
// //         ]}
// //       />
// //     </TouchableHighlight>
// //   );
// // };

// // // Usage in ButtonContainer
// // const ButtonContainer = () => {
// //   const navigation = useNavigation();
// //   const isFocused = useIsFocused();

// //   const navigateToPage = (pageName) => {
// //     navigation.navigate(pageName);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.overlay}>
// //         <View style={styles.buttonContainer}>
// //           <IconButton
// //             onPress={() => navigateToPage('Home')}
// //             focused={isFocused}
// //             source={require('../assets/home.gif')}
// //           />
// //    <IconButton
// //             onPress={() => navigateToPage('Search')}
// //             focused={isFocused}
// //             source={require('../assets/search.gif')}
// //             style={styles.searchButton}
// //           />
// //           <View style={styles.centerIconContainer}>
// //             <IconButton
// //               onPress={() => navigateToPage('Upload')}
// //               focused={isFocused}
// //               source={require('../assets/upload.gif')}
// //               style={[styles.donateButton, styles.donateIcon]}
// //               rotate={true}
// //             />
// //           </View>
// //           <IconButton
// //             onPress={() => navigateToPage('Login')}
// //             focused={isFocused}
// //             source={require('../assets/premium.png')}
// //             style={styles.profileButton}
// //           />
// //           <IconButton
// //             onPress={() => navigateToPage('User')}
// //             focused={isFocused}
// //             source={require('../assets/account.gif')}
// //             style={styles.aboutButton}
// //           />
// //         </View>
// //       </View>
  
// //       <ScrollView>
// //         <Front />
// //       </ScrollView>
// //     </View>
// //   );
// // };
// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor:'#f7eff0',
// //     flex: 1,
// //     position: 'relative', // Set position to 'relative'
// //   },
// //   overlay: {
// //     ...StyleSheet.absoluteFillObject,
// //     alignItems: 'center',
// //     // marginTop: '190%', // Remove marginTop
// //   },
// //   buttonContainer: {
// //     backgroundColor: '#1c202df7',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     position: 'absolute',
// //     height: 70,
// //     width: '100%',
// //     tintColor:'#e05654',
// //     borderTopLeftRadius: 50,  // Adjust the value to control the sharpness of the point
// //     borderTopRightRadius: 50, // Adjust the value to control the sharpness of the point
// //     borderBottomLeftRadius: 50,
// //     borderBottomRightRadius: 50,
// //     zIndex: 2,
// //     bottom: 0,},

// //   men:{
// //     zIndex: 2,

// //   },
// //   centerIconContainer: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   button: {
// //     borderRadius: 20,
// //     width: 100,
// //     height: 40,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   searchButton: {
// //    right:30,
   
// //   },
// //   profileButton: {
// //     marginLeft: 5,
// //     left:20,
// //   },
// //   aboutButton: {
// //     marginLeft: 5,
// //   },
// //   donateIcon: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: 90,
// //     // backgroundColor: '#ffffff',
// //     tintColor:'#e05654',
// //     marginBottom: 0,
  
// //   },
// //   icon: {
// //     width: 24,
// //     height: 28,
// //     tintColor: '#ffffff',
// //   },
// // });

// // export default ButtonContainer;













// // ButtonContainer.js
// import React, { useRef } from 'react';
// import { View, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Animated, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Front from './Front';
// import { useIsFocused } from '@react-navigation/native';
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

// // Usage in ButtonContainer
// const ButtonContainer = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();

//   const navigateToPage = (pageName) => {
//     navigation.navigate(pageName);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.overlay}>
//         <View style={styles.buttonContainer}>
//           <IconButton onPress={() => navigateToPage('Land')} focused={isFocused} source={require('../assets/home.gif')} />
//           <IconButton
//             onPress={() => navigateToPage('Search')}
//             source={require('../assets/search.gif')}
//             focused={isFocused}
//             style={styles.aboutButton}
//           />
//           <View style={styles.centerIconContainer}>
//             <IconButton
//               onPress={() => navigateToPage('Upload')}
//               source={require('../assets/upload.gif')}
//               focused={isFocused}
//               style={[styles.donateButton, styles.donateIcon]}
//               rotate={true}
//             />
//           </View>
//           <IconButton
//             onPress={() => navigateToPage('Premium')}
//             focused={isFocused}
//             source={require('../assets/premium.png')}
//             style={styles.searchButton}
//           />
//           <IconButton onPress={() => navigateToPage('EditSaveProfile')} focused={isFocused} source={require('../assets/account.gif')} style={styles.profileButton} />
//         </View>
//       </View>
//       <ScrollView>
//         <Front />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative', // Set position to 'relative'
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//     // marginTop: '190%', // Remove marginTop
//   },
//   buttonContainer: {
//         backgroundColor: '#181b26f7',
//         flexDirection: 'row',
//         alignItems: 'center',
//         position: 'absolute',
//         height: 70,
//         width: '100%',
//         tintColor:'#e05654',
//         borderTopLeftRadius: 50,  // Adjust the value to control the sharpness of the point
//         borderTopRightRadius: 50, // Adjust the value to control the sharpness of the point
//         borderBottomLeftRadius: 50,
//         borderBottomRightRadius: 50,
//         zIndex: 2,
//         bottom: 0,},
//   men:{
//     zIndex: 3,

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
//   searchButton: {
//     marginLeft: 5,
//   },
//   profileButton: {
//     marginLeft: 5,
//   },
//   aboutButton: {
//     marginLeft: 5,
//   },
//   donateIcon: {
//     width: 70,
//     height: 70,
//     borderRadius: 90,
   
   
//   },
//   icon: {
//     width: 24,
//     height: 28,
//     tintColor: 'white',
//   },
// });

// export default ButtonContainer;
// // ButtonContainer.js
// import React, { useRef } from 'react';
// import { View, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Animated, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Front from './Front';
// import { useIsFocused } from '@react-navigation/native';
// // import Menuu from './Menuu';

// // Reusable IconButton Component
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

// // Usage in ButtonContainer
// const ButtonContainer = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();

//   const navigateToPage = (pageName) => {
//     navigation.navigate(pageName);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.overlay}>
//         <View style={styles.buttonContainer}>
//           <IconButton
//             onPress={() => navigateToPage('Home')}
//             focused={isFocused}
//             source={require('../assets/home.gif')}
//           />
//    <IconButton
//             onPress={() => navigateToPage('Search')}
//             focused={isFocused}
//             source={require('../assets/search.gif')}
//             style={styles.searchButton}
//           />
//           <View style={styles.centerIconContainer}>
//             <IconButton
//               onPress={() => navigateToPage('Upload')}
//               focused={isFocused}
//               source={require('../assets/upload.gif')}
//               style={[styles.donateButton, styles.donateIcon]}
//               rotate={true}
//             />
//           </View>
//           <IconButton
//             onPress={() => navigateToPage('Login')}
//             focused={isFocused}
//             source={require('../assets/premium.png')}
//             style={styles.profileButton}
//           />
//           <IconButton
//             onPress={() => navigateToPage('User')}
//             focused={isFocused}
//             source={require('../assets/account.gif')}
//             style={styles.aboutButton}
//           />
//         </View>
//       </View>
  
//       <ScrollView>
//         <Front />
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor:'#f7eff0',
//     flex: 1,
//     position: 'relative', // Set position to 'relative'
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//     // marginTop: '190%', // Remove marginTop
//   },
//   buttonContainer: {
//     backgroundColor: '#1c202df7',
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     height: 70,
//     width: '100%',
//     tintColor:'#e05654',
//     borderTopLeftRadius: 50,  // Adjust the value to control the sharpness of the point
//     borderTopRightRadius: 50, // Adjust the value to control the sharpness of the point
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     zIndex: 2,
//     bottom: 0,},

//   men:{
//     zIndex: 2,

//   },
//   centerIconContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     borderRadius: 20,
//     width: 100,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   searchButton: {
//    right:30,
   
//   },
//   profileButton: {
//     marginLeft: 5,
//     left:20,
//   },
//   aboutButton: {
//     marginLeft: 5,
//   },
//   donateIcon: {
//     width: 70,
//     height: 70,
//     borderRadius: 90,
//     // backgroundColor: '#ffffff',
//     tintColor:'#e05654',
//     marginBottom: 0,
  
//   },
//   icon: {
//     width: 24,
//     height: 28,
//     tintColor: '#ffffff',
//   },
// });

// export default ButtonContainer;













// ButtonContainer.js
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Front from './Front';
import { useIsFocused } from '@react-navigation/native';

const IconButton = ({ onPress, source, style, rotate, focused }) => {
  const rotateValue = useRef(new Animated.Value(rotate ? 1 : 0)).current;

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
  const [landScreenKey, setLandScreenKey] = useState(0);

  const navigateToPage = (pageName) => {
    if (pageName === 'Land') {
      // Increment the key to force a refresh of the "Land" screen
      setLandScreenKey((prevKey) => prevKey + 1);
    }

    navigation.navigate(pageName);
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
          <View style={styles.centerIconContainer}>
            <IconButton
              onPress={() => navigateToPage('Upload')}
              source={require('../assets/upload.gif')}
              focused={isFocused}
              style={[styles.donateButton, styles.donateIcon]}
              rotate={true}
            />
          </View>
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
    zIndex: 3,

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

