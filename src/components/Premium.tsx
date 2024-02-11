import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Premium = () => {
  return (
   <>
   <View style={{ backgroundColor:'#181b26f7', height:'100%', justifyContent:'center'  }}>
   <View style={{marginLeft:'10%' , top:30, width:70, height:70, marginTop:'0%',}}>
        <Image
          source={require('../assets/app_images/star.png')} // Replace with the actual path to your image
          style={{ tintColor:'#dfb7b7', width:70, height:70}} // Define the styles for your image
        />
        <Image
          source={require('../assets/app_images/star.png')} // Replace with the actual path to your image
          style={{ tintColor:'#dfb7b7', width:30, height:30}} // Define the styles for your image
        />
        </View>
      <Text style={{ marginTop:30, fontFamily:'Montserrat-Regular', fontSize:50, color:'#d84d5b', textAlign:'center', alignItems:'center', justifyContent:'center' }}>Premium Features</Text>
      <Text style={{ textAlign:'center', marginTop:10, color:'#ffffad',fontFamily:'Montserrat-Regular',  }}>Coming Soon</Text>
    </View>
   
   </>
  )
}

export default Premium

const styles = StyleSheet.create({})