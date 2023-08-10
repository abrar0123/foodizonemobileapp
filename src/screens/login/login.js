import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import pic from '../../assets/image/AsianFood.png';
import {moderateScale} from 'react-native-size-matters';
import mycolors from '../../styles/mycolors';
import Button from '../../components/UI/Button/Button';
import AppText from '../../components/UI/AppText/AppText';
import {
  respHeight,
  respWidth,
  screenheight,
} from '../../components/responsiveness/RespHeight';
import stackscreens from '../../constants/stackscreens';
import {useDispatch} from 'react-redux';
import {authActions} from '../../Redux/authSlice';
import {apiEndpoints, authApiKey} from '../../firebase_Configue';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const Login = ({navigation}) => {
  const [email, setemail] = useState('foodizone@gmail.com');
  const [password, setpassword] = useState('foodizone');
  const [showpassword, setshowpassword] = useState(true);
  const [errors, seterrors] = useState({Email: '', Password: ''});
  const [isLoading, setisLoading] = useState(false);

  const emailError = 'Empty Email not allowed';
  const emailvalidation = 'please enter valid Email';
  const passError = 'Empty Password not allowed';

  const Dispatch = useDispatch();

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
    if (errors.Email || errors.Password) {
      return;
    }
    logInAuthentication();
    firestreLoginCheck();
  };

  // Login user

  const logInAuthentication = async () => {
    try {
      const response = await fetch(
        `${apiEndpoints}/accounts:signInWithPassword?key=${authApiKey}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {'Content-Type': 'application/json'},
          returnSecureToken: true,
        },
      );

      const data = await response.json();

      // console.log('dataa__', data);
      if (data.error) {
        const error = `Authentication error : ${data.error.message.toLowerCase()}`;
        seterrors({Password: error});
        return;
      }
    } catch (error) {
      console.log('dataa__1', error);
    }
  };

  const firestreLoginCheck = () => {
    setisLoading(true);
    try {
      firestore()
        .collection('RegisterUsers')
        .where('email', '==', email)
        .where('password', '==', password)
        .get()
        .then(res => {
          Dispatch(authActions.login({loggedIn: res.docs[0].data()}));
          // console.log('login__here23:\n');
          Alert.alert('Founded', 'Your Email is Founded here');
          setisLoading(false);
        })
        .catch(e => {
          console.log('error31__:\n', e);
          Alert.alert(
            'User Not Found',
            'Maybe, your  email OR password is Incorrect',
          );
        });
    } catch (error) {
      console.log('error333', error);
    }
  };

  // console.log('error___23', errors);

  return (
    <View style={styles.loginStyle}>
      {isLoading && <CustomLoader />}
      <KeyboardAvoidingView behavior="position">
        <View style={styles.imgStyle}>
          <Image source={pic} style={styles.imgStyle} />
        </View>
        <View style={styles.primaryInputsContainer}>
          <View style={styles.inputcontainer}>
            <Entypo
              name="mail"
              size={25}
              color={mycolors.blue}
              style={{marginRight: respWidth(1.5)}}
            />
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
            <TouchableOpacity onPress={() => setshowpassword(!showpassword)}>
              <Entypo
                name={showpassword === false ? 'eye' : 'eye-with-line'}
                size={25}
                color={mycolors.blue}
                style={{marginRight: respWidth(1.5)}}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={showpassword}
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
