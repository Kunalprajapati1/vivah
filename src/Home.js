import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Initialize Google Sign In
  const configureGoogleSignIn = async () => {
    await GoogleSignin.configure({
      webClientId: '916285535946-b8ki81edmfqfge0vlc8b4c924e3s2tmu.apps.googleusercontent.com', // Replace with your web client ID from the Firebase Console
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []); // Run the configuration only once when the component mounts

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);

      setLoading(true);

      // Sign in with Firebase using Google credentials
      const userCredential = await auth().signInWithCredential(credential);

      // Store user data in Firestore
      await storeUserDataInFirestore(userCredential.user);

      setLoading(false);

      // Navigate to the desired screen
      navigation.navigate('ProfileFor');
    } catch (error) {
      console.error('Google Sign In Error', error);
      setLoading(false);
    }
  };

  const storeUserDataInFirestore = async (user) => {
    try {
      await firestore().collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        // Add other user data as needed
      });
    } catch (error) {
      console.error('Error storing user data in Firestore', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/homebg.png')}
        style={styles.backgroundImage}
      /> */}
      <Text style={styles.topText}>Vivah</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>New to Vivah ?</Text>

        {/* Your existing code for email and mobile sign-up */}
        <TouchableOpacity onPress={() => navigation.navigate('ProfileFor')} style={styles.googleContainer}>
          <Image source={require('../assets/email.png')} style={styles.icon} />
          <Text style={styles.googleText}>Sign up with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Land')} style={styles.googleContainer}>
          <Image source={require('../assets/smartphone.png')} style={styles.icon} />
          <Text style={styles.googleText}>Sign up with Mobile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signInWithGoogle} style={styles.googleContainer}>
          <Image source={require('../assets/google.png')} style={styles.icon} />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.googleContainer}>
          <Image source={require('../assets/smartphone.png')} style={styles.icon} />
          <Text style={styles.googleText}>Login</Text>
        </TouchableOpacity> */}


        <Text onPress={() => navigation.navigate('Login')} style={{ textDecorationLine: 'underline', fontSize: 18, textAlign: 'center', color: '#000ea3', fontFamily: "Regular" }}>
          Already have an account? Log in
        </Text>

        <Modal isVisible={loading}>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="hsl(59, 82%, 65%)" />
              <Text style={styles.load}>Let's add your details for registration</Text>
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
