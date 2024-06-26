// // // // import React, { useState, useEffect } from 'react';
// // // // import { StyleSheet, Text, View } from 'react-native';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // // const ChatCollection = () => {
// // // //   const [chatUsers, setChatUsers] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchChatUsers = async () => {
// // // //       try {
// // // //         const chatUsersJSON = await AsyncStorage.getItem('ChatUsers');
// // // //         if (chatUsersJSON) {
// // // //           const chatUsersArray = JSON.parse(chatUsersJSON);
// // // //           setChatUsers(chatUsersArray);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error fetching chat users from AsyncStorage:', error);
// // // //       }
// // // //     };

// // // //     fetchChatUsers();
// // // //   }, []);

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.header}>Chat Users:</Text>
// // // //       {chatUsers.map((user, index) => (
// // // //         <Text key={index} style={styles.user}>
// // // //           {user.firstName} - {user.email}
// // // //         </Text>
// // // //       ))}
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //   },
// // // //   header: {
// // // //     fontSize: 20,
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 10,
// // // //   },
// // // //   user: {
// // // //     fontSize: 16,
// // // //     marginBottom: 5,
// // // //   },
// // // // });

// // // // export default ChatCollection;











// // // import React, { useState, useEffect } from 'react';
// // // import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal, Button } from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import FastImage from 'react-native-fast-image';
// // // import { useNavigation } from '@react-navigation/native';
// // // import firestore from '@react-native-firebase/firestore';

// // // const Connected = () => {
// // //   const [ChatUsers, setChatUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [modalVisible, setModalVisible] = useState(false);
// // //   const [selectedUser, setSelectedUser] = useState(null);
// // //   const [navigating, setNavigating] = useState(false);
// // //   const [deleting, setDeleting] = useState(false);
// // //   const navigation = useNavigation();

// // //   const fetchChatUsers = async () => {
// // //     try {
// // //       const ChatUsersJSON = await AsyncStorage.getItem('ChatUsers');
// // //       if (ChatUsersJSON) {
// // //         const ChatUsersArray = JSON.parse(ChatUsersJSON);

// // //         // Filter out duplicate users
// // //         const uniqueUsers = ChatUsersArray.filter((user, index, self) => 
// // //           index === self.findIndex((u) => u.email === user.email)
// // //         );

// // //         setChatUsers(uniqueUsers);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching connected users from AsyncStorage:', error);
// // //       alert('Failed to fetch connected users. Please try again later.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchChatUsers();
// // //   }, []);

// // //   const getDocId = async (item) => {
// // //     try {
// // //       // Check 'ProfileFor' collection
// // //       const profileForQuery = await firestore().collection('ProfileFor').where('email', '==', item.email).get();
// // //       if (!profileForQuery.empty) {
// // //         const doc = profileForQuery.docs[0];
// // //         return doc.id;
// // //       }

// // //       // Check 'Post' collection
// // //       const postQuery = await firestore().collection('Post').where('email', '==', item.email).get();
// // //       if (!postQuery.empty) {
// // //         const doc = postQuery.docs[0];
// // //         return doc.id;
// // //       }
      
// // //       console.log('User not found in ProfileFor or Post');
// // //     } catch (error) {
// // //       console.error('Error fetching docId from Firestore:', error);
// // //     }
// // //     return null;
// // //   };

// // //   const handleUserPress = async (item) => {
// // //     setNavigating(true);
// // //     const docId = await getDocId(item);
// // //     setNavigating(false);
// // //     if (docId) {
// // //       navigation.navigate('Chat', { userId: docId });
// // //     } else {
// // //       alert('User not found');
// // //     }
// // //   };

// // //   const handleUserLongPress = (item) => {
// // //     setSelectedUser(item);
// // //     setModalVisible(true);
// // //   };

