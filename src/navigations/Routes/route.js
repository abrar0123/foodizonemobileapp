import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Authnavigation from '../AuthStack/authnavigation';
import {useSelector} from 'react-redux';
import Homestack from '../HomeStack/Homestack';
import Tabroutes from '../Tabroutes/tabroutes';
import {linkingOptions} from '../../../linking.config';
const Route = () => {
  const loginEmail = useSelector(state => state.auth.loginEmail);

  return (
    <NavigationContainer linking={linkingOptions}>
      {loginEmail ? <Homestack /> : <Authnavigation />}
      {/* <Homestack /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Route;
