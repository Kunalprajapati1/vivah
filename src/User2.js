// User.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({ route,navigation }) => {
  const { uniqueId } = route.params;
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(`userData_${uniqueId}`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
        } else {
          const documentSnapshot = await firestore()
            .collection('ProfileFor')
            .doc(uniqueId)
            .get();

          if (documentSnapshot.exists) {
            const fetchedData = documentSnapshot.data();
            console.log('Fetched Data:', fetchedData);
            setUserData(fetchedData);

            await AsyncStorage.setItem(`userData_${uniqueId}`, JSON.stringify(fetchedData));
          } else {
            console.warn('Document not found for the provided unique ID');
          }
        }
      } catch (error) {
        console.error('Error fetching or storing data:', error);
      }
    };

    fetchData();
  }, [uniqueId]);

  const handleEditPress = () => {
    setIsEditing(true);
    setEditedUserData(userData);
  };

  const handleSaveChanges = async () => {
    try {
      // Update the database
      await firestore().collection('ProfileFor').doc(uniqueId).update(editedUserData);

      // Update the local storage
      await AsyncStorage.setItem(`userData_${uniqueId}`, JSON.stringify(editedUserData));

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#34dbcd" />
      </View>
    );
  }

  const orderOfFields = [
    'firstName',
    'lastName',
    'selectedGender',
    'dayOfBirth',
    'monthOfBirth',
    'yearOfBirth',
    'diet',
    'height',
    'collegeName',
    'maritalStatus',
    'qualification',
    'selectedState',
    'selectedCity',
    'selectedOption',
    'selectedReligion',
    'selectedSubCommunity',
    'workAs',
    'workAsOtherDetails',
    'workWith',
    'workWithOtherDetails',
    'email',
    'mobileNumber',
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>
        <Image source={{ uri: userData.photos[0] }} style={styles.profileImage} />

        {isEditing ? (
          orderOfFields.map((field) => (
            <View key={field} style={styles.fieldContainer}>
              <Text style={styles.fieldName}>{field}:</Text>
              <TextInput
                style={styles.editableFieldValue}
                value={editedUserData[field]}
                onChangeText={(text) => setEditedUserData({ ...editedUserData, [field]: text })}
              />
            </View>
          ))
        ) : (
          orderOfFields.map((field) => (
            <View key={field} style={styles.fieldContainer}>
              <Text style={styles.fieldName}>{field}:</Text>
              <Text style={styles.fieldValue}> {userData ? userData[field] || 'N/A' : 'N/A'}</Text>
            </View>
          ))
        )}

        {isEditing ? (
          <TouchableOpacity onPress={handleSaveChanges}>
            <View style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditPress}>
            <View style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          
        )}
        <TouchableOpacity onPress={()=> navigation.navigate('Land')  }>
            <View style={styles.editButton}>
              <Text style={styles.editButtonText}>Continue </Text>
            </View>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    borderRadius: 50,
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fieldName: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  editableFieldValue: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  editButton: {
    backgroundColor: '#34dbcd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#34dbcd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default User;
