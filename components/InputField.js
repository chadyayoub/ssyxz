import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Card from './Card';
import Colors from '../constants/Colors';

const InputField = props => {
  return (
    <View style={props.style}>
      <TextInput
        style={styles.field}
        placeholder={props.hint}
        placeholderTextColor={'#88888888'}
        secureTextEntry={props.isPassword}
        value={props.value}
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 50,
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 20,
    color: '#112',
  },
});

export default InputField;
