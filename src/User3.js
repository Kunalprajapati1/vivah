// User3.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const User3 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      console.log('Retrieved email from AsyncStorage:', email);

      if (email) {
        const querySnapshot = await firebase.firestore().collection('ProfileFor').where('email', '==', email).get();
        console.log('Query Snapshot:', querySnapshot.docs);

        if (!querySnapshot.empty) {
          // User data found in the database
          const userDataFromDB = querySnapshot.docs[0].data();
          console.log('Retrieved user data from Firestore:', userDataFromDB);
          setUserData(userDataFromDB);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>User Details:</Text>
      {userData ? (
        Object.keys(userData).map((key) => (
          <Text key={key} style={styles.userInfo}>
            {key}: {userData[key]}
          </Text>
        ))
      ) : (
        <Text>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default User3;
