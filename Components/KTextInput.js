import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class KTextInput extends Component {
 
  render() {
    return (
        <TextInput
            placeholder = {this.props.placeHolder}
            style={styles.textInput}
            // onChangeText={idValue => onChangeIdValue(idValue)}
            // value={idValue}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  
  textInput: {
    height: 40, 
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
    paddingBottom:4,
    borderColor: 'rgb(252, 133, 106)', 
    borderRadius: 10 , 
    paddingLeft : 20, 
    paddingRight : 20, 
    borderWidth: 0 ,
    borderBottomWidth: 2, 
    fontStyle: 'normal',
    backgroundColor : 'rgba(255, 255, 255, 0.4)',
  },
});