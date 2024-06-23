// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {useNavigation} from '@react-navigation/native';
// import {TextInput} from 'react-native-gesture-handler';

// const Front = () => {
//   const navigateToPersonDetails = personData => {
//     navigation.navigate('PersonDetails', {personData, profileForDisplayOrder});
//   };

//   const navigateToPersonDetails2 = personData => {
//     navigation.navigate('PersonDetails2', {personData,  postDisplayOrder});
//   };

//   const [profileForData, setProfileForData] = useState([]);
//   const [postData, setPostData] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);

//   useEffect(() => {
//     const fetchProfileForData = () => {
//       const unsubscribe = firestore()
//         .collection('ProfileFor')
//         .onSnapshot(snapshot => {
//           const profiles = snapshot.docs.map(doc => doc.data());
//           setProfileForData(profiles);
//         });

//       return () => unsubscribe();
//     };

//     fetchProfileForData();
//   }, []);

//   useEffect(() => {
//     const fetchPostData = () => {
//       const unsubscribe = firestore()
//         .collection('Post')
//         .onSnapshot(snapshot => {
//           const posts = snapshot.docs.map(doc => doc.data());
//           setPostData(posts);
//         });

//       return () => unsubscribe();
//     };

//     fetchPostData();
//   }, []);

//   const handleImageClick = imageUrls => {
//     setSelectedImages(imageUrls);
//     setModalVisible(true);
//   };

//   const navigation = useNavigation();

//   const navigateToChat = () => {
//     navigation.navigate('Chat');
//   };

//   const profileForDisplayOrder = [
//     'firstName',
//     'lastName',
//     'Gender',
//    'dateOfBirth',
//     'diet',
//     'height',
//     'collegeName',
//     'maritalStatus',
//     'qualification',
//     'selectedState',
//     'city',
//     'Option',
//     'selectedReligion',
//     'Community',
//     'workAs',
//     'workAsOtherDetails',
//     'workWith',
//     'workWithOtherDetails',
//     'email',
//     'mobileNumber',
//   ];
//   const [searchQuery, setSearchQuery] = useState('');
 
//   const postDisplayOrder = [
//     'name',
//     'gender',
//     'age',
//     'dob',
//     'religion',
//     'caste',
//     'education',
//     'email',
//     'mobileNumber',
//   ];

//   return (
//     <>
//       <View>
//       <View style={{marginTop: 40, flexDirection: 'row', marginLeft: 30}}>
//   {/* <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('Menu');
//     }}
//     style={{flexDirection: 'row', alignItems: 'center', flex: 1}}> */}
//     <Text style={{flex: 1, fontFamily:'DMSerifDisplay-Regular', color:'#e05654',  fontSize:50,  }}>
//       Sanjog
//     </Text>
//     {/* </TouchableOpacity> */}
//     <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('Menu');
//     }}
//     style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
//     <Image
//       style={{width: 30, height: 30, tintColor: '#000000',  marginLeft:'60%'}}
//       source={require('./assets/app_images/menu.png')}
//     />
//   </TouchableOpacity>
// </View>
//         <Text
//           style={{
//             fontSize: 25,
//             marginLeft: 30,
//             fontFamily: 'DMSerifDisplay-Regular',
//             color: '#000000',
//             marginTop: '8%',
//           }}>
//           Discover Your Story
//         </Text>
//         <View style={{marginHorizontal: 30, marginTop: 20}}>
//           <View style={styles.searchContainer}>
//             <Image
//               style={styles.searchIcon}
//               source={require('./assets/app_images/loupe.png')}
//             />
//             <TouchableOpacity onPress={()=>{navigation.navigate('Search')}}>
//             <View
//               style={styles.input}
//               placeholder="Search..."
//               placeholderTextColor="gray"
//               onChangeText={text => setSearchQuery(text)}
//             >
//               <Text style={{ marginTop:10}}>
//                 Search
//               </Text>
//             </View>

//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={{flexDirection: 'row'}}>
//           <Text
//             style={{
//               fontSize: 35,
//               marginLeft: 20,
//               fontFamily: 'DMSerifDisplay-Regular',
//               color: 'black',
//               marginTop: '5%',
//             }}>
//             People Near You
//           </Text>
//           <TouchableOpacity   onPress={() => navigation.navigate('Search')}>

