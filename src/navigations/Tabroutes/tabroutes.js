import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import stackscreens from '../../constants/stackscreens';
import Home from '../../screens/Home/home';
import Cart from '../../screens/cart/Cart';
import Profile from '../../screens/Profile/profile';
import mycolors from '../../styles/mycolors';

const Tabroutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: mycolors.jaman,
        tabBarInactiveTintColor: mycolors.grey,
      }}>
      <Tab.Screen name={stackscreens.home} component={Home} />
      <Tab.Screen name={stackscreens.cart} component={Cart} />
      <Tab.Screen name={stackscreens.profile} component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Tabroutes;
