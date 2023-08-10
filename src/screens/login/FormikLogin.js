import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import pic from '../../assets/image/AsianFood.png';
import {Formik} from 'formik';
import * as Yup from 'yup';
import mycolors from '../../styles/mycolors';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  respHeight,
  respWidth,
  screenheight,
} from '../../components/responsiveness/RespHeight';
import imagesPath from '../../constants/imagesPath';
import {scale} from 'react-native-size-matters';
import {authActions} from '../../Redux/authSlice';
import {useDispatch} from 'react-redux';
import {apiEndpoints, authApiKey} from '../../firebase_Configue';
import firestore from '@react-native-firebase/firestore';
import AppText from '../../components/UI/AppText';
import {Button} from 'react-native-vector-icons/FontAwesome';
import stackscreens from '../../constants/stackscreens';
import {moderateScale} from 'react-native-size-matters';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const FormikLogin = ({navigation}) => {
  const [isPassword, setisPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [firebaseError, setfirebaseError] = useState({
    emailError: '',
    passwordError: '',
  });
  const Dispatch = useDispatch();

  const goforgotHandler = () => {
    navigation.navigate(stackscreens.forgotpass);
  };

  const gosignupHandler = () => {
    navigation.navigate(stackscreens.register);
  };

  // *****************  Form Data Submitted  *****************
  const onSubmitHandler = async values => {
    // console.log('formik data submitted__:', values);

    await logInAuthentication(values);
    await firestreLoginCheck(values);
    // firestreLoginCheck(values);
  };

  const logInAuthentication = async values => {
    try {
      const response = await fetch(
        `${apiEndpoints}/accounts:signInWithPassword?key=${authApiKey}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          headers: {'Content-Type': 'application/json'},
          returnSecureToken: true,
        },
      );
      const data = await response.json();

      console.log('dataa__', data);
      if (data.error) {
        const error = `Authentication Error ${data.error.message.toLowerCase()}`;
        if (data.error.message.includes('EMAIL_')) {
          return setfirebaseError({passwordError: '', emailError: error});
        } else if (data.error.message.includes('PASSWORD')) {
          return setfirebaseError({emailError: '', passwordError: error});
        }
        return setfirebaseError({passwordError: error});
      }
      setfirebaseError({emailError: '', passwordError: ''});
      console.log('logged IN');
    } catch (error) {
      console.log('dataa__1', error);
    }
  };

  const firestreLoginCheck = async values => {
    setisLoading(true);
    try {
      await firestore()
        .collection('RegisterUsers')
        .where('email', '==', values.email)
        .where('password', '==', values.password)
        .get()
        .then(res => {
          console.log('login__here23:\n', res);
          Dispatch(authActions.login({loggedIn: res.docs[0].data()}));
          Alert.alert('Founded', 'Your Email is Founded here');
        })
        .catch(e => {
          console.log('error31__:\n', e);
        });
      setisLoading(false);
    } catch (error) {
      console.log('error333', error);
    } finally {
      setisLoading(false);
    }
  };

  // *****************  Form Data Validation  *****************
  const validationshema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <React.Fragment>
      <ImageBackground
        source={imagesPath.background}
        style={{width: '100%', height: respHeight(100)}}>
        {/* {isLoading && <CustomLoader />} */}
        <Formik
          initialValues={{email: 'test1@gmail.com', password: ''}}
          validationSchema={validationshema}
          onSubmit={onSubmitHandler}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <View style={styles.loginStyle}>
              <KeyboardAvoidingView behavior="position">
                <View style={styles.imgStyle}>
                  <Image source={pic} style={styles.imgStyle} />
                </View>
                <View style={styles.primaryInputsContainer}>
                  <View style={styles.inputcontainer}>
                    <Entypo
                      name="mail"
                      size={30}
                      color={mycolors.blue}
                      style={{marginRight: respWidth(1.5)}}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                  </View>

                  {/* {touched.email && errors.email && (
                    <Text style={styles.errorText}>
                      {errors.email ? errors.email : firebaseError?.emailError}
                    </Text>
                  )} */}
                  {touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : (
                    firebaseError?.emailError && (
                      <Text style={styles.errorText}>
                        {firebaseError?.emailError}
                      </Text>
                    )
                  )}

                  <View style={styles.inputcontainer}>
                    <TouchableOpacity
                      onPress={() => setisPassword(!isPassword)}>
                      <Entypo
                        name={isPassword === false ? 'eye' : 'eye-with-line'}
                        size={30}
                        color={mycolors.blue}
                        style={{marginRight: respWidth(1.9)}}
                      />
                    </TouchableOpacity>

                    <TextInput
                      style={styles.input}
                      placeholder="Enter Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={isPassword}
                    />
                  </View>
                  {touched.password && errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : (
                    firebaseError?.passwordError && (
                      <Text style={styles.errorText}>
                        {firebaseError?.passwordError}
                      </Text>
                    )
                  )}

                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={goforgotHandler}>
                    <AppText style={styles.forgotText}>
                      Forgot Password ?
                    </AppText>
                  </TouchableOpacity>
                  <View style={styles.loginbtn}>
                    <Button onPress={handleSubmit}>Login </Button>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={gosignupHandler}>
                    <AppText style={styles.signupText}>
                      Dont have an Account?
                      <AppText
                        style={{color: mycolors.blue, fontWeight: 'bold'}}>
                        Signup here
                      </AppText>
                    </AppText>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </React.Fragment>
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
    gap: screenheight < 700 ? moderateScale(5) : moderateScale(10),
  },
  headerText: {
    textAlign: 'left',
    fontSize: 35,
    fontWeight: '700',
    color: '#18188d',
    marginBottom: 20,
  },

  inputcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: mycolors.black,
    paddingRight: 10,
  },
  input: {
    width: '90%',
    fontSize: scale(18),
    fontWeight: '500',
  },
  btn: {
    backgroundColor: mycolors.blue,
    padding: 10,
    color: 'white',
    width: 300,
    marginTop: 30,
    borderRadius: 5,
  },
  txt1: {
    fontSize: scale(20),
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
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
    color: mycolors.tomato2,
    fontSize: scale(15),
    position: 'relative',
    bottom: respHeight(1.5),
  },
});

export default FormikLogin;
