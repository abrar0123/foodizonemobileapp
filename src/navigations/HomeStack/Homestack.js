import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import stackscreens from '../../constants/stackscreens';
import Home1 from '../../screens/Home/Home1';
import Tabroutes from '../Tabroutes/tabroutes';
import FoodDetails from '../../screens/localMall/foodDetails.js/foodDetails';

const Homestack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={stackscreens.tabRoutes} component={Tabroutes} />
      <Stack.Screen name={stackscreens.home1} component={Home1} />
      <Stack.Screen name={stackscreens.foodDetail} component={FoodDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homestack;
