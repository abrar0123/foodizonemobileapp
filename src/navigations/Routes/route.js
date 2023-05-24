import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Authnavigation from '../AuthNaviation/authnavigation';
const Route = () => {
  return (
    <NavigationContainer>
      <Authnavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Route;
