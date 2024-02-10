// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from '@react-native-firebase/storage';
// import ImageCropPicker from 'react-native-image-crop-picker';

// const Front = ({ navigation }) => {
//   const [postData, setPostData] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [displayedUserData, setDisplayedUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUserData, setEditedUserData] = useState(null);
//   const [imageLoading, setImageLoading] = useState(true);
//   useEffect(() => {
//     const fetchPosts = () => {
//       const unsubscribe = firestore().collection('ProfileFor').onSnapshot((snapshot) => {
//         const posts = snapshot.docs.map(doc => doc.data());
//         setPostData(posts);
//       });

//       return () => unsubscribe();
//     };

//     const fetchUserData = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');

//         if (email) {
//           const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

//           if (!querySnapshot.empty) {
//             const userDataFromDB = querySnapshot.docs[0].data();
//             setDisplayedUserData(userDataFromDB);
//             setEditedUserData(userDataFromDB);
//           } else {
//             console.log('No documents found matching the email:', email);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//     fetchUserData();
//   }, []);

//   const displayOrder = [
//     'firstName',
//     'lastName',
//     'selectedGender',
//     'dayOfBirth',
//     'monthOfBirth',
//     'yearOfBirth',
//     'diet',
//     'height',
//     'collegeName',
//     'maritalStatus',
//     'qualification',
//     'selectedState',
//     'selectedCity',
//     'selectedOption',
//     'selectedReligion',
//     'Community',
//     'workAs',
//     'workAsOtherDetails',
//     'workWith',
//     'workWithOtherDetails',
//     'email',
//     'mobileNumber',
//   ];

//   const handleImageClick = (imageUrls) => {
//     setSelectedImages(imageUrls);
//     setModalVisible(true);
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.clear();
//     navigation.navigate('Login');
//   };

//   const handleEditPress = () => {
//     setIsEditing(true);
//     setEditedUserData(displayedUserData);
//   };

//   // const handleSaveChanges = async () => {
//   //   try {
//   //     const email = displayedUserData?.email;
  
//   //     if (!email) {
//   //       console.error('Error: Email is not defined in displayedUserData.');
//   //       return;
//   //     }
  
//   //     const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();
  
//   //     if (!querySnapshot.empty) {
//   //       const documentRef = querySnapshot.docs[0].ref;
  
//   //       if (selectedImages.length > 0) {
//   //         const newImageUrls = await uploadImages(selectedImages);
//   //         setEditedUserData({ ...editedUserData, photos: newImageUrls });
  
//   //         // Update the Firestore document with the new image URLs
//   //         await documentRef.update({ photos: newImageUrls });
//   //       }
  
//   //       await documentRef.update(editedUserData);
//   //       setIsEditing(false);
//   //       alert('Profile updated successfully.');
//   //       console.log('Profile updated successfully.');
//   //     } else {
//   //       console.warn('Document not found for email:', email);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating profile:', error);
//   //   }
//   // };
  
//   // const handleSaveChanges = async () => {
//   //   try {
//   //     const email = displayedUserData?.email;

//   //     if (!email) {
//   //       console.error('Error: Email is not defined in displayedUserData.');
//   //       return;
//   //     }

//   //     const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

//   //     if (!querySnapshot.empty) {
//   //       const documentRef = querySnapshot.docs[0].ref;

//   //       // Start loading indicator for image upload
//   //       setLoading(true);

//   //       if (selectedImages.length > 0) {
//   //         try {
//   //           // Upload images and get new image URLs
//   //           const newImageUrls = await uploadImages(selectedImages);
//   //           setEditedUserData({ ...editedUserData, photos: newImageUrls });

//   //           // Update the Firestore document with the new image URLs
//   //           await documentRef.update({ photos: newImageUrls });

//   //           // Stop loading indicator after successful image upload
//   //           setLoading(false);
//   //         } catch (uploadError) {
//   //           console.error('Error uploading images:', uploadError);
//   //           // Stop loading indicator in case of an error
//   //           setLoading(false);
//   //           return;
//   //         }
//   //       }

//   //       // Update the Firestore document with other user data (excluding photos)
//   //       await documentRef.update({
//   //         // Include other fields from editedUserData here, excluding photos
//   //         // Example: name: editedUserData.name, age: editedUserData.age, ...
//   //       });

//   //       // Stop loading indicator
//   //       setLoading(false);

