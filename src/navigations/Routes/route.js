import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Authnavigation from '../AuthNaviation/authnavigation';
import AppText from '../../components/UI/AppText/AppText';
import mycolors from '../../styles/mycolors';

const Route = () => {
  return (
    <NavigationContainer>
      <Authnavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Route;
