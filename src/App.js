import 'react-native-gesture-handler';
import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

//CUSTOM COMPONENTS
import MyStack from './screens/screens'

import { NavigationContainer } from '@react-navigation/native';
import {StackNavigator} from './screens/screens'


const App = () => {
 
  return (
   
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>   
  );
};


const styles = StyleSheet.create(
  {
    card:{
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,

      elevation: 16,
    },
    tinyLogo:{
      width:48,
      height:48
    }
  }
)

export default App;
