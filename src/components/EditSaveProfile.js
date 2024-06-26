
// // import React, { useEffect, useState } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Modal,
// //   ActivityIndicator,
// //   TextInput,
// //   Dimensions,
// //   Alert,
// // } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import storage from '@react-native-firebase/storage';
// // import ImageCropPicker from 'react-native-image-crop-picker';
// // import { useNavigation } from '@react-navigation/native';

// // const EditSaveProfile = ({ navigation }) => {
// //   const [postData, setPostData] = useState([]);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [selectedImages, setSelectedImages] = useState([]);
// //   const [displayedUserData, setDisplayedUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedUserData, setEditedUserData] = useState(null);
// //   const [imageLoading, setImageLoading] = useState(true);
// //   const [showAllDetails, setShowAllDetails] = useState(false);
// //   const [userPhotosGrid, setUserPhotosGrid] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [pageSize, setPageSize] = useState(10);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const snapshot = await firestore().collection('ProfileFor').get();
// //         const posts = snapshot.docs.map(doc => doc.data());
// //         setPostData(posts);
// //       } catch (error) {
// //         console.error('Error fetching posts:', error);
// //       }
// //     };

// //     const fetchUserData = async () => {
// //       try {
// //         const email = await AsyncStorage.getItem('userEmail');

// //         if (email) {
// //           const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

// //           if (!querySnapshot.empty) {
// //             const userDataFromDB = querySnapshot.docs[0].data();
// //             setDisplayedUserData(userDataFromDB);
// //             setEditedUserData(userDataFromDB);

// //             // Update user photos grid
// //             if (userDataFromDB.photos && userDataFromDB.photos.length > 0) {
// //               const photosGrid = userDataFromDB.photos.map((photo, index) => ({
// //                 id: index.toString(),
// //                 uri: photo,
// //               }));
// //               setUserPhotosGrid(photosGrid);
// //             }
// //           } else {
// //             console.log('No documents found matching the email:', email);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //     fetchUserData();
// //   }, []);

// //   const handleImageClick = imageUrls => {
// //     setSelectedImages(imageUrls);
// //     setModalVisible(true);
// //   };

// //   const handleLogout = async () => {
// //     await AsyncStorage.clear();
// //     navigation.navigate('Login');
// //   };

// //   const handleEditPress = () => {
// //     navigation.navigate('EditSaveProfile', { userData: displayedUserData });
// //     setIsEditing(true);
// //     setEditedUserData(displayedUserData);
// //   };

// //   const handleShowDetails = () => {
// //     setShowAllDetails(!showAllDetails);
// //   };

// //   const handleSaveChanges = async () => {
// //     try {
// //       setLoading(true);

// //       const email = displayedUserData?.email;

// //       if (!email) {
// //         console.error('Error: Email is not defined in displayedUserData.');
// //         setLoading(false);
// //         return;
// //       }

// //       const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

// //       if (!querySnapshot.empty) {
// //         const documentRef = querySnapshot.docs[0].ref;

// //         // Image Upload
// //         if (selectedImages.length > 0) {
// //           try {
// //             const newImageUrls = await uploadImages(selectedImages);
// //             setEditedUserData({ ...editedUserData, photos: newImageUrls });

// //             await documentRef.update({ photos: newImageUrls });
// //           } catch (uploadError) {
// //             console.error('Error uploading images:', uploadError);
// //             setLoading(false);
// //             return;
// //           }
// //         }

// //         // Update Firestore document with other user data (excluding photos)
// //         const updatedUserData = { ...editedUserData };

// //         if ('photos' in updatedUserData && updatedUserData.photos) {
// //           delete updatedUserData.photos;
// //         }

// //         await documentRef.update(updatedUserData);

// //         // Also update user data in the database
// //         await firestore().collection('ProfileFor').doc(email).update(updatedUserData);

// //         setIsEditing(false);
// //         alert('Profile updated successfully.');
// //       } else {
// //         console.warn('Document not found for email:', email);
// //         Alert.alert('Error', 'User data not found for the provided email.');
// //       }
// //     } catch (error) {
// //       Alert.alert('Perfect!! Your Profile updates successfully');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const uploadImages = async images => {
// //     try {
// //       const storageRef = storage().ref();
// //       const folderPath = 'images';

// //       const uploadPromises = images.map(async (image, index) => {
// //         const imageName = `image_${index + 1}_${Date.now()}`;
// //         const imageRef = storageRef.child(`${folderPath}/${imageName}`);

// //         const imageBlob = await fetch(image).then(response => response.blob());

// //         await imageRef.put(imageBlob);
// //         return imageRef.getDownloadURL();
// //       });

// //       const imageUrls = await Promise.all(uploadPromises);

// //       return imageUrls;
// //     } catch (error) {
// //       console.error('Error uploading images:', error);
// //       throw error;
// //     }
// //   };

// //   const handleSelectImage = () => {
// //     const options = {
// //       title: 'Select Profile Image',
// //       storageOptions: {
// //         skipBackup: true,
// //         path: 'images',
// //       },
// //     };

// //     ImageCropPicker.openPicker(options)
// //       .then(response => {
// //         if (!response.didCancel) {
// //           setSelectedImages([response.path]);
// //         }
// //       })
// //       .catch(error => {
// //         console.log('ImageCropPicker Error: ', error);
// //       });
// //   };

