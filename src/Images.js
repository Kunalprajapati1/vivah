

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';

const Images = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [docId, setDocId] = useState(null);
  const [isPickingImages, setIsPickingImages] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDocId = async () => {
      try {
        // Retrieve user email from AsyncStorage
        const storedUserEmail = await AsyncStorage.getItem('userEmail');

        if (!storedUserEmail) {
          // Handle case when user email is not stored
          return;
        }

        setUserEmail(storedUserEmail);

        // Fetch docId from Firebase
        const profileForRef = firestore().collection('ProfileFor');
        const querySnapshot = await profileForRef.where('email', '==', storedUserEmail).get();

        querySnapshot.forEach((doc) => {
          setDocId(doc.id);
        });

        // Handle case when no document is found for the user
        if (!docId) {
          // You may want to handle this case based on your application logic
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchDocId();
  }, [docId]);

  const handleImagePick = async () => {
    try {
      setIsPickingImages(true); // Start activity indicator

      const images = await ImagePicker.openPicker({
        multiple: true, // Allow multiple image selection
        maxFiles: 5, // Set a maximum number of images
        width: 300,
        height: 400,
        cropping: true,
      });

      // Update the selected images array
      setSelectedImages([...selectedImages, ...images.map((image) => image.path)]);
    } catch (error) {
      console.error('Error picking images:', error.message);
      Alert.alert('Error', 'An error occurred while picking the images. Please try again.');
    } finally {
      setIsPickingImages(false); // Stop activity indicator
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true); // Start activity indicator

      if (selectedImages.length === 0) {
        Alert.alert('Error', 'Please pick at least one image before submitting.');
        return;
      }

      // Upload each selected image to Firebase Storage
      const uploadTasks = selectedImages.map(async (imagePath) => {
        const reference = storage().ref(`images/${docId}/image_${Date.now()}`);
        await reference.putFile(imagePath);
        return reference.getDownloadURL();
      });

      // Wait for all uploads to complete
      const imageUrls = await Promise.all(uploadTasks);

      // Fetch the current array of photos from the document
      const docSnapshot = await firestore().collection('ProfileFor').doc(docId).get();
      const currentPhotos = docSnapshot.data()?.photos || [];

      // Add the new image URLs to the array
      const updatedPhotos = [...currentPhotos, ...imageUrls];

      // Update the 'photos' field in the user's document in the 'ProfileFor' collection.
      await firestore().collection('ProfileFor').doc(docId).update({
        photos: updatedPhotos,
      });

      // Reset selectedImages after submission
      setSelectedImages([]);
      Alert.alert('Success', 'Images submitted successfully!');

      // Navigate to "Land" screen
      navigation.navigate('Land');
    } catch (error) {
      console.error('Error submitting images:', error.message);
      Alert.alert('Error', 'An error occurred while submitting the images. Please try again.');
    } finally {
      setIsSubmitting(false); // Stop activity indicator
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Upload more images of yourself and get matched faster!
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollView}>
        {selectedImages.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.selectedImage} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleImagePick} disabled={isPickingImages || isSubmitting}>
        <Text style={styles.buttonText}>Pick Images</Text>
        {isPickingImages && <ActivityIndicator style={styles.activityIndicator} color="#fff" />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isPickingImages || isSubmitting}>
        <Text style={styles.buttonText}>Submit</Text>
        {isSubmitting && <ActivityIndicator style={styles.activityIndicator} color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    color:'black',
    fontFamily: 'Montserrat-Regular',

    marginTop:20,
    fontSize: 20,
  
    textAlign: 'center',
    marginBottom: 16,
  },
  imageScrollView: {
    marginVertical: 16,
  },
  selectedImage: {
    width: 180,
    height: 180,
    borderWidth:1,
    borderColor:'#e05654',
    borderRadius: 20,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#e05654',

    padding: 11,
    marginVertical: 8,
    borderRadius: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  activityIndicator: {
    marginLeft: 10,
  },
});

export default Images;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   PermissionsAndroid,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// import { useNavigation } from '@react-navigation/native';

