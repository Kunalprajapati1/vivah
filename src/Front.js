import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Front = () => {
  const [profileForData, setProfileForData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchProfileForData = () => {
      const unsubscribe = firestore().collection('ProfileFor').onSnapshot((snapshot) => {
        const profiles = snapshot.docs.map(doc => doc.data());
        setProfileForData(profiles);
      });

      return () => unsubscribe();
    };

    fetchProfileForData();
  }, []);

  useEffect(() => {
    const fetchPostData = () => {
      const unsubscribe = firestore().collection('Post').onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        setPostData(posts);
      });

      return () => unsubscribe();
    };

    fetchPostData();
  }, []);

  const handleImageClick = (imageUrls) => {
    setSelectedImages(imageUrls);
    setModalVisible(true);
  };

  const navigation = useNavigation();

  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  const profileForDisplayOrder = [
    'firstName',
    'lastName',
    'selectedGender',
    'dayOfBirth',
    'monthOfBirth',
    'yearOfBirth',
    'diet',
    'height',
    'collegeName',
    'maritalStatus',
    'qualification',
    'selectedState',
    'selectedCity',
    'selectedOption',
    'selectedReligion',
    'selectedSubCommunity',
    'workAs',
    'workAsOtherDetails',
    'workWith',
    'workWithOtherDetails',
    'email',
    'mobileNumber',
  ];

  const postDisplayOrder = [
    'name', 'gender', 'age', 'dob', 'religion', 'caste', 'education', 'email', 'mobileNumber',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profileForData && profileForData.length > 0 &&
        profileForData.map((data, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(data.photos)}>
            <View style={styles.postContainer}>
              <Image
                source={data.photos && data.photos.length > 0 ? { uri: data.photos[0] } : require('../assets/user.png')}
                style={styles.profilePhoto}
              />
              <View style={styles.postDetails}>
                <Text style={styles.userName} >
                  {data.firstName}
                </Text>
                <View style={styles.detailsContainer}>
                  {profileForDisplayOrder.map((key) => (
                    <TouchableOpacity key={key} >
                      <Text style={styles.detailText}>{`${key}: ${data[key] || 'N/A'}`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TouchableOpacity onPress={navigateToChat} style={styles.chatt}>
               <Text>Click to Chat to Person</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToChat} style={styles.smallImageContainer}>
                <Image
                  source={require('../assets/chat.png')} // Replace with your small image source
                  style={styles.smallImage}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      }

      {postData && postData.length > 0 &&
        postData.map((data, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(data.photos)}>
            <View style={styles.postContainer}>
              <Image
                source={data.photos && data.photos.length > 0 ? { uri: data.photos[0] } : require('../assets/user.png')}
                style={styles.profilePhoto}
              />
              <View style={styles.postDetails}>
                <Text style={styles.userName} >
                  {data.name}
                </Text>
                <View style={styles.detailsContainer}>
                  {postDisplayOrder.map((key) => (
                    <TouchableOpacity key={key} >
                      <Text style={styles.detailText}>{`${key}: ${data[key] || 'N/A'}`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TouchableOpacity onPress={navigateToChat} style={styles.chatt}>
               <Text>Click to Chat to Person</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToChat} style={styles.smallImageContainer}>
                <Image
                  source={require('../assets/chat.png')} // Replace with your small image source
                  style={styles.smallImage}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      }

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedImages([]);
        }}
      >
        <ScrollView horizontal pagingEnabled contentContainerStyle={styles.modalScrollView}>
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
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  postContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#00000097',
    borderRadius: 10,
    padding: 10,
    position: 'relative', // Added position relative for the small image positioning
    width: '100%',
  },
  profilePhoto: {
    marginTop: '10%',
    width: '80%',
    height: 180,
    marginBottom: 40,
    borderRadius: 10,
    marginLeft: 35,
  },
  postDetails: {
    flex: 1,
    backgroundColor: '#b0a9a92f'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    textTransform: 'uppercase',
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
    textTransform: 'uppercase',
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
   alignItems:'flex-end',
  },
  smallImage: {
    width: '30%',
    height: 100,
    
    borderRadius: 15,
  },
  chatt:{
 top:50,
 left:20,
 textDecorationLine:'underline',

  },
});

export default Front;
