import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
const Upload = ({ navigation }) => {
  const [details, setDetails] = useState({
    name: '',
    age: '',
    day: '',
    month: '',
    year: '',
    caste: '',
    religion: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: '',
    education: '',
    photos: [],
  });

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: 'Sanjog-57f3a.firebaseapp.com',
      projectId: "Sanjog-57f3a",
      storageBucket: "Sanjog-57f3a.appspot.com",
      messagingSenderId: '916285535946',
      appId: "1:916285535946:android:25db1a55a9bcf1dd916633",
    };
    initializeApp(firebaseConfig);
  }, []);

  const handleInputChange = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleGenderChange = (gender) => {
    setDetails({ ...details, gender });
  };
  const handlePhotoUpload = async () => {
    try {
      const response = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });
  
      if (response && response.length > 0) {
        const storageRef = storage().ref();
        const folderPath = 'images';
  
        const photoURLs = []; // To store the URLs of uploaded photos
  
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
    }
  };

  const handleSubmit = async () => {
    if (!details.gender) {
      Alert.alert('Incomplete Information', 'Please select a gender.');
    } else {
      try {
        const profileForRef = firestore().collection('Post');
        await profileForRef.add({
          name: details.name,
          age: details.age,
          day: details.day,
          month: details.month,
          year: details.year,
          caste: details.caste,
          religion: details.religion,
          gender: details.gender,
          mobileNumber: details.mobileNumber,
          email: details.email,
          address: details.address,
          education: details.education,
          photos: details.photos,
        });

        navigation.navigate('Land');
      } catch (error) {
        console.error('Error adding profile data:', error);
        Alert.alert('Error', 'Failed to submit. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Post All Your Correct Details for a Match</Text>
<View style={{ marginTop:'15%' }}>


        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => handleInputChange('name', text)}
        />

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('age', text)}
        />

        <Text style={styles.label}>Date of Birth:</Text>
        <View style={styles.dateOfBirthContainer}>
          <TextInput
            style={[styles.dateInput, styles.dateInputWithBorder]}
            placeholder="DD"
            keyboardType="numeric"
            placeholderTextColor="#1c202df7"
            maxLength={2}
            onChangeText={(text) => handleInputChange('day', text)}
          />
          <TextInput
            style={[styles.dateInput, styles.dateInputWithBorder]}
            placeholder="MM"
            keyboardType="numeric"
            placeholderTextColor="#1c202df7"
            maxLength={2}
            onChangeText={(text) => handleInputChange('month', text)}
          />
          <TextInput
            style={[styles.dateInput, styles.dateInputWithBorder]}
            placeholder="YYYY"
            keyboardType="numeric"
            placeholderTextColor="#1c202df7"
            maxLength={4}
            onChangeText={(text) => handleInputChange('year', text)}
          />
        </View>

        <Text style={styles.label}>Caste:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#ffffff"
          placeholder="Enter your caste"
          onChangeText={(text) => handleInputChange('caste', text)}
        />

        <Text style={styles.label}>Religion:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your religion"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => handleInputChange('religion', text)}
        />

<Text style={styles.label}>Gender:</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              details.gender === 'Male' && styles.selectedGenderMale,
              details.gender === 'Female' && styles.unselectedGenderFemale,
            ]}
            onPress={() => handleGenderChange('Male')}
          >
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              details.gender === 'Female' && styles.selectedGenderFemale,
              details.gender === 'Male' && styles.unselectedGenderMale,
            ]}
            onPress={() => handleGenderChange('Female')}
          >
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
          {/* You can add more gender options if needed */}
        </View>

        <Text style={styles.label}>Mobile Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          placeholderTextColor="#ffffff"
          keyboardType="phone-pad"
          onChangeText={(text) => handleInputChange('mobileNumber', text)}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#ffffff"
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange('email', text)}
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => handleInputChange('address', text)}
        />

        <Text style={styles.label}>Education:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your education"
          placeholderTextColor="#ffffff"

          onChangeText={(text) => handleInputChange('education', text)}
        />

        {/* Photo upload functionality */}
        <TouchableOpacity
          style={styles.button2}
          onPress={handlePhotoUpload}
        >
          <Text style={styles.buttonText1}>Upload Photo</Text>
        </TouchableOpacity>

        <ScrollView horizontal style={styles.photoScrollView}>
          {details.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.uploadedPhoto} />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    backgroundColor:'#1c202df7',
    padding: 40,
  },
  title:{
    fontFamily:'DMSerifDisplay-Regular',
fontSize:46,
// fontWeight:20,
// letterSpacing:2,
textAlign:'left',
// textDecorationLine:'underline',
// fontWeight:'600',
color:'#e46f6d',



  },
  label: {
    fontFamily:'Montserrat-Regular',
    fontWeight: '300',
    fontSize: 20,
    marginTop: 20,
    letterSpacing:1,
    color:'#ffffff',
    marginBottom: 10,
    textDecorationLine:'underline',
  },
  input: {
    color:'white',
    height: 52,
    fontFamily:'Montserrat-Regular',
    
    letterSpacing:1,
    // borderColor: '#000000',
    // borderWidth: 2,
    // marginBottom: 10,
    borderRadius: 10,
     backgroundColor: '#f2f2f27e',
    paddingHorizontal: 15,
    // paddingHorizontal: 38,
    marginBottom:10,
  },
  button: {
    backgroundColor: '#e05654',
    color:'white',
    letterSpacing:2,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  button2: {
    backgroundColor: '#ffd3d2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop:'10%',
    marginBottom: 30,
  },
  buttonText1: {
    color: '#e05654',
    fontFamily:'Montserrat-Regular',
    letterSpacing:2,
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily:'Montserrat-Regular',

    letterSpacing:2,
    fontSize: 16,
  },
  uploadedPhoto: {
    width: 100,
    height: 100,
    marginVertical: 20,
    marginHorizontal:10,
    flexDirection:'row',
  },
  vi:{
flexDirection:'row',

  },
  dateOfBirthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 5,
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },

  genderOption: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderWidth:2,
  },

  
  dateInputWithBorder: {
    borderWidth: 2,
    height:50,
    letterSpacing:2,
    borderColor: '#ccc',
  },

  selectedGenderMale: {
    color:'white',
    backgroundColor: '#e05654',
  },

  selectedGenderFemale: {
    backgroundColor: '#e05654',
  },
  genderText: {
    fontSize: 15,
    color: 'black',
  },

  photoScrollView: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Upload;