import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import stackscreens from '../../constants/stackscreens';
import Home from '../../screens/Home/home';
import Cart from '../../screens/cart/Cart';
import Profile from '../../screens/Profile/profile';
import mycolors from '../../styles/mycolors';
import imagesPath from '../../constants/imagesPath';
import Localmall from '../../screens/localMall/localmall';

const Tabroutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: mycolors.jaman,
        tabBarInactiveTintColor: mycolors.grey,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: mycolors.white,
        },
      }}>
      <Tab.Screen
        name={stackscreens.home}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.jaman : mycolors.black,
                }}
                source={imagesPath.home}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={stackscreens.mall}
        component={Localmall}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={imagesPath.mall}
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.jaman : mycolors.black,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={stackscreens.cart}
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={imagesPath.cart}
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.jaman : mycolors.black,
                }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name={stackscreens.profile}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={imagesPath.profile}
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.jaman : mycolors.black,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  imagestyle: {
    width: 35,
    height: 35,
  },
});

export default Tabroutes;
