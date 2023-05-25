import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {respHeight} from '../../../components/responsiveness/RespHeight';
import imagesPath from '../../../constants/imagesPath';

const FoodDetails = ({route}) => {
  const {id} = route.params;
  console.log('id_', id);
  return (
    <View style={styles.mainContainer}>
      <AppText>welcome here {id}</AppText>
      <Image source={imagesPath.kake} style={styles.imgStyle} />
      <AppText style={styles.welcomText}>
        welcome to chicken fajita pizza{' '}
      </AppText>
      <AppText style={styles.descriptionText}>
        this is bestest pizza forever , please go order and enjoy best pizza
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: mycolors.white,
  },
  imgStyle: {
    width: '100%',
    height: respHeight(55),
    backgroundColor: mycolors.lightgrey,
    resizeMode: 'contain',
  },
  welcomText: {
    fontSize: scale(28),
    fontWeight: '700',
    alignSelf: 'center',
  },
  descriptionText: {
    textAlign: 'justify',
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(20),
  },
  gobtn: {
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
});

export default FoodDetails;