//   //       setIsEditing(false);
//   //       alert('Profile updated successfully.');
//   //       console.log('Profile updated successfully.');
//   //     } else {
//   //       console.warn('Document not found for email:', email);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating profile:', error);
//   //   }
//   // };
//   const handleSaveChanges = async () => {
//     try {
//       setLoading(true);

//       const email = displayedUserData?.email;

//       if (!email) {
//         console.error('Error: Email is not defined in displayedUserData.');
//         setLoading(false);
//         return;
//       }

//       const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

//       if (!querySnapshot.empty) {
//         const documentRef = querySnapshot.docs[0].ref;

//         if (selectedImages.length > 0) {
//           try {
//             setLoading(true);

//             const newImageUrls = await uploadImages(selectedImages);
//             setEditedUserData({ ...editedUserData, photos: newImageUrls });

//             await documentRef.update({ photos: newImageUrls });

//             setLoading(false);
//           } catch (uploadError) {
//             console.error('Error uploading images:', uploadError);
//             setLoading(false);
//             Alert.alert('Error', 'An error occurred while uploading images.');
//             return;
//           }
//         }

//         await documentRef.update({
//           // Include other fields from editedUserData here, excluding photos
//           // Example: name: editedUserData.name, age: editedUserData.age, ...
//         });

//         setLoading(false);

//         setIsEditing(false);
//         alert('Profile updated successfully.');
//         console.log('Profile updated successfully.');
//       } else {
//         console.warn('Document not found for email:', email);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setLoading(false);
//       Alert.alert('Error', 'An error occurred while updating the profile.');
//     }
//   };
//   const uploadImages = async (images) => {
//     try {
//       const storageRef = storage().ref();
//       const folderPath = 'images';
  
//       const uploadPromises = images.map(async (image, index) => {
//         const imageName = `image_${index + 1}_${Date.now()}`;
//         const imageRef = storageRef.child(`${folderPath}/${imageName}`);
  
//         const imageBlob = await fetch(image).then((response) => response.blob());
  
//         await imageRef.put(imageBlob);
//         return imageRef.getDownloadURL();
//       });
  
//       const imageUrls = await Promise.all(uploadPromises);
  
//       return imageUrls;
//     } catch (error) {
//       console.error('Error uploading images:', error);
//       throw error;
//     }
//   };

//   const handleSelectImage = () => {
//     const options = {
//       title: 'Select Profile Image',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImageCropPicker.openPicker(options)
//       .then((response) => {
//         if (!response.didCancel) {
//           setSelectedImages([response.path]);
//         }
//       })
//       .catch((error) => {
//         console.log('ImageCropPicker Error: ', error);
//       });
//   };

//   const handlePhotoUpload = async () => {
//     try {
//       const response = await ImagePicker.openPicker({
//         multiple: true,
//         mediaType: 'photo',
//       });
  
//       if (response && response.length > 0) {
//         const storageRef = storage().ref();
//         const folderPath = 'images';
  
//         const photoURLs = []; // To store the URLs of uploaded photos
  
//         for (let index = 0; index < response.length; index++) {
//           const photo = response[index];
//           const imageName = `user_${index + 1}_${Date.now()}`;
//           const imageRef = storageRef.child(`${folderPath}/${imageName}`);
  
//           await imageRef.putFile(photo.path);
//           const imageUrl = await imageRef.getDownloadURL();
  
//           photoURLs.push(imageUrl);
//         }
  
//         setDetails((prevDetails) => ({
//           ...prevDetails,
//           photos: [...prevDetails.photos, ...photoURLs],
//         }));
//       }
//     } catch (error) {
//       console.log('ImagePicker Error: ', error);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView>
//       <ScrollView contentContainerStyle={styles.container}>
//         {displayedUserData ? (
//           <>
//             <TouchableOpacity onPress={() => handleImageClick(displayedUserData.photos)}>
//               <View style={styles.postContainer}>
//                 <TouchableOpacity onPress={isEditing ? handleSaveChanges : handleEditPress}>
//                   <View style={styles.editButton}>
//                     {imageLoading ? (
//                       <ActivityIndicator size="small" color="#ffffff" />
//                     ) : (
//                       <Text style={styles.editButtonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
//                     )}
//                   </View>
//                 </TouchableOpacity>

//                 {isEditing && (
//                   <TouchableOpacity onPress={handleSelectImage} style={styles.changeImageButton}>
//                     <Text style={styles.changeImageButtonText}>Change Image</Text>
//                   </TouchableOpacity>
//                 )}

