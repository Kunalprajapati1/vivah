

// // // // import React, { useState, useEffect } from 'react';
// // // // import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // // const Connected = () => {
// // // //   const [connectedUsers, setConnectedUsers] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchConnectedUsers = async () => {
// // // //       try {
// // // //         const connectedUsersJSON = await AsyncStorage.getItem('connectedUsers');
// // // //         if (connectedUsersJSON) {
// // // //           const connectedUsersArray = JSON.parse(connectedUsersJSON);
// // // //           setConnectedUsers(connectedUsersArray);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error fetching connected users from AsyncStorage:', error);
// // // //       }
// // // //     };

// // // //     fetchConnectedUsers();
// // // //   }, []);

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.title}>Connected Persons</Text>
// // // //       {connectedUsers.length > 0 ? (
// // // //         <FlatList
// // // //           data={connectedUsers}
// // // //           keyExtractor={(item, index) => index.toString()}
// // // //           renderItem={({ item }) => (
// // // //             <TouchableOpacity style={styles.userContainer}>
// // // //               <Image
// // // //                 source={
// // // //                   item.photos && item.photos.length > 0
// // // //                     ? { uri: item.photos[0] }
// // // //                     : require('../assets/app_images/user.png')
// // // //                 }
// // // //                 style={styles.userPhoto}
// // // //               />
// // // //               <View style={styles.textContainer}>
// // // //                 <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
// // // //                 <Text style={styles.userDetails}>{item.city}, {item.selectedState}</Text>
// // // //               </View>
// // // //             </TouchableOpacity>
// // // //           )}
// // // //         />
// // // //       ) : (
// // // //         <Text style={styles.noUsersText}>No connected persons found.</Text>
// // // //       )}
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: '#f8f8f8',
// // // //     padding: 20,
// // // //   },
// // // //   title: {
// // // //     fontSize: 24,
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 20,
// // // //     textAlign: 'center',
// // // //     color: '#333',
// // // //   },
// // // //   userContainer: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     backgroundColor: '#fff',
// // // //     borderRadius: 10,
// // // //     padding: 10,
// // // //     marginBottom: 15,
// // // //     shadowColor: '#000',
// // // //     shadowOffset: { width: 0, height: 2 },
// // // //     shadowOpacity: 0.1,
// // // //     shadowRadius: 5,
// // // //     elevation: 3,
// // // //   },
// // // //   userPhoto: {
// // // //     width: 60,
// // // //     height: 60,
// // // //     borderRadius: 30,
// // // //     marginRight: 15,
// // // //   },
// // // //   textContainer: {
// // // //     flex: 1,
// // // //   },
// // // //   userName: {
// // // //     fontSize: 18,
// // // //     fontWeight: '600',
// // // //     color: '#333',
// // // //   },
// // // //   userDetails: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     marginTop: 4,
// // // //   },
// // // //   noUsersText: {
// // // //     fontSize: 18,
// // // //     textAlign: 'center',
// // // //     color: '#999',
// // // //     marginTop: 20,
// // // //   },
// // // // });

// // // // export default Connected;



// // // import React, { useState, useEffect } from 'react';
// // // import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import FastImage from 'react-native-fast-image';

// // // const Connected = () => {
// // //   const [connectedUsers, setConnectedUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const fetchConnectedUsers = async () => {
// // //     try {
// // //       const connectedUsersJSON = await AsyncStorage.getItem('connectedUsers');
// // //       if (connectedUsersJSON) {
// // //         const connectedUsersArray = JSON.parse(connectedUsersJSON);
// // //         setConnectedUsers(connectedUsersArray);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching connected users from AsyncStorage:', error);
// // //       alert('Failed to fetch connected users. Please try again later.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchConnectedUsers();
// // //   }, []);

// // //   const renderUserItem = ({ item }) => (
// // //     <TouchableOpacity style={styles.userContainer} activeOpacity={0.7}>
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
// // //         <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
// // //         <Text style={styles.userDetails}>{item.city}, {item.selectedState}</Text>
// // //       </View>
// // //     </TouchableOpacity>
// // //   );

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Connected Persons</Text>
// // //       {loading ? (
// // //         <ActivityIndicator size="large" color="#0000ff" />
// // //       ) : connectedUsers.length > 0 ? (
// // //         <FlatList
// // //           data={connectedUsers}
// // //           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
// // //           renderItem={renderUserItem}
// // //         />
// // //       ) : (
// // //         <View style={styles.emptyContainer}>
// // //           <Text style={styles.noUsersText}>No connected persons found.</Text>
// // //         </View>
// // //       )}
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
// // // });

// // // export default Connected;














// // // Connected.js
// // import React, { useState, useEffect } from 'react';
// // import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import FastImage from 'react-native-fast-image';
// // import { useNavigation } from '@react-navigation/native';

// // const Connected = () => {
// //   const [connectedUsers, setConnectedUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigation = useNavigation();

// //   const fetchConnectedUsers = async () => {
// //     try {
// //       const connectedUsersJSON = await AsyncStorage.getItem('connectedUsers');
// //       if (connectedUsersJSON) {
// //         const connectedUsersArray = JSON.parse(connectedUsersJSON);
// //         setConnectedUsers(connectedUsersArray);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching connected users from AsyncStorage:', error);
// //       alert('Failed to fetch connected users. Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchConnectedUsers();
// //   }, []);

