

import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, ActivityIndicator, Modal,Image,BackHandler,ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const fetchDeletedUserDetails = async (email) => {
  try {
    const snapshot = await firestore().collection('ProfileDeleted').where('email', '==', email).get();
    if (!snapshot.empty) {
      const userDetails = snapshot.docs[0].data();
      const docId = snapshot.docs[0].id;
      return { ...userDetails, docId };
    } else {
      console.log('User not found in ProfileDeleted');
      return null;
    }
  } catch (error) {
    console.error('Error fetching deleted user details:', error);
    return null;
  }
};

const restoreUserDetails = async (userDetails) => {
  try {
    await firestore().collection('ProfileFor').add(userDetails);
    await firestore().collection('ProfileDeleted').doc(userDetails.docId).delete();
    console.log('User details restored successfully');
    Alert.alert('Success', 'User details restored successfully.');
  } catch (error) {
    console.error('Error restoring user details:', error);
    Alert.alert('Error', 'Failed to restore user details. Please try again.');
  }
};

const Recover = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailCheck = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    setIsLoading(true);
    const user = await fetchDeletedUserDetails(email);
    setIsLoading(false);
    if (user) {
      setUserDetails(user);
      setModalVisible(true);
    } else {
      Alert.alert('Error', 'No deleted user found with this email.');
    }
  };
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

  const handleRecover = async () => {
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    setIsModalLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      await restoreUserDetails(userDetails);
      setUserDetails(null);
      setModalVisible(false);
      setPassword('');
      navigation.navigate('Login');  // Navigate to Login after recovery
    } catch (error) {
      console.error('Error during recovery:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/app_images/Recover.jpg')} style={styles.image2} />

      <Text style={styles.heading}>Recover Profile : </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TouchableOpacity style={styles.checkButton} onPress={handleEmailCheck} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Check Email</Text>}
      </TouchableOpacity>

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
            <Text style={styles.label}>Enter your password to recover your profile:</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry
              editable={!isModalLoading}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity
              style={styles.recoverButton}
              onPress={handleRecover}
              disabled={isModalLoading}
            >
              {isModalLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Recover Profile</Text>}
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
    </View>
  );
};

export default Recover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 40,
    color: 'black',
    fontSize: 26,
    marginBottom: 20,

  },
  image2: {
    width: '120%',
    height: 180,
    right:30,
    bottom:20,
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
  checkButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 35,
    marginTop: 20,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
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
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
  },
  recoverButton: {
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
});
