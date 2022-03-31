import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Images from '../assets/images/Images';
const Article = props => {
  const image = props.image === null ? Images.default : {uri: props.image};
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.card}>
        <ImageBackground
          source={image}
          resizeMode={'cover'}
          style={styles.bckImage}>
          <View style={{flex: 0.4}} />
          <View style={styles.textContainer}>
            <View style={styles.headContainer}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.body} numberOfLines={9}>
                {props.body}
              </Text>
              <Text style={{textAlign: 'right', color: '#88888888'}}>
                Read More
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#888',
    height: 300,
    margin: 10,
    elevation: 5,
    borderRadius: 50,
    overflow: 'hidden',
  },
  bckImage: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  headContainer: {
    marginHorizontal: 10,
    borderBottomColor: '#ffffff66',
    borderBottomWidth: 1,
  },
  bodyContainer: {
    marginHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffffcc',
  },
  body: {
    fontSize: 16,
    color: '#ffffffab',
  },
  textContainer: {
    backgroundColor: '#333333cc',
    flex: 0.6,
  },
});

export default Article;
