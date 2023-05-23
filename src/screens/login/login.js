import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
} from 'react-native';

const Login = () => {
  return (
    <SafeAreaView style={styles.safeStyle}>
      <Text>welcome to Login Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Login;
