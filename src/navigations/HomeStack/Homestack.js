import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import stackscreens from '../../constants/stackscreens';
import Home1 from '../../screens/Home/Home1';
import Tabroutes from '../Tabroutes/tabroutes';
import FoodDetails from '../../screens/localMall/foodDetails.js/foodDetails';
import Checkout from '../../screens/checkout/Checkout';
import Myorder from '../../screens/MyOrder/myorder';
import Account from '../../screens/Profile/Account/Account';
// import AppText from '../../components/UI/AppText';
// import {AntDesign} from 'react-native-vector-icons';

import Icon from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/UI/AppText';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import VisionCamera from '../../screens/VisionCamera/VisionCamera';
import QrCode from '../../screens/QrCode/QrCode';
// import DeviceInfo from 'react-native-device-info';
import DeviceInfo from '../../screens/DeviceInfo.js/DeviceInfo';
const Homestack = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: mycolors.jaman},
        headerTintColor: mycolors.white,
        contentStyle: {backgroundColor: mycolors.gray},
      }}>
      <Stack.Screen
        name={stackscreens.tabRoutes}
        component={Tabroutes}
        options={{headerShown: false}}
      />
      <Stack.Screen name={stackscreens.Checkout} component={Checkout} />
      <Stack.Screen
        name={stackscreens.myorder}
        component={Myorder}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: mycolors.red},
          headerTintColor: mycolors.white,
          title: 'Favourite Places',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(stackscreens.Checkout)}>
              <AppText styles={{fontSize: 40, fontWeight: 'bold'}}>+</AppText>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name={stackscreens.account} component={Account} />
      <Stack.Screen
        name={stackscreens.qrcode}
        component={QrCode}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={stackscreens.deviceinfo}
        component={DeviceInfo}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={stackscreens.camera}
        component={VisionCamera}
        options={{headerShown: false}}
      />
      <Stack.Screen name={stackscreens.foodDetail} component={FoodDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homestack;
