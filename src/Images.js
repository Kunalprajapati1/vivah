
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

// const Images = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const [docId, setDocId] = useState(null);

//   useEffect(() => {
//     const fetchDocId = async () => {
//       try {
//         // Retrieve user email from AsyncStorage
//         const storedUserEmail = await AsyncStorage.getItem('userEmail');

//         if (!storedUserEmail) {
//           // Handle case when user email is not stored
//           return;
//         }

//         setUserEmail(storedUserEmail);

//         // Fetch docId from Firebase
//         const profileForRef = firestore().collection('ProfileFor');
//         const querySnapshot = await profileForRef.where('email', '==', storedUserEmail).get();

//         querySnapshot.forEach((doc) => {
//           setDocId(doc.id);
//         });

//         // Handle case when no document is found for the user
//         if (!docId) {
//           // You may want to handle this case based on your application logic
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//       }
//     };

//     fetchDocId();
//   }, [docId]);

//   const handleImagePick = async () => {
//     try {
//       const images = await ImagePicker.openPicker({
//         multiple: true, // Allow multiple image selection
//         maxFiles: 5, // Set a maximum number of images
//         width: 300,
//         height: 400,
//         cropping: true,
//       });

//       // Update the selected images array
//       setSelectedImages([...selectedImages, ...images.map((image) => image.path)]);
//     } catch (error) {
//       console.error('Error picking images:', error.message);
//       Alert.alert('Error', 'An error occurred while picking the images. Please try again.');
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (selectedImages.length === 0) {
//         Alert.alert('Error', 'Please pick at least one image before submitting.');
//         return;
//       }

//       // Upload each selected image to Firebase Storage
//       const uploadTasks = selectedImages.map(async (imagePath) => {
//         const reference = storage().ref(`images/${docId}/image_${Date.now()}`);
//         await reference.putFile(imagePath);
//         return reference.getDownloadURL();
//       });

//       // Wait for all uploads to complete
//       const imageUrls = await Promise.all(uploadTasks);

//       // Fetch the current array of photos from the document
//       const docSnapshot = await firestore().collection('ProfileFor').doc(docId).get();
//       const currentPhotos = docSnapshot.data()?.photos || [];

//       // Add the new image URLs to the array
//       const updatedPhotos = [...currentPhotos, ...imageUrls];

//       // Update the 'photos' field in the user's document in the 'ProfileFor' collection.
//       await firestore().collection('ProfileFor').doc(docId).update({
//         photos: updatedPhotos,
//       });

//       // Reset selectedImages after submission
//       setSelectedImages([]);
//       Alert.alert('Success', 'Images submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting images:', error.message);
//       Alert.alert('Error', 'An error occurred while submitting the images. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>
//         Upload more images of yourself and get matched faster!
//       </Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollView}>
//         {selectedImages.map((imageUri, index) => (
//           <Image key={index} source={{ uri: imageUri }} style={styles.selectedImage} />
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//         <Text style={styles.buttonText}>Pick Images</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
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
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 16,
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
//     backgroundColor: '#FF5733', // Reddish color
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Images;

// Images.js

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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  imageScrollView: {
    marginVertical: 16,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#FF5733', // Reddish color
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
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