// //   const handleLoadMorePhotos = () => {
// //     // Fetch more photos or implement pagination logic here
// //     setCurrentPage(currentPage + 1);
// //     // Call a function to fetch more photos and append them to userPhotosGrid
// //     // For example: fetchMorePhotos(currentPage, pageSize);
// //   };

// //   const renderUserPhotosGrid = () => {
// //     // Calculate the width of each photo based on the device width
// //     const screenWidth = Dimensions.get('window').width;
// //     const photoWidth = screenWidth / 4;

// //     // Calculate the height proportionally based on the calculated width
// //     const photoHeight = photoWidth * (4 / 3); // Adjust the aspect ratio as needed

// //     return (
// //       <ScrollView
// //         onScroll={({ nativeEvent }) => {
// //           const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
// //           const paddingToBottom = 20;
// //           if (
// //             layoutMeasurement.height + contentOffset.y >=
// //             contentSize.height - paddingToBottom
// //           ) {
// //             handleLoadMorePhotos();
// //           }
// //         }}
// //         contentContainerStyle={styles.userPhotosGridContainer}
// //       >
// //         {userPhotosGrid.map(photo => (
// //           <TouchableOpacity key={photo.id} onPress={() => handleImageClick([photo.uri])}>
// //             <Image
// //               source={{ uri: photo.uri }}
// //               style={{ width: photoWidth, height: photoHeight, borderRadius: 8, margin: 7 }}
// //             />
// //           </TouchableOpacity>
// //         ))}
// //       </ScrollView>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#e05654" />
// //       </View>
// //     );
// //   }

// //   const displayOrder = [
// //     'firstName',
// //     'lastName',
// //     'Gender',
// //     'dateOfBirth',
// //     'diet',
// //     'height',
// //     'collegeName',
// //     'maritalStatus',
// //     'qualification',
// //     'selectedState',
// //     'city',
// //     'Option',
// //     'selectedReligion',
// //     'Community',
// //     'workAs',
// //     'workAsOtherDetails',
// //     'workWith',
// //     'workWithOtherDetails',
// //     'email',
// //     'mobileNumber',
// //   ];

// //   return (
// //     <ScrollView>
// //       <ScrollView contentContainerStyle={styles.container}>
// //         {displayedUserData ? (
// //           <>
// //             {/* <TouchableOpacity onPress={() => handleImageClick(displayedUserData.photos)}> */}
// //               {isEditing && (
// //                 <TouchableOpacity onPress={handleSelectImage} style={styles.changeImageButton}>
// //                   <Text style={styles.changeImageButtonText}>Change Image</Text>
// //                 </TouchableOpacity>
// //               )}
// //               <View style={{ flexDirection: 'row' }} >
// //                 {displayedUserData.photos?.length > 0 ? (
// //                   <View style={styles.imageContainer}>
// //                     {imageLoading && <ActivityIndicator size="large" color="#e05654" style={styles.imageLoader} />}
// //                     <Image
// //                       source={{ uri: displayedUserData.photos[0] }}
// //                       style={styles.profileImage}
// //                       onLoadStart={() => setImageLoading(true)}
// //                       onLoadEnd={() => setImageLoading(false)}
// //                     />
// //                   </View>
// //                 ) : (
// //                   <Image
// //                     source={require('../../assets/user.png')}
// //                     style={styles.profileImage2}
// //                     onLoadEnd={() => setImageLoading(false)}
// //                   />
// //                 )}

// //                 <TouchableOpacity style={styles.postButton} onPress={() => navigation.navigate('Images')}>
// //                   <Text style={styles.logoutButtonText}>Add more Photos</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             {/* </TouchableOpacity> */}
// //             <View style={styles.profileContainer}>
// //               <View style={styles.headerContainer}></View>

// //               <View style={isEditing ? styles.fieldColumnContainer : styles.fieldContainer}>
// //                 {displayOrder.slice(0, 3).map(field => (
// //                   <View key={field} style={styles.fieldRow}>
// //                     <Text style={styles.fieldName}>{field}:</Text>
// //                     {isEditing ? (
// //                       <TextInput
// //                         style={styles.editableFieldValue}
// //                         value={editedUserData[field]}
// //                         onChangeText={text => setEditedUserData({ ...editedUserData, [field]: text })}
// //                       />
// //                     ) : (
// //                       <Text style={styles.fieldValue}>{displayedUserData[field] || 'N/A'}</Text>
// //                     )}
// //                   </View>
// //                 ))}
// //                 {showAllDetails &&
// //                   displayOrder.slice(3).map(field => (
// //                     <View key={field} style={styles.fieldRow}>
// //                       <Text style={styles.fieldName}>{field}:</Text>
// //                       {isEditing ? (
// //                         <TextInput
// //                           style={styles.editableFieldValue}
// //                           value={editedUserData[field]}
// //                           onChangeText={text => setEditedUserData({ ...editedUserData, [field]: text })}
// //                         />
// //                       ) : (
// //                         <Text style={styles.fieldValue}>{displayedUserData[field] || 'N/A'}</Text>
// //                       )}
// //                     </View>
// //                   ))}
// //               </View>

