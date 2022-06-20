import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import Card from './Card';
import {Colors} from '../constants/Colors';

const Article = props => {
  const image = props.image === null ? null : {uri: props.image};

  return (
    <Card style={{...styles.card, backgroundColor: Colors.cardBackground}}>
      {image != null ? <Image source={image} style={styles.image} /> : null}
      <View style={{flex: 0.4}} />
      <View>
        <View
          style={{
            ...styles.headContainer,
            borderBottomColor: Colors.inputColor,
          }}>
          <Text style={{...styles.title, color: Colors.inputColor}}>
            {props.title}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text
            style={{...styles.body, color: Colors.inputColor}}
            numberOfLines={9}>
            {props.body}
          </Text>
          <Text style={{textAlign: 'right', color: '#88888888'}}>
            Read More
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    margin: 5,
  },
  image: {width: '100%', height: 250},
  headContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
  },
  bodyContainer: {
    marginHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
});

export default Article;
