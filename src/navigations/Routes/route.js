import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Homestack from '../HomeStack/Homestack';

const Route = () => {

  return (
    <NavigationContainer >
       <Homestack /> 
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Route;