// //               <View style={styles.butt}>
// //                 <TouchableOpacity onPress={isEditing ? handleSaveChanges : handleEditPress}>
// //                   <View style={styles.editButton}>
// //                     {imageLoading ? (
// //                       <ActivityIndicator size="small" color="#ffffff" />
// //                     ) : (
// //                       <Text style={styles.editButtonText}>
// //                         {isEditing ? 'Save Changes' : 'Edit Profile'}
// //                       </Text>
// //                     )}
// //                   </View>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity onPress={handleShowDetails} style={styles.showMoreButton}>
// //                   <Text style={styles.showMoreButtonText}>
// //                     {showAllDetails ? 'Show Less' : 'Show More'}
// //                   </Text>
// //                 </TouchableOpacity>
// //               </View>
// //               {userPhotosGrid.length > 0 && (
// //                 <View>
// //                   <Text style={styles.postsHeader}>User Photos</Text>
// //                   {renderUserPhotosGrid()}
// //                 </View>
// //               )}
// //             </View>
// //           </>
// //         ) : (
// //           <Text>No user data to display</Text>
// //         )}

// //         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
// //           <Text style={styles.logoutButtonText}>Log Out</Text>
// //         </TouchableOpacity>

// //         <Modal
// //           animationType="slide"
// //           transparent={false}
// //           visible={modalVisible}
// //           onRequestClose={() => {
// //             setModalVisible(false);
// //             setSelectedImages([]);
// //           }}
// //         >
// //           <ScrollView horizontal pagingEnabled contentContainerStyle={styles.modalScrollView}>
// //             {selectedImages.map((imageUrl, index) => (
// //               <Image key={index} source={{ uri: imageUrl }} style={styles.fullImage} resizeMode="contain" />
// //             ))}
// //           </ScrollView>
// //         </Modal>
// //       </ScrollView>
// //     </ScrollView>
// //   );
// // };

