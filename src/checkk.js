import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const navigateToPage = async (pageName) => {
    try {
      setLoading(true);

      // Simulate some asynchronous task (e.g., API request)
      await someAsyncTask();

      // After the task is done, navigate to the 'ProfileFor' screen
      navigation.navigate(pageName);
    } finally {
      setLoading(false);
    }
  };

  const someAsyncTask = () => {
    return new Promise((resolve) => {
      // Simulate an asynchronous task (e.g., API request)
      setTimeout(resolve, 2000); // Adjust the delay as needed
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/homebg.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.topText}>Sanjog</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>New to Sanjog ?</Text>

        <TouchableOpacity onPress={() => navigateToPage('ProfileFor')} style={styles.googleContainer}>
          <Image source={require('../assets/email.png')} style={styles.icon} />
          <Text style={styles.googleText}>Sign up with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToPage('Land')} style={styles.googleContainer}>
          <Image source={require('../assets/smartphone.png')} style={styles.icon} />
          <Text style={styles.googleText}>Sign up with Mobile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToPage('Land')} style={styles.googleContainer}>
          <Image source={require('../assets/google.png')} style={styles.icon} />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>
        
        <Text style={{ textDecorationLine: 'underline', fontSize: 18, textAlign: 'center', color: '#000ea3', fontFamily: "Regular" }}>
          Already have an account? Log in
        </Text>

        <Modal isVisible={loading}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="100px" color="hsl(59, 82%, 65%)" />
            <Text style={styles.load} >Let's add your details for registration</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', // Align content at the bottom
  },
  backgroundImage: {
    flex: 1,
    width: '110%',
    height: '120%',
    position: 'absolute',
  },
  topText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center',
   bottom:'40%',
   
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20, // Added padding to lift content off the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft:'32%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 25,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height:30,
    margin: 10,
  marginLeft:30,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
   fontSize:18,
    paddingHorizontal: 50,
    fontWeight:'bold',
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 25,
    marginBottom: 20,
  },
  googleText: {
    flex: 1,
    fontSize:18,
    paddingHorizontal: 20,
    fontWeight:'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#fff',
    top:'40%',
    padding: 20,
    fontSize:48,
    borderTopRightRadius:60,
borderTopLeftRadius:60,
  width:'120%',
  height:'70%',
    alignItems: 'center',
  },
  load:{
fontSize:30,
textAlign:'center',
// // backgroundColor:'white',
color:'black',
top:'10%',
// borderTopRightRadius:60,
// borderTopLeftRadius:60,
// width:'120%',
// height:'70%',

  },
});

export default Home;
