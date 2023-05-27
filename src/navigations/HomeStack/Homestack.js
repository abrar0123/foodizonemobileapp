import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import stackscreens from '../../constants/stackscreens';
import Home1 from '../../screens/Home/Home1';
import Tabroutes from '../Tabroutes/tabroutes';
import FoodDetails from '../../screens/localMall/foodDetails.js/foodDetails';
import Checkout from '../../screens/checkout/Checkout';
import Myorder from '../../screens/MyOrder/myorder';
import Account from '../../screens/Profile/Account/Account';
const Homestack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stackscreens.tabRoutes}
        component={Tabroutes}
        options={{headerShown: false}}
      />
      <Stack.Screen name={stackscreens.Checkout} component={Checkout} />
      <Stack.Screen name={stackscreens.myorder} component={Myorder} />
      <Stack.Screen name={stackscreens.account} component={Account} />
      <Stack.Screen name={stackscreens.foodDetail} component={FoodDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homestack;
