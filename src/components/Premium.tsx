



// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RazorpayCheckout from 'react-native-razorpay';


// const Premium = () => {
//   const [userEmail, setUserEmail] = useState('');

//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       try {
//         const email = await AsyncStorage.getItem('userEmail');
//         if (email !== null) {
//           setUserEmail(email);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user email:', error);
//       }
//     };

//     fetchUserEmail();
//   }, []);

//   const handleSubscription = (subscriptionType) => {
//     let amount, description;
//     if (subscriptionType === 'premium') {
//       amount = 9900; // Amount in paisa
//       description = 'Unlock Premium Chat';
//     } else if (subscriptionType === 'openChat') {
//       amount = 19900; // Amount in paisa
//       description = 'Open Chat Access';
//     }

//     const options = {
//       description: description,
//       // image: 'https://your-logo-url.png',
//       currency: 'INR',
//       key: '', // Your Razorpay API key
//       amount: amount,
//       name: 'Sanjog',
//       prefill: {
//         email: userEmail,
//         contact: '919999999999',
//         name: 'Customer Name'
//       },
//       theme: { color: '#007bff' }
//     };

//     RazorpayCheckout.open(options).then((data) => {
//       // Handle successful payment
//       Alert.alert('Success', `Payment Successful: ${data.razorpay_payment_id}`);
//     }).catch((error) => {
//       // Handle payment failure
//       Alert.alert('Error', `Payment Failed: ${error.code} | ${error.description}`);
//     });
//   };

//   return (
//     <ScrollView horizontal style={styles.scrollContainer}>
//       <View style={styles.optionContainer}>
//         <Image
//           source={require('../../assets/premium.png')}
//           style={styles.image}
//         />
//         <Text style={styles.heading}>Unlock Premium Chat</Text>
//         <Text style={styles.description}>
//           Elevate your experience with exclusive features! Unlock chat and contact functionality for 30 days at just ₹99 per month. Connect with up to 2 amazing individuals!
//         </Text>
//         <View style={styles.priceContainer}>
//           <Text style={styles.price}>₹</Text>
//           <Text style={styles.priceNumber}>99</Text>
//         </View>
//         <TouchableOpacity style={styles.subscribeButton} onPress={() => handleSubscription('premium')}>
//           <Text style={styles.buttonText}>Subscribe Now</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.optionContainer}>
//         <Image
//           source={require('../../assets/premium.png')}
//           style={styles.image}
//         />
//         <Text style={styles.heading}>Open Chat Access</Text>
//         <Text style={styles.description}>
//           Dive into unlimited connections! Enjoy open chat functionality and connect with up to 10 fantastic individuals for an entire month at ₹199.
//         </Text>
//         <View style={styles.priceContainer}>
//           <Text style={styles.price}>₹</Text>
//           <Text style={styles.priceNumber}>199</Text>
//         </View>
//         <TouchableOpacity style={styles.subscribeButton} onPress={() => handleSubscription('openChat')}>
//           <Text style={styles.buttonText}>Subscribe Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default Premium;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexDirection: 'row',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   optionContainer: {
//     marginRight: 20,
//     maxWidth: 300,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 15,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   description: {
//     fontSize: 14,
//     textAlign: 'justify',
//     color: '#666',
//     marginBottom: 10,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   priceNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#007bff',
//   },
//   subscribeButton: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 15,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });



import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const Premium = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email !== null) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error('Failed to fetch user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubscription = (subscriptionType) => {
    let amount, description;
    if (subscriptionType === 'premium') {
      amount = 1000; // Amount in paisa
      description = 'Unlock Premium Chat';
    } else if (subscriptionType === 'openChat') {
      amount = 19900; // Amount in paisa
      description = 'Open Chat Access';
    }

    const options = {
      description: description,
      // image: 'https://your-logo-url.png',
      currency: 'INR',
      key: 'rzp_test_UQmJWTRN9cd2Zz', // Your Razorpay API key
      amount: amount,
      name: 'Sanjog',
      prefill: {
        email: userEmail,
        contact: '919999999999',
        name: 'Customer Name'
      },
      theme: { color: '#007bff' }
    };

    RazorpayCheckout.open(options).then((data) => {
      console.log('Payment Success:', data);
      Alert.alert('Success', `Payment Successful: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      console.error('Payment Error:', error);
      Alert.alert('Error', `Payment Failed: ${error.code} | ${error.description}`);
    });
  };

  return (
    <ScrollView horizontal style={styles.scrollContainer}>
      <View style={styles.optionContainer}>
        <Image
          source={require('../../assets/premium.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>Unlock Premium Chat</Text>
        <Text style={styles.description}>
          Elevate your experience with exclusive features! Unlock chat and contact functionality for 30 days at just ₹99 per month. Connect with up to 2 amazing individuals!
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹</Text>
          <Text style={styles.priceNumber}>99</Text>
        </View>
        <TouchableOpacity style={styles.subscribeButton} onPress={() => handleSubscription('premium')}>
          <Text style={styles.buttonText}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
        <Image
          source={require('../../assets/premium.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>Open Chat Access</Text>
        <Text style={styles.description}>
          Dive into unlimited connections! Enjoy open chat functionality and connect with up to 10 fantastic individuals for an entire month at ₹199.
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹</Text>
          <Text style={styles.priceNumber}>199</Text>
        </View>
        <TouchableOpacity style={styles.subscribeButton} onPress={() => handleSubscription('openChat')}>
          <Text style={styles.buttonText}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Premium;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  optionContainer: {
    marginRight: 20,
    maxWidth: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#666',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  priceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  subscribeButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
