import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import AppText from '../../components/UI/AppText';
import CartItems from './carts/cartItems';
import Button from '../../components/UI/Button/Button';
// import {callFirebaseFn} from '../../ReduxSlice/myActions';
import mycolors from '../../styles/mycolors';
import {moderateScale} from 'react-native-size-matters';
import imagesPath from '../../constants/imagesPath';
import SafeArea from '../../components/Safearea/SafeArea';
import {respHeight} from '../../components/responsiveness/RespHeight';

const MainCart = () => {
  //   const cartIndex = useSelector(state => state.foodcart.cartIndex);
  const userFoodCart = useSelector(state => state.cart.foodCart);

  let total = 0;

  for (let items in userFoodCart) {
    total += userFoodCart[items].quant * userFoodCart[items].price;
  }

  const orderPlaceHandler = () => {
    console.log('orderPlaceHandler__successfully');
    // callFirebaseFn();
  };

  return (
    <SafeArea>
      <View style={styles.MainCartcontainer}>
        <View style={styles.main2cart}>
          <AppText style={styles.mainTextstyle}>Your Food Cart</AppText>

          <CartItems userFoodCart={userFoodCart} />
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.cartbtn}>
              <AppText
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: mycolors.white,
                }}>
                Check out {`( Total : $${total} )`}
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainCartcontainer: {
    paddingHorizontal: moderateScale(10),
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
