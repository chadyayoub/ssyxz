import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';

//Custom button component used only as a login button
const CustomButton = props => {
  return (
    <TouchableOpacity
      style={{
        ...props.style,
        ...styles.buttonContainer,
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <View
        style={{
          ...styles.button,
          ...{backgroundColor: props.disabled ? Colors.disabled : Colors.main},
        }}>
        <Text style={{...styles.text, color: Colors.buttonText}}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 30,
    width: '40%',
    marginTop: 45,
    height: 45,
  },
  text: {
    textAlign: 'center',
  },
});

export default CustomButton;
