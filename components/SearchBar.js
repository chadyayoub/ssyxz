import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../constants/Colors';

//Custom searchbar component
let Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const SearchBar = props => {
  return (
    <View
      style={{...styles.searchContainer, backgroundColor: Colors.textInput}}>
      <Feather
        size={28}
        name="search"
        style={{color: Colors.placeholder, marginLeft: 6}}
      />
      <TextInput
        style={styles.textInput}
        placeholder="search"
        value={props.value}
        onChangeText={props.onSearch}
        placeholderTextColor={Colors.placeholder}
        color={Colors.inputColor}
        returnKeyType="search"
      />
      <Touchable onPress={props.close}>
        <View style={styles.actionContainer}>
          <Feather size={24} name="x" style={{color: Colors.placeholder}} />
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    fontWeight: '700',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '90%',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'center',
    padding: 9,
    borderRadius: 30,
  },
});

export default SearchBar;