// // //   const handleDeleteUser = async () => {
// // //     setDeleting(true);
// // //     const updatedUsers = ChatUsers.filter(user => user.email !== selectedUser.email);
// // //     setChatUsers(updatedUsers);
// // //     await AsyncStorage.setItem('ChatUsers', JSON.stringify(updatedUsers));
// // //     setDeleting(false);
// // //     setModalVisible(false);
// // //   };

// // //   const renderUserItem = ({ item }) => (
// // //     <TouchableOpacity
// // //       style={styles.userContainer}
// // //       activeOpacity={0.7}
// // //       onPress={() => handleUserPress(item)}
// // //       onLongPress={() => handleUserLongPress(item)}
// // //     >
// // //       <FastImage
// // //         source={
// // //           item.photos && item.photos.length > 0
// // //             ? { uri: item.photos[0], priority: FastImage.priority.normal }
// // //             : require('../assets/app_images/user.png')
// // //         }
// // //         style={styles.userPhoto}
// // //         resizeMode={FastImage.resizeMode.cover}
// // //         PlaceholderContent={<ActivityIndicator />}
// // //       />
// // //       <View style={styles.textContainer}>
// // //         <Text style={styles.userName}>{item.firstName} {item.lastName} {item.name}</Text>
// // //         <Text style={styles.userDetails}>{item.city}, {item.selectedState}{item.address}</Text>
// // //       </View>
// // //       {navigating && <ActivityIndicator style={styles.activityIndicator} size="small" color="#0000ff" />}
// // //     </TouchableOpacity>
// // //   );

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.label2}>Getting Interest ??? 😏😏</Text>
// // //       <Text style={styles.label3}>Then Chat More   💬</Text>
// // //       {loading ? (
// // //         <ActivityIndicator size="large" color="#0000ff" />
// // //       ) : ChatUsers.length > 0 ? (
// // //         <FlatList
// // //           data={ChatUsers}
// // //           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
// // //           renderItem={renderUserItem}
// // //         />
// // //       ) : (
// // //         <View style={styles.emptyContainer}>
// // //           <Text style={styles.noUsersText}>No connected persons found.</Text>
// // //         </View>
// // //       )}
// // //       <Modal
// // //         visible={modalVisible}
// // //         transparent={true}
// // //         animationType="slide"
// // //         onRequestClose={() => setModalVisible(false)}
// // //       >
// // //         <View style={styles.modalContainer}>
// // //         <View style={styles.modalContent}>
// // //   <Text style={styles.label}>Are you sure you want to Remove this user?</Text>
// // //   <View style={styles.modalButton}>
    
// // //     {deleting ? (
// // //       <ActivityIndicator size="small" color="#0000ff" />
// // //     ) : (
// // //       <TouchableOpacity onPress={handleDeleteUser}>
// // //         <Text style={styles.modalButtons}>Delete</Text>
// // //       </TouchableOpacity>
// // //     )}
// // //     <TouchableOpacity onPress={() => setModalVisible(false)}>
// // //       <Text style={styles.  cancelButton}>Cancel</Text>
// // //     </TouchableOpacity>
// // //   </View>
// // // </View>

// // //         </View>
// // //       </Modal>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#fbd1d1',
// // //     padding: 20,
// // //   },
// // //   title: {
// // //     fontSize: 26,
// // //     fontWeight: 'bold',
// // //     marginBottom: 20,
// // //     textAlign: 'center',
// // //     color: '#333',
// // //   },
// // //   userContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     borderRadius: 12,
// // //     padding: 15,
// // //     marginBottom: 15,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 5,
// // //     elevation: 3,
// // //   },
// // //   userPhoto: {
// // //     width: 70,
// // //     height: 70,
// // //     borderRadius: 35,
// // //     marginRight: 15,
// // //   },
// // //   textContainer: {
// // //     flex: 1,
// // //   },
// // //   userName: {
// // //     fontSize: 20,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //   },
// // //   userDetails: {
// // //     fontSize: 16,
// // //     color: '#666',
// // //     marginTop: 4,
// // //   },
// // //   noUsersText: {
// // //     fontSize: 18,
// // //     textAlign: 'center',
// // //     color: '#999',
// // //   },
// // //   emptyContainer: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   modalContainer: {
// // //     height: '100%',
// // //     width: '100%',
// // //     flex: 1,
// // //     justifyContent: 'flex-end',
// // //     alignItems: 'center',
// // //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // //   },
// // //   modalContent: {
// // //     borderTopRightRadius:40,
// // //     borderTopLeftRadius:40,
// // //     height: '50%',
// // //     backgroundColor: 'white',
// // //     padding: 20,
// // //     borderRadius: 10,
// // //     width: '100%',
// // //     alignItems: 'center',
// // //   },
// // //   modalButtons: {
// // //     backgroundColor: 'red',
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 80,
// // //     borderRadius: 35,
// // //     marginTop: 20,
// // //     color:'white',

    
  
