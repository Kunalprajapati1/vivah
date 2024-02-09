import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const PersonDetails = ({ route, navigation }) => {
  const { params } = route;
  const personData = params ? params.personData : null;
  const profileForDisplayOrder = params ? params.profileForDisplayOrder : null;

  if (!personData || !profileForDisplayOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error: Person data or display order not available.
        </Text>
      </View>
    );
  }

  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          personData.photos && personData.photos.length > 0
            ? { uri: personData.photos[0] }
            : require('../assets/app_images/user.png')
        }
        style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate('Land');
            }}>
            {/* Your back button content */}
          </TouchableOpacity>

          {personData && (
            <View style={styles.postContainer}>
              <Text style={styles.userName}>{personData.firstName}{personData.lastName}</Text>
              <View style={styles.detailsContainer}>
                {profileForDisplayOrder.map((key) => (
                  <TouchableOpacity key={key}>
                    <Text style={styles.detailText}>{`${key}: ${
                      personData[key] || 'N/A'
                    }`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={navigateToChat} style={styles.chatButton}>
                <Text style={styles.chatButtonText}>Click to Chat to Person</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e88a8a',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  postContainer: {
    backgroundColor: 'rgba(248, 223, 238, 0.707)',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  userName: {
    fontFamily:'DMSerifDisplay-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailText: {
    fontFamily:'Montserrat-Regular',
    color: '#000000',
    fontSize: 17,
    lineHeight: 25,
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  chatButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PersonDetails;
