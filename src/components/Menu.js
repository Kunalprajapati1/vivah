import React from 'react';
import { StyleSheet,Image, Text, View, TouchableOpacity } from 'react-native';
import menuList from '../components/menuData';

const Menu = ({navigation}) => {
  const groupedMenuItems = groupArray(menuList, 2);

  return (
    <>
    <View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Land')}}>
      <Image style={styles.cross} source={require('../assets/app_images/close.png')} />

        </TouchableOpacity>
    </View>
      <View style={{ marginTop:'0%', }}>
        {groupedMenuItems.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.menuRow}>
            {group.map((menuItem)    => (
              <View key={menuItem.id} style={styles.menuItemBox}>
                <Text style={styles.menuItemText}>{menuItem.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </>
  );
};

const groupArray = (arr, groupSize) => {
  return arr.reduce((acc, _, index) => {
    if (index % groupSize === 0) {
      acc.push(arr.slice(index, index + groupSize));
    }
    return acc;
  }, []);
};

const styles = StyleSheet.create({
    cross: {
        top:40,
        width: 30,
        height: 30,
        marginLeft: 25,
      },
  menuItemBox: {
    marginTop:40,
    // width:20,
    height: '130%',
    
    borderRadius: 15,
    backgroundColor: '#e65257', // Background color for the individual box
    margin: 15, // Adjust spacing between boxes
    flex: 1,
  },
  menuItemText: {
    padding:4,
    fontSize:21,
    color:'white',
    top:50,
    // paddingHorizontal:30,
    // backgroundColor: '#a79999',
    textAlign: 'center', // Center the text within the box
  },
  menuRow: {
    marginTop:'25%',
    // marginLeft:20,
    display:"flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Menu;