//           <Image
//             style={{
//               tintColor: '#e27272',
//               width: 20,
//               height: 20,
//               marginLeft: '35%',
//               marginTop: '20%',
//             }}
//             source={require('./assets/app_images/ellipsis.png')}
//           />
//           </TouchableOpacity>
//         </View>
//         {profileForData &&
//           profileForData.length > 0 &&
//           profileForData.map((data, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => navigateToPersonDetails(data)}>
//               <View style={styles.postContainer}>
//                 {/* <Image
//             source={data.photos && data.photos.length > 0 ? { uri: data.photos[0] } : require('./assets/app_images/user.png')}
//             style={styles.profilePhoto}
//           /> */}
//                 <Image
//                   source={
//                     data.photos && data.photos.length > 0
//                       ? {uri: data.photos[0]}
//                       : require('./assets/app_images/user.png')
//                   }
//                   style={
//                     data.photos && data.photos.length > 0
//                       ? styles.profilePhoto
//                       : styles.profilePhoto2
//                   }
//                 />
//                 <View style={styles.textOverlay}>
//                   <Text style={styles.overlayText}>
//                     {data.firstName} {data.lastName}
//                   </Text>
//                 </View>
              
//               </View>
//             </TouchableOpacity>
//           ))}

//         {postData &&
//           postData.length > 0 &&
//           postData.map((data, index) => (
//             <TouchableOpacity
//             key={index}
//             onPress={() => navigateToPersonDetails2(data)}>
//             <View style={styles.postContainer}>
              

//                 <Image
//                   source={
//                     data.photos && data.photos.length > 0
//                       ? {uri: data.photos[0]}
//                       : require('./assets/app_images/user.png')
//                   }
//                   style={
//                     data.photos && data.photos.length > 0
//                       ? styles.profilePhoto
//                       : styles.profilePhoto2
//                   }
//                 />
//                 <View style={styles.textOverlay}>
//                   <Text style={styles.overlayText}>{data.name}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}

//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(false);
//             setSelectedImages([]);
//           }}>
//           <ScrollView
//             horizontal
//             pagingEnabled
//             contentContainerStyle={styles.modalScrollView}>
//             {selectedImages.map((imageUrl, index) => (
//               <Image
//                 key={index}
//                 source={{uri: imageUrl}}
//                 style={styles.fullImage}
//                 resizeMode="contain"
//               />
//             ))}
//           </ScrollView>
//         </Modal>
//       </ScrollView>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//     paddingBottom: 20,
//     marginBottom: 20,
//   },
//   postContainer: {
//     // marginTop:20,
//     position: 'relative',
//   },
//   profilePhoto: {
//     width: 100, // Adjust as needed
//     height: 100, // Adjust as needed
//   },
//   textOverlay: {
//     position: 'absolute',
//     bottom: 50,
//     width: '100%',
//     left: 9,
//     right: 0,
//     borderTopLeftRadius: 0, // Adjust the value to control the sharpness of the point
//     borderTopRightRadius: 0, // Adjust the value to control the sharpness of the point
//     borderBottomLeftRadius: 70,
//     borderBottomRightRadius: 70,
//     backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust the background color and opacity as needed
//     padding: 30, // Adjust as needed
//   },
//   overlayText: {
//     color: 'white', // Adjust the text color as needed
//     fontSize: 20, // Adjust the font size as needed
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 25,
//     marginTop: 10,
//   },
//     searchIcon: {
//       width: 20,
//       height: 20,
//       marginRight: 10,
//     },
//   input: {
//     flex: 1,
//     color: 'black',
//   },
//   container: {
//     padding: 16,
//   },
//   postContainer: {
//     flexDirection: 'column',
//     // marginBottom: 20,
//     // borderWidth: 2,
//     // borderColor: '#00000097',
//     borderRadius: 10,
//     padding: 10,
//     position: 'relative', // Added position relative for the small image positioning
//     width: '100%',
//   },
//   profilePhoto: {
//     marginTop: '3%',
//     width: '100%',
//     height: 400,
//     marginBottom: 40,
//     borderRadius: 70,
//     // marginLeft: 35,
//   },
//   profilePhoto2: {
//     marginTop: '3%',
//     width: '60%',
//     tintColor: '#970577',
//     height: 220,
//     marginBottom: 40,
//     borderRadius: 70,
//     marginLeft: '20%',
//   },
//   postDetails: {
//     flex: 1,
//     backgroundColor: '#b0a9a92f',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 5,
//     marginLeft: 20,
//     // textTransform: 'uppercase',
//     color: 'black',
//   },
//   detailsContainer: {
//     marginTop: 5,
//     marginLeft: 20,
//   },
//   detailText: {
//     marginBottom: 5,
//     fontSize: 17,
//     lineHeight: 45,
//     // textTransform: 'uppercase',
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
//   smallImageContainer: {
//     top: 5,
//     right: 5,
//     alignItems: 'flex-end',
//   },
//   smallImage: {
//     width: '30%',
//     height: 100,

