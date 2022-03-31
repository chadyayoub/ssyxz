import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import InputField from '../components/InputField';

import Images from '../assets/images/Images';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';

import * as authActions from '../store/actions/auth';

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFetchingData, setIsFetchingData] = useState(false);

  const [usernameEmpty, setusernameEmpty] = useState('true');
  const [passwordEmpty, setPasswordEmtpy] = useState('true');

  const token = useSelector(state => state.auth.token);

  const handleUsername = enteredText => {
    setUsername(enteredText);
    if (enteredText == '' || enteredText == null) {
      setusernameEmpty(true);
    } else {
      setusernameEmpty(false);
    }
  };
  const handlePassword = enteredText => {
    setPassword(enteredText);
    if (enteredText == '' || enteredText == null) {
      setPasswordEmtpy(true);
    } else {
      setPasswordEmtpy(false);
    }
  };
  useEffect(() => {
    setusernameEmpty(false);
    setPasswordEmtpy(false);
  }, [props.navigation]);
  useEffect(() => {
    if (error != '') {
      Alert.alert('an error occured', error, [{text: 'okay'}]);
      setUsername('');
      setPassword('');
    }
  }, [error]);
  const loginHandler = async () => {
    if (
      (username != '' || username != null) &&
      (password != '' || password != null)
    ) {
      setIsFetchingData('true');
      setError('');
      try {
        await dispatch(authActions.login(username, password)).then(() => {
          setIsFetchingData(false);
          props.navigation.navigate('dashboard', {SearchClicked: false});
        });
      } catch (err) {
        setError(err.message);
        setIsFetchingData(false);
      }
    }
  };

  return (
    <View style={{...styles.screen, ...props.styles}}>
      <ImageBackground
        source={Images.backgroundLogin}
        resizeMode={'cover'}
        style={styles.bckImage}>
        <View style={styles.imageContainer}>
          <Image source={Images.logo} style={styles.logoStyle} />
        </View>
        <Card style={styles.loginCard}>
          <Text style={styles.title}>Welcome</Text>
          <View style={styles.inputContainer}>
            <InputField
              hint="username"
              style={styles.inputField}
              value={username}
              onChangeText={handleUsername}
            />
            {!usernameEmpty ? null : (
              <Text style={styles.warning}>Username is required!!!</Text>
            )}
            <InputField
              hint="password"
              style={styles.inputField}
              isPassword
              value={password}
              onChangeText={handlePassword}
            />
            {!passwordEmpty ? null : (
              <Text style={styles.warning}>Password is required!!!</Text>
            )}
          </View>
          {!isFetchingData ? (
            <CustomButton
              title="Login"
              style={styles.confirm}
              onPress={loginHandler}
              disabled={passwordEmpty || usernameEmpty}
            />
          ) : (
            <ActivityIndicator
              style={styles.indicator}
              size={50}
              color={Colors.main}
            />
          )}
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
    color: Colors.main,
  },
  imageContainer: {
    justifyContent: 'center',
    marginBottom: 50,
    width: 100,
    height: 130,
  },
  logoStyle: {
    width: '100%',
    height: '100%',
  },
  bckImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    width: '90%',
    height: 500,
    backgroundColor: '#fefefedd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    width: '100%',
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    width: '90%',
  },
  confirm: {
    width: '40%',
    marginTop: 45,
    height: 45,
  },
  warning: {
    fontSize: 10,
    color: '#ff8844ee',
    marginLeft: 15,
  },
  indicator: {
    marginTop: 45,
  },
});

export default AuthScreen;
