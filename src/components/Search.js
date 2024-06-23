





import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Search = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch random users initially
    fetchRandomUsers();
  }, []);

  const fetchRandomUsers = async () => {
    try {
      const profileForCollection = await firestore().collection('ProfileFor').get();
      const postCollection = await firestore().collection('Post').get();

      const profileForUsers = profileForCollection.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      const postUsers = postCollection.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

      const allUsers = [...profileForUsers, ...postUsers];
      const shuffledUsers = shuffleArray(allUsers);
      const initialUsers = shuffledUsers.slice(0, 5);

      setSearchResults(initialUsers);
    } catch (error) {
      console.error('Error fetching random users:', error);
    }
  };

 
  const handleSearch = async (text) => {
    try {
      // Check if text is defined before calling trim()
      const cleanedSearchTerm = text ? text.trim().toLowerCase() : '';
  
      const profileForCollection = await firestore().collection('ProfileFor').get();
      const profileForUsers = profileForCollection.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
  
      const postCollection = await firestore().collection('Post').get();
      const postUsers = postCollection.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
  
      const allUsers = [...profileForUsers, ...postUsers];
  
      const filteredUsers = allUsers.filter(user => {
        const cleanedName = (user.name || user.firstName || '').trim().toLowerCase();
        return cleanedName.includes(cleanedSearchTerm);
      });
  
      const shuffledUsers = shuffleArray(filteredUsers);
  
      setSearchResults(shuffledUsers);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  return (
    <View style={styles.container}>
    <View style={styles.searchContainer}>
            <Image
              style={styles.searchIcon}
              source={require('../assets/app_images/loupe.png')}
            />
               <TextInput
       
        placeholder="Search for users"
        onChangeText={(text) => {
          setSearchTerm(text);
          handleSearch(text);
        }}
        value={searchTerm}
      />
          </View>
           

<FlatList
  data={searchResults}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('WatchUser', { userId: item.docId })}
    >
      <View style={styles.userContainer}>
        {item.photos && item.photos.length > 0 ? (
          <Image
            source={{ uri: item.photos[0] }}
            style={styles.userImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../../assets/user.png')}
            style={styles.userImage}
            resizeMode="cover"
          />
        )}
        <View>
          <Text style={styles.usernameText}>{item.name || item.firstName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    top: 40,
  },
  input: {
    fontFamily:'Montserrat-Regular',
    borderRadius: 30,
    height: 50,

    marginBottom: 28,
    paddingHorizontal: 39,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 3,
    // borderBottomColor: '#9b0f0f',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  usernameText: {
    fontSize: 17,
    
    // letterSpacing:3,
   fontFamily:'Montserrat-SemiBold',
  },
});

export default Search;