//     borderRadius: 15,
//   },
//   chatt: {
//     top: 50,
//     left: 20,
//     textDecorationLine: 'underline',
//   },
// });

// export default Front;




// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   TextInput,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {useNavigation} from '@react-navigation/native';

// const Front = () => {
//   const navigation = useNavigation();
//   const [profileForData, setProfileForData] = useState([]);
//   const [postData, setPostData] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [genderFilter, setGenderFilter] = useState('');

//   useEffect(() => {
//     const fetchProfileForData = () => {
//       const unsubscribe = firestore()
//         .collection('ProfileFor')
//         .onSnapshot(snapshot => {
//           const profiles = snapshot.docs.map(doc => doc.data());
//           setProfileForData(profiles);
//         });

//       return () => unsubscribe();
//     };

//     fetchProfileForData();
//   }, []);

//   useEffect(() => {
//     const fetchPostData = () => {
//       const unsubscribe = firestore()
//         .collection('Post')
//         .onSnapshot(snapshot => {
//           const posts = snapshot.docs.map(doc => doc.data());
//           setPostData(posts);
//         });

//       return () => unsubscribe();
//     };

//     fetchPostData();
//   }, []);

//   const handleImageClick = imageUrls => {
//     setSelectedImages(imageUrls);
//     setModalVisible(true);
//   };

//   const navigateToPersonDetails = useCallback((personData) => {
//     navigation.navigate('PersonDetails', { personData, profileForDisplayOrder });
//   }, [navigation]);

//   const navigateToPersonDetails2 = useCallback((personData) => {
//     navigation.navigate('PersonDetails2', { personData, postDisplayOrder });
//   }, [navigation]);

//   const profileForDisplayOrder = [
//     'firstName', 'lastName', 'Gender', 'dateOfBirth', 'diet', 'height', 'collegeName', 
//     'maritalStatus', 'qualification', 'selectedState', 'city', 'Option', 'selectedReligion', 
//     'Community', 'workAs', 'workAsOtherDetails', 'workWith', 'workWithOtherDetails', 'email', 
//     'mobileNumber',
//   ];

//   const postDisplayOrder = [
//     'name', 'gender', 'age', 'dob', 'religion', 'caste', 'education', 'email', 'mobileNumber',
//   ];

//   const filteredProfileForData = genderFilter ? profileForData.filter(profile => profile.Gender === genderFilter) : profileForData;
//   const filteredPostData = genderFilter ? postData.filter(post => post.gender === genderFilter) : postData;

//   return (
//     <>
//       <View>
//         <View style={{ marginTop: 40, flexDirection: 'row', marginLeft: 30 }}>
//           <Text style={{ flex: 1, fontFamily: 'DMSerifDisplay-Regular', color: '#e05654', fontSize: 50 }}>
//             Sanjog
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('Menu');
//             }}
//             style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
//             <Image
//               style={{ width: 30, height: 30, tintColor: '#000000', marginLeft: '60%' }}
//               source={require('./assets/app_images/menu.png')}
//             />
//           </TouchableOpacity>
//         </View>
//         <Text
//           style={{
//             fontSize: 25,
//             marginLeft: 30,
//             fontFamily: 'DMSerifDisplay-Regular',
//             color: '#000000',
//             marginTop: '8%',
//           }}>
//           Discover Your Story
//         </Text>
//         <View style={{ marginHorizontal: 30, marginTop: 20 }}>
//           <View style={styles.searchContainer}>
//             <Image
//               style={styles.searchIcon}
//               source={require('./assets/app_images/loupe.png')}
//             />
//             <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
//               <View style={styles.input}>
//                 <Text style={{ marginTop: 10 }}>
//                   Search
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.filterContainer}>
//             <TouchableOpacity
//               style={[styles.filterButton, genderFilter === '' && styles.selectedFilter]}
//               onPress={() => setGenderFilter('')}
//             >
//               <Text style={styles.filterText}>All</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.filterButton, genderFilter === 'Male' && styles.selectedFilter]}
//               onPress={() => setGenderFilter('Male')}
//             >
//               <Text style={styles.filterText}>Male</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.filterButton, genderFilter === 'Female' && styles.selectedFilter]}
//               onPress={() => setGenderFilter('Female')}
//             >
//               <Text style={styles.filterText}>Female</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={{ flexDirection: 'row' }}>
//           <Text
//             style={{
//               fontSize: 35,
//               marginLeft: 20,
//               fontFamily: 'DMSerifDisplay-Regular',
//               color: 'black',
//               marginTop: '5%',
//             }}>
//             People Near You
//           </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//             <Image
//               style={{
//                 tintColor: '#e27272',
//                 width: 20,
//                 height: 20,
//                 marginLeft: '35%',
//                 marginTop: '20%',
//               }}
//               source={require('./assets/app_images/ellipsis.png')}
//             />
//           </TouchableOpacity>
//         </View>
//         {filteredProfileForData.length > 0 &&
//           filteredProfileForData.map((data, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => navigateToPersonDetails(data)}>
//               <View style={styles.postContainer}>
//                 <Image
//                   source={
//                     data.photos && data.photos.length > 0
//                       ? { uri: data.photos[0] }
//                       : require('./assets/app_images/user.png')
//                   }
//                   style={
//                     data.photos && data.photos.length > 0
//                       ? styles.profilePhoto
//                       : styles.profilePhoto2
//                   }
//                 />
//                 <View style={styles.textOverlay}>
//                   <Text style={styles.overlayText}>
//                     {data.firstName} {data.lastName}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}

