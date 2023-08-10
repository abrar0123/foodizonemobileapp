import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import pic from '../../assets/image/Foodizone.png';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import AppText from '../../components/UI/AppText/AppText';
import Button from '../../components/UI/Button/Button';
import mycolors from '../../styles/mycolors';
import stackscreens from '../../constants/stackscreens';
import {useSelector} from 'react-redux';
import {respHeight} from '../../components/responsiveness/RespHeight';

const Splash = ({navigation}) => {
  // const loginEmail = useSelector(state => state.auth.loginEmail);
  // console.log('loginEmail__', loginEmail);

  const goHandler = () => {
    navigation.navigate(stackscreens.formikLogin);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      goHandler();
    }, 2000);
    // return clearTimeout(time);
  });

  return (
    <>
      <View style={styles.splashContainer}>
        <View style={styles.imgStyle}>
          <Image source={pic} style={styles.imgStyle} />
        </View>
        <AppText style={styles.welcomText}>Welcome to Food Zone </AppText>
        <AppText style={styles.descriptionText}>
          welcome to our Food Orderin Mobile app , we provide best food to our
          customer and always achive best satifaction, Lets do Order Food at
          your Home and Enjoy Food.
        </AppText>
        <View style={styles.gobtn}>
          <Button onPress={goHandler}>
            <AppText style={{color: mycolors.white, textAlign: 'center'}}>
              Let's Go
            </AppText>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: mycolors.white,
  },
  imgStyle: {
    width: '100%',
    height: respHeight(55),
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

export default Splash;
