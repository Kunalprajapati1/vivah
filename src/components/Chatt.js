// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';

// const defaultAvatar = require('../assets/user.png');
// const Chat = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const { personData } = route.params;

//   useEffect(() => {
//     const getUserEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         setUserEmail(email || '');
//       } catch (error) {
//         console.error('Error fetching user email:', error);
//       }
//     };

//     const subscribeToMessages = () => {
//       const chatRoomId = [personData.senderId, personData.receiverId].sort().join('-');

//       const unsubscribe = firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .orderBy('createdAt', 'desc')
//         .onSnapshot((querySnapshot) => {
//           const loadedMessages = querySnapshot.docs.map((doc) => doc.data());
//           setMessages(loadedMessages);
//         });

//       return unsubscribe;
//     };

//     getUserEmail();
//     const unsubscribe = subscribeToMessages();

//     return () => {
//       // Unsubscribe when the component is unmounted
//       unsubscribe();
//     };
//   }, [personData.senderId, personData.receiverId]);
//   const onSend = async (newMessages = []) => {
//     const newMessage = newMessages[0];
  
//     if (!newMessage || !newMessage.text || !newMessage.createdAt) {
//       console.error('Invalid message format:', newMessage);
//       return;
//     }
  
//     // Ensure user object is properly structured
//     const user = newMessage.user || {};
//     const userId = user._id || 'defaultUserId';
//     const userName = user.name || 'Anonymous';
//     // Provide a default avatar URL or handle this case
  
//     try {
//       const chatRoomId = [personData.senderId, personData.receiverId].sort().join('-');
  
//       await firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .add({
//           _id: newMessage._id,
//           text: newMessage.text,
//           createdAt: newMessage.createdAt,
//           user: {
//             _id: userId,
//             name: userName,
//             avatar: defaultAvatar,
//           },
//         });
  
//       // The real-time listener will automatically update the messages state
//       console.log('Sender Email:', userEmail);
//       console.log('Receiver Email:', personData.email);
//       console.log('Message Sent:', newMessage.text);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: personData.senderId,
//         }}
//       />
//     </View>
//   );
// };

// export default Chat;



// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';

// const defaultAvatar = require('../assets/user.png');

// const Chat = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const {  personData } = route.params;

//   useEffect(() => {
//     const getUserEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         setUserEmail(email || '');
//       } catch (error) {
//         console.error('Error fetching user email:', error);
//       }
//     };

//     const subscribeToMessages = () => {
//       const chatRoomId = [userEmail,  personData.email].sort().join('-');

//       const unsubscribe = firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .orderBy('createdAt', 'desc')
//         .onSnapshot((querySnapshot) => {
//           const loadedMessages = querySnapshot.docs.map((doc) => doc.data());
//           setMessages(loadedMessages);
//         });

//       return unsubscribe;
//     };

//     getUserEmail();
//     const unsubscribe = subscribeToMessages();

//     return () => {
//       // Unsubscribe when the component is unmounted
//       unsubscribe();
//     };
//   }, [userEmail,  personData.email]);

//   const onSend = async (newMessages = []) => {
//     const newMessage = newMessages[0];

//     if (!newMessage || !newMessage.text || !newMessage.createdAt) {
//       console.error('Invalid message format:', newMessage);
//       return;
//     }

//     const user = newMessage.user || {};
//     const userId = user._id || 'defaultUserId';
//     const userName = user.name || 'Anonymous';

//     try {
//       const chatRoomId = [userEmail,  personData.email].sort().join('-');

//       await firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .add({
//           _id: newMessage._id,
//           text: newMessage.text,
//           createdAt: newMessage.createdAt,
//           user: {
//             _id: userId,
//             name: userName,
//             avatar: defaultAvatar,
//           },
//         });

//       // The real-time listener will automatically update the messages state
//       console.log('Sender Email:', userEmail);
//       console.log('Receiver Email:',  personData.email);
//       console.log('Message Sent:', newMessage.text);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: userEmail, // Assuming the sender's ID is their email for simplicity
//         }}
//       />
//     </View>
//   );
// };

// export default Chat;


// import React, { useState, useEffect } from 'react';
// import { View, Image } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';

// const Chat = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const [userAvatar, setUserAvatar] = useState(null);
//   const { personData } = route.params;
//   const defaultAvatar = require('../assets/user.png');

//   useEffect(() => {
//     const getUserEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         setUserEmail(email || '');
//       } catch (error) {
//         console.error('Error fetching user email:', error);
//       }
//     };

