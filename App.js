import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {  SafeAreaView,  StyleSheet,  ScrollView,  View,  Text,  TextInput,  Image,  StatusBar,  Button,} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
//--------------------  Screen  ---------------------------
import Map_Screen from './Screens/Map_Screen';
import Main_Screen from './Screens/Main_Screen';

const AppNav = createAppContainer(
  createStackNavigator(
    {
      xMap_Screen : Map_Screen,
      xMain_Screen : Main_Screen,
    },
    {
      initialRouteName: 'xMain_Screen',
      headerMode: 'none',
      defaultNavigationOptions: {
        cardStyle: {backgroundColor: '#FFF'},
      }
    },
  ),
);
export default class App extends Component {

  render(){
    return ( <Main_Screen/> );
  }

};
