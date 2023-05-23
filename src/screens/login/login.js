import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import pic from '../../assets/image/AsianFood.png';
import {moderateScale} from 'react-native-size-matters';
import mycolors from '../../styles/mycolors';
import Button from '../../components/UI/Button/Button';
import AppText from '../../components/UI/AppText/AppText';

const Login = () => {
  const [username, setusername] = useState('');

  const unameHandler = event => {
    setusername(event);
  };

  return (
    <View style={styles.loginStyle}>
      <View style={styles.imgStyle}>
        <Image source={pic} style={styles.imgStyle} />
      </View>
      <View style={styles.primaryInputsContainer}>
        <View style={styles.inputcontainer}>
          {/* <FontAwesome
              name="user"
              size={25}
              color={colors.blue}
              style={{ marginRight: 10 }}
            /> */}
          <Text>Pending...</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={unameHandler}
            placeholder="Enter username"
          />
        </View>
        {/* passowrd */}
        <View style={styles.inputcontainer}>
          <Text>Pending...</Text>
          <TextInput
            style={styles.input}
            value={username}
            secureTextEntry={true}
            onChangeText={unameHandler}
            placeholder="Enter username"
          />
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <AppText style={styles.forgotText}>Forgot Password ?</AppText>
        </TouchableOpacity>
        <View style={styles.loginbtn}>
          <Button>Login </Button>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <AppText style={styles.signupText}>
            Dont have an Account?
            <AppText style={{color: mycolors.blue, fontWeight: 'bold'}}>
              {' '}
              Signup here
            </AppText>
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginStyle: {padding: moderateScale(10)},
  imgStyle: {
    width: '100%',
    height: moderateScale(350),
  },
  primaryInputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: moderateScale(15),
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
    width: '90%',
    fontSize: 18,
    fontWeight: '500',
    color: mycolors.black,
  },
  loginbtn: {
    paddingRight: moderateScale(15),
  },
  forgotText: {
    paddingRight: moderateScale(15),
    color: mycolors.blue,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  signupText: {
    paddingRight: moderateScale(15),
    color: mycolors.black,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default Login;
