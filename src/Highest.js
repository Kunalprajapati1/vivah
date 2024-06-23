import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';


const Highest = ({route,navigation}) => {
  const {uniqueId}=route.params;
  const [qualification, setQualification] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 
  const categories = [
    'Engineering',
    'Arts/Design',
    'Commerce',
    'Science',
    'Medical',
    'Humanities',
    'Computer Science',
    'Business Administration',
    'Education',
    'Social Sciences',
    'Others'
  ];

  const getFieldsByCategory = (category) => {
    switch (category) {
      case 'Engineering':
        return [
   
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Other Engineering Fields'
        ];
      case 'Arts/Design':
        return ['Fine Arts', 'Graphic Design', 'Fashion Design', 'Other Arts/Design Fields'];
      case 'Commerce':
        return ['Accounting', 'Finance', 'Marketing', 'Other Commerce Fields'];
      case 'Science':
        return ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Other Science Fields'];
      case 'Medical':
        return ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Other Medical Fields'];
      case 'Humanities':
        return ['History', 'Philosophy', 'Literature', 'Other Humanities Fields'];
      case 'Science':
        return ['Software Engineering', 'Data Science', 'Information Technology'];
      case 'Business Administration':
        return ['Management', 'Entrepreneurship', 'International Business'];
      case 'Education':
        return ['Elementary Education', 'Secondary Education', 'Higher Education'];
      case 'Social Sciences':
        return ['Psychology', 'Sociology', 'Political Science', 'Other Social Sciences Fields'];
      default:
        return [];
    }
  };

  // Combine categories and fields into a single array
  const allOptions = categories.reduce((acc, category) => {
    const fields = getFieldsByCategory(category);
    return [...acc, category, ...fields];
  }, []);

  const filteredOptions = allOptions.filter(option =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );
  useEffect(() => {
    const firebaseConfig = {
      // Your Firebase config
    };
    initializeApp(firebaseConfig);
  }, []);


  const handleOptionPress = (item) => {
    setSelectedOption(item);
    setIsModalVisible(false);
  };const handleContinuePress = async () => {
    if (!selectedOption) {
      Alert.alert('Incomplete Information', 'Please select a qualification.');
      return;
    }
  
    try {
      setIsLoading(true); // Set loading state
  
      const highestEducationRef = firestore().collection('ProfileFor');
      await highestEducationRef.doc(uniqueId).update({
        qualification: qualification, // Replace with your state variable
        collegeName: collegeName, // Replace with your state variable
      });
  
      // Navigate to the next screen (adjust 'NextScreen' to your actual screen name)
      navigation.navigate('Work', { uniqueId });
    } catch (error) {
      console.error('Error adding highest education data:', error);
      Alert.alert('Error', 'Failed to submit. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  
  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/secure.png')} style={styles.image} /> */}
      <Text style={styles.title}>Highest Education Level</Text>

      {/* Picker for Selecting Option */}
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedOption || ' Add Qualification '}
        </Text>
      </TouchableOpacity>

      {/* College Name Input */}
      {selectedOption && (
        <TextInput
          style={styles.input}
          placeholder="Enter your college name"
          value={collegeName}
          onChangeText={(text) => setCollegeName(text)}
        />
      )}

      {/* Continue Button */}
      {/* Continue Button */}
<TouchableOpacity
  onPress={handleContinuePress}
  style={[styles.continueButton, { backgroundColor: selectedOption ? '#e05654' : '#e05654' }]}
  disabled={!selectedOption}
>
  {isLoading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={[styles.continueButtonText, { color: '#ffffff' }]}>Continue</Text>
  )}
</TouchableOpacity>


      {/* Custom Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Option"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <FlatList
              data={filteredOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleOptionPress(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
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

    alignItems: 'center',
  },
  image: {
    marginTop:80,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 36,
  },
  title: {
    marginTop:120,
    marginBottom: '8%',
    fontSize: 28,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '#000000',
  },
  pickerContainer: {
    height: 50,
    
    borderRadius: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#000000',
    borderWidth: 2,
    marginBottom: 56,

  },
  pickerText: {
    fontSize: 20,
    color: '#9a2d53',

  },
  input: {
    height: 50,
    width: '80%',
    color: '#9a2d53',
    borderColor: '#000000',
    borderWidth: 2,

    fontSize:17,
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 30,
  },
  continueButton: {
    padding: 15,
    borderRadius: 35,
    marginTop: '15%',
    width: '80%',
    
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 26,
    marginTop: '40%',
  },
  searchInput: {
    height: 50,
    borderColor: 'gray',
    
    backgroundColor: '#0000002d',
    borderRadius: 15,
    marginBottom: 16,
    paddingHorizontal: 40,
    color: 'white',
  },
  modalItem: {
    paddingVertical: 20,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Highest;
