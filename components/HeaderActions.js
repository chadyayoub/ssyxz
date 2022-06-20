import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

//To change the touch animation depending on the os
let Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

//Search and logout actions
const HeaderActions = props => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{...styles.title, color: Colors.headerAction}}>
        Dashboard
      </Text>
      <View style={styles.actionsContainer}>
        <Touchable onPress={props.open}>
          <View style={styles.headerAction}>
            <Feather
              size={28}
              name="search"
              style={{color: Colors.headerAction}}
            />
          </View>
        </Touchable>
        <Touchable onPress={props.logout}>
          <View style={styles.headerAction}>
            <Feather
              size={28}
              name="log-out"
              style={{color: Colors.headerAction}}
            />
          </View>
        </Touchable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  headerAction: {
    justifyContent: 'center',
    height: 52,
    width: 52,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginLeft: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
});
export default HeaderActions;
