// // import React, { useEffect, useState } from 'react';
// // import { View, Text, Image, Button, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native';
// // import firestore from '@react-native-firebase/firestore';

// // const WatchUserScreen = ({ route }) => {
// //   const { userId } = route.params;
// //   const [userDetails, setUserDetails] = useState(null);
// //   const [isFollowing, setIsFollowing] = useState(false);

// //   useEffect(() => {
// //     const fetchUserDetails = async () => {
// //       try {
// //         console.log('Fetching user details for ID:', userId);

// //         // Check 'ProfileFor' collection
// //         const profileForDoc = await firestore().collection('ProfileFor').doc(userId).get();
// //         console.log('ProfileFor Document:', profileForDoc.exists ? profileForDoc.data() : 'Not found in ProfileFor');

// //         if (profileForDoc.exists) {
// //           const userData = profileForDoc.data();
// //           setUserDetails(userData);
// //           return;
// //         }

// //         // Check 'Post' collection
// //         const postDoc = await firestore().collection('Post').doc(userId).get();
// //         console.log('Post Document:', postDoc.exists ? postDoc.data() : 'Not found in Post');

// //         if (postDoc.exists) {
// //           const userData = postDoc.data();
// //           setUserDetails(userData);
// //           return;
// //         }

// //         console.log('User not found');
// //       } catch (error) {
// //         console.error('Error fetching user details:', error);
// //       }
// //     };

// //     fetchUserDetails();
// //   }, [userId]);

// //   // Function to handle follow/unfollow
// //   const handleFollow = async () => {
// //     // Implement logic to update following status in the database
// //     // Update isFollowing state accordingly
// //     setIsFollowing(!isFollowing);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {userDetails ? (
// //         <ScrollView>
// //           {/* Display photos if available */}
// //        <View style={styles.imageContainer}>
// //   {userDetails.photos && userDetails.photos.length > 0 ? (
// //     <Image
// //       source={{ uri: userDetails.photos[0] }}
// //       style={styles.userImage}
// //       resizeMode="cover"
// //     />
// //   ) : (
// //     <Image
// //       source={require('../../assets/user.png')}
// //       style={styles.userImage}
// //       resizeMode="cover"
// //     />
// //   )}
// // </View>

          
// //           {/* Display other user details based on your data structure */}
// //           <Text style={styles.usernameText}>{userDetails.name || userDetails.firstName}</Text>
// //           <Text style={styles.userInfoText}> {userDetails.height}</Text>
// //           <Text style={styles.userInfoText}> {userDetails.age || userDetails.dateOfBirth  }</Text>
// //           <Text style={styles.userInfoText}> {userDetails.religion || userDetails.Community}</Text>
// //           {/* <Text style={styles.userInfoText}> {userDetails.community}</Text> */}
// //           <Text style={styles.userInfoText}> {userDetails.education}</Text>
// //           <Text style={styles.userInfoText}> {userDetails.caste}</Text>
// //           <Text style={styles.userInfoText}> {userDetails.height}</Text>
          
// //           {/* Follow/Unfollow button */}
// //           <TouchableOpacity
// //             style={styles.followButton}
// //             onPress={handleFollow}
// //           >
// //             <Text style={styles.followButtonText}>
// //               {isFollowing ? 'Unfollow' : 'Follow'}
// //             </Text>
// //           </TouchableOpacity>

          
// //         </ScrollView>
// //       ) : (
// //         <Text>Loading...</Text>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //       },
// //       userInfoContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         padding: 16,
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#ddd',
       
// //       },
// //       userImage: {
// //         marginTop:'20%',
// //         width: 110,
// //         height: 110,
// //         marginLeft:20,
// //         borderRadius: 50,
// //         marginRight: 16,
// //       },
// //       userInfo: {
// //         flex: 1,
     
// //       },
// //       userInfoText:{
// // marginLeft:15,
// // letterSpacing:2,
// // marginBottom:10,
// // fontSize:16,
// //       },
// //       usernameText: {
// //         fontSize: 30,
// //         textAlign:'right',
// //         alignSelf:'center',
// //   marginLeft:130,
// //           bottom:90,
// //         fontFamily:'DMSerifDisplay-Regular',
// //         marginTop:5,
      