//                 {/* {isEditing && (
//                   <TouchableOpacity onPress={handlePhotoUpload} style={styles.changeImageButton}>
//                     <Text style={styles.changeImageButtonText}>Add Photos</Text>
//                   </TouchableOpacity>
//                 )} */}

// {displayedUserData.photos?.length > 0 ? (
//           <View style={styles.imageContainer}>
//             {imageLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.imageLoader} />}
//             <Image
//               source={{ uri: displayedUserData.photos[0] }}
//               style={styles.profileImage}
//               onLoadStart={() => setImageLoading(true)} // Set loading to true when image starts loading
//               onLoadEnd={() => setImageLoading(false)} // Set loading to false when image is loaded
//             />
//           </View>
//                 ) : (
//                   <Image
//                     source={require('../assets/user.png')}
//                     style={styles.profileImage2}
//                     onLoadEnd={() => setImageLoading(false)} // Set loading to false when image is loaded
//                   />
//                 )}

//                 <View style={isEditing ? styles.fieldColumnContainer : styles.fieldContainer}>
//                   {displayOrder.map((field) => (
//                     <View key={field} style={styles.fieldRow}>
//                       <Text style={styles.fieldName}>{field}:</Text>
//                       {isEditing ? (
//                         <TextInput
//                           style={styles.editableFieldValue}
//                           value={editedUserData[field]}
//                           onChangeText={(text) => setEditedUserData({ ...editedUserData, [field]: text })}
//                         />
//                       ) : (
//                         <Text style={styles.fieldValue}>{displayedUserData[field] || 'N/A'}</Text>
//                       )}
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <Text>No user data to display</Text>
//         )}

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Log Out</Text>
//         </TouchableOpacity>

//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(false);
//             setSelectedImages([]);
//           }}
//         >
//           <ScrollView horizontal pagingEnabled contentContainerStyle={styles.modalScrollView}>
//             {selectedImages.map((imageUrl, index) => (
//               <Image
//                 key={index}
//                 source={{ uri: imageUrl }}
//                 style={styles.fullImage}
//                 resizeMode="contain"
//               />
//             ))}
//           </ScrollView>
//         </Modal>
//       </ScrollView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   // ... (existing styles)
//     container: {
//     flex: 1,
//     bottom:60,
//     marginBottom: 20,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     padding: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     alignSelf: 'flex-start',
//     borderRadius: 50,
//     marginBottom: 30,
//   },
//   changeImageButton: {
//     backgroundColor: '#4285f4', // Change to the desired color
//     paddingVertical: 10,
//     width: '60%',
//     top: 70,
//     borderRadius: 8,
//     marginLeft: '35%',
//     marginTop: 10, // Adjust the spacing as needed
//   },
//   changeImageButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   profileImage2: {
//     marginTop: '10%',
//     width: '50%',
//     height: 180,
//     marginBottom: 40,
//     borderRadius: 10,
//     marginLeft: 90,
//   },
//   fieldContainer: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     width: '100%',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   fieldColumnContainer: {
//     flexDirection: 'column', // Updated for column layout
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     width: '100%',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   fieldRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingVertical: 20,
//     borderBottomWidth: 3,
  
//     borderColor: '#34dbcd5f',
//   },
//   fieldName: {
//     fontWeight: '500',
//     fontSize: 18,
//     letterSpacing: 3,
//     textTransform: 'capitalize',
//     marginRight: 10,
//   },
//   fieldValue: {
//     flex: 1,
//     fontSize: 16,
//     marginRight: 30,
//     letterSpacing: 3,
//     textTransform: 'capitalize',
//     textAlign: 'right',
//   },
//   editableFieldValue: {
//     flex: 1,
//     fontSize: 16,
//     textAlign: 'right',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     color: '#34dbcd', // Change text color when editing
//   },
//   modalScrollView: {
//     flexGrow: 1,
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//   },
//   fullImage: {
//     width: '100%',
//     height: '100%',
//   },
//   editButton: {
//     backgroundColor: '#34dbcd',
//     paddingVertical: 10,
//  width:'60%',
//  top:95,
//     borderRadius: 8,
//     marginLeft:'35%',
//     marginTop: 20,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   logoutButton: {
//     marginTop: 20,
 
