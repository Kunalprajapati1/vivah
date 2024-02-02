import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const Front = () => {
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch the data from Firestore and update the state
    const fetchPosts = () => {
      const unsubscribe = firestore().collection('Post').onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        setPostData(posts);
      });
  
      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    };
  
    fetchPosts();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const displayOrder = [ 'name', 'gender', 'age', 'dob', 'religion', 'caste', 'education', 'email', 'mobileNumber'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {postData.map((post, index) => (
        <TouchableOpacity key={index} onPress={() => handleImageClick(post.photos.length > 0 ? post.photos[0] : null)}>
          <View style={styles.postContainer}>
            {post.photos.length > 0 ? (
              <Image
                source={{ uri: post.photos[0] }}
                style={styles.profilePhoto}
              />
            ) : (
              <Image
                source={require('../assets/user.png')} // Provide the correct path to your default image
                style={styles.profilePhoto2}
              />
            )}
            <View style={styles.postDetails}>
              <Text style={styles.userName}>{post.name}</Text>
              <View style={styles.detailsContainer}>
                {displayOrder.map((key) => (
                  <Text key={key} style={styles.detailText}>{`${key}: ${post[key] || 'N/A'}`}</Text>
                ))}
              </View>
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
          setSelectedImage(null);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>⌫</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
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
    width: '100%', // Each post takes full width
  },
  profilePhoto: {
    marginTop:'10%',
    width: '80%',
    height: 180,
    marginBottom:40,
    borderRadius: 10,
    marginLeft: 35,
  },
  profilePhoto2: {
    marginTop:'10%',
    width: '50%',
    height: 180,
    marginBottom:40,
    borderRadius: 10,
    marginLeft: 90,
  },
  postDetails: {
    flex: 1,
    backgroundColor:'#b0a9a92f'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:20,
    marginBottom: 5,
marginLeft:20,
    textTransform: 'uppercase',
    color:'black',
  },
  detailsContainer: {
    marginTop: 5,
    marginLeft:20,
    
    
  },
  detailText: {
    marginBottom: 5,
    fontSize: 17,
    lineHeight:35,
    textTransform: 'uppercase'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButton: {
    color: '#fff3f3',
    fontSize: 20,
    top:60,
    marginLeft:'70%',
    marginBottom: 20,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default Front;
