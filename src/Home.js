
// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Modal from 'react-native-modal';
// import Sound from 'react-native-sound';

// const Home = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [sound, setSound] = useState(null);

//   useEffect(() => {
//     // Enable playback in silence mode
//     Sound.setCategory('Playback');

//     // Load the sound file
//     const soundInstance = new Sound(require('./assets/Sound/mumbai_cha_raja.mp3'), (error) => {
//       if (error) {
//         console.log('Failed to load the sound', error);
//         return;
//       }
//       // Save the sound instance to the state
//       setSound(soundInstance);
//     });

//     // Show alert when the component mounts
//     Alert.alert(
//       'Welcome to Sanjog',
//       'Welcome to Sanjog, your trusted matrimonial platform. We will now play a Ganpati song that brings goodness and positivity as you start your journey with us.\n\nSanjog offers two registration options:\n\n- Register as yourself: Create a personal profile to find your perfect match.\n- Register as parents: Create a profile for your child and actively participate in finding a suitable match for them.\n\nPlease select the appropriate option and enjoy the Ganpati song while you register.',
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             soundInstance.play((success) => {
//               if (!success) {
//                 console.log('Sound playback failed due to audio decoding errors');
//               }
//             });
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//     // Cleanup function to stop the sound when the component unmounts
//     return () => {
//       if (soundInstance) {
//         soundInstance.stop(() => {
//           soundInstance.release();
//         });
//       }
//     };
//   }, []);

//   const stopSoundAndNavigate = (route) => {
//     if (sound) {
//       sound.stop(() => {
//         sound.release();
//       });
//     }
//     navigation.navigate(route);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <View style={{ marginBottom: 30 }}>
//           <Image
//             style={{ width: 450, height: 400 }}
//             source={require('./assets/app_images/q.png')}
//           />
//           <View style={{ alignContent: 'center', marginTop: 0 }}>
//             <Text style={styles.titleText}>Sanjog</Text>
//             <View style={{ alignContent: 'center', marginTop: 30 }}>
//               <Text style={styles.subtitleText}>
//                 Start Your Sanyog Journey by making a new Account
//               </Text>
//             </View>
//           </View>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               onPress={() => stopSoundAndNavigate('ProfileFor')}
//               style={styles.button}
//             >
//               <Image
//                 source={require('./../assets/email.png')}
//                 style={styles.buttonIcon}
//               />
//               <Text style={styles.buttonText}>Register Yourself</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => stopSoundAndNavigate('Bicholia')}
//               style={styles.button}
//             >
//               <Image
//                 source={require('./../assets/email.png')}
//                 style={styles.buttonIcon}
//               />
//               <Text style={styles.buttonText}>Register As Parents</Text>
//             </TouchableOpacity>
//             <Text
//               onPress={() => stopSoundAndNavigate('Login')}
//               style={styles.loginText}
//             >
//               Already have an account? Log in
//             </Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.contentContainer}>
//         <Modal isVisible={loading}>
//           <View style={styles.loadingContainer}>
//             <View style={styles.loadingContent}>
//               <ActivityIndicator size="large" color="hsl(59, 82%, 65%)" />
//               <Text style={styles.loadingText}>
//                 Let's add your details for registration
//               </Text>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     backgroundColor: '#f79595',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   titleText: {
//     fontFamily: 'DMSerifDisplay-Regular',
//     fontSize: 90,
//     textAlign: 'center',
//     color: 'white',
//   },
//   subtitleText: {
//     fontSize: 15,
//     fontFamily: 'Montserrat-SemiBold',
//     color: '#fffffff7',
//     textAlign: 'center',
//     paddingHorizontal: 70,
//   },
//   buttonContainer: {
//     textAlign: 'center',
//     paddingHorizontal: 40,
//     alignItems: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     width: '85%',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 25,
//     marginBottom: 20,
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   buttonIcon: {
//     width: 30,
//     height: 30,
//     margin: 10,
//     marginLeft: 30,
//     tintColor: '#e41310',
//   },
//   buttonText: {
//     flex: 1,
//     color: '#ef6f6f',
//     fontSize: 18,
//     paddingHorizontal: 20,
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   loginText: {
//     textDecorationLine: 'underline',
//     fontSize: 18,
//     marginTop: 10,
//     textAlign: 'center',
//     color: '#de201d',
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   contentContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingContent: {
//     backgroundColor: '#fff',
//     top: '40%',
//     padding: 20,
//     fontSize: 48,
//     borderTopRightRadius: 60,
//     borderTopLeftRadius: 60,
//     width: '120%',
//     height: '70%',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 30,
//     textAlign: 'center',
//     color: 'black',
//     top: '10%',
//   },
// });

// export default Home;




import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file
    const soundInstance = new Sound(require('./assets/Sound/mumbai_cha_raja.mp3'), (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Save the sound instance to the state
      setSound(soundInstance);
    });

    // Cleanup function to stop the sound when the component unmounts
    return () => {
      if (soundInstance) {
        soundInstance.stop(() => {
          soundInstance.release();
        });
      }
    };
  }, []);

  const playSoundAndCloseModal = () => {
    if (sound) {
      sound.play((success) => {
        if (!success) {
          console.log('Sound playback failed due to audio decoding errors');
        }
      });
    }
    setModalVisible(false);
  };

  const stopSoundAndNavigate = (route) => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }
    navigation.navigate(route);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Image
            style={{ width: 450, height: 400 }}
            source={require('./assets/app_images/q.png')}
          />
          <View style={{ alignContent: 'center', marginTop: 0 }}>
            <Text style={styles.titleText}>Sanjog</Text>
            <View style={{ alignContent: 'center', marginTop: 30 }}>
              <Text style={styles.subtitleText}>
                Start Your Sanyog Journey by making a new Account
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => stopSoundAndNavigate('ProfileFor')}
              style={styles.button}
            >
              <Image
                source={require('./../assets/email.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Register Yourself</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stopSoundAndNavigate('Bicholia')}
              style={styles.button}
            >
              <Image
                source={require('./../assets/email.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Register As Parents</Text>
            </TouchableOpacity>
            <Text
              onPress={() => stopSoundAndNavigate('Login')}
              style={styles.loginText}
            >
              Already have an account? Log in
            </Text>
          </View>
        </View>
      </View>


      <Modal isVisible={isModalVisible} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Welcome to Sanjog</Text>
          {/* <Text style={styles.modalText}>
            Welcome to Sanjog, your trusted matrimonial platform.
          </Text> */}
          <Text style={styles.modalText2}>
          We will now play a Ganpati song that brings goodness and positivity as you start your journey with us.
          </Text>
     
          {/* <Text style={styles.modalText}>
            Sanjog offers two registration options:
          </Text>
          <Text style={styles.modalText}>
            - Register as yourself: Create a personal profile to find your perfect match.
          </Text>
          <Text style={styles.modalText}>
            - Register as parents: Create a profile for your child and actively participate in finding a suitable match for them.
          </Text> */}
          <Text style={styles.modalText}>
            Please select the appropriate option and enjoy the Ganpati song while you register.
          </Text>
          <TouchableOpacity
            onPress={playSoundAndCloseModal}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#f79595',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: 'Montserrat-SemiBold',
  },
  titleText: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 90,
    textAlign: 'center',
    color: 'white',
  },
  subtitleText: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fffffff7',
    textAlign: 'center',
    paddingHorizontal: 70,
  },
  buttonContainer: {
    textAlign: 'center',
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 30,
    tintColor: '#e41310',
  },
  buttonText: {
    flex: 1,
    color: '#ef6f6f',
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  loginText: {
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    color: '#de201d',
    fontFamily: 'Montserrat-SemiBold',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#fff',
    top: '40%',
    padding: 20,
    fontSize: 48,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    width: '120%',
    height: '70%',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    top: '10%',
  },
  modalContainer: {
  top:30,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    justifyContent:'space-evenly',
borderTopRightRadius:100,
borderTopLeftRadius:110,

    height: '60%',
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 10,
    width: '130%',
    alignItems: 'center',
  },
  modalTitle: {
    textDecorationLine:'underline',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: 24,
    
    marginBottom: 10,
  },
  modalText: {
    
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText2: {
    textDecorationLine:'underline',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal:100,
    borderRadius: 35,
    marginTop: 20,
    
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;











