import React from 'react';
import {View, StyleSheet} from 'react-native';
import mycolors from '../../../styles/mycolors';

const Smcard = props => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    backgroundColor: mycolors.white,

    //  add a shadow property

    background: mycolors.white,
    shadowColor: mycolors.black,
    // borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
});

export default Smcard;
