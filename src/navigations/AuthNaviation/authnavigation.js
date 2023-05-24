import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../../screens/splash/splash';
import Login from '../../screens/login/login';
import Register from '../../screens/register/register';
import stackscreens from '../../constants/stackscreens';

const Authnavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={stackscreens.splash} component={Splash} />
      <Stack.Screen name={stackscreens.login} component={Login} />
      <Stack.Screen name={stackscreens.register} component={Register} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Authnavigation;
