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
  respWidth,
  screenheight,
} from '../../components/responsiveness/RespHeight';
import stackscreens from '../../constants/stackscreens';
import {useDispatch} from 'react-redux';
import {authActions} from '../../Redux/authSlice';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import {DB, apiEndpoints, authApiKey} from '../../firebase_Configue';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment/moment';

const Register = ({navigation}) => {
  const [username, setusername] = useState('hamdanullah');
  const [email, setemail] = useState('hamdanullah@gmail.com');
  const [password, setpassword] = useState('hamdab123');
  const [showpassword, setshowpassword] = useState(true);
  const [errors, seterrors] = useState({Username: '', Email: '', Password: ''});
  const uid = uuid.v4();

  const usernameError = 'please enter valid username';
  const emailError = 'Empty Email not allowed';
  const emailvalidation = 'please enter valid Email';
  const passError = 'Empty Password not allowed';

  const Dispatch = useDispatch();

  const usernameHandler = event => {
    setusername(event);
    if (username.trim().length !== 0) {
      seterrors({Username: ''});
    }
  };

  const emailHandler = event => {
    setemail(event);
    if (email.trim().length !== 0) {
      seterrors({Email: ''});
    }
  };

  const passHandler = event => {
    setpassword(event);
    if (password.trim().length !== 0) {
      seterrors({Password: ''});
    }
  };

  const goLogin = () => {
    navigation.navigate(stackscreens.login);
  };
  //   console.log('work well', errors);

  const onSubmitLogin = event => {
    event.preventDefault();
    // if (!username && !email && !password) {
    //     return seterrors({
    //       Username: usernameError,
    //       Email: emailError,
    //       Password: passError,
    //     });
    //   } else
    if (!username) {
      return seterrors({
        Username: usernameError,
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

    //  submitted...

    Dispatch(
      authActions.login({email: email, password: password, username: uid}),
    );
    signupAuthentication();
    fireStoreRegisters();
  };

  // register user

  const signupAuthentication = async () => {
    try {
      const response = await fetch(
        `${apiEndpoints}/accounts:signUp?key=${authApiKey}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
          headers: {'Content-Type': 'application/json'},
        },
      );
      const data = await response.json();
      console.log('data__\n', data);
    } catch (error) {
      console.log(error, 'err');
    }
  };

  // store in firestore database

  const fireStoreRegisters = () => {
    const time = moment().format('lll');
    try {
      firestore()
        .collection('RegisterUsers')
        .doc(uid)
        .set({
          Time: time,
          email: email,
          password: password,
          username: username,
          userId: uid,
        })
        .then(e => console.log('resolve status__:\n', e))
        .catch(e => console.log('reject status__:\n', e));
    } catch (error) {
      console.log('error22:', error);
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
            <FontAwesome5
              name="user"
              size={25}
              color={mycolors.blue}
              style={{marginRight: respWidth(1.5)}}
            />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={usernameHandler}
              placeholder="Enter username"
            />
          </View>

          {errors.Username?.length > 0 && (
            <AppText style={styles.errorText}>{errors.Username}</AppText>
          )}
          <View style={styles.inputcontainer}>
            <Entypo
              name="mail"
              size={27}
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
                // name="eye"
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
              onChangeText={passHandler}
              placeholder="Enter Email"
            />
          </View>

          {errors.Password?.length > 0 && (
            <AppText style={styles.errorText}>{errors.Password}</AppText>
          )}

          <View style={styles.loginbtn}>
            <Button onPress={onSubmitLogin}>Register</Button>
          </View>

          <TouchableOpacity activeOpacity={0.5} onPress={goLogin}>
            <AppText style={styles.signupText}>
              Already have an Account?
              <AppText style={{color: mycolors.blue, fontWeight: 'bold'}}>
                Login
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
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: mycolors.white,
  },
  imgStyle: {
    width: '100%',
    // flex: 1,
    height: respHeight(45),
    resizeMode: 'contain',
  },
  primaryInputsContainer: {
    display: 'flex',
    // flex:2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // gap: moderateScale(15),
    // alignItems: 'center',
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
    width: '85%',
    fontSize: 18,
    fontWeight: '500',
    color: mycolors.black,
    paddingVertical: moderateScale(5), // auto 10 so we set
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
    // marginBottom:1,
    // backgroundColor: mycolors.jaman,
  },
});

export default Register;
