import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Home from './src/screens/Home/home';
import Login from './src/screens/login/login';
import Splash from './src/screens/splash/splash';

const App = () => {
  return (
    <SafeAreaView style={styles.safeStyle}>
      <Login />
      {/* <Splash /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