// // //   },
// // //   cancelButton: {
// // //     backgroundColor: '#000000',
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 80,
// // //     borderRadius: 35,
// // //     marginTop: 10,
// // //     color:'white',
// // //   },


// // //   activityIndicator: {
// // //     marginLeft: 10,
// // //   },
// // //   label: {
// // //     fontSize: 18,
// // //     fontFamily: 'Montserrat-SemiBold',
// // //     color: 'black',
// // //     marginBottom: 25,
// // //     textAlign: 'center',
// // //   },

// // //   label2: {
// // //     marginTop:20,
// // //     fontSize: 22,
// // //     fontFamily: 'Montserrat-SemiBold',
// // //     color: 'black',
// // //     marginBottom: 25,
// // //     textAlign: 'left',
// // //     textDecorationLine:'underline',

    
// // //   },
// // //   label3: {
// // //     textDecorationLine:'underline',
// // //     fontSize: 22,
// // //     fontFamily: 'Montserrat-SemiBold',
// // //     color: '#ff0000',
// // //     marginBottom: 55,
// // //     textAlign: 'left',
    
// // //   }
// // // });

// // // export default Connected;






// // import React, { useState, useEffect } from 'react';
// // import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import FastImage from 'react-native-fast-image';
// // import { useNavigation } from '@react-navigation/native';
// // import firestore from '@react-native-firebase/firestore';

// // const Connected = () => {
// //   const [ChatUsers, setChatUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [navigating, setNavigating] = useState(false);
// //   const [deleting, setDeleting] = useState(false);
// //   const navigation = useNavigation();

// //   const fetchChatUsers = async () => {
// //     try {
// //       const ChatUsersJSON = await AsyncStorage.getItem('ChatUsers');
// //       if (ChatUsersJSON) {
// //         const ChatUsersArray = JSON.parse(ChatUsersJSON);

// //         // Filter out duplicate users
// //         const uniqueUsers = ChatUsersArray.filter((user, index, self) => 
// //           index === self.findIndex((u) => u.email === user.email)
// //         );

// //         setChatUsers(uniqueUsers);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching connected users from AsyncStorage:', error);
// //       alert('Failed to fetch connected users. Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChatUsers();
// //   }, []);

// //   const getDocId = async (item) => {
// //     try {
// //       // Check 'ProfileFor' collection
// //       const profileForQuery = await firestore().collection('ProfileFor').where('email', '==', item.email).get();
// //       if (!profileForQuery.empty) {
// //         const doc = profileForQuery.docs[0];
// //         return doc.id;
// //       }

// //       // Check 'Post' collection
// //       const postQuery = await firestore().collection('Post').where('email', '==', item.email).get();
// //       if (!postQuery.empty) {
// //         const doc = postQuery.docs[0];
// //         return doc.id;
// //       }
      
// //       console.log('User not found in ProfileFor or Post');
// //     } catch (error) {
// //       console.error('Error fetching docId from Firestore:', error);
// //     }
// //     return null;
// //   };