// const Images = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const [docId, setDocId] = useState(null);
//   const [isPickingImages, setIsPickingImages] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchDocId = async () => {
//       try {
//         const storedUserEmail = await AsyncStorage.getItem('userEmail');
//         if (!storedUserEmail) {
//           return;
//         }

//         setUserEmail(storedUserEmail);
//         const profileForRef = firestore().collection('ProfileFor');
//         const querySnapshot = await profileForRef.where('email', '==', storedUserEmail).get();

//         querySnapshot.forEach((doc) => {
//           setDocId(doc.id);
//         });

//         if (!querySnapshot.empty && !docId) {
//           Alert.alert('Error', 'User document not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//       }
//     };

//     if (userEmail && !docId) {
//       fetchDocId();
//     }
//   }, [userEmail, docId]);

//   useEffect(() => {
//     // Open camera by default when the page loads
//     handleImagePick('camera');
//   }, []);

//   const handleImagePick = async (source) => {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       ]);
  
//       if (
//         granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
//         granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         setIsPickingImages(true);
//         let images;
//         if (source === 'camera') {
//           images = await ImagePicker.openCamera({
//             width: 300,
//             height: 400,
//             cropping: true,
//           });
//         } else {
//           images = await ImagePicker.openPicker({
//             multiple: true,
//             maxFiles: 5,
//             width: 300,
//             height: 400,
//             cropping: true,
//           });
//         }
//         setSelectedImages((prevImages) => [...prevImages, ...images.map((image) => image.path)]);
//       } else {
//         Alert.alert(
//           'Permissions Required',
//           'Sanjog requires camera and storage permissions to function properly. Please grant the permissions in the app settings.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//             {
//               text: 'Open Settings',
//               onPress: () => Linking.openSettings(),
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (error) {
//       console.error('Error picking images:', error.message);
//       Alert.alert('Error', 'An error occurred while picking the images. Please try again.');
//     } finally {
//       setIsPickingImages(false);
//     }
//   };
  
//   const handleSubmit = async () => {
//     try {
//       setIsSubmitting(true);
//       if (selectedImages.length === 0) {
//         Alert.alert('Error', 'Please pick at least one image before submitting.');
//         return;
//       }

//       const uploadTasks = selectedImages.map(async (imagePath) => {
//         const reference = storage().ref(`images/${docId}/image_${Date.now()}`);
//         await reference.putFile(imagePath);
//         return reference.getDownloadURL();
//       });

//       const imageUrls = await Promise.all(uploadTasks);

//       const docSnapshot = await firestore().collection('ProfileFor').doc(docId).get();
//       const currentPhotos = docSnapshot.data()?.photos || [];
//       const updatedPhotos = [...currentPhotos, ...imageUrls];

//       await firestore().collection('ProfileFor').doc(docId).update({
//         photos: updatedPhotos,
//       });

//       setSelectedImages([]);
//       Alert.alert('Success', 'Images submitted successfully!');
//       navigation.navigate('Land');
//     } catch (error) {
//       console.error('Error submitting images:', error.message);
//       Alert.alert('Error', 'An error occurred while submitting the images. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cameraContainer}>
//         <TouchableOpacity style={styles.cameraButton} onPress={() => handleImagePick('camera')}>
//           <Text style={styles.cameraButtonText}>Take Photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.galleryButton} onPress={() => handleImagePick('gallery')}>
//           <Text style={styles.galleryButtonText}>Open Gallery</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollView}>
//         {selectedImages.map((imageUri, index) => (
//           <Image key={index} source={{ uri: imageUri }} style={styles.selectedImage} />
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isPickingImages || isSubmitting}>
//         <Text style={styles.buttonText}>Submit</Text>
//         {isSubmitting && <ActivityIndicator style={styles.activityIndicator} color="#fff" />}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   cameraContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   cameraButton: {
//     backgroundColor: '#FF5733',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '48%',
//   },
//   cameraButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   galleryButton: {
//     backgroundColor: '#FF5733',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '48%',
//   },
//   galleryButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   imageScrollView: {
//     marginVertical: 16,
//   },
//   selectedImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   button: {
//     backgroundColor: '#FF5733',
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   activityIndicator: {
//     position: 'absolute',
//     right: 15,
//   },
// });

// export default Images;
