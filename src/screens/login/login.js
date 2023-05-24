import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import pic from '../../assets/image/AsianFood.png';
import {moderateScale} from 'react-native-size-matters';
import mycolors from '../../styles/mycolors';
import Button from '../../components/UI/Button/Button';
import AppText from '../../components/UI/AppText/AppText';
import {
  respHeight,
  screenheight,
} from '../../components/responsiveness/RespHeight';
import stackscreens from '../../constants/stackscreens';

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showpassword, setshowpassword] = useState(true);
  const [errors, seterrors] = useState({Email: '', Password: ''});

  const emailError = 'Empty Email not allowed';
  const emailvalidation = 'please enter valid Email';
  const passError = 'Empty Password not allowed';

  const emailHandler = event => {
    setemail(event);
    if (email.trim().length !== 0) {
      seterrors({Email: ''});
    }
  };

  const passwordHandler = event => {
    setpassword(event);
    if (password.trim().length !== 0) {
      seterrors({Password: ''});
    }
  };

  const forgotHandler = () => {
    navigation.navigate(stackscreens.forgotpass);
  };

  const signupHandler = () => {
    navigation.navigate(stackscreens.register);
  };
  const onSubmitLogin = event => {
    console.log('s');
    event.preventDefault();

    if (!email && !password) {
      return seterrors({
        Email: emailError,
        Password: passError,
      });
    } else if (!email) {
      return seterrors({
        Email: emailError,
      });
    } else if (!email.includes('@')) {
      return seterrors({
        Email: emailvalidation,
      });
    } else if (!password) {
      return seterrors({Password: passError});
    }
  };
  return (
    <View style={styles.loginStyle}>
      <KeyboardAvoidingView behavior="position">
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
              value={email}
              onChangeText={emailHandler}
              placeholder="Enter email"
            />
          </View>
          {errors.Email?.length > 0 && (
            <AppText style={styles.errorText}>{errors.Email}</AppText>
          )}

          {/* passowrd */}
          <View style={styles.inputcontainer}>
            <Text>Pending...</Text>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              onChangeText={passwordHandler}
              placeholder="Enter password"
            />
          </View>
          {errors.Password?.length > 0 && (
            <AppText style={styles.errorText}>{errors.Password}</AppText>
          )}

          <TouchableOpacity activeOpacity={0.5} onPress={forgotHandler}>
            <AppText style={styles.forgotText}>Forgot Password ?</AppText>
          </TouchableOpacity>
          <View style={styles.loginbtn}>
            <Button onPress={onSubmitLogin}>Login </Button>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={signupHandler}>
            <AppText style={styles.signupText}>
              Dont have an Account?
              <AppText style={{color: mycolors.blue, fontWeight: 'bold'}}>
                Signup here
              </AppText>
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  loginStyle: {
    padding: moderateScale(10),
    backgroundColor: mycolors.white,
    flex: 1,
  },
  imgStyle: {
    width: '100%',
    height: respHeight(45),
  },
  primaryInputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: screenheight < 700 ? moderateScale(10) : moderateScale(15),
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
  errorText: {
    color: mycolors.red,
  },
});

export default Login;
