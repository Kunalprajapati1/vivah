// import { Image, StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Premium = () => {
//   return (
//    <>
//    <View style={{ backgroundColor:'#181b26f7', height:'100%', justifyContent:'center'  }}>
//    <View style={{marginLeft:'10%' , top:30, width:70, height:70, marginTop:'0%',}}>
//         <Image
//           source={require('../assets/app_images/star.png')} // Replace with the actual path to your image
//           style={{ tintColor:'#dfb7b7', width:70, height:70}} // Define the styles for your image
//         />
//         <Image
//           source={require('../assets/app_images/star.png')} // Replace with the actual path to your image
//           style={{ tintColor:'#dfb7b7', width:30, height:30}} // Define the styles for your image
//         />
//         </View>
//       <Text style={{ marginTop:30, fontFamily:'Montserrat-Regular', fontSize:50, color:'#d84d5b', textAlign:'center', alignItems:'center', justifyContent:'center' }}>Premium Features</Text>
//       <Text style={{ textAlign:'center', marginTop:10, color:'#ffffad',fontFamily:'Montserrat-Regular',  }}>Coming Soon</Text>
//     </View>
   
//    </>
//   )
// }

// export default Premium

// const styles = StyleSheet.create({})



import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

const Premium = () => {

  const initiatePayment = (subscriptionType, amount) => {
    const upiId = '919310079927@paytm'; // Your UPI ID
    const brandName = 'Sanjog'; // Your brand name

    const paymentUrl = `upi://pay?pa=${upiId}&pn=${brandName}&am=${amount}&cu=INR`;
    Linking.openURL(paymentUrl)
    .then((res) => {
      // Payment app opened successfully
    })
    .catch((err) => {
      console.error('Error opening UPI:', err);
      // Handle error (e.g., UPI app not installed)
      alert('Error opening UPI');
    });
  };

  const handleSubscription = async (subscriptionType) => {
    try {
      let amount, description;
      if (subscriptionType === 'premium') {
        amount = 99.0;
        description = 'Unlock Premium Chat';
      } else if (subscriptionType === 'openChat') {
        amount = 199.0;
        description = 'Open Chat Access';
      }

      // Launch UPI transaction
      await initiatePayment(subscriptionType, amount);
    } catch (error) {
      console.error('Error launching UPI transaction:', error);
      alert('Error launching UPI transaction');
    }
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
    paddingHorizontal: 10, // Adjust this based on your needs
  },
  optionContainer: {
    marginRight: 20,
    maxWidth: 300, // Adjust this based on your needs
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
    color: '#333', // Adjust color based on your design
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
  // Add more styles for additional components
});