//         {filteredPostData.length > 0 &&
//           filteredPostData.map((data, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => navigateToPersonDetails2(data)}>
//               <View style={styles.postContainer}>
//                 <Image
//                   source={
//                     data.photos && data.photos.length > 0
//                       ? { uri: data.photos[0] }
//                       : require('./assets/app_images/user.png')
//                   }
//                   style={
//                     data.photos && data.photos.length > 0
//                       ? styles.profilePhoto
//                       : styles.profilePhoto2
//                   }
//                 />
//                 <View style={styles.textOverlay}>
//                   <Text style={styles.overlayText}>{data.name}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}

//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(false);
//             setSelectedImages([]);
//           }}>
//           <ScrollView
//             horizontal
//             pagingEnabled
//             contentContainerStyle={styles.modalScrollView}>
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
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//     paddingBottom: 20,
//     marginBottom: 20,
//   },
//   postContainer: {
//     // marginTop:20,
//     position: 'relative',
//   },
//   profilePhoto: {
//     width: 100, // Adjust as needed
//     height: 100, // Adjust as needed
//   },
//   textOverlay: {
//     position: 'absolute',
//     bottom: 50,
//     width: '100%',
//     left: 9,
//     right: 0,
//     borderTopLeftRadius: 0, // Adjust the value to control the sharpness of the point
//     borderTopRightRadius: 0, // Adjust the value to control the sharpness of the point
//     borderBottomLeftRadius: 70,
//     borderBottomRightRadius: 70,
//     backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust the background color and opacity as needed
//     padding: 30, // Adjust as needed
//   },
//   overlayText: {
//     color: 'white', // Adjust the text color as needed
//     fontSize: 20, // Adjust the font size as needed
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 25,
//     marginTop: 10,
//   },
//     searchIcon: {
//       width: 20,
//       height: 20,
//       marginRight: 10,
//     },
//   input: {
//     flex: 1,
//     color: 'black',
//   },
//   container: {
//     padding: 16,
//   },
//   postContainer: {
//     flexDirection: 'column',
//     // marginBottom: 20,
//     // borderWidth: 2,
//     // borderColor: '#00000097',
//     borderRadius: 10,
//     padding: 10,
//     position: 'relative', // Added position relative for the small image positioning
//     width: '100%',
//   },
//   profilePhoto: {
//     marginTop: '3%',
//     width: '100%',
//     height: 400,
//     marginBottom: 40,
//     borderRadius: 70,
//     // marginLeft: 35,
//   },
//   profilePhoto2: {
//     marginTop: '3%',
//     width: '60%',
//     tintColor: '#970577',
//     height: 220,
//     marginBottom: 40,
//     borderRadius: 70,
//     marginLeft: '20%',
//   },
//   postDetails: {
//     flex: 1,
//     backgroundColor: '#b0a9a92f',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 5,
//     marginLeft: 20,
//     // textTransform: 'uppercase',
//     color: 'black',
//   },
//   detailsContainer: {
//     marginTop: 5,
//     marginLeft: 20,
//   },
//   detailText: {
//     marginBottom: 5,
//     fontSize: 17,
//     lineHeight: 45,
//     // textTransform: 'uppercase',
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
//   smallImageContainer: {
//     top: 5,
//     right: 5,
//     alignItems: 'flex-end',
//   },
//   smallImage: {
//     width: '30%',
//     height: 100,

