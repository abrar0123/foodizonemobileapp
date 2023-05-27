import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from '../../UI/AppText';
import mycolors from '../../../styles/mycolors';
import {moderateScale, scale} from 'react-native-size-matters';

const CartButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View style={{...styles.cartbtn, ...props.style}}>
        <AppText style={{...styles.text, ...props.style}}>
          {props.children}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartbtn: {
    backgroundColor: mycolors.jaman,
    // paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(5),
  },
  text: {
    color: mycolors.white,
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartButton;
