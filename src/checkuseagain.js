import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Front = ({ navigation }) => {
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [displayedUserData, setDisplayedUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);

  useEffect(() => {
    const fetchPosts = () => {
      const unsubscribe = firestore().collection('ProfileFor').onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        setPostData(posts);
      });

      return () => unsubscribe();
    };

    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        console.log('Retrieved email from AsyncStorage:', email);

        if (email) {
          const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();
          console.log('Query Snapshot:', querySnapshot.docs);

          if (!querySnapshot.empty) {
            // User data found in the database
            const userDataFromDB = querySnapshot.docs[0].data();
            console.log('Retrieved user data from Firestore:', userDataFromDB);
            setDisplayedUserData(userDataFromDB);
            setEditedUserData(userDataFromDB); // Initialize editedUserData
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

    fetchPosts();
    fetchUserData();
  }, []);

  const displayOrder = [
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
    'Community',
    'workAs',
    'workAsOtherDetails',
    'workWith',
    'workWithOtherDetails',
    'email',
    'mobileNumber',
  ];

  const handleImageClick = (imageUrls) => {
    setSelectedImages(imageUrls);
    setModalVisible(true);
  };

  const handleLogout = async () => {
    // Perform logout actions (clear AsyncStorage, navigate to login screen, etc.)
    await AsyncStorage.clear();
    // Example navigation to a login screen
    navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
  };

  const handleEditPress = () => {
    setIsEditing(true);
    setEditedUserData(displayedUserData);
  };

  // const handleSaveChanges = async () => {
  //   try {
  //     // Assuming email is a unique identifier to find the document
  //     const email = displayedUserData?.email;
  
  //     if (!email) {
  //       console.error('Error: Email is not defined in displayedUserData.');
  //       return;
  //     }
  
  //     console.log('Updating document with email:', email);
  
  //     // Query Firestore to find the document based on the email
  //     const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();
  
  //     if (!querySnapshot.empty) {
  //       // Document found
  //       const documentRef = querySnapshot.docs[0].ref;
  
  //       // Update the document with new data
  //       await documentRef.update(editedUserData);
  
  //       // Update the local storage if needed
  //       // ...
  
  //       setIsEditing(false);
  //       console.log('Profile updated successfully.');
  //     } else {
  //       console.warn('Document not found for email:', email);
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };
  const handleSaveChanges = async () => {
    try {
      const email = displayedUserData?.email;
  
      if (!email) {
        console.error('Error: Email is not defined in displayedUserData.');
        return;
      }
  
      console.log('Updating document with email:', email);
  
      const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();
  
      if (!querySnapshot.empty) {
        const documentRef = querySnapshot.docs[0].ref;
  
        // Check if the profile image is updated
        if (selectedImages.length > 0) {
          // Upload new images to a storage service (e.g., Firebase Storage) and get the URLs
          const newImageUrls = await uploadImages(selectedImages);
  
          // Update the editedUserData with the new image URLs
          setEditedUserData({ ...editedUserData, photos: newImageUrls });
        }
  
        // Update the document with new data
        await documentRef.update(editedUserData);
  
        setIsEditing(false);
        console.log('Profile updated successfully.');
      } else {
        console.warn('Document not found for email:', email);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  // Function to upload images to a storage service (e.g., Firebase Storage)
  const uploadImages = async (images) => {
    try {
      const storageUrls = [];
  
      // Iterate through selectedImages and upload each image
      for (const image of images) {
        // Implement the logic to upload images to a storage service and get the URL
        // Example: const imageUrl = await uploadToStorageService(image);
        // Push the imageUrl to storageUrls array
        // storageUrls.push(imageUrl);
      }
  
      return storageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
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
    <ScrollView>
    <ScrollView contentContainerStyle={styles.container}>
      {displayedUserData ? (
        <>
          <TouchableOpacity onPress={() => handleImageClick(displayedUserData.photos)}>
            <View style={styles.postContainer}>
              <TouchableOpacity onPress={isEditing ? handleSaveChanges : handleEditPress}>
                <View style={styles.editButton}>
                  <Text style={styles.editButtonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
                </View>
              </TouchableOpacity>

              {isEditing && (
                <TouchableOpacity onPress={handleSelectImage} style={styles.changeImageButton}>
                  <Text style={styles.changeImageButtonText}>Change Image</Text>
                </TouchableOpacity>
              )}

              {displayedUserData.photos?.length > 0 ? (
                <Image source={{ uri: displayedUserData.photos[0] }} style={styles.profileImage} />
              ) : (
                <Image
                  source={require('../assets/user.png')} // Provide the correct path to your default image
                  style={styles.profileImage2}
                />
              )}

              <View style={isEditing ? styles.fieldColumnContainer : styles.fieldContainer}>
                {/* Display field names and values based on editing state */}
                {displayOrder.map((field) => (
                  <View key={field} style={styles.fieldRow}>
                    <Text style={styles.fieldName}>{field}:</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.editableFieldValue}
                        value={editedUserData[field]}
                        onChangeText={(text) => setEditedUserData({ ...editedUserData, [field]: text })}
                      />
                    ) : (
                      <Text style={styles.fieldValue}>{displayedUserData[field] || 'N/A'}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No user data to display</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedImages([]);
        }}
      >
        <ScrollView horizontal pagingEnabled contentContainerStyle={styles.modalScrollView}>
          {selectedImages.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom:60,
    marginBottom: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    borderRadius: 50,
    marginBottom: 30,
  },
  changeImageButton: {
    backgroundColor: '#4285f4', // Change to the desired color
    paddingVertical: 10,
    width: '60%',
    top: 70,
    borderRadius: 8,
    marginLeft: '35%',
    marginTop: 10, // Adjust the spacing as needed
  },
  changeImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImage2: {
    marginTop: '10%',
    width: '50%',
    height: 180,
    marginBottom: 40,
    borderRadius: 10,
    marginLeft: 90,
  },
  fieldContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fieldColumnContainer: {
    flexDirection: 'column', // Updated for column layout
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 3,
  
    borderColor: '#34dbcd5f',
  },
  fieldName: {
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: 3,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    marginRight: 30,
    letterSpacing: 3,
    textTransform: 'capitalize',
    textAlign: 'right',
  },
  editableFieldValue: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#34dbcd', // Change text color when editing
  },
  modalScrollView: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    backgroundColor: '#34dbcd',
    paddingVertical: 10,
 width:'60%',
 top:70,
    borderRadius: 8,
    marginLeft:'35%',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
 
    marginLeft: '70%',
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },

});

export default Front;