// //         marginBottom: 10,
// //       },
// //       followButton: {
// //         paddingVertical: 14,
// //         paddingHorizontal: 16,
// //         backgroundColor: '#3897f0',
// //         borderRadius: 5,
// //       },
// //       unfollowButton: {
// //         backgroundColor: '#fff',
// //         borderWidth: 1,
// //         borderColor: '#3897f0',
// //       },
// //       followButtonText: {
// //         color: '#fff',
// //         textAlign:'center',
    
// //         fontFamily:'DMSerifDisplay-Regular',
// //       },
// //       photosContainer: {
// //         flexDirection: 'row',
// //         flexWrap: 'wrap',
// //         padding: 8,
// //       },
// //       userPhoto: {
// //         width: '32%',
// //         aspectRatio: 1,
// //         margin: 4,
// //       },
// //       detailsContainer: {
// //         padding: 16,
// //       },
// //       sectionHeading: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         marginBottom: 8,
// //       },
// // });

// // export default WatchUserScreen;





// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, Button, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const WatchUserScreen = ({ route }) => {
//   const { userId } = route.params;
//   const [userDetails, setUserDetails] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         console.log('Fetching user details for ID:', userId);

//         // Check 'ProfileFor' collection
//         const profileForDoc = await firestore().collection('ProfileFor').doc(userId).get();
//         console.log('ProfileFor Document:', profileForDoc.exists ? profileForDoc.data() : 'Not found in ProfileFor');

//         if (profileForDoc.exists) {
//           const userData = profileForDoc.data();
//           setUserDetails(userData);
//           return;
//         }

//         // Check 'Post' collection
//         const postDoc = await firestore().collection('Post').doc(userId).get();
//         console.log('Post Document:', postDoc.exists ? postDoc.data() : 'Not found in Post');

//         if (postDoc.exists) {
//           const userData = postDoc.data();
//           setUserDetails(userData);
//           return;
//         }

//         console.log('User not found');
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   // Function to handle follow/unfollow
//   const handleFollow = async () => {
//     // Implement logic to update following status in the database
//     // Update isFollowing state accordingly
//     setIsFollowing(!isFollowing);
//   };

//   return (
//     <View style={styles.container}>
//       {userDetails ? (
//         <ScrollView>
//           {/* Display photos if available */}
//        <View style={styles.imageContainer}>
//   {userDetails.photos && userDetails.photos.length > 0 ? (
//     <Image
//       source={{ uri: userDetails.photos[0] }}
//       style={styles.userImage}
//       resizeMode="cover"
//     />
//   ) : (
//     <Image
//       source={require('../../assets/user.png')}
//       style={styles.userImage}
//       resizeMode="cover"
//     />
//   )}
// </View>

          
//           {/* Display other user details based on your data structure */}
//           <Text style={styles.usernameText}>{userDetails.name || userDetails.firstName}</Text>
//           <Text style={styles.userInfoText}> {userDetails.height}</Text>
//           <Text style={styles.userInfoText}> {userDetails.age || userDetails.dateOfBirth  }</Text>
//           <Text style={styles.userInfoText}> {userDetails.religion || userDetails.Community}</Text>
//           {/* <Text style={styles.userInfoText}> {userDetails.community}</Text> */}
//           <Text style={styles.userInfoText}> {userDetails.education}</Text>
//           <Text style={styles.userInfoText}> {userDetails.caste}</Text>
//           <Text style={styles.userInfoText}> {userDetails.height}</Text>
          
//           {/* Follow/Unfollow button */}
//           <TouchableOpacity
//             style={styles.followButton}
//             onPress={handleFollow}
//           >
//             <Text style={styles.followButtonText}>
//               {isFollowing ? 'Unfollow' : 'Follow'}
//             </Text>
//           </TouchableOpacity>
//           <View style={styles.imageContainer}>
//             {userDetails.photos && userDetails.photos.length > 0 ? (
//               userDetails.photos.map((photo, index) => (
//                 <Image
//                   key={index}
//                   source={{ uri: photo }}
//                   style={styles.userPhoto}
//                   resizeMode="cover"
//                 />
//               ))
//             ) : (
//               <Image
//                 source={require('../../assets/user.png')}
//                 style={styles.userImage}
//                 resizeMode="cover"
//               />
//             )}
//           </View>
//         </ScrollView>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//       },
//       userInfoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
       
