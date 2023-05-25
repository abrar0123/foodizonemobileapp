import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Authnavigation from '../AuthStack/authnavigation';
import {useSelector} from 'react-redux';
import Homestack from '../HomeStack/Homestack';
import Tabroutes from '../Tabroutes/tabroutes';
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