//     const subscribeToMessages = () => {
//       const chatRoomId = [userEmail, personData.email].sort().join('-');

//       const unsubscribe = firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .orderBy('createdAt', 'desc')
//         .onSnapshot((querySnapshot) => {
//           const loadedMessages = querySnapshot.docs.map((doc) => doc.data());
//           setMessages(loadedMessages);
//         });

//       return unsubscribe;
//     };

//     const fetchUserAvatar = async () => {
//       try {
//         const userProfileSnapshot = await firestore()
//           .collection('ProfileFor')
//           .doc(userEmail)
//           .get();

//         if (userProfileSnapshot.exists) {
//           const userData = userProfileSnapshot.data();
//           if (userData.photos && userData.photos.length > 0) {
//             setUserAvatar(userData.photos[0]); // Assuming the first photo is the avatar
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user avatar:', error);
//       }
//     };

//     getUserEmail();
//     const unsubscribeMessages = subscribeToMessages();
//     fetchUserAvatar();

//     return () => {
//       // Unsubscribe when the component is unmounted
//       unsubscribeMessages();
//     };
//   }, [userEmail, personData.email]);

//   const onSend = async (newMessages = []) => {
//     const newMessage = newMessages[0];

//     if (!newMessage || !newMessage.text || !newMessage.createdAt) {
//       console.error('Invalid message format:', newMessage);
//       return;
//     }

//     const user = newMessage.user || {};
//     const userId = user._id || 'defaultUserId';
//     const userName = user.name || 'Anonymous';

//     try {
//       const chatRoomId = [userEmail, personData.email].sort().join('-');

//       await firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .add({
//           _id: newMessage._id,
//           text: newMessage.text,
//           createdAt: newMessage.createdAt,
//           user: {
//             _id: userId,
//             name: userName,
//             avatar: userAvatar || defaultAvatar,
//           },
//         });

//       // The real-time listener will automatically update the messages state
//       console.log('Sender Email:', userEmail);
//       console.log('Receiver Email:', personData.email);
//       console.log('Message Sent:', newMessage.text);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: userEmail, // Assuming the sender's ID is their email for simplicity
//           avatar: userAvatar || defaultAvatar,
//         }}
//       />
//     </View>
//   );
// };

// export default Chat;


// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet } from 'react-native';
// import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';

// const Chat = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const [userAvatar, setUserAvatar] = useState(null);
//   const { personData } = route.params;
//   const defaultAvatar = require('../assets/user.png');

//   useEffect(() => {
//     const getUserEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         setUserEmail(email || '');
//       } catch (error) {
//         console.error('Error fetching user email:', error);
//       }
//     };
//     const subscribeToMessages = () => {
//       const chatRoomId = [userEmail, personData.email].sort().join('-');
    
//       const unsubscribe = firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .orderBy('createdAt', 'desc')
//         .onSnapshot((querySnapshot) => {
//           const loadedMessages = querySnapshot.docs.map((doc) => {
//             const data = doc.data();
//             return {
//               ...data,
//               createdAt: data.createdAt.toDate(), // Convert timestamp to Date object
//             };
//           });
//           setMessages(loadedMessages);
//         });
    
//       return unsubscribe;
//     };

//     const fetchUserAvatar = async () => {
//       try {
//         const userProfileSnapshot = await firestore()
//           .collection('ProfileFor')
//           .doc(userEmail)
//           .get();

//         if (userProfileSnapshot.exists) {
//           const userData = userProfileSnapshot.data();
//           if (userData.photos && userData.photos.length > 0) {
//             setUserAvatar(userData.photos[0]); // Assuming the first photo is the avatar
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user avatar:', error);
//       }
//     };

//     getUserEmail();
//     const unsubscribeMessages = subscribeToMessages();
//     fetchUserAvatar();

//     return () => {
//       // Unsubscribe when the component is unmounted
//       unsubscribeMessages();
//     };
//   }, [userEmail, personData.email]);

//   const onSend = async (newMessages = []) => {
//     const newMessage = newMessages[0];

//     if (!newMessage || !newMessage.text || !newMessage.createdAt) {
//       console.error('Invalid message format:', newMessage);
//       return;
//     }

//     const user = newMessage.user || {};
//     const userId = user._id || 'defaultUserId';
//     const userName = user.name || 'Anonymous';

//     try {
//       const chatRoomId = [userEmail, personData.email].sort().join('-');