// //   const renderUserItem = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.userContainer}
// //       activeOpacity={0.7}
// //       onPress={() => navigation.navigate('WatchUser', { userId: item.id })}
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
// //         <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
// //         <Text style={styles.userDetails}>{item.city}, {item.selectedState}</Text>
// //       </View>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Connected Persons</Text>
// //       {loading ? (
// //         <ActivityIndicator size="large" color="#0000ff" />
// //       ) : connectedUsers.length > 0 ? (
// //         <FlatList
// //           data={connectedUsers}
// //           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
// //           renderItem={renderUserItem}
// //         />
// //       ) : (
// //         <View style={styles.emptyContainer}>
// //           <Text style={styles.noUsersText}>No connected persons found.</Text>
// //         </View>
// //       )}
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
// // });

// // export default Connected;







// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FastImage from 'react-native-fast-image';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';

// const Connected = () => {
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const navigation = useNavigation();

//   const fetchConnectedUsers = async () => {
//     try {
//       const connectedUsersJSON = await AsyncStorage.getItem('connectedUsers');
//       if (connectedUsersJSON) {
//         const connectedUsersArray = JSON.parse(connectedUsersJSON);

//         // Filter out duplicate users
//         const uniqueUsers = connectedUsersArray.filter((user, index, self) => 
//           index === self.findIndex((u) => u.email === user.email)
//         );

//         setConnectedUsers(uniqueUsers);
//       }
//     } catch (error) {
//       console.error('Error fetching connected users from AsyncStorage:', error);
//       alert('Failed to fetch connected users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchConnectedUsers();
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
//     const docId = await getDocId(item);
//     if (docId) {
//       navigation.navigate('WatchUser', { userId: docId });
//     } else {
//       alert('User not found');
//     }
//   };

//   const handleUserLongPress = (item) => {
//     setSelectedUser(item);
//     setModalVisible(true);
//   };

//   const handleDeleteUser = async () => {
//     const updatedUsers = connectedUsers.filter(user => user.email !== selectedUser.email);
//     setConnectedUsers(updatedUsers);
//     await AsyncStorage.setItem('connectedUsers', JSON.stringify(updatedUsers));
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
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connected Persons</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : connectedUsers.length > 0 ? (
//         <FlatList
//           data={connectedUsers}
//           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
//           renderItem={renderUserItem}
//         />
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.noUsersText}>No connected persons found.</Text>
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
//             <Text>Are you sure you want to delete this user?</Text>
//             <View style={styles.modalButtons}>
//               <Button title="Cancel" onPress={() => setModalVisible(false)} />
//               <Button title="Delete" onPress={handleDeleteUser} />
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
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
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
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginRight: 15,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//   },
//   userDetails: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 4,
//   },
//   noUsersText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#999',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
// });

// export default Connected;




import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Connected = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigation = useNavigation();

  const fetchConnectedUsers = async () => {
    try {
      const connectedUsersJSON = await AsyncStorage.getItem('connectedUsers');
      if (connectedUsersJSON) {
        const connectedUsersArray = JSON.parse(connectedUsersJSON);

        // Filter out duplicate users
        const uniqueUsers = connectedUsersArray.filter((user, index, self) => 
          index === self.findIndex((u) => u.email === user.email)
        );

        setConnectedUsers(uniqueUsers);
      }
    } catch (error) {
      console.error('Error fetching connected users from AsyncStorage:', error);
      alert('Failed to fetch connected users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

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

  const handleUserPress = async (item) => {
    setNavigating(true);
    const docId = await getDocId(item);
    setNavigating(false);
    if (docId) {
      navigation.navigate('WatchUser', { userId: docId });
    } else {
      alert('User not found');
    }
  };

  const handleUserLongPress = (item) => {
    setSelectedUser(item);
    setModalVisible(true);
  };

  const handleDeleteUser = async () => {
    setDeleting(true);
    const updatedUsers = connectedUsers.filter(user => user.email !== selectedUser.email);
    setConnectedUsers(updatedUsers);
    await AsyncStorage.setItem('connectedUsers', JSON.stringify(updatedUsers));
    setDeleting(false);
    setModalVisible(false);
  };

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
        <Text style={styles.userName}>{item.firstName} {item.lastName} {item.name}</Text>
        <Text style={styles.userDetails}>{item.city}, {item.selectedState}{item.address}</Text>
      </View>
     
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label2}>Favorite Added Persons ❤️</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : connectedUsers.length > 0 ? (
        <FlatList
          data={connectedUsers}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={renderUserItem}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.noUsersText}>No connected persons found.</Text>
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
  <Text style={styles.label}>Are you sure you want to Remove this user?</Text>
  <View style={styles.modalButton}>
    
    {deleting ? (
      <ActivityIndicator size="small" color="#0000ff" />
    ) : (
      <TouchableOpacity onPress={handleDeleteUser}>
        <Text style={styles.modalButtons}>Delete</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={() => setModalVisible(false)}>
      <Text style={styles.  cancelButton}>Cancel</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  userDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  noUsersText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtons: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 35,
    marginTop: 20,
    color:'white',

    
  
  },
  cancelButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 35,
    marginTop: 10,
    color:'white',
  },


  activityIndicator: {
    marginLeft: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
  },

  label2: {
    marginTop:30,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'left',
    
  }
});

export default Connected;