//       },
//       userImage: {
//         marginTop:'20%',
//         width: 110,
//         height: 110,
//         marginLeft:20,
//         borderRadius: 50,
//         marginRight: 16,
//       },
//       userInfo: {
//         flex: 1,
     
//       },
//       userInfoText:{
// marginLeft:15,
// letterSpacing:2,
// marginBottom:10,
// fontSize:16,
//       },
//       usernameText: {
//         fontSize: 30,
//         textAlign:'right',
//         alignSelf:'center',
//   marginLeft:130,
//           bottom:90,
//         fontFamily:'DMSerifDisplay-Regular',
//         marginTop:5,
      
//         marginBottom: 10,
//       },
//       followButton: {
//         paddingVertical: 14,
//         paddingHorizontal: 16,
//         backgroundColor: '#3897f0',
//         borderRadius: 5,
//       },
//       unfollowButton: {
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderColor: '#3897f0',
//       },
//       followButtonText: {
//         color: '#fff',
//         textAlign:'center',
    
//         fontFamily:'DMSerifDisplay-Regular',
//       },
//       photosContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         padding: 8,
//       },
//       userPhoto: {
//         width: '32%',
//         aspectRatio: 1,
//         margin: 4,
//       },
//       detailsContainer: {
//         padding: 16,
//       },
//       sectionHeading: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//       },
// });

// export default WatchUserScreen; 


import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const WatchUserScreen = ({ route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('Fetching user details for ID:', userId);

        // Check 'ProfileFor' collection
        const profileForDoc = await firestore().collection('ProfileFor').doc(userId).get();
        console.log('ProfileFor Document:', profileForDoc.exists ? profileForDoc.data() : 'Not found in ProfileFor');

        if (profileForDoc.exists) {
          const userData = profileForDoc.data();
          setUserDetails(userData);
          return;
        }

        // Check 'Post' collection
        const postDoc = await firestore().collection('Post').doc(userId).get();
        console.log('Post Document:', postDoc.exists ? postDoc.data() : 'Not found in Post');

        if (postDoc.exists) {
          const userData = postDoc.data();
          setUserDetails(userData);
          return;
        }

        console.log('User not found');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Function to handle follow/unfollow
  const handleFollow = async () => {
    // Implement logic to update following status in the database
    // Update isFollowing state accordingly
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={userDetails.photos && userDetails.photos.length > 0 ? { uri: userDetails.photos[0] } : require('../../assets/user.png')}
              style={styles.userImage}
              resizeMode="cover"
            />
            <Text style={styles.usernameText}>{userDetails.name || userDetails.firstName}</Text>
            {/* <TouchableOpacity
              style={[styles.followButton, isFollowing ? styles.unfollowButton : null]}
              onPress={handleFollow}
            >
              <Text style={styles.followButtonText}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Display other user details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionHeading}>User Details</Text>
            <Text style={styles.userInfoText}>Height: {userDetails.height}</Text>
            <Text style={styles.userInfoText}>Age: {userDetails.age || userDetails.dateOfBirth}</Text>
            <Text style={styles.userInfoText}>Religion: {userDetails.religion || userDetails.community}</Text>
            <Text style={styles.userInfoText}>Education: {userDetails.education}</Text>
            <Text style={styles.userInfoText}>Caste: {userDetails.caste}</Text>
          </View>

          {/* Display photos in grid layout */}
          <View style={styles.photosContainer}>
            {userDetails.photos && userDetails.photos.length > 0 ? (
              userDetails.photos.map((photo, index) => (
                <View key={index} style={styles.photoColumn}>
                  <Image
                    source={{ uri: photo }}
                    style={styles.userPhoto}
                    resizeMode="cover"
                  />
                </View>
              ))
            ) : (
              <Image
                source={require('../../assets/user.png')}
                style={styles.userImage}
                resizeMode="cover"
              />
            )}
          </View>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    resizeMode: 'cover',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  followButton: {
    backgroundColor: '#3897f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  unfollowButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3897f0',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  photoColumn: {
    width: '30%', // Adjust the width as needed
    marginBottom: 16,
  },
  userPhoto: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default WatchUserScreen;
