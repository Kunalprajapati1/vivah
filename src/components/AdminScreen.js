import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ProfileFor') // Use the correct collection name
      .onSnapshot((querySnapshot) => {
        const userList = [];
        querySnapshot.forEach((documentSnapshot) => {
          userList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setUsers(userList);
      });

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await firestore().collection('ProfileForCommunity').doc(userId).delete();

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setExpandedUserId(null);

      Alert.alert('User Deleted', 'The user has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete the user. Please try again.');
    }
  };

  const handleToggleDetails = (userId) => {
    setExpandedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{`User ID: ${item.id}`}</Text>
            <Text>{`First Name: ${item.firstName}`}</Text>
            <Text>{`Last Name: ${item.lastName}`}</Text>
            <Text>{`Email: ${item.email}`}</Text>
            <Text>{`Mobile Number: ${item.mobileNumber}`}</Text>

            {expandedUserId === item.id ? (
              // Show all details if expanded
              <View>
                <Text>{`College Name: ${item.collegeName}`}</Text>
                <Text>{`Date of Birth: ${item.dayOfBirth}-${item.monthOfBirth}-${item.yearOfBirth}`}</Text>
                <Text>{`Diet: ${item.diet}`}</Text>
                <Text>{`Height: ${item.height}`}</Text>
                {/* Add more details as needed */}
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => handleToggleDetails(item.id)}
            >
              <Text style={styles.showMoreButtonText}>
                {expandedUserId === item.id ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete User</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  showMoreButton: {
    marginTop: 8,
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
  },
  showMoreButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default AdminScreen;
