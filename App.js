import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Home from './src/screens/Home/home';
import Login from './src/screens/login/login';
import Splash from './src/screens/splash/splash';

const App = () => {
  return (
    <SafeAreaView>
      <Splash />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
