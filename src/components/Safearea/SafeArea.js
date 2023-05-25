import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import mycolors from '../../styles/mycolors';

const SafeArea = props => {
  return <SafeAreaView style={styles.safestyle}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safestyle: {
    flex: 1,
    // backgroundColor:mycolors.red,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default SafeArea;
