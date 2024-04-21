import React from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import AppText from '../../components/UI/AppText';
import CartItems from './carts/cartItems';
import mycolors from '../../styles/mycolors';
import {moderateScale} from 'react-native-size-matters';
import imagesPath from '../../constants/imagesPath';
import SafeArea from '../../components/Safearea/SafeArea';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import stackscreens from '../../constants/stackscreens';
import CartButton from '../../components/Buttons/AppButtons/CartButton';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomSheet from '../../components/BottomSheet/BottomSheet';

const MainCart = ({navigation}) => {
  //   const cartIndex = useSelector(state => state.foodcart.cartIndex);
  const userFoodCart = useSelector(state => state.cart.foodCart);

  const goCheckoutHandler = () => {
    navigation.navigate(stackscreens.Checkout);
  };
  let total = 0;

  for (let items in userFoodCart) {
    total += userFoodCart[items].quant * userFoodCart[items].price;
  }

  return (
    <SafeArea>
      <View style={styles.MainCartcontainer}>
        <View style={styles.main2cart}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: respWidth(28),
              marginBottom: 15,
              paddingHorizontal: moderateScale(10),
            }}>
            <Pressable
              style={{
                padding: 6,
                borderRadius: 50,
                backgroundColor: mycolors.green100,
              }}>
              <Entypo size={35} color={mycolors.jaman} name="chevron-left" />
            </Pressable>
            <AppText style={styles.mainTextstyle}>My Cart </AppText>
          </View>
          <CartItems userFoodCart={userFoodCart} />
        </View>
        <BottomSheet total={total} goCheckoutHandler={goCheckoutHandler} />
        {/* p1 */}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainCartcontainer: {
    flex: 1,
    backgroundColor: mycolors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main2cart: {
    height: respHeight(67),
  },
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTextstyle: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: mycolors.jaman,
    alignSelf: 'center',
  },
  cartbtn: {
    backgroundColor: mycolors.jaman,
    // width: respWidth(50),
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(5),
  },
});

export default MainCart;
