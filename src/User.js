import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Front = () => {
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [displayedUserData, setDisplayedUserData] = useState(null);

  useEffect(() => {
    const fetchPosts = () => {
      const unsubscribe = firestore().collection('ProfileFor').onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        setPostData(posts);
      });

      return () => unsubscribe();
    };

    fetchPosts();
  }, []);

  const displayOrder = [
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

  const handleImageClick = (imageUrls) => {
    setSelectedImages(imageUrls);
    setModalVisible(true);
  };

  const handleEmailSubmit = () => {
    const user = postData.find((user) => user.email === enteredEmail);
    if (user) {
      setDisplayedUserData(user);
    } else {
      setDisplayedUserData(null);
    }
  };

  return (
    <ScrollView>
    <ScrollView contentContainerStyle={styles.container}>
      {!displayedUserData && (
        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            value={enteredEmail}
            onChangeText={(text) => setEnteredEmail(text)}
          />
          <Button title="Submit" onPress={handleEmailSubmit} />
        
        </View>
      )}

      {displayedUserData ? (
        <TouchableOpacity onPress={() => handleImageClick(displayedUserData.photos)}>
          <View style={styles.postContainer}>
            {displayedUserData.photos?.length > 0 ? (
              <Image source={{ uri: displayedUserData.photos[0] }} style={styles.profileImage} />
            ) : (
              <Image
                source={require('../assets/user.png')} // Provide the correct path to your default image
                style={styles.profileImage2}
              />
            )}
            <View style={styles.fieldContainer}>
              {/* Display field names and values horizontally */}
              {displayOrder.map((field) => (
                <View key={field} style={styles.horizontalFieldContainer}>
                  <Text style={styles.fieldName}>{field}:</Text>
                  <Text style={styles.fieldValue}>{displayedUserData[field] || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>No user data to display</Text>
      )}

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emailInputContainer: {
    marginTop:'80%',
    marginBottom: 30,
    width:"90%",
    borderRadius:50,
  },
  emailInput: {
    flex: 1,
    marginRight: 10,
marginBottom:40,
textAlign:'center',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    borderRadius: 50,
    marginBottom: 20,
  },
  profileImage2: {
    marginTop: '10%',
    width: '50%',
    height: 180,
    marginBottom: 40,
    borderRadius: 10,
    marginLeft: 90,
  },
  fieldContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  horizontalFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fieldName: {
    fontWeight: '500',
    fontSize: 18,
    letterSpacing:3,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    marginRight:30,
    letterSpacing:3,
    textTransform: 'capitalize',
    textAlign: 'right',
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
});

export default Front;
