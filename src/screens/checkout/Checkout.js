import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
  LogBox,
} from 'react-native';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import AppText from '../../components/UI/AppText';
import Smcard from '../../components/UI/SmallCard/smcard';
import {useSelector} from 'react-redux';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Card from '../../components/UI/Card/Card';
import CartButton from '../../components/Buttons/AppButtons/CartButton';

const Checkout = () => {
  const foodCart = useSelector(state => state.cart.foodCart);
  //   console.log('foodCart', foodCart);
  let total = 0;
  for (let items in foodCart) {
    total += foodCart[items].quant * foodCart[items].price;
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const discount = total * 0.01;
  const megaTotal = total + 5 - discount;

  const itemsRender = ({item}) => {
    return (
      <React.Fragment>
        <Card
          style={{
            flexDirection: 'row',
            gap: moderateScale(10),
          }}>
          <Image source={{uri: item.url}} style={styles.imageStyle} />
          <View style={styles.secondView}>
            <AppText lines={1}>{item?.title}</AppText>
            <View style={styles.itemsDetailContainer}>
              <AppText>${item.price}</AppText>
              <AppText>Qty:{item.quant}</AppText>
            </View>
            <View style={styles.itemsDetailContainer}>
              <AppText>subtotal</AppText>
              <AppText> ${item.subtotal}</AppText>
            </View>
          </View>
        </Card>
        <View style={styles.line}></View>
      </React.Fragment>
    );
  };
  return (
    <View style={styles.checkout}>
      <View style={styles.secondCheckout}>
        {/* card 1 */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Smcard style={styles.ordersummaryContainer}>
            <AppText style={styles.deliveryText}>
              Delivery to: Abrar Hussain
            </AppText>
            <AppText style={{fontWeight: 'bold'}}>
              Delivery Address :{'  '}
              <AppText>
                chak road shah e noor bazar shop 29, lahore,punjab
              </AppText>
            </AppText>
            <AppText style={{fontWeight: 'bold'}}>
              Estimated Delivery : <AppText>25 mins</AppText>
            </AppText>
          </Smcard>
          {/* food items details */}

          <Smcard style={styles.ordersummaryContainer}>
            <AppText style={{...styles.deliveryText}}>BBQ Fast Food </AppText>
            <View style={styles.line} />

            <FlatList data={foodCart} renderItem={itemsRender} />
          </Smcard>

          {/* card 3 */}

          <Smcard style={styles.ordersummaryContainer}>
            <AppText style={{...styles.deliveryText}}>Order Summary</AppText>

            <View style={{...styles.itemsDetailContainer}}>
              <AppText style={styles.orderText}>Items Total</AppText>
              <AppText>${total}</AppText>
            </View>

            <View style={{...styles.itemsDetailContainer}}>
              <AppText style={styles.orderText}>Delivery Fee</AppText>
              <AppText>$5</AppText>
            </View>
            <View style={{...styles.itemsDetailContainer}}>
              <AppText style={styles.orderText}>Discount Voucher</AppText>
              <AppText>-${discount}</AppText>
            </View>
            <View style={{...styles.itemsDetailContainer}}>
              <AppText style={styles.orderText}>Total Payment</AppText>
              <AppText>${megaTotal}</AppText>
            </View>
          </Smcard>
        </ScrollView>

        {/* view 2 */}
      </View>
      <CartButton>Place Order</CartButton>
    </View>
  );
};

const styles = StyleSheet.create({
  checkout: {
    paddingHorizontal: respWidth(3),
    backgroundColor: mycolors.whitelight,
    flex: 1,
    // marginTop: moderateScale(10),
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  secondCheckout: {
    display: 'flex',
    flexDirection: 'column',
    gap: moderateScale(10),

    height: respHeight(80),
  },
  deliveryText: {
    fontSize: scale(20),
    fontWeight: 'bold',

    // alignSelf: 'center',
  },
  itemsDetailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: respWidth(30),
    height: respHeight(12),
    resizeMode: 'contain',
  },
  line: {
    borderBottomColor: mycolors.grey,
    borderBottomWidth: 1,
    marginVertical: moderateVerticalScale(10),
  },
  ordersummaryContainer: {
    flexDirection: 'column',
    gap: respHeight(1.2),
    padding: moderateScale(10),
    borderRadius: moderateScale(7),
    shadowColor: mycolors.grey,
    marginVertical: respWidth(1.3),
  },
  orderText: {
    fontSize: 16,
  },
  secondView: {
    width: respWidth(55),
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    // gap: 10,
  },
});

export default Checkout;
