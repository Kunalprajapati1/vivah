import React, { useState,useEffect } from 'react';
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
const MyComponent = ({navigation}) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSubCommunity, setSelectedSubCommunity] = useState('');
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const handleContinue = async () => {
    if (!selectedSubCommunity) {
      Alert.alert('Incomplete Information', 'Please select a gender.');
    } else {
      try {
        const profileForRef = firestore().collection('ProfileFor');
        await profileForRef.add({
          selectedState: selectedState,
          selectedCity: selectedCity,
          selectedSubCommunity: selectedSubCommunity,
        });
  
        // Navigate to 'Status' without showing an alert
        navigation.navigate('Status');
      } catch (error) {
        console.error('Error adding profile data:', error);
        Alert.alert('Error', 'Failed to submit. Please try again.');
      }
    }
  };
  
  useEffect(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyAAvxsDg18a7O7bVnc_JHFGoX8J3Bo18ZM",
        authDomain: 'vivah-57f3a.firebaseapp.com',
        projectId: "vivah-57f3a",
        storageBucket: "vivah-57f3a.appspot.com",
        messagingSenderId: '916285535946',
        appId: "1:916285535946:android:25db1a55a9bcf1dd916633",
      };
    initializeApp(firebaseConfig);
  }, []);

  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Out of India',
  ];

  const citiesData = {
    'Andhra Pradesh': ['City AP1', 'City AP2', 'City AP3'],
    'Arunachal Pradesh': ['City AR1', 'City AR2', 'City AR3'],
    'Assam': ['City AS1', 'City AS2', 'City AS3'],
    // ... (cities for other states)
    'Out of India': ['Select City'],
  };

  const cities = citiesData[selectedState] || ['Select City'];

  const handleStateChange = (itemValue) => {
    setSelectedState(itemValue);
    setSelectedCity('');
    setIsStateModalVisible(false);
  };

  const handleCityChange = (itemValue) => {
    setSelectedCity(itemValue);
    setIsCityModalVisible(false);
  };

  const filterStates = () => {
    return indianStates.filter((state) =>
      state.toLowerCase().includes(stateSearch.toLowerCase())
    );
  };

  const filterCities = () => {
    return cities.filter((city) =>
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  };
  const isContinueDisabled = !selectedState || !selectedCity;

  const renderStateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleStateChange(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleCityChange(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* State Input Section */}
      <Image
        source={require('../assets/map.png')}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select State:</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setIsStateModalVisible(true)}
        >
          <Text style={styles.pickerText}>
            {selectedState || 'Select State'}
          </Text>
          {/* <Ionicons name="chevron-down" size={20} color="black" /> */}
        </TouchableOpacity>
      </View>

      {/* City Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select City:</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setIsCityModalVisible(true)}
        >
          <Text style={styles.pickerText}>
            {selectedCity || 'Select City'}
          </Text>
          {/* <Ionicons name="chevron-down" size={20} color="black" /> */}
        </TouchableOpacity>
      </View>

      {/* Sub-community Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Sub-community:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedSubCommunity}
          onValueChange={(itemValue) => setSelectedSubCommunity(itemValue)}
        >
          <Picker.Item label="Select Sub-community" value="" />
          <Picker.Item label="Prajapati" value="Prajapati" />
          <Picker.Item label="Kumhar" value="Kumhar" />
        </Picker>
      </View>
      <TouchableOpacity
       onPress={handleContinue}
        style={[styles.continueButton, { backgroundColor: isContinueDisabled ? '#95a5a6' : '#34dbcd' }]}
        disabled={isContinueDisabled}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      {/* State Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isStateModalVisible}
        onRequestClose={() => setIsStateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search State"
              onChangeText={(text) => setStateSearch(text)}
            />
            <FlatList
              data={filterStates()}
              renderItem={renderStateItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* City Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isCityModalVisible}
        onRequestClose={() => setIsCityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search City"
              onChangeText={(text) => setCitySearch(text)}
            />
            <FlatList
              data={filterCities()}
              renderItem={renderCityItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 1,
    top:50,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical:20,

    flexDirection: 'column',
  },
  image:{
    width: 100,
    height: 120,
    marginTop:'10%',
    borderRadius: 50,

    marginLeft:'35%',


  },
  continueButton: {
    padding: 15,
    borderRadius: 35,
    marginTop: '15%',
    width:'80%',
    marginLeft:'9%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 22,
    color:'black',
    marginBottom:'8%',
  
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
    color:'black',
    
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
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
    marginTop:'40%',
  
  },
  searchInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor:'#0000002d',
    borderRadius: 15,
    marginBottom: 16,
    paddingHorizontal: 40,
  },
  modalItem: {
    paddingVertical: 20,
    color:'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default MyComponent;
