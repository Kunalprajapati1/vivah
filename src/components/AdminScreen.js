import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const AdminScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleManageUsers = () => {
    // Implement functionality to manage users (e.g., view, edit, delete)
    // This could navigate to a separate screen for user management
    navigation.navigate('ManageUser');
  };

  const handleManageSettings = () => {
    // Implement functionality to manage app settings
    // This could navigate to a screen for changing app configurations
  };

  const handleAddUser = () => {
    // Navigate to the AddUser page for adding a new user
    navigation.navigate('AddUser');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={handleManageUsers}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleManageSettings}>
        <Text style={styles.buttonText}>Manage Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e05654',
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#e05654',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#e05654',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default AdminScreen;
