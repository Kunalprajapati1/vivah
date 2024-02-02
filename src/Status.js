import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const ProfileInfo = ({ title, options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleValueChange(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    onSelect(itemValue); // Pass the selected value to the parent component
    setIsModalVisible(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{title}:</Text>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.pickerText}>{selectedValue || `Select ${title}`}</Text>
      </TouchableOpacity>

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
              placeholder={`Search ${title}`}
              onChangeText={(text) => setSearch(text)}
            />
            <FlatList
              data={filteredOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Status = ({ navigation }) => {
  const maritalStatusOptions = ['Never Married', 'Divorced', 'Widowed', 'Single'];
  const heightOptions = ['4ft 5in', '4ft 6in', '4ft 7in', '4ft 8in', '4ft 9in', '4ft 10in', '4ft 11in', '5ft', '5ft 1in', '5ft 2in', '5ft 3in', '5ft 4in', '5ft 5in', '5ft 6in', '5ft 7in', '5ft 8in', '5ft 9in', '5ft 10in', '5ft 11in', '6ft', '6ft 1in', '6ft 2in', '6ft 3in', '6ft 4in', '6ft 5in', '6ft 6in', '6ft 7in', '6ft 8in', '6ft 9in', '6ft 10in', '6ft 11in', '7ft'];
  const dietOptions = ['Veg', 'Non-Veg', 'Eggetarian', 'Jain', 'Vegan'];

  const [maritalStatus, setMaritalStatus] = useState('');
  const [height, setHeight] = useState('');
  const [diet, setDiet] = useState('');

  useEffect(() => {
    const firebaseConfig = {
      // Your Firebase config
    };
    initializeApp(firebaseConfig);
  }, []);

  const handleContinue = async () => {
    try {
      const profileRef = firestore().collection('ProfileFor'); // Change to your collection name
      await profileRef.add({
        maritalStatus: maritalStatus, // Replace with your state variable
        height: height, // Replace with your state variable
        diet: diet, // Replace with your state variable
      });
  
      // Navigate to the next screen (adjust 'NextScreen' to your actual screen name)
      navigation.navigate('Highest');
    } catch (error) {
      console.error('Error adding profile data:', error);
      Alert.alert('Error', 'Failed to submit. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/map.png')} style={styles.image} />

      <ProfileInfo title="Marital Status" options={maritalStatusOptions} onSelect={setMaritalStatus} />
      <ProfileInfo title="Height" options={heightOptions} onSelect={setHeight} />
      <ProfileInfo title="Diet" options={dietOptions} onSelect={setDiet} />

      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 100,
    height: 120,
    marginTop: '10%',
    borderRadius: 50,
    marginLeft: '35%',
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 1,
    top: 50,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  label: {
    fontSize: 22,
    color: 'black',
    marginBottom: '8%',
  },
  pickerContainer: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 18,
    color: 'black',
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
    borderWidth: 1,
    backgroundColor: '#0000002d',
    borderRadius: 15,
    marginBottom: 16,
    paddingHorizontal: 40,
  },
  modalItem: {
    paddingVertical: 20,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  continueButton: {
    padding: 15,
    borderRadius: 35,
    marginTop: 40,
    backgroundColor: '#34dbcd',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Status;
