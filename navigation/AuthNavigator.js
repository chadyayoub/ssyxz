import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen';
import Dashboard from '../screens/Dashboard';
import Colors from '../constants/Colors';
import LogoutButton from '../components/LogoutButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';
import {Alert} from 'react-native';
const Stack = createStackNavigator();

function AuthNavigator() {
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={AuthScreen} />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Articles',
            headerStyle: {
              backgroundColor: Colors.main,
            },
            headerLeft: () => null,
            headerTintColor: 'white',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={LogoutButton}>
                <Item
                  title="search"
                  iconName="search"
                  onPress={() => navigation.setParams({SearchClicked: true})}
                />
                <Item
                  title="Log out"
                  iconName="log-out"
                  onPress={() => {
                    Alert.alert(
                      'Hold on!',
                      'Are you sure you want to log out?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => null,
                          style: 'cancel',
                        },
                        {
                          text: 'YES',
                          onPress: () => {
                            dispatch(authActions.logout());
                            navigation.navigate('Login');
                          },
                        },
                      ],
                    );
                    return true;
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthNavigator;
