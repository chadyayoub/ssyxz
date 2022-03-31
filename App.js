/**
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux';

import {Provider} from 'react-redux';
import AuthNavigator from './navigation/AuthNavigator';
import authenticate from './store/reducers/auth';
import articles from './store/reducers/articles';
import thunk from 'redux-thunk';
import {BackHandler, Alert} from 'react-native';
const rootReducer = combineReducers({
  auth: authenticate,
  articles: articles,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
const App = () => {
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
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default App;
