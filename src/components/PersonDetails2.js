import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';


const PersonDetails2 = ({ route, navigation }) => {
  const { params } = route;
  const personData = params ? params.personData : null;
  const postDisplayOrder = params ? params.postDisplayOrder : null;
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


  const handleConnect = async () => {
    try {
      // Save personData to AsyncStorage
      await AsyncStorage.setItem('connectedUser', JSON.stringify(personData));
      console.log('User details saved to AsyncStorage:', personData);

      // Show alert after saving
      Alert.alert(
        'Added!!!',
        'User details Added successfully!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );

      // Update connected users list
      updateConnectedUsers(personData);
    } catch (error) {
      console.error('Error saving user details to AsyncStorage:', error);
    }
  };

  const updateConnectedUsers = async (newUser) => {
    try {
      // Fetch existing connected users from AsyncStorage
      const connectedUsersJSON = await AsyncStorage.getItem('connectedUsers');
      let connectedUsersArray = [];

      if (connectedUsersJSON) {
        connectedUsersArray = JSON.parse(connectedUsersJSON);
      }

      // Add new user to the array (assuming personData has unique identifier like ID)
      connectedUsersArray.push(newUser);

      // Store updated connected users array back to AsyncStorage
      await AsyncStorage.setItem('connectedUsers', JSON.stringify(connectedUsersArray));

      // Navigate to Connected screen or do further actions as needed
      navigation.navigate('Connected');
    } catch (error) {
      console.error('Error updating connected users in AsyncStorage:', error);
    }
  };

  if (!personData || !postDisplayOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error: Person data or display order not available.
        </Text>
      </View>
    );
  }

  const navigateToChat = async () => {
    try {
      await AsyncStorage.setItem('ChatUser', JSON.stringify(personData));
   
      updateChatUsers(personData);
      if (emailExists) {
        navigation.navigate('Chat', { personData });

      } else {
        navigation.navigate('Premium'); // Navigate to Home page if email not found
      }
    } catch (error) {
      console.error('Error saving user details to AsyncStorage:', error);
    }
  };

  const updateChatUsers = async (newUser) => {
    try {
      let chatUsersArray = JSON.parse(await AsyncStorage.getItem('ChatUsers')) || [];
      chatUsersArray.push(newUser);
      await AsyncStorage.setItem('ChatUsers', JSON.stringify(chatUsersArray));
   
    } catch (error) {
      console.error('Error updating chat users in AsyncStorage:', error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleToggleDetails = () => {
    if (emailExists) {
      setShowContactDetails(!showContactDetails);
    } else {
      navigation.navigate('Premium'); // Navigate to Home page if email not found
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          personData.photos && personData.photos.length > 0
            ? { uri: personData.photos[0] }
            : require('../assets/app_images/user.png')
        }
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate('Land');
            }}
          >
            {/* Your back button content */}
          </TouchableOpacity>
     


          {personData && (
            <View style={styles.postContainer}>
                   <TouchableOpacity
                onPress={handleConnect}
                style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Add as Favorite 📑</Text>
              </TouchableOpacity>
              <Text style={styles.B}>Uploded by bicholia</Text>
              <Text style={styles.nameText}>
                {personData.name}
              </Text>
              <View style={styles.detailsContainer}>
                {postDisplayOrder.map((key) => (
                  <View key={key} style={styles.columnContainer}>
                    <Text
                      style={[
                        styles.fieldText,
                        key === 'name' ||
                        key === 'gender' ||
                        key === 'age' ||
                        key === 'dob' ||
                        key === 'religion' ||
                        key === 'caste' ||
                        key === 'education' ||
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

              <TouchableOpacity
                onPress={handleToggleDetails} // Updated onPress handler
                style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                  {showContactDetails ? 'Hide' : 'Show'} Contact Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={navigateToChat}
                style={styles.chatButton}
              >
                <Text style={styles.chatButtonText}>
                  Chat
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
      marginBottom: 10,
    },
    fieldText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 19,
      lineHeight: 25,
      marginBottom: 5,
    },
    valueText: {
      fontFamily: 'Montserrat-Regular',
      color: '#e2d0d0',
      fontSize: 19,
      lineHeight:50,
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: '#e2d0d0',
      width: '100%',
      marginBottom: 5,
    },
    B:{
color:'#e05654',
textAlign:'center',
fontFamily: 'Montserrat-Regular',
fontSize:24,
marginBottom:10,


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
    connectButton: {
      marginBottom:20,
      right:20,
      backgroundColor: '#e05654',
  alignSelf:'flex-start',
      padding: 10,
      borderRadius: 35,
     
    },
    connectButtonText: {
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Montserrat-Regular',
    },
  });
  
  export default PersonDetails2;
  