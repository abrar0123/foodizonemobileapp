import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppText from '../../components/UI/AppText/AppText';
import {useSelector} from 'react-redux';

const Home = () => {
  const loginEmail = useSelector(state => state.auth.loginEmail);

  return (
    <View>
      <AppText>Hi, Welcome in React Native Project</AppText>
      <AppText>Your Creditial ({loginEmail})</AppText>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
