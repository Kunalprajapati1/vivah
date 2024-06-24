


import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Dimensions, FlatList,BackHandler,ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WatchUserScreen = ({ route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack(); // Navigate to the previous page
      return true; // Prevent default behavior (closing the app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [navigation]);

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

  // Function to open full screen image view
  const openImageView = (uri) => {
    setSelectedImageUri(uri);
    setViewImageModal(true);
  };

  // Function to close full screen image view
  const closeImageView = () => {
    setViewImageModal(false);
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
            <Text style={styles.usernameText}>{userDetails.name || userDetails.firstName} {userDetails.lastName} </Text>
           
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
          <FlatList
            data={userDetails.photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openImageView(item)} style={styles.photoContainer}>
                <Image
                  source={{ uri: item }}
                  style={styles.userPhoto}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            numColumns={3}
          />

          {/* Modal for full screen image view */}
          <Modal
            visible={viewImageModal}
            transparent={true}
            onRequestClose={closeImageView}
          >
            <View style={styles.modalContainer}>
              <Image
                source={{ uri: selectedImageUri }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeImageView}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

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
    borderWidth:3,
   borderColor:'#fbd1d1',
    
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    resizeMode: 'cover',
  },
  usernameText: {
    color:'black',
    fontSize: 26,
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
    
    padding: 17,
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
  sectionHeading: {
    color:'black',

    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userInfoText: {
    color:'black',

    fontSize: 16,
    marginBottom: 4,
  },
  photoContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 6,
  },
  userPhoto: {
   borderColor:'#fbd1d1',
   borderWidth:2,
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
});

export default WatchUserScreen;
