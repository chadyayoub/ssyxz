import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthScreen from '../screens/AuthScreen';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

//Simple navigation between 2 screen Dashboard and Auth screen
function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={AuthScreen} />
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthNavigator;
