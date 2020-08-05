import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {  SafeAreaView,  StyleSheet,  ScrollView,  View,  Text,  TextInput,  Image,  StatusBar,  Button, BackHandler} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
//--------------------  Custom  ---------------------------
import KTextInput from '../Components/KTextInput';
import KMainButton from '../Components/KMainButton';
function Main_Screen({navigation}){
  const onLogIn = () => {
    console.log(" Log In Clicked ");
    navigation.navigate('xMapScreen');
  }

  const onSignIn = () => {
    console.log(" Sign In Clicked ");
  }

  const onExit = () => {
    console.log(" Exit Clicked ");
    BackHandler.exitApp();
  }

  return ( 
    <LinearGradient colors={['#ff1b50', '#aa0027']} style={styles.linearGradient}>
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />  
        <View style = {{alignItems : 'center', marginTop: '10%'}}  >
          <Image source={require('../assets/images/logo.png')} style = {{width: 300, height: 300}} />
        </View>

        <View style = {{alignItems : 'center'}} >
          <Image source={require('../assets/images/title.png')} style = {{width: 300, height: 60}} />
        </View>

        {/* <View style = {{height: '20%'}}></View>           */}

        <View style = {{flexDirection : 'column', justifyContent: 'center', marginTop: 20,  width : '80%', alignSelf: 'center'}}>
          <KMainButton title = "Log In" callback = {onLogIn} />
          <KMainButton title = "Sign In" callback = {onSignIn} />       
          <KMainButton title = "Exit" callback = {onExit} />
          {/* <Text style = {{ color : "#FFF", padding : 20 , alignSelf : 'center' }}>my email = danevhome01@gmail.com</Text>          */}
        </View>    
        
        <View></View>
      </ScrollView>
    </LinearGradient>
  );
};
export default Main_Screen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleText: {
    fontSize: 50,
    fontFamily: 'Rowdies-Light',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 20,
    margin:20,
    marginTop:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  regtext: {
    color: "darkblue",
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 10,
    marginLeft:15,
    fontStyle: 'italic'
  },

});
