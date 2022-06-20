import React, {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import AuthNavigator from './navigation/AuthNavigator';

import authenticate from './store/reducers/auth';
import articles from './store/reducers/articles';

const rootReducer = combineReducers({
  auth: authenticate,
  articles: articles,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  //To change back button behavior
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //The key=theme is there to trigger the theme change in the app

  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default App;