//       await firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .add({
//           _id: newMessage._id,
//           text: newMessage.text,
//           createdAt: newMessage.createdAt,
//           user: {
//             _id: userId,
//             name: userName,
//             avatar: userAvatar || defaultAvatar,
//           },
//         });

//       // The real-time listener will automatically update the messages state
//       console.log('Sender Email:', userEmail);
//       console.log('Receiver Email:', personData.email);
//       console.log('Message Sent:', newMessage.text);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#2e64e5', // Sender's message background color
//           },
//           left: {
//             backgroundColor: '#e5e5e5', // Receiver's message background color
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff', // Sender's message text color
//           },
//           left: {
//             color: '#000', // Receiver's message text color
//           },
//         }}
//       />
//     );
//   };

//   const renderInputToolbar = (props) => {
//     return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
    
//   };

//   return (
//     <View style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: userEmail,
//           avatar: userAvatar || defaultAvatar,
//         }}
//         renderBubble={renderBubble}
//         renderInputToolbar={renderInputToolbar}
//         textInputStyle={styles.textInput}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#761515dd', // Chat screen background color
//   },
//   inputToolbar: {
//     backgroundColor: '#f4f4f4', // Input toolbar background color
//   },
//   textInput: {
//     color: '#000', // Text input color
//   },
// });

// export default Chat;


// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';

// const Chat = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const [userAvatar, setUserAvatar] = useState(null);
//   const [text, setText] = useState('');
//   const { personData } = route.params;
//   const defaultAvatar = require('../assets/user.png');

//   useEffect(() => {
//     const getUserEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         setUserEmail(email || '');
//       } catch (error) {
//         console.error('Error fetching user email:', error);
//       }
//     };

//     const subscribeToMessages = () => {
//       const chatRoomId = [userEmail, personData.email].sort().join('-');

//       const unsubscribe = firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .orderBy('createdAt', 'desc')
//         .onSnapshot((querySnapshot) => {
//           const loadedMessages = querySnapshot.docs.map((doc) => {
//             const data = doc.data();
//             return {
//               ...data,
//               createdAt: data.createdAt.toDate(),
//             };
//           });
//           setMessages(loadedMessages);
//         });

//       return unsubscribe;
//     };

//     const fetchUserAvatar = async () => {
//       try {
//         const userProfileSnapshot = await firestore()
//           .collection('ProfileFor')
//           .doc(userEmail)
//           .get();

//         if (userProfileSnapshot.exists) {
//           const userData = userProfileSnapshot.data();
//           if (userData.photos && userData.photos.length > 0) {
//             setUserAvatar(userData.photos[0]);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user avatar:', error);
//       }
//     };

//     getUserEmail();
//     const unsubscribeMessages = subscribeToMessages();
//     fetchUserAvatar();

//     return () => {
//       unsubscribeMessages();
//     };
//   }, [userEmail, personData.email]);

//   const onSend = async (newMessages = []) => {
//     const newMessage = newMessages[0];

//     if (!newMessage || !newMessage.text || !newMessage.createdAt) {
//       console.error('Invalid message format:', newMessage);
//       return;
//     }

//     const user = newMessage.user || {};
//     const userId = user._id || 'defaultUserId';
//     const userName = user.name || 'Anonymous';

//     try {
//       const chatRoomId = [userEmail, personData.email].sort().join('-');

//       await firestore()
//         .collection('chats')
//         .doc(chatRoomId)
//         .collection('messages')
//         .add({
//           _id: newMessage._id,
//           text: newMessage.text,
//           createdAt: newMessage.createdAt,
//           user: {
//             _id: userId,
//             name: userName,
//             avatar: userAvatar || defaultAvatar,
//           },
//         });

//       setText(''); // Clear the text input after sending

//       console.log('Sender Email:', userEmail);
//       console.log('Receiver Email:', personData.email);
//       console.log('Message Sent:', newMessage.text);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#2e64e5',
//           },
//           left: {
//             backgroundColor: '#e5e5e5',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//           left: {
//             color: '#000',
//           },
//         }}
//       />
//     );
//   };

