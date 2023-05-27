import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../components/UI/AppText';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import Smcard from '../../components/UI/SmallCard/smcard';
import {moderateScale} from 'react-native-size-matters';

const Myorder = () => {
  return (
    <View style={styles.myorder}>
      <AppText>your order</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  myorder: {
    backgroundColor: mycolors.white,
    paddingHorizontal: respWidth(3),
  },

});

export default Myorder;
