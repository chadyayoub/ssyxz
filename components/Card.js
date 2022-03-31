import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Card = props => {
  return <View style={{...props.style, ...styles.card}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
  },
});

export default Card;
