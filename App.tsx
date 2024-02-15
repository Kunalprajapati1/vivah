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
import Landing from './src/Landing';
import Menu from './src/components/Menu';
import PersonDetails from './src/components/PersonDetails';

import EditSaveProfile from './src/components/EditSaveProfile';
import PersonDetails2 from './src/components/PersonDetails2';
import Search from './src/components/Search';
import WatchUser from './src/components/WatchUser';
import Premium from './src/components/Premium';
import ChatCollection from './src/components/ChatCollection';
import AdminScreen from './src/components/AdminScreen';
import Adminlogin from './src/components/Adminlogin';
import ManageUser from './src/components/ManageUser';
import AddUser from './src/components/AddUser';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="Landing" component={Landing}/>
      <Stack.Screen name="Premium" component={Premium}/>
      <Stack.Screen name="EditSaveProfile" component={EditSaveProfile}/>
      <Stack.Screen name="PersonDetails" component={PersonDetails}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Menu" component={Menu}/>
      <Stack.Screen name="ProfileFor" component={ProfileFor}/>
      <Stack.Screen name="NameDetail" component={NameDetail}/>
      <Stack.Screen name="Email" component={Email}/>
      <Stack.Screen name="City" component={City}/>
      <Stack.Screen name="Status" component={Status}/>
      <Stack.Screen name="Highest" component={Highest}/>
      <Stack.Screen name="Work" component={Work}/>
      <Stack.Screen name="Image" component={Image}/>
      <Stack.Screen name="Land" component={Land}/>
      <Stack.Screen name="Front" component={Front}/>
      <Stack.Screen name="Upload" component={Upload}/>
      <Stack.Screen name="Data" component={Data}/>
      <Stack.Screen name="User" component={User}/>
      <Stack.Screen name="User2" component={User2}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="PersonDetails2" component={PersonDetails2}/>
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="WatchUser" component={WatchUser}/>
      <Stack.Screen name="ChatCollection" component={ChatCollection}/>
      <Stack.Screen name="AdminScreen" component={AdminScreen}/>
      <Stack.Screen name="Adminlogin" component={Adminlogin}/>
      <Stack.Screen name="ManageUser" component={ManageUser}/>
      <Stack.Screen name="AddUser" component={AddUser}/>


     
      










    </Stack.Navigator>
    </NavigationContainer>
      );
    }
    
    export default App
    
    const styles = StyleSheet.create({})