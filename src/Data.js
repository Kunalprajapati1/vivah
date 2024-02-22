// // Data.js
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useRoute } from '@react-navigation/native';
// import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-crop-picker';

// const Data = ({ navigation }) => {
//   const route = useRoute();
//   const { uniqueId } = route.params;
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profileCreated, setProfileCreated] = useState(false);
//   const [creatingProfile, setCreatingProfile] = useState(false);
//   const [details, setDetails] = useState({
//     photos: [],
//   });

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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const documentSnapshot = await firestore()
//           .collection('ProfileFor')
//           .doc(uniqueId)
//           .get();

//         if (documentSnapshot.exists) {
//           // Document found, set the data
//           setData(documentSnapshot.data());
//         } else {
//           console.warn('Document not found for the provided unique ID');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [uniqueId]);

//   const handleCreateProfile = async () => {
//     setCreatingProfile(true);
  
//     // Simulate an asynchronous operation with a delay
//     setTimeout(async () => {  // Add 'async' here to use 'await' inside the setTimeout
//       try {
//         const addWorkDataFunction = firestore().collection('ProfileFor');
//         await addWorkDataFunction.doc(uniqueId).update({
//             photos: details.photos,
//         });
  
//         setProfileCreated(true);
  
//         // Navigate to the home page after the data has been updated
//         // navigation.navigate('User', { uniqueId });
//       } catch (error) {
//         console.error('Error:', error);
//         // Handle error scenario
//       } finally {
//         setCreatingProfile(false);
  
//         // Simulate a delay after displaying the checked image
//         setTimeout(() => {
//           // Navigate to the home page after the data has been "updated"
//           navigation.navigate('User2',{uniqueId});
//         }, 1000); // Adjust the delay as needed
//       }
//     }, 2000); // Simulated delay of 2000 milliseconds (2 seconds)
//   };

//   const orderOfFields = [
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
//     'selectedSubCommunity',
//     'workAs',
//     'workAsOtherDetails',
//     'workWith',
//     'workWithOtherDetails',
//     'email',
//     'mobileNumber',
//   ];

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fbd1d1',
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20,
//       paddingTop: 20,
//     },
//     title: {
//       fontSize: 30,
//       letterSpacing: 2,
//       textAlign: 'center',
//       textDecorationLine: 'underline',
//       fontWeight: '600',
   
//       color: '#e53371',
//       marginBottom: 20,
//     },
//     fieldContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       lineHeight:10,
//       paddingVertical: 20,
//       borderBottomWidth: 5,
//       borderColor: '#ff0011',
//     },
//     fieldName: {
//       fontWeight: '500',
//       marginRight: 10,
//       fontSize: 16,
//       top: 10,
      
//       marginBottom: 15,
//       letterSpacing: 3,
//       textTransform: 'uppercase',
//     },
//     fieldValue: {
//       flex: 1,
//       color: '#ec598c',
//       fontSize: 16,
//       marginLeft: 20,
//       top: 10,
//       fontWeight: '500',
//       marginBottom: 15,
//       letterSpacing: 3,
//       textTransform: 'uppercase',
//     },
//     confirmButton: {
//       backgroundColor: '#ff0059',
//       padding: 15,
//       borderRadius: 40,
//       marginTop: 20,
//       marginBottom: 40,
//     },
//     confirmButtonText: {
//       color: 'white',
//       textAlign: 'center',
//       fontSize: 18,
//     },
//     successContainer: {
//       alignItems: 'center',
//       marginTop: 20,
//     },
//     successText: {
//       fontSize: 18,
//       marginTop: 30,
//       color: '#e53371',
//       marginBottom: 20,
//     },
//     successImage: {
//       width: 50,
//       height: 50,

//       marginTop: 10,
//       marginBottom:50,
//     },
//     loadingIndicator: {
//       marginTop: 20,
//     },
//     button2: {
//         backgroundColor: '#6f67678c',
//         padding: 10,
//         borderRadius: 25,
//         alignItems: 'center',
//         marginTop:'15%',
//         marginBottom: 30,
//       },
//       buttonText: {
//         color: 'black',
//         letterSpacing:2,
//         fontSize: 16,
//       },
//       uploadedPhoto: {
//         width: 100,
//         height: 100,
//         borderRadius:50,
//         marginVertical: 20,
//         marginHorizontal:140,
//         flexDirection:'row',
//       },
     
//   });

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#e53371" />
//         ) : data ? (
//           <View>
//             <Text style={styles.title}>
//               Confirm your Details to continue creating your account
//             </Text>
//             {orderOfFields.map((key) => (
//               <View style={styles.fieldContainer} key={key}>
//                 <Text style={styles.fieldName}>{key}:</Text>
//                 <Text style={styles.fieldValue}>{data[key]}</Text>
//               </View>
//             ))}
//             <TouchableOpacity
//           style={styles.button2}
//           onPress={handlePhotoUpload}
//         >
//           <Text style={styles.buttonText}>Upload Profile Photo</Text>
//         </TouchableOpacity>

//         <ScrollView horizontal style={styles.photoScrollView}>
//           {details.photos.map((photo, index) => (
//             <Image key={index} source={{ uri: photo }} style={styles.uploadedPhoto} />
//           ))}
//         </ScrollView>
//             {profileCreated ? (
//               <View style={styles.successContainer}>
//                 <Text onPress={() => navigation.navigate('User2',{uniqueId})} style={styles.successText}>Profile Created</Text>
//                 <Image
//                   source={require('../assets/checked.png')}
//                   style={styles.successImage}
//                 />
//               </View>
//             ) : (
//               <TouchableOpacity
//                 onPress={handleCreateProfile}
//                 style={styles.confirmButton}
//                 disabled={creatingProfile}
//               >
//                 {creatingProfile ? (
//                   <ActivityIndicator color='#e53371' />
//                 ) : (
//                   <Text style={styles.confirmButtonText}>
//                     Confirm Profile
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             )}
//           </View>
//         ) : (
//           <Text>No data found for the provided unique ID</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default Data;


