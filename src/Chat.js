import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chatt = ({ route }) => {
  const { personData } = route.params;
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchLoggedInUserDetails = async () => {
      try {
        // Fetch the logged-in user's email from AsyncStorage
        const loggedInUserEmail = await AsyncStorage.getItem('userEmail');

        // Use the email as user details
        setUserDetails({
          _id: 1, // Assuming some user ID for the logged-in user
          name: 'Logged In User', // You can replace with the actual user name
          email: loggedInUserEmail,
        });
      } catch (error) {
        console.error('Error fetching logged-in user details:', error.message);
      }
    };

    fetchLoggedInUserDetails();
  }, []);

  const onSend = (newMessages = []) => {
    // Handle sending messages and updating the state
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={userDetails}
    />
  );
};

export default Chatt;
