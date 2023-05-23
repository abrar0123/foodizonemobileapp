import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import AppText from '../AppText/AppText';
import {moderateScale, scale} from 'react-native-size-matters';
import mycolors from '../../../styles/mycolors';
const Button = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.buttonStyle, props.style]}
      onPress={props.onPress}>
      <AppText style={[styles.text, props.style]}> {props.children}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    padding: scale(15),
    borderRadius: moderateScale(2),
    backgroundColor: mycolors.blue,
    color: mycolors.white,
  },
  text: {
    color: mycolors.white,
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default Button;
