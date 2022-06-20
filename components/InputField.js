import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';

//Custom input field
const InputField = props => {
  return (
    <View style={props.style}>
      <Text style={{...styles.label, color: Colors.label}}>{props.field}:</Text>
      <TextInput
        style={{
          ...styles.field,
          backgroundColor: Colors.textInput,
          borderBottomColor: Colors.textInputBorder,
          color: Colors.inputColor,
        }}
        placeholder={props.hint}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={props.isPassword}
        value={props.value}
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onDone}
      />
      <Text style={{...styles.warning, color: Colors.warningColor}}>
        {!props.fieldEmpty ? '' : props.field + ' is required!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 2,
    fontSize: 16,
    paddingHorizontal: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  warning: {
    fontSize: 10,
    marginLeft: 15,
  },
  label: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default InputField;
