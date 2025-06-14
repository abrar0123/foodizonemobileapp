import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import stackscreens from '../../constants/stackscreens';
import Home from '../../screens/Home/home';
import MainCart from '../../screens/cart/MainCart';
import Profile from '../../screens/Profile/profile';
import mycolors from '../../styles/mycolors';
import imagesPath from '../../constants/imagesPath';
import Localmall from '../../screens/localMall/localmall';
import TrackOrder from '../../screens/track';
import TabViews from './TabViews';

const Tabroutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: mycolors.white,
        tabBarInactiveTintColor: mycolors.grey,
        tabBarShowLabel: false,

        // tabBarStyle: {
        //   backgroundColor: 'white',
        //   borderColor: '#2E2739',
        //   borderTopRightRadius: 20,
        //   borderTopLeftRadius: 20,
        //   borderRadius: 30,
        //   // borderWidth: 10
        // },
      }}
      tabBar={({ state }) => <TabViews state={state} />}
    >
      <Tab.Screen
        name={stackscreens.home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.white : mycolors.grey,
                }}
                source={imagesPath.c}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={stackscreens.mall}
        component={Localmall}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={imagesPath.b}
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.white : mycolors.grey
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={stackscreens.maincart}
        component={MainCart}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={imagesPath.a}
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.white : mycolors.grey
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={stackscreens.trackOrder}
        component={TrackOrder}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={imagesPath.d}
                style={{
                  ...styles.imagestyle,
                  tintColor: focused ? mycolors.white : mycolors.grey
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
    width: 25,
    height: 25,
  },
});

export default Tabroutes;
