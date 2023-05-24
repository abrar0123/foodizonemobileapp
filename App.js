import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  AppRegistry,
} from 'react-native';
import Home from './src/screens/Home/home';
import Login from './src/screens/login/login';
import Splash from './src/screens/splash/splash';
import Register from './src/screens/register/register';
import Forgotpassword from './src/screens/forgotpass/forgotpassword';
import Route from './src/navigations/Routes/route';

const App = () => {
  return (
    <SafeAreaView style={styles.safeStyle}>
      {/* <Login /> */}
      <Register />
      {/* <Route /> */}
      {/* <Forgotpassword /> */}
      {/* <Splash /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
AppRegistry.registerComponent('foodizone', () => App);
export default App;