// Data.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const Data = ({ navigation }) => {
  const route = useRoute();
  const { uniqueId } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCreated, setProfileCreated] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [details, setDetails] = useState({
    photos: [],
  });
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const handlePhotoUpload = async () => {
    try {
      setUploadingPhotos(true);

      const response = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      if (response && response.length > 0) {
        const storageRef = storage().ref();
        const folderPath = 'images';

        const photoURLs = [];

        for (let index = 0; index < response.length; index++) {
          const photo = response[index];
          const imageName = `user_${index + 1}_${Date.now()}`;
          const imageRef = storageRef.child(`${folderPath}/${imageName}`);

          await imageRef.putFile(photo.path);
          const imageUrl = await imageRef.getDownloadURL();

          photoURLs.push(imageUrl);
        }

        setDetails((prevDetails) => ({
          ...prevDetails,
          photos: [...prevDetails.photos, ...photoURLs],
        }));
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    } finally {
      setUploadingPhotos(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('ProfileFor')
          .doc(uniqueId)
          .get();

        if (documentSnapshot.exists) {
          setData(documentSnapshot.data());
        } else {
          console.warn('Document not found for the provided unique ID');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uniqueId]);

  const handleCreateProfile = async () => {
    setCreatingProfile(true);

    setTimeout(async () => {
      try {
        const addWorkDataFunction = firestore().collection('ProfileFor');
        await addWorkDataFunction.doc(uniqueId).update({
          photos: details.photos,
        });

        setProfileCreated(true);

        setTimeout(() => {
          navigation.navigate('User2', { uniqueId });
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setCreatingProfile(false);
      }
    }, 2000);
  };

  const orderOfFields = [
    'firstName',
    'lastName',
    'Gender',
   'dateOfBirth',
    'diet',
    'height',
    'collegeName',
    'maritalStatus',
    'qualification',
    'selectedState',
    'city',
    'Option',
    'selectedReligion',
    'Community',
    'workAs',
    'workAsOtherDetails',
    'workWith',
    'workWithOtherDetails',
    'email',
    'mobileNumber',
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fbd1d1',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    title: {
      fontSize: 30,
      letterSpacing: 2,
      textAlign: 'center',
      textDecorationLine: 'underline',
      fontWeight: '600',
   
      color: '#e53371',
      marginBottom: 20,
    },
    fieldContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      lineHeight:10,
      paddingVertical: 20,
      borderBottomWidth: 5,
      borderColor: '#ff0011',
    },
    fieldName: {
      fontWeight: '500',
      marginRight: 10,
      fontSize: 16,
      top: 10,
      
      marginBottom: 15,
      letterSpacing: 3,
      textTransform: 'uppercase',
    },
    fieldValue: {
      flex: 1,
      color: '#ec598c',
      fontSize: 16,
      marginLeft: 20,
      top: 10,
      fontWeight: '500',
      marginBottom: 15,
      letterSpacing: 3,
      textTransform: 'uppercase',
    },
    confirmButton: {
      backgroundColor: '#ff0059',
      padding: 15,
      borderRadius: 40,
      marginTop: 20,
      marginBottom: 40,
    },
    confirmButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },
    successContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    successText: {
      fontSize: 18,
      marginTop: 30,
      color: '#e53371',
      marginBottom: 20,
    },
    successImage: {
      width: 50,
      height: 50,

      marginTop: 10,
      marginBottom:50,
    },
    loadingIndicator: {
      marginTop: 20,
    },
    button2: {
        backgroundColor: '#6f67678c',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginTop:'15%',
        marginBottom: 30,
      },
      buttonText: {
        color: 'black',
        letterSpacing:2,
        fontSize: 16,
      },
      uploadedPhoto: {
        width: 100,
        height: 100,
        borderRadius:50,
        marginVertical: 20,
        marginHorizontal:140,
        flexDirection:'row',
      },
     
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#e53371" />
        ) : data ? (
          <View>
            <Text style={styles.title}>
              Confirm your Details to continue creating your account
            </Text>
            {orderOfFields.map((key) => (
              <View style={styles.fieldContainer} key={key}>
                <Text style={styles.fieldName}>{key}:</Text>
                <Text style={styles.fieldValue}>{data[key]}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.button2}
              onPress={handlePhotoUpload}
              disabled={uploadingPhotos}
            >
              {uploadingPhotos ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Upload Profile Photo</Text>
              )}
            </TouchableOpacity>

            <ScrollView horizontal style={styles.photoScrollView}>
              {details.photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo }} style={styles.uploadedPhoto} />
              ))}
            </ScrollView>
            {profileCreated ? (
              <View style={styles.successContainer}>
                <Text
                  onPress={() => navigation.navigate('User2', { uniqueId })}
                  style={styles.successText}
                >
                  Profile Created
                </Text>
                <Image
                  source={require('../assets/checked.png')}
                  style={styles.successImage}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleCreateProfile}
                style={styles.confirmButton}
                disabled={creatingProfile}
              >
                {creatingProfile ? (
                  <ActivityIndicator color='#e53371' />
                ) : (
                  <Text style={styles.confirmButtonText}>
                    Confirm Profile
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <Text>No data found for the provided unique ID</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Data;