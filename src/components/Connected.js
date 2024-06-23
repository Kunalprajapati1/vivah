import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const Connected = ({ route }) => {
  const { personData } = route.params;

  if (!personData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No person data available.</Text>
      </View>
    );
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.nameText}>
          {personData.firstName} {personData.lastName}
        </Text>
        {Object.keys(personData).map((key) => (
          <View key={key} style={styles.detailContainer}>
            <Text style={styles.fieldText}>{capitalizeFirstLetter(key)}:</Text>
            <Text style={styles.valueText}>{personData[key] || 'N/A'}</Text>
            <View style={styles.line} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e88a8a',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 32,
    color: '#e05654',
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 15,
    width: '100%',
  },
  fieldText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    color: '#e2d0d0',
  },
  valueText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 19,
    color: 'white',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2d0d0',
    marginTop: 5,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export default Connected;
