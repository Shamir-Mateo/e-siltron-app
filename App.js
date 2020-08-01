import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {  SafeAreaView,  StyleSheet,  ScrollView,  View,  Text,  TextInput,  Image,  StatusBar,  Button,} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//--------------------  Screen  ---------------------------
import Map_Screen from './Screens/Map_Screen';
import Main_Screen from './Screens/Main_Screen';
const Stack = createStackNavigator();

function MainScreen({navigation}){
  return(
      <Main_Screen/>
  );
}
function MapScreen({navigation}){
  return(
      <Map_Screen/>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="xMapScreen"  screenOptions={{headerShown: false}} >
        <Stack.Screen name="xMainScreen" component={MainScreen} />
        <Stack.Screen name="xMapScreen" component={MapScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;