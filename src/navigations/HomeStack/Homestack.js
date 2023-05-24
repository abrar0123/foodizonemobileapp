import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import stackscreens from '../../constants/stackscreens';
import Home from '../../screens/Home/home';

const Homestack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={stackscreens.home} component={Home} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homestack;
