import React, { useState,useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView, Image,BackHandler,ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const About = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack(); // Navigate to the previous page
      return true; // Prevent default behavior (closing the app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/app_images/logo.png')}
        style={styles.logo}
        
      />
      <Text style={styles.heading}>Welcome to Sanjog</Text>
      <Text style={styles.text}>
        Sanjog is a modern matrimonial app designed exclusively for the Prajapati caste. Our mission is to help you find your life partner within your community, with a focus on compatibility, privacy, and community engagement.
      </Text>
      <Text style={styles.subHeading}>Key Features</Text>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Detailed Profiles</Text>
        <Text style={styles.featureText}>
          View detailed profiles of other members, including information about their education, profession, family background, and more.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Advanced Search</Text>
        <Text style={styles.featureText}>
          Use our advanced search filters to find matches based on criteria such as age, education, location, and more.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Connection Requests</Text>
        <Text style={styles.featureText}>
          Send connection requests to members you are interested in. Once accepted, you can start communicating with each other.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Privacy Controls</Text>
        <Text style={styles.featureText}>
          Control who can view your profile and contact you. We prioritize the privacy and security of your data.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Verified Profiles</Text>
        <Text style={styles.featureText}>
          All profiles are verified to ensure authenticity and prevent fake accounts.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Community Forums</Text>
        <Text style={styles.featureText}>
          Engage with the community through forums, discussions, and events related to the Prajapati caste.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Parent Profiles</Text>
        <Text style={styles.featureText}>
          Parents can create profiles on behalf of their children to find suitable matches.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Customization</Text>
        <Text style={styles.featureText}>
          Customize your profile to highlight your personality, interests, and preferences.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Mobile App</Text>
        <Text style={styles.featureText}>
          Access Sanjog anytime, anywhere with our mobile app for iOS and Android devices.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Matchmaking Algorithm</Text>
        <Text style={styles.featureText}>
          Our advanced matchmaking algorithm uses machine learning to suggest compatible matches based on your profile and preferences.
        </Text>
      </View>
      <View style={styles.feature}>
        <Text style={styles.featureTitle}>Customer Support</Text>
        <Text style={styles.featureText}>
          Our customer support team is available 24/7 to assist you with any questions or issues you may have.
        </Text>
      </View>
      <Text style={styles.subHeading}>Why Choose Sanjog?</Text>
      <Text style={styles.text}>
        - **Exclusive Community**: Sanjog is tailored specifically for the Prajapati caste, ensuring that you can find matches within your community who share your values and beliefs.
        {'\n\n'}
        - **Efficient Matchmaking**: With advanced search filters and detailed profiles, Sanjog makes it easy for you to find compatible partners based on your preferences and requirements.
        {'\n\n'}
        - **Safe and Secure**: Sanjog prioritizes the safety and security of your data, with strict verification processes and privacy settings to protect your personal information.
        {'\n\n'}
        - **Community Engagement**: Sanjog encourages community engagement through its forums, events, and social features, helping you build meaningful connections beyond just matchmaking.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    bottom:50,

    width: "120%",
    height:  "10%",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  feature: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
  },
});

export default About;