// //   const handleUserPress = async (item) => {
// //     setNavigating(true);
// //     const docId = await getDocId(item);
// //     setNavigating(false);
// //     if (docId) {
// //       navigation.navigate('Chat', { userId: docId, personData: item });
// //     } else {
// //       alert('User not found');
// //     }
// //   };

// //   const handleUserLongPress = (item) => {
// //     setSelectedUser(item);
// //     setModalVisible(true);
// //   };

// //   const handleDeleteUser = async () => {
// //     setDeleting(true);
// //     const updatedUsers = ChatUsers.filter(user => user.email !== selectedUser.email);
// //     setChatUsers(updatedUsers);
// //     await AsyncStorage.setItem('ChatUsers', JSON.stringify(updatedUsers));
// //     setDeleting(false);
// //     setModalVisible(false);
// //   };

// //   const renderUserItem = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.userContainer}
// //       activeOpacity={0.7}
// //       onPress={() => handleUserPress(item)}
// //       onLongPress={() => handleUserLongPress(item)}
// //     >
// //       <FastImage
// //         source={
// //           item.photos && item.photos.length > 0
// //             ? { uri: item.photos[0], priority: FastImage.priority.normal }
// //             : require('../assets/app_images/user.png')
// //         }
// //         style={styles.userPhoto}
// //         resizeMode={FastImage.resizeMode.cover}
// //         PlaceholderContent={<ActivityIndicator />}
// //       />
// //       <View style={styles.textContainer}>
// //         <Text style={styles.userName}>{item.firstName} {item.lastName} {item.name}</Text>
// //         <Text style={styles.userDetails}>{item.city}, {item.selectedState}{item.address}</Text>
// //       </View>
  
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.label2}>Getting Interest ??? 😏😏</Text>
// //       <Text style={styles.label3}>Then Chat More   💬</Text>
// //       {loading ? (
// //         <ActivityIndicator size="large" color="#0000ff" />
// //       ) : ChatUsers.length > 0 ? (
// //         <FlatList
// //           data={ChatUsers}
// //           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
// //           renderItem={renderUserItem}
// //         />
// //       ) : (
// //         <View style={styles.emptyContainer}>
// //           <Text style={styles.noUsersText}>Start Chat Your Chats ❤️</Text>
// //         </View>
// //       )}
// //       <Modal
// //         visible={modalVisible}
// //         transparent={true}
// //         animationType="slide"
// //         onRequestClose={() => setModalVisible(false)}
// //       >
// //         <View style={styles.modalContainer}>
// //         <View style={styles.modalContent}>
// //   <Text style={styles.label}>Are you sure you want to Remove this user?</Text>
// //   <View style={styles.modalButton}>
    
// //     {deleting ? (
// //       <ActivityIndicator size="small" color="#0000ff" />
// //     ) : (
// //       <TouchableOpacity onPress={handleDeleteUser}>
// //         <Text style={styles.modalButtons}>Delete</Text>
// //       </TouchableOpacity>
// //     )}
// //     <TouchableOpacity onPress={() => setModalVisible(false)}>
// //       <Text style={styles.cancelButton}>Cancel</Text>
// //     </TouchableOpacity>
// //   </View>
// // </View>

// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fbd1d1',
// //     padding: 20,
// //   },
// //   title: {
// //     fontSize: 26,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //     color: '#333',
// //   },
// //   userContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 15,
// //     marginBottom: 15,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     elevation: 3,
// //   },
// //   userPhoto: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: 35,
// //     marginRight: 15,
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   userName: {
// //     fontSize: 20,
// //     fontWeight: '600',
// //     color: '#333',
// //   },
// //   userDetails: {
// //     fontSize: 16,
// //     color: '#666',
// //     marginTop: 4,
// //   },
// //   noUsersText: {
// //     fontSize: 18,
// //     textAlign: 'center',
// //     color: '#999',
// //   },
// //   emptyContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalContainer: {
// //     height: '100%',
// //     width: '100%',
// //     flex: 1,
// //     justifyContent: 'flex-end',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //   },
// //   modalContent: {
// //     borderTopRightRadius:40,
// //     borderTopLeftRadius:40,
// //     height: '50%',
// //     backgroundColor: 'white',
// //     padding: 20,
// //     borderRadius: 10,
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   modalButtons: {
// //     backgroundColor: 'red',
// //     paddingVertical: 10,
// //     paddingHorizontal: 80,
// //     borderRadius: 35,
// //     marginTop: 20,
// //     color: 'white',
// //   },
// //   cancelButton: {
// //     backgroundColor: '#000000',
// //     paddingVertical: 10,
// //     paddingHorizontal: 80,
// //     borderRadius: 35,
// //     marginTop: 10,
// //     color: 'white',
// //   },
// //   activityIndicator: {
// //     marginLeft: 10,
// //   },
// //   label: {
// //     fontSize: 18,
// //     fontFamily: 'Montserrat-SemiBold',
// //     color: 'black',
// //     marginBottom: 25,
// //     textAlign: 'center',
// //   },
// //   label2: {
// //     marginTop: 20,
// //     fontSize: 22,
// //     fontFamily: 'Montserrat-SemiBold',
// //     color: 'black',
// //     marginBottom: 25,
// //     textAlign: 'left',
// //     textDecorationLine: 'underline',
// //   },
// //   label3: {
// //     textDecorationLine: 'underline',
// //     fontSize: 22,
// //     fontFamily: 'Montserrat-SemiBold',
// //     color: '#ff0000',
// //     marginBottom: 55,
// //     textAlign: 'left',
// //   },
// // });

// // export default Connected;



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FastImage from 'react-native-fast-image';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';

// const Connected = () => {
//   const [ChatUsers, setChatUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [navigating, setNavigating] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [senderEmail, setSenderEmail] = useState('');
//   const [matchedProfile, setMatchedProfile] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Fetch userEmail from AsyncStorage
//         const email = await AsyncStorage.getItem('userEmail');
//         if (email) {
//           setUserEmail(email);
//         } else {
//           console.warn('userEmail not found in AsyncStorage');
//         }
//       } catch (error) {
//         console.error('Error fetching userEmail from AsyncStorage:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchDataFromChk = async () => {
//       try {
//         const chkQuery = await firestore().collection('chk').where('receiverEmail', '==', userEmail).get();
//         if (!chkQuery.empty) {
//           const chkData = chkQuery.docs.map(doc => doc.data());
//           if (chkData.length > 0) {
//             const { senderEmail } = chkData[0]; // Assuming only one document matches
//             setSenderEmail(senderEmail);
//           } else {
//             console.log('No data found in chk for userEmail:', userEmail);
//           }
//         } else {
//           console.log('No documents found in chk for userEmail:', userEmail);
//         }
//       } catch (error) {
//         console.error('Error fetching data from chk collection:', error);
//       }
//     };

//     if (userEmail) {
//       fetchDataFromChk();
//     }
//   }, [userEmail]);

//   useEffect(() => {
//     const fetchChatUsers = async () => {
//       try {
//         const ChatUsersJSON = await AsyncStorage.getItem('ChatUsers');
//         if (ChatUsersJSON) {
//           const ChatUsersArray = JSON.parse(ChatUsersJSON);

//           // Filter out duplicate users
//           const uniqueUsers = ChatUsersArray.filter((user, index, self) => 
//             index === self.findIndex((u) => u.email === user.email)
//           );

//           setChatUsers(uniqueUsers);
//         }
//       } catch (error) {
//         console.error('Error fetching connected users from AsyncStorage:', error);
//         alert('Failed to fetch connected users. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatUsers();
//   }, []);

//   const getDocId = async (item) => {
//     try {
//       // Check 'ProfileFor' collection
//       const profileForQuery = await firestore().collection('ProfileFor').where('email', '==', item.email).get();
//       if (!profileForQuery.empty) {
//         const doc = profileForQuery.docs[0];
//         return doc.id;
//       }

//       // Check 'Post' collection
//       const postQuery = await firestore().collection('Post').where('email', '==', item.email).get();
//       if (!postQuery.empty) {
//         const doc = postQuery.docs[0];
//         return doc.id;
//       }
      
//       console.log('User not found in ProfileFor or Post');
//     } catch (error) {
//       console.error('Error fetching docId from Firestore:', error);
//     }
//     return null;
//   };

//   const handleUserPress = async (item) => {
//     setNavigating(true);
//     const docId = await getDocId(item);
//     setNavigating(false);
//     if (docId) {
//       navigation.navigate('Chat', { userId: docId, personData: item });
//     } else {
//       alert('User not found');
//     }
//   };

//   const handleUserLongPress = (item) => {
//     setSelectedUser(item);
//     setModalVisible(true);
//   };

//   const handleDeleteUser = async () => {
//     setDeleting(true);
//     const updatedUsers = ChatUsers.filter(user => user.email !== selectedUser.email);
//     setChatUsers(updatedUsers);
//     await AsyncStorage.setItem('ChatUsers', JSON.stringify(updatedUsers));
//     setDeleting(false);
//     setModalVisible(false);
//   };

//   const renderUserItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.userContainer}
//       activeOpacity={0.7}
//       onPress={() => handleUserPress(item)}
//       onLongPress={() => handleUserLongPress(item)}
//     >
//       <FastImage
//         source={
//           item.photos && item.photos.length > 0
//             ? { uri: item.photos[0], priority: FastImage.priority.normal }
//             : require('../assets/app_images/user.png')
//         }
//         style={styles.userPhoto}
//         resizeMode={FastImage.resizeMode.cover}
//         PlaceholderContent={<ActivityIndicator />}
//       />
//       <View style={styles.textContainer}>
//         <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
//         <Text style={styles.userDetails}>{item.city}, {item.selectedState}</Text>
//       </View>
//       {navigating && <ActivityIndicator style={styles.activityIndicator} size="small" color="#0000ff" />}
//     </TouchableOpacity>
//   );

//   useEffect(() => {
//     const fetchMatchedProfile = async () => {
//       if (senderEmail) {
//         try {
//           // Check 'ProfileFor' collection for senderEmail
//           const profileForQuery = await firestore().collection('ProfileFor').where('email', '==', senderEmail).get();
//           if (!profileForQuery.empty) {
//             const profileData = profileForQuery.docs.map(doc => doc.data());
//             if (profileData.length > 0) {
//               setMatchedProfile(profileData[0]);
//               return;
//             }
//           }

//           // Check 'Post' collection for senderEmail
//           const postQuery = await firestore().collection('Post').where('email', '==', senderEmail).get();
//           if (!postQuery.empty) {
//             const postData = postQuery.docs.map(doc => doc.data());
//             if (postData.length > 0) {
//               setMatchedProfile(postData[0]);
//               return;
//             }
//           }

//           console.log('No profile found in ProfileFor or Post for senderEmail:', senderEmail);
//         } catch (error) {
//           console.error('Error fetching data from ProfileFor or Post:', error);
//         }
//       }
//     };

//     fetchMatchedProfile();
//   }, [senderEmail]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label2}>Connected Users</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : ChatUsers.length > 0 ? (
//         <FlatList
//           data={ChatUsers}
//           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
//           renderItem={renderUserItem}
//         />
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.noUsersText}>No connected users found.</Text>
//         </View>
//       )}
//       {matchedProfile && (
//         <View style={styles.profileContainer}>
//           <Text style={styles.profileText}>Sender Profile:</Text>
//           <Text>Name: {matchedProfile.firstName} {matchedProfile.lastName}</Text>
//           <Text>Email: {matchedProfile.email}</Text>
//           <Text>City: {matchedProfile.city}</Text>
//           <Text>State: {matchedProfile.selectedState}</Text>
//         </View>
//       )}
//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.label}>Are you sure you want to remove this user?</Text>
//             <View style={styles.modalButton}>
//               {deleting ? (
//                 <ActivityIndicator size="small" color="#0000ff" />
//               ) : (
//                 <TouchableOpacity onPress={handleDeleteUser}>
//                   <Text style={styles.modalButtons}>Delete</Text>
//                 </TouchableOpacity>
//               )}
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Text style={styles.cancelButton}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fbd1d1',
//     padding: 20,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   userPhoto: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   textContainer: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   userDetails: {
//     fontSize: 14,
//     color: '#666',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noUsersText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 12,
//     width: '80%',
//     alignItems: 'center',
//   },
//   modalButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//     width: '100%',
//   },
//   modalButtons: {
//     fontSize: 18,
//     color: '#0066cc',
//   },
//   cancelButton: {
//     fontSize: 18,
//     color: '#cc0000',
//   },
//   activityIndicator: {
//     position: 'absolute',
//     right: 20,
//     top: '50%',
//     marginTop: -12,
//   },
//   label2: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   profileContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 12,
//     marginTop: 20,
//   },
//   profileText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default Connected;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Connected = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [matchedProfile, setMatchedProfile] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
        } else {
          console.warn('userEmail not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching userEmail from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDataFromChk = async () => {
      try {
        const chkQuery = await firestore().collection('chk').where('receiverEmail', '==', userEmail).get();
        if (!chkQuery.empty) {
          const chkData = chkQuery.docs.map(doc => doc.data());
          if (chkData.length > 0) {
            const { senderEmail } = chkData[0]; // Assuming only one document matches
            setSenderEmail(senderEmail);
          } else {
            console.log('No data found in chk for userEmail:', userEmail);
          }
        } else {
          console.log('No documents found in chk for userEmail:', userEmail);
        }
      } catch (error) {
        console.error('Error fetching data from chk collection:', error);
      }
    };

    if (userEmail) {
      fetchDataFromChk();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const chatUsersJSON = await AsyncStorage.getItem('ChatUsers');
        if (chatUsersJSON) {
          const chatUsersArray = JSON.parse(chatUsersJSON);

          // Filter out duplicate users
          const uniqueUsers = chatUsersArray.filter((user, index, self) => 
            index === self.findIndex((u) => u.email === user.email)
          );

          setChatUsers(uniqueUsers);
        }
      } catch (error) {
        console.error('Error fetching connected users from AsyncStorage:', error);
        alert('Failed to fetch connected users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatUsers();
  }, []);

  useEffect(() => {
    const fetchMatchedProfile = async () => {
      if (senderEmail) {
        try {
          // Check 'ProfileFor' collection for senderEmail
          const profileForQuery = await firestore().collection('ProfileFor').where('email', '==', senderEmail).get();
          if (!profileForQuery.empty) {
            const profileData = profileForQuery.docs.map(doc => doc.data());
            if (profileData.length > 0) {
              setMatchedProfile(profileData[0]);
              return;
            }
          }

          // Check 'Post' collection for senderEmail
          const postQuery = await firestore().collection('Post').where('email', '==', senderEmail).get();
          if (!postQuery.empty) {
            const postData = postQuery.docs.map(doc => doc.data());
            if (postData.length > 0) {
              setMatchedProfile(postData[0]);
              return;
            }
          }

          console.log('No profile found in ProfileFor or Post for senderEmail:', senderEmail);
        } catch (error) {
          console.error('Error fetching data from ProfileFor or Post:', error);
        }
      }
    };

    fetchMatchedProfile();
  }, [senderEmail]);

  const handleUserPress = async (item) => {
    try {
      const docId = await getDocId(item);
      navigation.navigate('Chat', { userId: docId, personData: item });
    } catch (error) {
      console.error('Error navigating to Chat:', error);
    }
  };

  const getDocId = async (item) => {
    try {
      // Check 'ProfileFor' collection
      const profileForQuery = await firestore().collection('ProfileFor').where('email', '==', item.email).get();
      if (!profileForQuery.empty) {
        const doc = profileForQuery.docs[0];
        return doc.id;
      }

      // Check 'Post' collection
      const postQuery = await firestore().collection('Post').where('email', '==', item.email).get();
      if (!postQuery.empty) {
        const doc = postQuery.docs[0];
        return doc.id;
      }
      
      console.log('User not found in ProfileFor or Post');
    } catch (error) {
      console.error('Error fetching docId from Firestore:', error);
    }
    return null;
  };

  const handleUserLongPress = (item) => {
    setSelectedUser(item);
    setModalVisible(true);
  };

  const handleDeleteUser = async () => {
    try {
      const updatedUsers = chatUsers.filter(user => user.email !== selectedUser.email);
      setChatUsers(updatedUsers);
      await AsyncStorage.setItem('ChatUsers', JSON.stringify(updatedUsers));
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again later.');
    }
  };

  const renderProfileItem = ({ item }) => (
    <TouchableOpacity
    style={styles.userContainer}
    activeOpacity={0.7}
    onPress={() => handleUserPress(item)}
    onLongPress={() => handleUserLongPress(item)}
  >
    <FastImage
      source={
        item.photos && item.photos.length > 0
          ? { uri: item.photos[0], priority: FastImage.priority.normal }
          : require('../assets/app_images/user.png')
      }
      style={styles.userPhoto}
      resizeMode={FastImage.resizeMode.cover}
      PlaceholderContent={<ActivityIndicator />}
    />
    <View style={styles.textContainer}>
      <Text style={styles.userName}>{item.firstName} {item.lastName}{item.name}</Text>
      <Text style={styles.userDetails}>{item.city}, {item.selectedState}{item.address}</Text>
    </View>
  </TouchableOpacity>
  );

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.7}
      onPress={() => handleUserPress(item)}
      onLongPress={() => handleUserLongPress(item)}
    >
      <FastImage
        source={
          item.photos && item.photos.length > 0
            ? { uri: item.photos[0], priority: FastImage.priority.normal }
            : require('../assets/app_images/user.png')
        }
        style={styles.userPhoto}
        resizeMode={FastImage.resizeMode.cover}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.userDetails}>{item.city}, {item.selectedState}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    
          <Text style={styles.label2}>Getting Interest ??? 😏😏</Text>
     <Text style={styles.label3}>Then Chat More   💬</Text>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : chatUsers.length > 0 ? (
        <FlatList
          data={chatUsers}
          
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={renderUserItem}
          
        />
        
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No connected users found.</Text>
        </View>
      )}
      {matchedProfile && (
        <FlatList
          data={[matchedProfile]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderProfileItem}
        />
      )} */}
      <FlatList
  data={chatUsers.length > 0 ? [...chatUsers, ...(matchedProfile ? [matchedProfile] : [])] : [matchedProfile].filter(Boolean)}
  keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
  renderItem={item => matchedProfile ? renderProfileItem(item) : renderUserItem(item)}
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
       <Text style={styles.noUsersText}>Start Chat Your Chats ❤️</Text>

    </View>
  }
/>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Are you sure you want to remove this user?</Text>
            <View style={styles.modalButton}>
              <TouchableOpacity onPress={handleDeleteUser}>
                <Text style={styles.modalButtons}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbd1d1',
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  modalButtons: {
    fontSize: 18,
    color: '#0066cc',
  },
  cancelButton: {
    fontSize: 18,
    color: '#cc0000',
  },
  activityIndicator: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12,
  },
  label2: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  label3: {
    textDecorationLine: 'underline',
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#ff0000',
    marginBottom: 35,
    textAlign: 'left',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
    noUsersText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
  },
});

export default Connected;