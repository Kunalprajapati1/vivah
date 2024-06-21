// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';

// const PersonDetails = ({route, navigation}) => {
//   const {params} = route;
//   const personData = params ? params.personData : null;
//   const profileForDisplayOrder = params ? params.profileForDisplayOrder : null;

//   if (!personData || !profileForDisplayOrder) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>
//           Error: Person data or display order not available.
//         </Text>
//       </View>
//     );
//   }

//   // const navigateToChat = () => {
//   //   navigation.navigate('Chat');
//   // };
//   const navigateToChat = () => {
//     navigation.navigate('Chat', { personData });
//   };

//   const capitalizeFirstLetter = string => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={
//           personData.photos && personData.photos.length > 0
//             ? {uri: personData.photos[0]}
//             : require('../assets/app_images/user.png')
//         }
//         style={styles.backgroundImage}>
//         <ScrollView contentContainerStyle={styles.overlayContainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => {
//               navigation.navigate('Land');
//             }}>
//             {/* Your back button content */}
//           </TouchableOpacity>

//           {personData && (
//             <View style={styles.postContainer}>
//               <Text style={styles.nameText}>
//                 {personData.firstName} {personData.lastName}
//               </Text>
//               <View style={styles.detailsContainer}>
//                 {profileForDisplayOrder.map(key => (
//                   <View key={key} style={styles.columnContainer}>
//                     <Text
//                       style={[
//                         styles.fieldText,
//                         key === 'firstName' ||
//                         key === 'lastName' ||
//                         key === 'Gender' ||
//                         key === 'dateOfBirth' ||
//                         key === 'diet' ||
//                         key === 'height' ||
//                         key === 'collegeName' ||
//                         key === 'maritalStatus' ||
//                         key === 'qualification' ||
//                         key === 'selectedState' ||
//                         key === 'city' ||
//                         key === 'Option' ||
//                         key === 'selectedReligion' ||
//                         key === 'Community' ||
//                         key === 'workAs' ||
//                         key === 'workAsOtherDetails' ||
//                         key === 'workWith' ||
//                         key === 'workWithOtherDetails' ||
//                         key === 'email' ||
//                         key === 'mobileNumber' ||
//                         /* Add more conditions for questionable fields */ false
//                           ? {color: '#e88a8a'}
//                           : null,
//                       ]}>
//                       {capitalizeFirstLetter(key)}:
//                     </Text>
//                     <Text style={styles.valueText}>
//                       {personData[key] || 'N/A'}
//                     </Text>
//                     <View style={styles.line} />
//                   </View>
//                 ))}
//               </View>
//               <TouchableOpacity
//                 onPress={navigateToChat}
//                 style={styles.chatButton}>
//                 <Text style={styles.chatButtonText}>
//                   Click to Chat to Person
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e88a8a',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   overlayContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 1,
//   },
//   postContainer: {
//     backgroundColor: 'rgba(0, 0, 0, 0.768)',
//     borderRadius: 10,
//     padding: 40,
//     marginTop: 20,
//   },
//   nameText: {
//     fontFamily: 'DMSerifDisplay-Regular',
//     fontSize: 32,
//     color: '#e05654',
//     marginBottom: 10,
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   columnContainer: {
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     marginRight: 20,

//     marginBottom: 15,
//   },
//   fieldText: {
//     fontFamily: 'Montserrat-Regular',
//     fontSize: 17,
//     lineHeight: 45,
    
//     marginBottom: 5,
//   },
//   valueText: {
//     fontFamily: 'Montserrat-Regular',
//     color: '#e2d0d0',
//     fontSize: 19,
    
//     lineHeight: 25,
//   },
//   line: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#e2d0d0',
//     width: '100%',
//     marginBottom: 5,
//   },
//   chatButton: {
//     backgroundColor: '#e05654',
//     padding: 10,
//     borderRadius: 35,
//     marginTop: 10,
//   },
//   chatButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontFamily: 'Montserrat-Regular',
//   },
//   errorText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//     fontFamily: 'Montserrat-Regular',
//   },
// });

// export default PersonDetails;



import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const PersonDetails = ({ route, navigation }) => {
  const { params } = route;
  const personData = params ? params.personData : null;
  const profileForDisplayOrder = params ? params.profileForDisplayOrder : null;
  const [emailExists, setEmailExists] = useState(false);

  const [showContactDetails, setShowContactDetails] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setUserEmail(email);
        checkEmailInDatabase(email);

      } catch (error) {
        console.error('Error fetching user email from AsyncStorage:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const checkEmailInDatabase = async (email) => {
    try {
      const snapshot = await firestore().collection('Preminum').where('email', '==', email).get();
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

  if (!personData || !profileForDisplayOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error: Person data or display order not available.
        </Text>
      </View>
    );
  }
  const handleToggleDetails = () => {
    if (emailExists) {
      setShowContactDetails(!showContactDetails);
    } else {
      navigation.navigate('Premium'); // Navigate to Home page if email not found
    }
  };
  const navigateToChat = () => {
    navigation.navigate('Chat', { personData });
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          personData.photos && personData.photos.length > 0
            ? { uri: personData.photos[0] }
            : require('../assets/app_images/user.png')
        }
        style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate('Land');
            }}>
            {/* Your back button content */}
          </TouchableOpacity>

          {personData && (
            <View style={styles.postContainer}>
              <Text style={styles.nameText}>
                {personData.firstName} {personData.lastName}
              </Text>
              <View style={styles.detailsContainer}>
                {profileForDisplayOrder.map(key => (
                  <View key={key} style={styles.columnContainer}>
                    <Text
                      style={[
                        styles.fieldText,
                        key === 'firstName' ||
                        key === 'lastName' ||
                        key === 'Gender' ||
                        key === 'dateOfBirth' ||
                        key === 'diet' ||
                        key === 'height' ||
                        key === 'collegeName' ||
                        key === 'maritalStatus' ||
                        key === 'qualification' ||
                        key === 'selectedState' ||
                        key === 'city' ||
                        key === 'Option' ||
                        key === 'selectedReligion' ||
                        key === 'Community' ||
                        key === 'workAs' ||
                        key === 'workAsOtherDetails' ||
                        key === 'workWith' ||
                        key === 'workWithOtherDetails' ||
                        key === 'email' ||
                        key === 'mobileNumber'
                          ? { color: '#e88a8a' }
                          : null,
                      ]}
                    >
                      {capitalizeFirstLetter(key)}:
                    </Text>
                    <Text style={styles.valueText}>
                      {showContactDetails || (key !== 'email' && key !== 'mobileNumber')
                        ? personData[key] || 'N/A'
                        : '********'}
                    </Text>
                    <View style={styles.line} />
                  </View>
                ))}
              </View>
              {/* <TouchableOpacity
                onPress={() => setShowContactDetails(!showContactDetails)}
                style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                  {showContactDetails ? 'Hide' : 'Show'} Contact Details
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={handleToggleDetails} // Updated onPress handler
                style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                  {showContactDetails ? 'Hide' : 'Show'} Contact Details
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={navigateToChat}
                style={styles.chatButton}>
                <Text style={styles.chatButtonText}>
                  Click to Chat to Person
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={navigateToSearch}
                style={styles.chatButton}>
                <Text style={styles.chatButtonText}>
                See more Photos
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e88a8a',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  postContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.768)',
    borderRadius: 10,
    padding: 40,
    marginTop: 20,
  },
  nameText: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 32,
    color: '#e05654',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 20,
    marginBottom: 15,
  },
  fieldText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    lineHeight: 45,
    marginBottom: 5,
  },
  valueText: {
    fontFamily: 'Montserrat-Regular',
    color: '#e2d0d0',
    fontSize: 19,
    lineHeight: 25,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2d0d0',
    width: '100%',
    marginBottom: 5,
  },
  chatButton: {
    backgroundColor: '#e05654',
    padding: 10,
    borderRadius: 35,
    marginTop: 10,
  },
  chatButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  toggleButton: {
    backgroundColor: '#e05654',
    padding: 10,
    borderRadius: 35,
    marginTop: 10,
  },
  toggleButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export default PersonDetails;
