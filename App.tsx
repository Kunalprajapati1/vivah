import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import ProfileFor from './src/ProfileFor';
import NameDetail from './src/NameDetail';
import Email from './src/Email';
import City from './src/City';
import Status from './src/Status';
import Highest from './src/Highest';
import Work from './src/Work';
import Image from './src/Image';
import Land from './src/Land';
import Front from './src/Front';
import Upload from './src/Upload';
import Data from './src/Data';
import User from './src/User';
import User2 from './src/User2';
import Login from './src/Login';
import Chat from './src/Chat';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProfileFor" component={ProfileFor} />
      <Stack.Screen name="NameDetail" component={NameDetail} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="City" component={City} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Highest" component={Highest} />
      <Stack.Screen name="Work" component={Work} />
      <Stack.Screen name="Image" component={Image} />
      <Stack.Screen name="Land" component={Land} />
      <Stack.Screen name="Front" component={Front} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="Data" component={Data} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="User2" component={User2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Chat" component={Chat} />

     
      










    </Stack.Navigator>
    </NavigationContainer>
      );
    }
    
    export default App
    
    const styles = StyleSheet.create({})