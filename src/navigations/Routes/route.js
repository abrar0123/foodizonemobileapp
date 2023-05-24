import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Authnavigation from '../AuthStack/authnavigation';
import AppText from '../../components/UI/AppText/AppText';
import mycolors from '../../styles/mycolors';
import {useSelector} from 'react-redux';
import Homestack from '../HomeStack/Homestack';

const Route = () => {
  const loginEmail = useSelector(state => state.auth.loginEmail);

  return (
    <NavigationContainer>
      {loginEmail ? <Homestack /> : <Authnavigation />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Route;
