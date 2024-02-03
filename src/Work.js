import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Modal, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Work = ({navigation,route}) => {
  const { uniqueId } = route.params;
  const [workWith, setWorkWith] = useState('');
  const [workAs, setWorkAs] = useState('');
  const [isWorkWithModalVisible, setIsWorkWithModalVisible] = useState(false);
  const [isWorkAsModalVisible, setIsWorkAsModalVisible] = useState(false);
  const [workWithSearchText, setWorkWithSearchText] = useState('');
  const [workAsSearchText, setWorkAsSearchText] = useState('');
  const [workWithOtherDetails, setWorkWithOtherDetails] = useState('');
  const [workAsOtherDetails, setWorkAsOtherDetails] = useState('');
  const [profileCreated, setProfileCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  // const navigation = useNavigation();

  const workWithOptions = ['Private', 'Government', 'Defence', 'Business', 'Not Working', 'Others'];
  const workAsOptions = [
    'Manager', 'Engineer', 'Doctor', 'Teacher', 'Artist', 'Accountant', 'Software Developer', 'Designer', 'Chef', 'Police Officer', 'Nurse', 'Sales Representative', 'Marketing Specialist', 'Consultant', 'Entrepreneur', 'Other'
  ];

  const filteredWorkWithOptions = workWithOptions.filter(option =>
    option.toLowerCase().includes(workWithSearchText.toLowerCase())
  );

  const filteredWorkAsOptions = workAsOptions.filter(option =>
    option.toLowerCase().includes(workAsSearchText.toLowerCase())
  );

  const handleWorkWithPress = (item) => {
    setWorkWith(item);
    setWorkWithOtherDetails(''); // Reset other details when a new option is selected
    setIsWorkWithModalVisible(false);
  };

  const handleWorkAsPress = (item) => {
    setWorkAs(item);
    setWorkAsOtherDetails(''); // Reset other details when a new option is selected
    setIsWorkAsModalVisible(false);
  };

  const renderWorkWithItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleWorkWithPress(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderWorkAsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleWorkAsPress(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const firebaseConfig = {
      // Your Firebase config
    };
    initializeApp(firebaseConfig);
  }, []);

  const handleCreateProfile = async () => {
    setLoading(true);
  
    try {
      const addWorkDataFunction = firestore().collection('ProfileFor');
      await addWorkDataFunction.doc(uniqueId).update({
        workWith: workWith,
        workAs: workAs,
        workWithOtherDetails: workWithOtherDetails,
        workAsOtherDetails: workAsOtherDetails,
      });
  
      setProfileCreated(true);
  
      // Navigate to the home page after the data has been updated
      navigation.navigate('Data', { uniqueId});
    } catch (error) {
      console.error('Error calling addWorkData function:', error);
      // Handle error scenario
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/work.png')} style={styles.image} />
      <Text style={styles.head}>You are almost done!</Text>
      <Text style={styles.title}>Work Information:</Text>

      {/* You work with */}
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsWorkWithModalVisible(true)}
      >
        <Text style={styles.pickerText}>{workWith || 'Select Work With'}</Text>
      </TouchableOpacity>

      {/* Additional input for Work With Others */}
      {workWith === 'Others' && (
        <TextInput
          style={styles.additionalInput}
          placeholder="Enter Other Details"
          value={workWithOtherDetails}
          onChangeText={(text) => setWorkWithOtherDetails(text)}
        />
      )}

      {/* Conditional rendering based on the selected value of "Work With" */}
      {workWith !== 'Not Working' && (
        <>
          {/* You work as */}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setIsWorkAsModalVisible(true)}
          >
            <Text style={styles.pickerText}>{workAs || 'Select Work As'}</Text>
          </TouchableOpacity>

          {/* Additional input for Work As Others */}
          {workAs === 'Other' && (
            <TextInput
              style={styles.additionalInput}
              placeholder="Enter Other Details"
              value={workAsOtherDetails}
              onChangeText={(text) => setWorkAsOtherDetails(text)}
            />
          )}
        </>
      )}

      {/* Custom Modal for You work with */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isWorkWithModalVisible}
        onRequestClose={() => setIsWorkWithModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Work With"
              value={workWithSearchText}
              onChangeText={(text) => setWorkWithSearchText(text)}
            />
            <FlatList
              data={filteredWorkWithOptions}
              renderItem={renderWorkWithItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Custom Modal for You work as */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isWorkAsModalVisible}
        onRequestClose={() => setIsWorkAsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Work As"
              value={workAsSearchText}
              onChangeText={(text) => setWorkAsSearchText(text)}
            />
            <FlatList
              data={filteredWorkAsOptions}
              renderItem={renderWorkAsItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#34dbcd" />
      ) : (
        // Conditional rendering based on profileCreated state
        profileCreated ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Profile Created</Text>
            <Image source={require('../assets/checked.png')} style={styles.successImage} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleCreateProfile}
            style={[styles.createProfileButton, { backgroundColor: workWith ? '#34dbcd' : '#95a5a6' }]}
            disabled={!workWith }
          >
            <Text style={styles.createProfileButtonText}>Create Profile</Text>
          </TouchableOpacity>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  head: {
    textAlign: "center",
    fontSize: 21,
    color: "black",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
    marginTop: '5%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 36,
    color: 'black',
    marginLeft: '7%',
  },
  pickerContainer: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    borderColor: '#000000bb',
    borderWidth: 1,
    marginBottom: 26,
    marginLeft: '3%',
  },
  pickerText: {
    fontSize: 18,
    color: '#000000',
    marginHorizontal: 20,
  },
  additionalInput: {
    height: 60,
    borderWidth: 1,
    fontSize: 18,
    color: '#000000',
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    borderColor: '#000000bb',
    borderWidth: 1,
    marginBottom: 26,
    marginLeft: '3%',
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
    color: 'white',
  },
  modalItem: {
    paddingVertical: 20,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  createProfileButton: {
    backgroundColor: '#34dbcd',
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createProfileButtonText: {
    fontSize: 18,
    color: 'white',
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    fontSize: 18,
    color: '#34dbcd',
    marginBottom: 10,
  },
  successImage: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Work;
