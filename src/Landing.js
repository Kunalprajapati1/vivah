import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const Landing = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{ }}>
        <View style={{marginLeft:'5%',width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/woman.png')} // Replace with the actual path to your image
          style={{ width:70, height:70}} // Define the styles for your image
        />
        </View>
        <View style={{marginLeft:'75%' ,  width:20, height:20, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/love.png')} // Replace with the actual path to your image
          style={{ width:70, height:70}} // Define the styles for your image
        />
        </View>
        <View style={{marginLeft:'40%' , top:30, width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/man.png')} // Replace with the actual path to your image
          style={{ width:70, height:70}} // Define the styles for your image
        />
        </View>
        <View style={{marginRight:'75%',  top:60,width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('./assets/app_images/balloon.png')} // Replace with the actual path to your image
          style={{ width:100, height:100}} // Define the styles for your image
        />
        </View>
        <View style={{marginLeft:'75%',width:70, height:70,}}>
        <Image
          source={require('./assets/app_images/doctor.png')} // Replace with the actual path to your image
          style={{ width:70,  height:70}} // Define the styles for your image
        />
        </View>
        <View style={{marginLeft:'35%',width:70, height:70,}}>
        <Image
          source={require('./assets/app_images/heart.png')} // Replace with the actual path to your image
          style={{ width:70,  height:70}} // Define the styles for your image
        />
        </View>
        
        </View>
       <View>

   
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Find your
          </Text>
          <Text style={styles.text2}>
            Perfect match! With  
            <Text style={{  color:'#262037' }}> Sanjog</Text>
          </Text>
          {/* <Text style={styles.text3}>
            Join Us And associate with millions of people
          </Text> */}
        </View>
        <View style={{width:'30%',   height:'15%', marginTop:'70%', marginLeft:'75%'}}>
<TouchableOpacity onPress={()=> {navigation.navigate('Home')}}>
        <View style={{     }}>
        <Image
          source={require('./assets/app_images/right.png')} // Replace with the actual path to your image
          style={styles.imageStyle} // Define the styles for your image
        />

        </View>

</TouchableOpacity>
    </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e05654',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '128%',
    height: '65%',
    borderRadius: 400,
    backgroundColor: '#e77575',
    position: 'absolute',
    top: 0,
    right: 80,
  },
  textContainer: {
    position: 'absolute',
    top: '20%',
    left: 20,
  },
  text: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 70,
    color: 'white',
  },
  text2: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 50,
    color: 'white',
  },
  text3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    // marginTop: 20,
  },
  imageStyle: {
    width: 60, // Adjust the width of the image
    height: 50, // Adjust the height of the image
    // marginTop: 5,
    marginLeft:25, // Add margin as needed
  },
});

export default Landing;
3