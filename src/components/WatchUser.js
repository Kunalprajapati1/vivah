import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native';
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
          {/* Display photos if available */}
          <View style={styles.imageContainer}>
            {userDetails.photos && userDetails.photos.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {userDetails.photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={styles.userImage}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            ) : (
              <Image
                source={require('../../assets/user.png')}
                style={styles.userImage}
                resizeMode="cover"
              />
            )}
          </View>
          
          {/* Display other user details based on your data structure */}
          <Text style={styles.usernameText}>{userDetails.name || userDetails.firstName}</Text>
          <Text style={styles.userInfoText}> {userDetails.email}</Text>
          <Text style={styles.userInfoText}> {userDetails.age}</Text>
          <Text style={styles.userInfoText}> {userDetails.religion}</Text>
          {/* <Text style={styles.userInfoText}> {userDetails.community}</Text> */}
          <Text style={styles.userInfoText}> {userDetails.education}</Text>
          <Text style={styles.userInfoText}> {userDetails.caste}</Text>
          <Text style={styles.userInfoText}> {userDetails.mobile}</Text>
          
          {/* Follow/Unfollow button */}
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleFollow}
          >
            <Text style={styles.followButtonText}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
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
      },
      userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
       
      },
      userImage: {
        marginTop:'20%',
        width: 110,
        height: 110,
        marginLeft:20,
        borderRadius: 50,
        marginRight: 16,
      },
      userInfo: {
        flex: 1,
     
      },
      userInfoText:{
marginLeft:15,
letterSpacing:2,
marginBottom:10,
fontSize:16,
      },
      usernameText: {
        fontSize: 30,
        textAlign:'right',
        alignSelf:'center',
  marginLeft:130,
          bottom:90,
        fontFamily:'DMSerifDisplay-Regular',
        marginTop:5,
      
        marginBottom: 10,
      },
      followButton: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#3897f0',
        borderRadius: 5,
      },
      unfollowButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#3897f0',
      },
      followButtonText: {
        color: '#fff',
        textAlign:'center',
    
        fontFamily:'DMSerifDisplay-Regular',
      },
      photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
      },
      userPhoto: {
        width: '32%',
        aspectRatio: 1,
        margin: 4,
      },
      detailsContainer: {
        padding: 16,
      },
      sectionHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
});

export default WatchUserScreen;