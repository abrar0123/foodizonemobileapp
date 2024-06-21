import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import MyTabsView from '../../screens/TabView/myTabsView';
import Restaurants from '../../screens/Restaurants/Restaurants';
import Notification from '../../screens/ChatNotification/Notification';
import ChatBot from '../../screens/chatBot/chatBot';
import UserChat from '../../screens/chatBot/userChat';
import UserOneChat from '../../screens/chatBot/UserOneChat';
import FoodiMart from '../../screens/Restaurants/FoodiMart';
import FoodiMartDetails from '../../screens/Restaurants/FoodiMartDetails';
import FormikLogin from '../../screens/login/FormikLogin';
import LineChart from '../../screens/ChartKit/LineChart';
import MyLineChart from '../../screens/ChartKit/LineChart';
import FoodiMartDetails1 from '../../screens/Restaurants/FoodiMartDetails1';
import NewFoodDetails from '../../screens/localMall/foodDetails.js/newFoodDetails';
import Bluetooth from '../../screens/SectionScreens/Bluetooth/Bluetooth';
import BluetoothPlx from '../../screens/SectionScreens/Bluetooth/BluetoothPlx';

const Homestack = () => {
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
      <Stack.Screen
        name={stackscreens.account}
        component={Account}
        options={{
          headerStyle: {backgroundColor: mycolors.orange},
        }}
      />
      <Stack.Screen
        name={'BluetoothPlx'}
        component={BluetoothPlx}
        options={{
          headerStyle: {backgroundColor: mycolors.orange},
        }}
      />

      <Stack.Screen
        name={stackscreens.bluetooth}
        component={Bluetooth}
        options={{
          headerStyle: {backgroundColor: mycolors.orange},
        }}
      />
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
      <Stack.Screen
        name={stackscreens.myTabsView}
        component={MyTabsView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={stackscreens.restaurant}
        component={Restaurants}
        options={{
          title: 'Best Restuarants',
          headerStyle: {backgroundColor: mycolors.pink},
        }}
      />
      <Stack.Screen
        name={stackscreens.foodiMartDetails}
        component={FoodiMartDetails}
        options={{
          title: 'Best FoodiMart Details',
          headerStyle: {backgroundColor: mycolors.pink},
        }}
      />
      <Stack.Screen
        name={stackscreens.foodiMartDetails1}
        component={FoodiMartDetails1}
        options={{
          title: 'Best FoodiMart Details',
          headerStyle: {backgroundColor: mycolors.pink},
        }}
      />
      <Stack.Screen
        name={stackscreens.foodiMart}
        component={FoodiMart}
        options={{
          title: 'Best Foodi Mart',
          headerStyle: {backgroundColor: mycolors.pink},
        }}
      />
      <Stack.Screen
        name={stackscreens.notification}
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={stackscreens.chatBot}
        component={ChatBot}
        options={{
          headerStyle: {backgroundColor: mycolors.silk},
        }}
      />
      <Stack.Screen
        name={stackscreens.userChat}
        component={UserChat}
        options={{
          headerStyle: {backgroundColor: mycolors.silk},
        }}
      />
      <Stack.Screen
        name={stackscreens.foodDetail}
        component={FoodDetails}
        options={{headerStyle: {backgroundColor: mycolors.red}}}
      />
      <Stack.Screen
        name={stackscreens.newfoodDetail}
        component={NewFoodDetails}
        options={{headerStyle: {backgroundColor: mycolors.red}}}
      />
      <Stack.Screen
        name={stackscreens.userOneChat}
        component={UserOneChat}
        options={{headerStyle: {backgroundColor: mycolors.silk}}}
      />
      <Stack.Screen
        name={stackscreens.lineChart}
        component={MyLineChart}
        options={{headerStyle: {backgroundColor: mycolors.silk}}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homestack;
