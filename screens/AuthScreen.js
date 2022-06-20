import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
  Appearance,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import Card from '../components/Card';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

import Images from '../assets/images/Images';
import {Colors, setDarkMode, setLightMode} from '../constants/Colors';

import {useDispatch, useSelector} from 'react-redux';

import * as authActions from '../store/actions/auth';

const AuthScreen = props => {
  const dispatch = useDispatch();

  //username and passworf text fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //this value is to know when the activity indicator should display
  const [isFetchingData, setIsFetchingData] = useState(false);

  //this is the error value to display for the user
  const [error, setError] = useState('');

  //booleans to check if username and password are empty
  const [usernameEmpty, setusernameEmpty] = useState(false);
  const [usernameValid, setusernameValid] = useState(false);
  const [passwordEmpty, setPasswordEmtpy] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  //get the token
  const token = useSelector(state => state.auth.token);

  //handle the username and change username empty accordingly
  const handleUsername = enteredText => {
    setUsername(enteredText);
    if (enteredText == '' || enteredText == null) {
      setusernameEmpty(true);
      setusernameValid(false);
    } else {
      setusernameEmpty(false);
      setusernameValid(true);
    }
  };

  //handle password and change password empty accordingly
  const handlePassword = enteredText => {
    setPassword(enteredText);
    if (enteredText == '' || enteredText == null) {
      setPasswordEmtpy(true);
      setPasswordValid(false);
    } else {
      setPasswordEmtpy(false);
      setPasswordValid(true);
    }
  };

  //when there is an error display the error message to the user
  useEffect(() => {
    if (error != '') {
      Alert.alert('An error occured', error, [{text: 'Ok'}]);
    }
  }, [error]);

  //handle the login
  const loginHandler = async () => {
    //If username not empty or null and password then try to login with entered credentials
    if (
      (username != '' || username != null) &&
      (password != '' || password != null)
    ) {
      //Is fetching data to show the loading indicator
      setIsFetchingData('true');
      setError('');
      //Try to login with input credentials
      //If it succeeds then the login action will save the token
      //and then navigate to the dashboard screen
      try {
        await dispatch(authActions.login(username, password)).then(() => {
          setIsFetchingData(false);
          setPasswordValid(false);
          setusernameValid(false);
          props.navigation.navigate('dashboard', {SearchClicked: false});
        });
      } catch (err) {
        // In case of an error catch the error and display an alert to the user accordingly
        if (err.message === 'Network request failed') {
          setError('Please check your internet connection');
          setIsFetchingData(false);
          return;
        }
        setError(err.message);
        setIsFetchingData(false);
      }
    }
  };

  //The next 10 lines are to change the theme of the app whenever the device theme changes
  const [theme, updateTheme] = useState();

  const changeTheme = () => {
    const mode = Appearance.getColorScheme();
    if (mode === null) setLightMode();
    else if (mode === 'dark') setDarkMode();
    else setLightMode();
    updateTheme(mode);
  };

  useEffect(changeTheme, []);

  Appearance.addChangeListener(changeTheme);

  return (
    <View style={{...styles.screen, ...props.styles}}>
      <ImageBackground
        source={Images.backgroundLogin}
        resizeMode={'cover'}
        style={styles.bckImage}>
        <Card
          style={{...styles.loginCard, backgroundColor: Colors.cardBackground}}>
          <View style={styles.imageContainer}>
            <Image source={Images.logo} style={styles.logoStyle} />
          </View>
          <View style={styles.inputContainer}>
            <InputField
              hint="username"
              style={styles.inputField}
              value={username}
              onChangeText={handleUsername}
              fieldEmpty={usernameEmpty}
              field="Username"
            />

            <InputField
              hint="password"
              style={styles.inputField}
              isPassword
              value={password}
              onChangeText={handlePassword}
              fieldEmpty={passwordEmpty}
              field="Password"
            />
          </View>
          {!isFetchingData ? (
            <CustomButton
              title="Login"
              onPress={loginHandler}
              disabled={!passwordValid || !usernameValid}
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
  imageContainer: {
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    elevation: 5,
  },
  inputField: {
    width: '100%',
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    width: '90%',
  },
  indicator: {
    marginTop: 45,
  },
});

export default AuthScreen;