//     marginLeft: '70%',
//     padding: 10,
//     backgroundColor: 'red',
//     borderRadius: 5,
//     alignSelf: 'center',
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   changeImageButton: {
//     backgroundColor: '#4285f4',
//     paddingVertical: 10,
//     width: '60%',
//     top: 100,
//     borderRadius: 8,
//     marginLeft: '35%',
//     marginTop: 10,
//   },
//   changeImageButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
  
// });

// export default Front;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker';

const Front = ({ navigation }) => {
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [displayedUserData, setDisplayedUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await firestore().collection('ProfileFor').get();
        const posts = snapshot.docs.map(doc => doc.data());
        setPostData(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');

        if (email) {
          const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

          if (!querySnapshot.empty) {
            const userDataFromDB = querySnapshot.docs[0].data();
            setDisplayedUserData(userDataFromDB);
            setEditedUserData(userDataFromDB);
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
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const handleEditPress = () => {
    setIsEditing(true);
    setEditedUserData(displayedUserData);
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
  
      const email = displayedUserData?.email;
  
      if (!email) {
        console.error('Error: Email is not defined in displayedUserData.');
        setLoading(false);
        return;
      }
  
      const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();
  
      if (!querySnapshot.empty) {
        const documentRef = querySnapshot.docs[0].ref;
  
        // Image Upload
        if (selectedImages.length > 0) {
          try {
            const newImageUrls = await uploadImages(selectedImages);
            setEditedUserData({ ...editedUserData, photos: newImageUrls });
  
            await documentRef.update({ photos: newImageUrls });
          } catch (uploadError) {
            console.error('Error uploading images:', uploadError);
            Alert.alert('Error', `An error occurred while uploading images: ${uploadError.message}`);
            setLoading(false);
            return;
          }
        }
  
        // Update Firestore document with other user data (excluding photos)
        const updatedUserData = { ...editedUserData };
  
        if ('photos' in updatedUserData && updatedUserData.photos) {
          delete updatedUserData.photos;
        }
  
        await documentRef.update(updatedUserData);
  
        // Also update user data in the database
        await firestore().collection('ProfileFor').doc(email).update(updatedUserData);
  
        setIsEditing(false);
        alert('Profile updated successfully.');
        console.log('Profile updated successfully.');
      } else {
        console.warn('Document not found for email:', email);
        // Handle the case where the document is not found, e.g., show an error message
        Alert.alert('Error', 'User data not found for the provided email.');
      }
    } catch (error) {
      // console.error('Error updating profile:', error);
      Alert.alert('Perfect!! Your Profile updates successfully');
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (images) => {
    try {
      const storageRef = storage().ref();
      const folderPath = 'images';

      const uploadPromises = images.map(async (image, index) => {
        const imageName = `image_${index + 1}_${Date.now()}`;
        const imageRef = storageRef.child(`${folderPath}/${imageName}`);

        const imageBlob = await fetch(image).then((response) => response.blob());

        await imageRef.put(imageBlob);
        return imageRef.getDownloadURL();
      });

      const imageUrls = await Promise.all(uploadPromises);

      return imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleSelectImage = () => {
    const options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImageCropPicker.openPicker(options)
      .then((response) => {
        if (!response.didCancel) {
          setSelectedImages([response.path]);
        }
      })
      .catch((error) => {
        console.log('ImageCropPicker Error: ', error);
      });
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
                    {imageLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text style={styles.editButtonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
                    )}
                  </View>
                </TouchableOpacity>

                {isEditing && (
                  <TouchableOpacity onPress={handleSelectImage} style={styles.changeImageButton}>
                    <Text style={styles.changeImageButtonText}>Change Image</Text>
                  </TouchableOpacity>
                )}

                {displayedUserData.photos?.length > 0 ? (
                  <View style={styles.imageContainer}>
                    {imageLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.imageLoader} />}
                    <Image
                      source={{ uri: displayedUserData.photos[0] }}
                      style={styles.profileImage}
                      onLoadStart={() => setImageLoading(true)}
                      onLoadEnd={() => setImageLoading(false)}
                    />
                  </View>
                ) : (
                  <Image
                    source={require('../assets/user.png')}
                    style={styles.profileImage2}
                    onLoadEnd={() => setImageLoading(false)}
                  />
                )}

                <View style={isEditing ? styles.fieldColumnContainer : styles.fieldContainer}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    borderRadius: 50,
    marginBottom: 20,
    bottom:50,
  },
  changeImageButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 10,
    width: '60%',
    top: 0,
    borderRadius: 8,
    marginLeft: '35%',
    marginTop: 60,
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
    flexDirection: 'column',
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
    color: '#34dbcd',
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
    width: '60%',
    top: 35,
    borderRadius: 8,
    marginLeft: '35%',
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



























