import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthUser = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userCollection = await auth().listUsers(1000); // Limit to 1000 users, adjust as needed

        const users = userCollection.users.map((userRecord) => userRecord.toJSON());
        setUserList(users);
      } catch (error) {
        console.error('Error fetching user list:', error.message);
      }
    };

    fetchUserList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={userList}
        keyExtractor={(user) => user.uid}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>Email: {item.email}</Text>
            <Text>UID: {item.uid}</Text>
            <Text>Created: {item.metadata.creationTime}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    marginBottom: 16,
  },
});

export default AuthUser;
