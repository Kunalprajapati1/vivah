import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Image, BackHandler, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const getUserDetails = async (email) => {
  try {
    const snapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();
    if (!snapshot.empty) {
      const userDetails = snapshot.docs[0].data();
      const docId = snapshot.docs[0].id;
      return { ...userDetails, docId };
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
};

const ProfileDelete = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      const email = await AsyncStorage.getItem('userEmail');
      const user = await getUserDetails(email);
      setUserDetails(user);
      setIsLoading(false);
    };
    fetchUserDetails();
  }, []);

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

const handleDelete = async () => {
    if (!password) {
        setPasswordError('Password is required');
        return;
    }

    setIsModalLoading(true);

    Alert.alert(
        'Delete Profile',
        'Are you sure you want to delete your profile? This action cannot be undone.',
        [
            { text: 'Cancel', style: 'cancel', onPress: () => setIsModalLoading(false) },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        const email = await AsyncStorage.getItem('userEmail');
                        if (!email) {
                            throw new Error('User email not found');
                        }

                        await auth().signInWithEmailAndPassword(email, password);

                        const user = await getUserDetails(email);
                        if (user) {
                            await firestore().collection('ProfileFor').doc(user.docId).delete();
                            await firestore().collection('ProfileDeleted').add(user);
                            console.log('Profile Deleted and Data Added to ProfileDeleted Collection');
                            Alert.alert('Success', 'Your profile has been deleted.');

                            // Navigate to Home
                            navigation.navigate('Login');

                            setPassword('');
                            setModalVisible(false);
                        }
                    } catch (error) {
                        console.error('Error deleting profile:', error);
                        Alert.alert('Error', 'Failed to delete profile. Please try again.');
                    } finally {
                        setIsModalLoading(false);
                    }
                },
            },
        ]
    );
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#e05654" />
      ) : userDetails ? (
        
        <View style={styles.profileContainer}>
        <Image source={require('../assets/app_images/del.jpg')} style={styles.image2} />


          <Text style={styles.heading}>Confirm Your Account!</Text>
          {Object.entries(userDetails).map(([key, value]) => {
            if (key === 'photos' || !['firstName', 'lastName', 'email', 'mobileNumber'].includes(key)) {
              return null; // Skip rendering "photos" and other fields
            }
            return (
              <Text key={key} style={styles.userInfo}>
                {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
              </Text>
            );
          })}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setModalVisible(true)}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Delete Profile</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading user details...</Text>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Enter your password to delete your profile:</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleDelete}
              disabled={isModalLoading}
            >
              {isModalLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Confirm Delete</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
              disabled={isModalLoading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileDelete;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    
  },
  profileContainer: {
    padding: 20,
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 40,
    color: 'black',
    fontSize: 26,
    marginBottom: 40,
  
  },
  image2: {
    width: '120%',
    height: 120,
    right:30,
    bottom:20,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 35,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 35,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 35,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopRightRadius:40,
borderTopLeftRadius:40,
    height: '50%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
});
