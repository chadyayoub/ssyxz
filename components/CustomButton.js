import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
const CustomButton = props => {
  return (
    <TouchableOpacity
      style={{...props.style, ...styles.buttonContainer}}
      onPress={props.onPress}
      disabled={props.disabled}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.main,
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
  },
});

export default CustomButton;
