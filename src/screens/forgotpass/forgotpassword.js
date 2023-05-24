import React, {useState} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import pic from '../../assets/image/AsianFood.png';
import AppText from '../../components/UI/AppText/AppText';
import mycolors from '../../styles/mycolors';
import {moderateScale} from 'react-native-size-matters';
import {
  respHeight,
  screenheight,
} from '../../components/responsiveness/RespHeight';
import Button from '../../components/UI/Button/Button';
import {scale} from 'react-native-size-matters';
import {moderateVerticalScale} from 'react-native-size-matters';

const Forgotpassword = () => {
  const [email, setemail] = useState('');
  const [errors, seterrors] = useState({Email: ''});

  const emailHandler = event => {
    setemail(event);
    if (email.trim().length !== 0) {
      seterrors({uname: ''});
    }
  };

  const onSubmitLogin = event => {
    event.preventDefault();
    if (!email) {
      return seterrors({Email: 'empty Email not allowd'});
    } else if (!email.includes('@')) {
      return seterrors({Email: 'please enter valid Email '});
    }
  };
  return (
    <View style={styles.loginStyle}>
      <View style={styles.imgStyle}>
        <Image source={pic} style={styles.imgStyle} />
      </View>
      <View style={styles.primaryInputsContainer}>
        <AppText style={styles.welcomText}>Forgot Password </AppText>
        <AppText style={styles.descriptionText}>
          Enter Email address associate your account{' '}
        </AppText>
        <View style={styles.inputcontainer}>
          {/* <FontAwesome
              name="user"
              size={25}
              color={colors.blue}
              style={{ marginRight: 10 }}
            /> */}
          <AppText>pending...</AppText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={emailHandler}
            placeholder="Enter username"
          />
        </View>

        {errors.Email?.length > 0 && (
          <AppText style={styles.errorText}>{errors.Email}</AppText>
        )}
        <View style={styles.loginbtn}>
          <Button onPress={onSubmitLogin}>Login </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginStyle: {padding: moderateScale(10), backgroundColor: mycolors.white},
  imgStyle: {
    width: '100%',
    height: respHeight(48),
  },
  primaryInputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // gap: moderateScale(15),
    gap: screenheight < 700 ? moderateScale(12) : moderateScale(15),
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
  inputcontainer: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: mycolors.blue,
    paddingRight: 10,
  },
  input: {
    width: '85%',
    fontSize: 18,
    fontWeight: '500',
    color: mycolors.black,
    paddingVertical: moderateScale(3), // auto 10 so we set
  },
  loginbtn: {
    paddingRight: moderateScale(15),
  },

  errorText: {
    color: mycolors.red,
    // marginBottom:1,
    // backgroundColor: mycolors.jaman,
  },
});

export default Forgotpassword;