//     borderRadius: 15,
//   },
//   chatt: {
//     top: 50,
//     left: 20,
//     textDecorationLine: 'underline',
//   },
//     filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   filterButton: {
//     alignItems:'center',
//     padding: 10,
//     borderRadius: 25,
//     width:100,
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginHorizontal: 5,
//   },
//   selectedFilter: {
//     backgroundColor: '#e05654',
//   },
//   filterText: {
//     color: '#000000',
//     fontSize: 16,
//   },
// });

// export default Front;




import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

const Front = () => {
  const navigation = useNavigation();
  const [profileForData, setProfileForData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    const fetchProfileForData = () => {
      const unsubscribe = firestore()
        .collection('ProfileFor')
        .onSnapshot(snapshot => {
          const profiles = snapshot.docs.map(doc => doc.data());
          setProfileForData(profiles);
        });

      return () => unsubscribe();
    };

    fetchProfileForData();
  }, []);

  useEffect(() => {
    const fetchPostData = () => {
      const unsubscribe = firestore()
        .collection('Post')
        .onSnapshot(snapshot => {
          const posts = snapshot.docs.map(doc => doc.data());
          setPostData(posts);
        });

      return () => unsubscribe();
    };

    fetchPostData();
  }, []);

  const handleImageClick = imageUrls => {
    setSelectedImages(imageUrls);
    setModalVisible(true);
  };

  const navigateToPersonDetails = useCallback((personData) => {
    navigation.navigate('PersonDetails', { personData, profileForDisplayOrder });
  }, [navigation]);

  const navigateToPersonDetails2 = useCallback((personData) => {
    navigation.navigate('PersonDetails2', { personData, postDisplayOrder });
  }, [navigation]);

  const profileForDisplayOrder = [
    'firstName', 'lastName', 'Gender', 'dateOfBirth', 'diet', 'height', 'collegeName', 
    'maritalStatus', 'qualification', 'selectedState', 'city', 'Option', 'selectedReligion', 
    'Community', 'workAs', 'workAsOtherDetails', 'workWith', 'workWithOtherDetails', 'email', 
    'mobileNumber',
  ];

  const postDisplayOrder = [
    'name', 'gender', 'age', 'dob', 'religion', 'caste', 'education', 'email', 'mobileNumber',
  ];

  const filteredProfileForData = genderFilter 
    ? profileForData.filter(profile => profile.Gender?.toLowerCase() === genderFilter.toLowerCase()) 
    : profileForData;

  const filteredPostData = genderFilter 
    ? postData.filter(post => post.gender?.toLowerCase() === genderFilter.toLowerCase()) 
    : postData;

  return (
    <>
      <View>
        <View style={{ marginTop: 40, flexDirection: 'row', marginLeft: 20 }}>
        <Image
        source={require('./assets/app_images/logo.png')}
        style={styles.logo}
        
      />
          <Text style={{ flex: 1, fontFamily: 'DMSerifDisplay-Regular', color: '#e05654', fontSize: 50 }}>
            Sanjog
          </Text>
        
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Menu');
            }}
            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: 30, height: 30, tintColor: '#000000', marginLeft: '60%' }}
              source={require('./assets/app_images/menu.png')}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 25,
            marginLeft: 30,
            fontFamily: 'DMSerifDisplay-Regular',
            color: '#000000',
            marginTop: '8%',
          }}>
          Discover Your Story
        </Text>
        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
          <View style={styles.searchContainer}>
            <Image
              style={styles.searchIcon}
              source={require('./assets/app_images/loupe.png')}
            />
            <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
              <View style={styles.input}>
                <Text style={{ marginTop: 10 }}>
                  Search
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, !genderFilter && styles.selectedFilter]}
              onPress={() => setGenderFilter('')}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, genderFilter.toLowerCase() === 'male' && styles.selectedFilter]}
              onPress={() => setGenderFilter('Male')}
            >
              <Text style={styles.filterText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, genderFilter.toLowerCase() === 'female' && styles.selectedFilter]}
              onPress={() => setGenderFilter('Female')}
            >
              <Text style={styles.filterText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 5,
              fontFamily: 'DMSerifDisplay-Regular',
              color: 'black',
              marginTop: '5%',
            }}>
            People For You
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ChatCollection')}>
            <Image
              style={{
                tintColor: '#e27272',
                width: 40,
                height: 40,
                marginLeft: '25%',
                marginTop: '20%',
              }}
              source={require('./assets/app_images/chat.png')}
            />
            {/* <Text style={{
                // tintColor: '#e27272',
                color:'#e27272',
                fontSize:29,
              
              
                marginLeft: '25%',
                marginTop: '17%',
              }}>💬</Text> */}
          </TouchableOpacity>
        </View>
        {filteredProfileForData.length > 0 &&
          filteredProfileForData.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToPersonDetails(data)}>
              <View style={styles.postContainer}>
                <Image
                  source={
                    data.photos && data.photos.length > 0
                      ? { uri: data.photos[0] }
                      : require('./assets/app_images/user.png')
                  }
                  style={
                    data.photos && data.photos.length > 0
                      ? styles.profilePhoto
                      : styles.profilePhoto2
                  }
                />
                <View style={styles.textOverlay}>
                  <Text style={styles.overlayText}>
                    {data.firstName} {data.lastName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        {filteredPostData.length > 0 &&
          filteredPostData.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToPersonDetails2(data)}>
              <View style={styles.postContainer}>
                <Image
                  source={
                    data.photos && data.photos.length > 0
                      ? { uri: data.photos[0] }
                      : require('./assets/app_images/user.png')
                  }
                  style={
                    data.photos && data.photos.length > 0
                      ? styles.profilePhoto
                      : styles.profilePhoto2
                  }
                />
                <View style={styles.textOverlay}>
                  <Text style={styles.overlayText}>{data.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedImages([]);
          }}>
          <ScrollView
            horizontal
            pagingEnabled
            contentContainerStyle={styles.modalScrollView}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingBottom: 20,
    marginBottom: 20,
  },
  postContainer: {
    // marginTop:20,
    position: 'relative',
  },
  logo: {
    top:18,
right:10,
    width: "11%",
    height:  "60%",
    borderRadius:30,
   
  },
  profilePhoto: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
  },
  textOverlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    left: 9,
    right: 0,
    borderTopLeftRadius: 0, // Adjust the value to control the sharpness of the point
    borderTopRightRadius: 0, // Adjust the value to control the sharpness of the point
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust the background color and opacity as needed
    padding: 30, // Adjust as needed
  },
  overlayText: {
    color: 'white', // Adjust the text color as needed
    fontSize: 20, // Adjust the font size as needed
    fontFamily: 'Montserrat-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
  input: {
    flex: 1,
    color: 'black',
  },
  container: {
    padding: 16,
  },
  postContainer: {
    flexDirection: 'column',
    // marginBottom: 20,
    // borderWidth: 2,
    // borderColor: '#00000097',
    borderRadius: 10,
    padding: 10,
    position: 'relative', // Added position relative for the small image positioning
    width: '100%',
  },
  profilePhoto: {
    marginTop: '3%',
    width: '100%',
    height: 400,
    marginBottom: 40,
    borderRadius: 70,
    // marginLeft: 35,
  },
  profilePhoto2: {
    marginTop: '3%',
    width: '60%',
    tintColor: '#970577',
    height: 220,
    marginBottom: 40,
    borderRadius: 70,
    marginLeft: '20%',
  },
  postDetails: {
    flex: 1,
    backgroundColor: '#b0a9a92f',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    // textTransform: 'uppercase',
    color: 'black',
  },
  detailsContainer: {
    marginTop: 5,
    marginLeft: 20,
  },
  detailText: {
    marginBottom: 5,
    fontSize: 17,
    lineHeight: 45,
    // textTransform: 'uppercase',
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
  smallImageContainer: {
    top: 5,
    right: 5,
    alignItems: 'flex-end',
  },
  smallImage: {
    width: '30%',
    height: 100,

    borderRadius: 15,
  },
  chatt: {
    top: 50,
    left: 20,
    textDecorationLine: 'underline',
  },
    filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  filterButton: {
    alignItems:'center',
    padding: 10,
    borderRadius: 25,
    width:100,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
  },
  selectedFilter: {
    backgroundColor: '#e05654',
  },
  filterText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default Front;
