import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

//Simple card component to support rounded corners style fast

const Card = props => {
  return <View style={{...props.style, ...styles.card}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default Card;
