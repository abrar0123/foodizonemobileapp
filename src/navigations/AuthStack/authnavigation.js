import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../../screens/splash/splash';
import Login from '../../screens/login/login';
import Register from '../../screens/register/register';
import stackscreens from '../../constants/stackscreens';
import AppText from '../../components/UI/AppText/AppText';
import mycolors from '../../styles/mycolors';
import Forgotpassword from '../../screens/forgotpass/forgotpassword';
import Home from '../../screens/Home/home';
import Localmall from '../../screens/localMall/localmall';
import FormikLogin from '../../screens/login/FormikLogin';

const Authnavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      // screenOptions={{
      //   headerStyle: {backgroundColor: mycolors.brown},
      //   headerTintColor: mycolors.white,
      //   sceneContainerStyle: {backgroundColor: mycolors.white},
      // }}
      initialRouteName={stackscreens.splash}>
      <Stack.Screen
        name={stackscreens.splash}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen name={stackscreens.formikLogin} component={FormikLogin} />
      <Stack.Screen name={stackscreens.login} component={Login} />
      <Stack.Screen name={stackscreens.register} component={Register} />
      <Stack.Screen name={stackscreens.forgotpass} component={Forgotpassword} />
      <Stack.Screen name={stackscreens.localmaall} component={Localmall} />
    </Stack.Navigator>
  );
};

export default Authnavigation;