//   const renderInputToolbar = (props) => {
//     return (
//       <InputToolbar
//         {...props}
//         containerStyle={styles.inputToolbar}
//         primaryStyle={{ alignItems: 'center' }}
//       >
//         <TouchableOpacity
//           style={styles.sendButtonContainer}
//           onPress={() => props.onSend({ text: props.text })}
//         >
//           <Image
//             source={require('../assets/msg.png')}
//             style={styles.sendButtonIcon}
//           />
//         </TouchableOpacity>
//       </InputToolbar>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: userEmail,
//           avatar: userAvatar || defaultAvatar,
//         }}
//         renderBubble={renderBubble}
//         renderInputToolbar={renderInputToolbar}
//         textInputStyle={styles.textInput}
//         text={text}
//         onInputTextChanged={(inputText) => setText(inputText)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#761515dd',
//   },
//   inputToolbar: {
//     backgroundColor: '#f4f4f4',
//   },
//   textInput: {
//     color: '#000',
//   },
//   sendButtonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   sendButtonIcon: {
//     width: 24,
//     height: 24,
//     bottom:10,
//     right:30,
//     tintColor: '#761515dd',
//   },
// });

// export default Chat;



import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [userBackgroundColor, setUserBackgroundColor] = useState('#761515dd');
  const [text, setText] = useState('');
  const [colorChangeModalVisible, setColorChangeModalVisible] = useState(false);
  const { personData } = route.params;
  const defaultAvatar = require('../../assets/user.png');

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setUserEmail(email || '');
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    const subscribeToMessages = () => {
      const chatRoomId = [userEmail, personData.email].sort().join('-');

      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatRoomId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const loadedMessages = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              createdAt: data.createdAt.toDate(),
            };
          });
          setMessages(loadedMessages);
        });

      return unsubscribe;
    };

    const fetchUserAvatar = async () => {
      try {
        const userProfileSnapshot = await firestore()
          .collection('Post')
          .doc(userEmail)
          .get();

        if (userProfileSnapshot.exists) {
          const userData = userProfileSnapshot.data();
          if (userData.photos && userData.photos.length > 0) {
            setUserAvatar(userData.photos[0]);
          }
        } 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

   

    getUserEmail();
    const unsubscribeMessages = subscribeToMessages();
    fetchUserAvatar();

    return () => {
      unsubscribeMessages();
    };
  }, [userEmail, personData.email]);

  const onSend = async (newMessages = []) => {
    const newMessage = newMessages[0];

    if (!newMessage || !newMessage.text || !newMessage.createdAt) {
      console.error('Invalid message format:', newMessage);
      return;
    }

    const user = newMessage.user || {};
    const userId = user._id || 'defaultUserId';
    const userName = user.name || 'Anonymous';

    try {
      const chatRoomId = [userEmail, personData.email].sort().join('-');

      const messageRef = await firestore()
        .collection('chats')
        .doc(chatRoomId)
        .collection('messages')
        .add({
          _id: newMessage._id,
          text: newMessage.text,
          createdAt: newMessage.createdAt,
          user: {
            _id: userId,
            name: userName,
            avatar: userAvatar || defaultAvatar,
          },
          sent: true,
          received: false,
          seen: false,
        });

      await messageRef.update({
        received: true,
      });

      // Simulate a delay before updating the seen status (replace this with actual logic)
      await new Promise(resolve => setTimeout(resolve, 3000));

      await messageRef.update({
        seen: true,
      });

      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderBubble = (props) => {
    const { currentMessage } = props;

    let tickIcon = null;

    if (currentMessage.user._id === userEmail) {
      tickIcon = currentMessage.seen ? (
        <Icon name="done-all" size={16} color="#FFD700" style={{ marginLeft: 5 }} />
      ) : (
        <Icon name="done" size={16} color="#fff" style={{ marginLeft: 5 }} />
      );
    } else {
      tickIcon = currentMessage.received ? (
        <Icon name="done-all" size={16} color="#FFD700" style={{ marginLeft: 5 }} />
      ) : (
        <Icon name="done" size={16} color="#000" style={{ marginLeft: 5 }} />
      );
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: userBackgroundColor,
          },
          left: {
            backgroundColor: '#e5e5e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#000',
          },
        }}
      >
        {tickIcon}
      </Bubble>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={{ alignItems: 'center' }}
      >
        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={() => props.onSend({ text: props.text })}
        >
          <Image
            source={require('../../assets/msg.png')}
            style={styles.sendButtonIcon}
          />
        </TouchableOpacity>
      </InputToolbar>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: userBackgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userEmail,
          avatar: userAvatar || defaultAvatar,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        textInputStyle={styles.textInput}
        text={text}
        onInputTextChanged={(inputText) => setText(inputText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#761515dd',
  },
  inputToolbar: {
    backgroundColor: '#f4f4f4',
  },
  textInput: {
    color: '#000',
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonIcon: {
    width: 24,
    height: 24,
    bottom: 10,
    right: 30,
    tintColor: '#761515dd',
  },
});

export default Chat;