// // export default EditSaveProfile;

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: '#efefef',
// //   },
// //   profileContainer: {
// //     backgroundColor: '#efefef',
// //     padding: 10,
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 20,
// //   },
// //   profileImage: {
// //     width: 120,
// //     height: 120,
// //     marginTop: 40,
// //     left:20,
// //     borderRadius: 80,
// //   },
// //   changeImageButton: {
// //     backgroundColor: '#4285f4',
// //     paddingVertical: 10,
// //     width: '40%',
// //     top: 160,
// //     borderRadius: 8,
// //     marginLeft: '40%',
// //   },
// //   changeImageButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   profileImage2: {
// //     marginTop: '10%',
// //     width: '50%',
// //     height: 160,
// //     marginBottom: 40,
// //     borderRadius: 10,
// //     marginLeft: 90,
// //   },
// //   fieldContainer: {
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     width: '100%',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldColumnContainer: {
// //     flexDirection: 'column',
// //     justifyContent: 'flex-start',
// //     alignItems: 'flex-start',
// //     width: '100%',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     width: '100%',
// //     paddingVertical: 12,
// //   },
// //   fieldName: {
// //     fontWeight: '500',
// //     fontSize: 18,
// //     letterSpacing: 3,
// //     textTransform: 'capitalize',
// //     marginRight: 10,
// //   },
// //   fieldValue: {
// //     flex: 1,
// //     fontSize: 16,
// //     marginRight: 30,
// //     letterSpacing: 3,
// //     color: '#db3442',
// //     textAlign: 'right',
// //   },
// //   editableFieldValue: {
// //     flex: 1,
// //     fontSize: 16,
// //     textAlign: 'right',
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //     color: '#db3442',
// //   },
// //   modalScrollView: {
// //     flexGrow: 1,
// //     flexDirection: 'row',
// //     paddingHorizontal: 10,
// //   },
// //   fullImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   logoutButton: {
// //     marginTop: 20,
// //     fontFamily: 'Montserrat-Regular',
// //     padding: 10,
// //     paddingHorizontal: 70,
// //     backgroundColor: 'red',
// //     borderRadius: 5,
// //     alignSelf: 'center',
// //   },
// //   logoutButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   showMoreButton: {
// //     marginTop: 10,
// //     paddingVertical: 15,
// //     borderRadius: 8,
// //     width: '45%',
// //     marginLeft: 100,
// //     alignItems: 'center',
// //   },
// //   showMoreButtonText: {
// //     color: '#3b3636',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   editButton: {
// //     marginTop: 10,
// //     backgroundColor: '#db3442',
// //     paddingVertical: 15,
// //     borderRadius: 8,
// //     width: '210%',
// //     alignItems: 'center',
// //   },
// //   editButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   butt: {
// //     flexDirection: 'row',
// //   },
// //   userPhotosGridContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     paddingHorizontal: 10,
// //     marginTop: 20,
// //   },
// //   userPhoto: {
// //     width: 110,
// //     height: 130,
// //     borderRadius: 8,
// //     margin: 3,
// //   },
// //   postsHeader: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'left',
// //     marginLeft: 10,
// //     marginBottom: 10,
// //   },
// //   postButton:{
// //     marginTop: 20,
// //     fontFamily: 'Montserrat-Regular',
// //     padding: 10,
// //     marginLeft:40,
// //     paddingHorizontal: 30,
// //     backgroundColor: 'red',
// //     borderRadius: 5,
// //     alignSelf: 'center',
// //   },
// // });












// // import React, { useEffect, useState } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Modal,
// //   ActivityIndicator,
// // } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';

// // const EditSaveProfile = ({ navigation }) => {
// //   const [displayedUserData, setDisplayedUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [userPhotos, setUserPhotos] = useState([]);

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const email = await AsyncStorage.getItem('userEmail');

// //         if (email) {
// //           const querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

// //           if (!querySnapshot.empty) {
// //             const userDataFromDB = querySnapshot.docs[0].data();
// //             setDisplayedUserData(userDataFromDB);

// //             // Update user photos
// //             if (userDataFromDB.photos && userDataFromDB.photos.length > 0) {
// //               setUserPhotos(userDataFromDB.photos);
// //             }
// //           } else {
// //             console.log('No documents found matching the email:', email);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   const handleImageClick = imageUrls => {
// //     // Handle image click logic here if needed
// //   };

// //   const handleLogout = async () => {
// //     await AsyncStorage.clear();
// //     navigation.navigate('Login');
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#e05654" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       {displayedUserData ? (
// //         <View style={styles.profileContainer}>
// //           <View style={styles.headerContainer}></View>

// //           {/* Profile photo */}
// //           {userPhotos.length > 0 && (
// //             <View style={styles.photoContainer}>
// //               {userPhotos.map((photo, index) => (
// //                 <Image
// //                   key={index}
// //                   source={{ uri: photo }}
// //                   style={styles.profilePhoto}
// //                   resizeMode="cover"
// //                 />
// //               ))}
// //             </View>
// //           )}

// //           {/* User information */}
// //           <View style={styles.fieldContainer}>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>{`${displayedUserData.firstName} ${displayedUserData.lastName}`}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Height: {displayedUserData.height || 'N/A'}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Email: {displayedUserData.email || 'N/A'}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Mobile: {displayedUserData.mobileNumber || 'N/A'}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Date of Birth: {displayedUserData.dateOfBirth || 'N/A'}</Text>
// //             </View>
// //           </View>

// //           {/* Photos */}
// //           {userPhotos.length > 0 && (
// //             <View>
// //               <Text style={styles.postsHeader}>User Photos</Text>
// //               <ScrollView horizontal>
// //                 {userPhotos.map((photo, index) => (
// //                   <TouchableOpacity key={index} onPress={() => handleImageClick([photo])}>
// //                     <Image
// //                       source={{ uri: photo }}
// //                       style={styles.userPhoto}
// //                       resizeMode="cover"
// //                     />
// //                   </TouchableOpacity>
// //                 ))}
// //               </ScrollView>
// //             </View>
// //           )}
// //         </View>
// //       ) : (
// //         <Text>No user data to display</Text>
// //       )}

// //       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
// //         <Text style={styles.logoutButtonText}>Log Out</Text>
// //       </TouchableOpacity>

// //       <Modal
// //         animationType="slide"
// //         transparent={false}
// //         visible={false} // Adjust modal visibility as needed
// //         onRequestClose={() => {
// //           // Handle modal close logic here if needed
// //         }}
// //       >
// //         {/* Modal content here */}
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // export default EditSaveProfile;

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: '#efefef',
// //   },
// //   profileContainer: {
// //     backgroundColor: '#efefef',
// //     padding: 10,
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 20,
// //   },
// //   photoContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   profilePhoto: {
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //     marginHorizontal: 10,
// //   },
// //   fieldContainer: {
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     width: '100%',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldRow: {
// //     width: '100%',
// //     paddingVertical: 12,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldValue: {
// //     fontSize: 16,
// //     paddingHorizontal: 10,
// //     paddingVertical: 5,
// //     letterSpacing: 1,
// //     color: '#db3442',
// //   },
// //   postsHeader: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'left',
// //     marginLeft: 10,
// //     marginBottom: 10,
// //   },
// //   logoutButton: {
// //     marginTop: 20,
// //     padding: 10,
// //     paddingHorizontal: 70,
// //     backgroundColor: 'red',
// //     borderRadius: 5,
// //     alignSelf: 'center',
// //   },
// //   logoutButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   userPhoto: {
// //     width: 110,
// //     height: 110,
// //     borderRadius: 8,
// //     marginHorizontal: 5,
// //   },
// // });















// // import React, { useEffect, useState } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Modal,
// //   ActivityIndicator,
// //   BackHandler,
// // } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';

// // const EditSaveProfile = ({ navigation }) => {
// //   const [displayedUserData, setDisplayedUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [userPhotos, setUserPhotos] = useState([]);

// //   useEffect(() => {
// //     const handleBackPress = () => {
// //       navigation.navigate('Land');
// //       return true; // Prevent default behavior (closing the app)
// //     };

// //     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

// //     return () => {
// //       backHandler.remove(); // Cleanup the event listener
// //     };
// //   }, []);

// //   const handleImageClick = (imageUrls) => {
// //     // Handle image click logic here if needed
// //   };


  
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const email = await AsyncStorage.getItem('userEmail');

// //         if (email) {
// //           // Check 'ProfileFor' collection first
// //           let querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

// //           if (!querySnapshot.empty) {
// //             const userDataFromDB = querySnapshot.docs[0].data();
// //             setDisplayedUserData(userDataFromDB);

// //             // Update user photos
// //             if (userDataFromDB.photos && userDataFromDB.photos.length > 0) {
// //               setUserPhotos(userDataFromDB.photos);
// //             }
// //           } else {
// //             // If not found in 'ProfileFor', check 'users' collection
// //             querySnapshot = await firestore().collection('users').where('email', '==', email).get();

// //             if (!querySnapshot.empty) {
// //               const userDataFromUsersCollection = querySnapshot.docs[0].data();
// //               setDisplayedUserData({
// //                 firstName: userDataFromUsersCollection.name,
// //                 lastName: '', // Assuming 'users' collection does not have last name
// //                 email: userDataFromUsersCollection.email,
// //                 mobileNumber: userDataFromUsersCollection.mobileNumber,
// //                 profileImage: userDataFromUsersCollection.profileImage,
// //               });

// //               // No photos assumed from 'users' collection
// //               setUserPhotos([]);
// //             } else {
// //               console.log('No documents found matching the email:', email);
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);



// //   const handleLogout = async () => {
// //     await AsyncStorage.clear();
// //     navigation.navigate('Login');
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#e05654" />
// //       </View>
// //     );
// //   }

// //   const handleBackPress = () => {
// //     // Navigate back to 'Land' page when the hardware back button is pressed
// //     navigation.navigate('Land');
// //     return true; // Prevent default behavior (closing the app)
// //   };
// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       {displayedUserData ? (
// //         <View style={styles.profileContainer}>
// //           <View style={styles.headerContainer}></View>

// //           {/* Profile photo */}
// //           {displayedUserData.profileImage && (
// //             <View style={styles.photoContainer}>
// //               <Image
// //                 source={{ uri: displayedUserData.profileImage }}
// //                 style={styles.profilePhoto}
// //                 resizeMode="cover"
// //               />

// //             </View>
// //           )}

        
         
// //           {userPhotos.slice(0, 1).map((photo, index) => (
// //             <TouchableOpacity key={index} onPress={() => handleImageClick([photo])}>
// //               <Image
// //                 source={{ uri: photo }}
// //                 style={styles.profilePhoto}
// //                 resizeMode="cover"
// //               />
// //             </TouchableOpacity>
// //           ))}




// //           {/* User information */}
// //           <View style={styles.fieldContainer}>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>{`${displayedUserData.firstName} ${displayedUserData.lastName}`}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Email: {displayedUserData.email || 'N/A'}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Mobile: {displayedUserData.mobileNumber || 'N/A'}</Text>
// //             </View>
// //           </View>

// //           {/* Photos */}
// //           {userPhotos.length > 0 && (
// //             <View>

// //               <ScrollView >
                
// //                 {userPhotos.map((photo, index) => (
// //                   <TouchableOpacity key={index} onPress={() => handleImageClick([photo])}>
// //                     <Image
// //                       source={{ uri: photo }}
// //                       style={styles.userPhoto}
// //                       resizeMode="cover"
// //                     />
// //                   </TouchableOpacity>
// //                 ))}
// //               </ScrollView>
// //             </View>
// //           )}

// //         </View>
// //       ) : (
// //         <Text>No user data to display</Text>
// //       )}

// //       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
// //         <Text style={styles.logoutButtonText}>Log Out</Text>
// //       </TouchableOpacity>

// //       <Modal
// //         animationType="slide"
// //         transparent={false}
// //         visible={false} // Adjust modal visibility as needed
// //         onRequestClose={() => {
// //           // Handle modal close logic here if needed
// //         }}
// //       >
// //         {/* Modal content here */}
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // export default EditSaveProfile;

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: '#efefef',
// //   },
// //   profileContainer: {
// //     backgroundColor: '#efefef',
// //     padding: 10,
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 20,
// //   },
// //   photoContainer: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   profilePhoto: {
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //   },
// //   fieldContainer: {
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     width: '100%',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldRow: {
// //     width: '100%',
// //     paddingVertical: 12,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldValue: {
// //     fontSize: 16,
// //     paddingHorizontal: 10,
// //     paddingVertical: 5,
// //     letterSpacing: 1,
// //     color: '#db3442',
// //   },
// //   postsHeader: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'left',
// //     marginLeft: 10,
// //     marginBottom: 10,
// //   },
// //   logoutButton: {
// //     marginTop: 20,
// //     padding: 10,
// //     paddingHorizontal: 70,
// //     backgroundColor: 'red',
// //     borderRadius: 5,
// //     alignSelf: 'center',
// //   },
// //   logoutButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   userPhoto: {
// //     marginTop:30,
// //     width: 110,
// //     height: 110,
// //     borderRadius: 8,
// //     marginHorizontal: 5,
// //   },
// // });




// // import React, { useEffect, useState } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   FlatList,
// //   TouchableOpacity,
// //   Modal,
// //   ActivityIndicator,
// //   BackHandler,
// // } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';

// // const EditSaveProfile = ({ navigation }) => {
// //   const [displayedUserData, setDisplayedUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [userPhotos, setUserPhotos] = useState([]);

// //   useEffect(() => {
// //     const handleBackPress = () => {
// //       navigation.navigate('Land');
// //       return true; // Prevent default behavior (closing the app)
// //     };

// //     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

// //     return () => {
// //       backHandler.remove(); // Cleanup the event listener
// //     };
// //   }, []);

// //   const handleImageClick = (imageUrls) => {
// //     // Handle image click logic here if needed
// //   };

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const email = await AsyncStorage.getItem('userEmail');

// //         if (email) {
// //           // Check 'ProfileFor' collection first
// //           let querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

// //           if (!querySnapshot.empty) {
// //             const userDataFromDB = querySnapshot.docs[0].data();
// //             setDisplayedUserData(userDataFromDB);

// //             // Update user photos
// //             if (userDataFromDB.photos && userDataFromDB.photos.length > 0) {
// //               setUserPhotos(userDataFromDB.photos);
// //             }
// //           } else {
// //             // If not found in 'ProfileFor', check 'users' collection
// //             querySnapshot = await firestore().collection('users').where('email', '==', email).get();

// //             if (!querySnapshot.empty) {
// //               const userDataFromUsersCollection = querySnapshot.docs[0].data();
// //               setDisplayedUserData({
// //                 firstName: userDataFromUsersCollection.name,
// //                 lastName: '', // Assuming 'users' collection does not have last name
// //                 email: userDataFromUsersCollection.email,
// //                 mobileNumber: userDataFromUsersCollection.mobileNumber,
// //                 profileImage: userDataFromUsersCollection.profileImage,
// //               });

// //               // No photos assumed from 'users' collection
// //               setUserPhotos([]);
// //             } else {
// //               console.log('No documents found matching the email:', email);
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   const handleLogout = async () => {
// //     await AsyncStorage.clear();
// //     navigation.navigate('Login');
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#e05654" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {displayedUserData ? (
// //         <View style={styles.profileContainer}>
// //           <View style={styles.headerContainer}></View>

// //           {/* Profile photo */}
// //           {displayedUserData.profileImage && (
// //             <View style={styles.photoContainer}>
// //               <Image
// //                 source={{ uri: displayedUserData.profileImage }}
// //                 style={styles.profilePhoto}
// //                 resizeMode="cover"
// //               />
// //             </View>
// //           )}
          
// //                      {userPhotos.slice(0, 1).map((photo, index) => (
// //             <TouchableOpacity key={index} onPress={() => handleImageClick([photo])}>
// //               <Image
// //                 source={{ uri: photo }}
// //                 style={styles.profilePhoto}
// //                 resizeMode="cover"
// //               />
// //             </TouchableOpacity>
// //           ))}

// //           {/* User information */}
// //           <View style={styles.fieldContainer}>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>{`${displayedUserData.firstName} ${displayedUserData.lastName}`}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Email: {displayedUserData.email || 'N/A'}</Text>
// //             </View>
// //             <View style={styles.fieldRow}>
// //               <Text style={styles.fieldValue}>Mobile: {displayedUserData.mobileNumber || 'N/A'}</Text>
// //             </View>
// //           </View>

        
// //           {userPhotos.length > 0 && (
// //             <FlatList
// //               data={userPhotos}
// //               renderItem={({ item }) => (
// //                 <TouchableOpacity onPress={() => handleImageClick([item])}>
// //                   <Image
// //                     source={{ uri: item }}
// //                     style={styles.userPhoto}
// //                     resizeMode="cover"
// //                   />
// //                 </TouchableOpacity>
// //               )}
// //               keyExtractor={(item, index) => index.toString()}
// //               numColumns={3}
// //               key={3}
// //             />
// //           )}
          
// //         </View>
// //       ) : (
// //         <Text>No user data to display</Text>
// //       )}

// //       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
// //         <Text style={styles.logoutButtonText}>Log Out</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default EditSaveProfile;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#efefef',
// //   },
// //   profileContainer: {
// //     backgroundColor: '#efefef',
// //     padding: 10,
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 20,
// //   },
// //   photoContainer: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   profilePhoto: {
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //   },
// //   fieldContainer: {
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     width: '100%',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldRow: {
// //     width: '100%',
// //     paddingVertical: 12,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   fieldValue: {
// //     fontSize: 16,
// //     paddingHorizontal: 10,
// //     paddingVertical: 5,
// //     letterSpacing: 1,
// //     color: '#db3442',
// //   },
// //   logoutButton: {
// //     marginTop: 20,
// //     padding: 10,
// //     paddingHorizontal: 70,
// //     backgroundColor: 'red',
// //     borderRadius: 5,
// //     alignSelf: 'center',
// //   },
// //   logoutButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   userPhoto: {
// //     marginTop:30,
// //    marginLeft:10,
// //     width: '90%',
// //     height: 160,
// //     borderRadius: 8,
// //     marginHorizontal:100,
// //     // margin: 65,
// //   },
// // });








// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   BackHandler,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const EditSaveProfile = ({ navigation }) => {
//   const [displayedUserData, setDisplayedUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userPhotos, setUserPhotos] = useState([]);

//   useEffect(() => {
//     const handleBackPress = () => {
//       navigation.navigate('Land');
//       return true; // Prevent default behavior (closing the app)
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//     return () => {
//       backHandler.remove(); // Cleanup the event listener
//     };
//   }, [navigation]);

//   const handleImageClick = (imageUrls) => {
//     // Handle image click logic here if needed
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');

//         if (email) {
//           // Check 'ProfileFor' collection first
//           let querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

//           if (!querySnapshot.empty) {
//             const userDataFromDB = querySnapshot.docs[0].data();
//             setDisplayedUserData(userDataFromDB);

//             // Update user photos
//             if (userDataFromDB.photos && userDataFromDB.photos.length > 0) {
//               setUserPhotos(userDataFromDB.photos);
//             }
//           } else {
//             // If not found in 'ProfileFor', check 'users' collection
//             querySnapshot = await firestore().collection('users').where('email', '==', email).get();

//             if (!querySnapshot.empty) {
//               const userDataFromUsersCollection = querySnapshot.docs[0].data();
//               setDisplayedUserData({
//                 firstName: userDataFromUsersCollection.name,
//                 lastName: '', // Assuming 'users' collection does not have last name
//                 email: userDataFromUsersCollection.email,
//                 mobileNumber: userDataFromUsersCollection.mobileNumber,
//                 profileImage: userDataFromUsersCollection.profileImage,
//               });

//               // No photos assumed from 'users' collection
//               setUserPhotos([]);
//             } else {
//               console.log('No documents found matching the email:', email);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.clear();
//     navigation.navigate('Landing');
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#e05654" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {displayedUserData ? (
//         <ScrollView style={styles.profileContainer}>
//           <View style={styles.headerContainer}></View>
// <View style={styles.fles}>
//           {/* Profile photo */}
//           {displayedUserData.profileImage && (
//             <View style={styles.photoContainer}>
//               <Image
//                 source={{ uri: displayedUserData.profileImage }}
//                 style={styles.profilePhoto}
//                 resizeMode="cover"
//               />
//             </View>
//           )}
//                      {userPhotos.slice(0, 1).map((photo, index) => (
//             <TouchableOpacity key={index} onPress={() => handleImageClick([photo])}>
//               <Image
//                 source={{ uri: photo }}
//                 style={styles.profilePhoto}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           ))}

//           {/* User information */}
//             <View style={styles.fieldRow1}>
//               <Text style={styles.fieldValue1}>{`${displayedUserData.firstName} ${displayedUserData.lastName}`}</Text>
//             </View>
//             </View>
//             <View style={styles.fieldContainer}>

//             <View style={styles.fieldRow}>
//               <Text style={styles.fieldValue}>Email: {displayedUserData.email || 'N/A'}</Text>
//             </View>
//             <View style={styles.fieldRow}>
//               <Text style={styles.fieldValue}>Mobile: {displayedUserData.mobileNumber || 'N/A'}</Text>
//             </View>
//           </View>

//           {/* User photos */}
//           {userPhotos.length > 0 && (
//             <View style={styles.photosContainer}>
//               <FlatList
//                 data={userPhotos}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity onPress={() => handleImageClick([item])}>
//                     <Image
//                       source={{ uri: item }}
//                       style={styles.userPhoto}
//                       resizeMode="cover"
//                     />
//                   </TouchableOpacity>
//                 )}
//                 keyExtractor={(item, index) => index.toString()}
//                 numColumns={3}
//                 key={3}
//               />
//             </View>
//           )}

           
//         </ScrollView>
//       ) : (
//         <Text>No user data to display</Text>
//       )}

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default EditSaveProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#efefef',
//   },
//   profileContainer: {
//     backgroundColor: '#efefef',
//     padding: 10,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   photoContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profilePhoto: {
//     borderWidth:3,
//     borderColor:'#fbd1d1',
     
//      width: 100,
//      height: 100,
//      borderRadius: 50,
//      marginRight: 16,
//      resizeMode: 'cover',
//   },
//   fieldContainer: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     width: '100%',
//     paddingVertical: 10,
//     borderBottomWidth: 10,
//     borderBottomColor: '#ddd',
//   },
//   fieldRow: {
//     width: '100%',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   fieldRow1: {
//   width:'150%',
//     paddingVertical: 30,
//     borderBottomWidth: 2,
//     borderColor: '#ccc',
//   },
  
//   fieldValue: {
//     color:'black',

//     fontSize: 16,
//     marginBottom: 4,
//   },

   
//   fieldValue1: {
//     color:'black',

//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   photosContainer: {
//     marginTop: 20,
//   },
//   logoutButton: {
//     marginTop: 20,
//     padding: 10,
//     paddingHorizontal: 70,
//     backgroundColor: 'red',
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginBottom:30,
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   userPhoto: {
//     borderColor:'#fbd1d1',
//     borderWidth:3,
//     // marginTop:30,
//     marginLeft:10,
//     width: '90%',
//     height: 120,
//     borderRadius: 8,
//     marginHorizontal:100,
//   },
//   fles:{
// flexDirection:'row',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Modal,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditSaveProfile = ({ navigation }) => {
  const [displayedUserData, setDisplayedUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPhotos, setUserPhotos] = useState([]);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate('Land');
      return true; // Prevent default behavior (closing the app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [navigation]);

  const handleImageClick = (uri) => {
    setSelectedImageUri(uri[0]); // Assuming 'uri' is an array of strings (URIs)
    setViewImageModal(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');

        if (email) {
          // Check 'ProfileFor' collection first
          let querySnapshot = await firestore().collection('ProfileFor').where('email', '==', email).get();

          if (!querySnapshot.empty) {
            const userDataFromDB = querySnapshot.docs[0].data();
            setDisplayedUserData(userDataFromDB);

            // Update user photos
            if (userDataFromDB.photos && userDataFromDB.photos.length > 0) {
              setUserPhotos(userDataFromDB.photos);
            }
          } else {
            // If not found in 'ProfileFor', check 'users' collection
            querySnapshot = await firestore().collection('users').where('email', '==', email).get();

            if (!querySnapshot.empty) {
              const userDataFromUsersCollection = querySnapshot.docs[0].data();
              setDisplayedUserData({
                firstName: userDataFromUsersCollection.name,
                lastName: '', // Assuming 'users' collection does not have last name
                email: userDataFromUsersCollection.email,
                mobileNumber: userDataFromUsersCollection.mobileNumber,
                profileImage: userDataFromUsersCollection.profileImage,
              });

              // No photos assumed from 'users' collection
              setUserPhotos([]);
            } else {
              console.log('No documents found matching the email:', email);
            }
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

  // const handleLogout = async () => {
  //   await AsyncStorage.clear();
  //   navigation.navigate('Landing');
  // };
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userEmail');
    navigation.navigate('Landing');
  };
  const handleFavorite = async () => {
  
    navigation.navigate('Connected');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e05654" />
      </View>
    );
  }

  const closeImageView = () => {
    setViewImageModal(false);
  };

  return (
    <View style={styles.container}>
      {displayedUserData ? (
        <ScrollView style={styles.profileContainer}>
          <View style={styles.headerContainer}></View>

          
 <View style={styles.fles}>
           {/* Profile photo */}
         {displayedUserData.profileImage && (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: displayedUserData.profileImage }}
                style={styles.profilePhoto}
                resizeMode="cover"
              />
            </View>
          )}
                     {userPhotos.slice(0, 1).map((photo, index) => (
            <TouchableOpacity key={index} onPress={() => handleImageClick([photo])}>
              <Image
                source={{ uri: photo }}
                style={styles.profilePhoto}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}

          {/* User information */}
            <View style={styles.fieldRow1}>
              <Text style={styles.fieldValue1}>{`${displayedUserData.firstName} ${displayedUserData.lastName}`}</Text>
            </View>
            </View>
          <View style={styles.fieldContainer}>
            
            <View style={styles.fieldRow}>
              <Text style={styles.fieldValue}>Email: {displayedUserData.email || 'N/A'}</Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldValue}>Mobile: {displayedUserData.mobileNumber || 'N/A'}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton2} onPress={handleFavorite}>
        <Text style={styles.logoutButtonText2}>Show Favorite 📑</Text>
      </TouchableOpacity>
          </View>

          {/* User photos */}
          {userPhotos.length > 0 && (
            <View style={styles.photosContainer}>
              <FlatList
                data={userPhotos}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleImageClick([item])}>
                    <Image
                      source={{ uri: item }}
                      style={styles.userPhoto}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
            </View>
          )}

          <Modal
            visible={viewImageModal}
            transparent={true}
            onRequestClose={closeImageView}
          >
            <View style={styles.modalContainer}>
              {selectedImageUri ? (
                <Image
                  source={{ uri: selectedImageUri }}
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
              ) : null}
              <TouchableOpacity style={styles.closeButton} onPress={closeImageView}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

        </ScrollView>
      ) : (
        <Text>No user data to display</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out  👋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditSaveProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  profileContainer: {
    backgroundColor: '#efefef',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    borderWidth:3,
    borderColor:'#fbd1d1',
     
     width: 100,
     height: 100,
     borderRadius: 50,
     marginRight: 16,
     resizeMode: 'cover',
  },
  fieldContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  fieldRow: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fieldRow1: {
  width:'150%',
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  
  fieldValue: {
    color:'black',

    fontSize: 16,
    marginBottom: 4,
  },

   
  fieldValue1: {
    color:'black',

    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  photosContainer: {
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 70,
    backgroundColor: '#d31e1ec6',

    borderRadius: 35,
    alignSelf: 'center',
    marginBottom:30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  userPhoto: {
    borderColor:'#fbd1d1',
    borderWidth:3,
    // marginTop:30,
    marginLeft:10,
    width: '90%',
    height: 120,
    right:10,
    borderRadius: 8,
    marginHorizontal:100,
  },
  fles:{
flexDirection:'row',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: windowWidth,
    height: windowHeight,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  logoutButton2: {
    marginTop:10,
   paddingVertical:5,
  paddingHorizontal:20,
    backgroundColor: '#d31e1ec6',
    borderRadius: 5,
   
  },
  logoutButtonText2: {
    color: 'white',
    fontSize: 14,
  },
});
