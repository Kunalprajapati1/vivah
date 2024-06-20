
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator,TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Front = () => {
  const [displayedUserData, setDisplayedUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          const querySnapshot = await firestore().collection('users').where('email', '==', email).get();
          if (!querySnapshot.empty) {
            const userDataFromDB = querySnapshot.docs[0].data();
            setDisplayedUserData(userDataFromDB);
          } else {
            console.log('No documents found matching the email:', email);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e05654" />
      </View>
    );
  }

  if (!displayedUserData) {
    return (
      <View style={styles.container}>
        <Text>No user data found.</Text>
      </View>
    );
  }
  const navigateToHome = () => {
    navigation.navigate('EditSaveProfile'); // Navigate to 'Home' screen
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: displayedUserData.profileImage }}
        style={styles.profileImage}
      />
      <View style={styles.userDataContainer}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.data}>{displayedUserData.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.data}>{displayedUserData.email}</Text>
        
        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.data}>{displayedUserData.mobileNumber}</Text>
        
        <TouchableOpacity onPress={navigateToHome} style={styles.homeButton}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#e05654',
    padding: 20,
  },
  profileImage: {
    marginTop:70,
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  userDataContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    // paddingVertical:70,
    width: '100%',
    // maxWidth: 400,
    // elevation: 2,
  },
  label: {
    marginBottom:20,
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  data: {
    fontSize: 16,
    marginBottom: 35,
  },
  homeButton: {
    backgroundColor: '#e05654',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf:'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Front;


















