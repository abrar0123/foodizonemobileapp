import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView} from 'react-native';
import AppText from '../../components/UI/AppText';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Smcard from '../../components/UI/SmallCard/smcard';
import Card from '../../components/UI/Card/Card';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import CartButton from '../../components/Buttons/AppButtons/CartButton';

const TrackOrder = () => {
  const loggedIn = useSelector(state => state.auth.loggedInCredential);
  const userOrderID = useSelector(state => state.cart.userOrderID);

  // console.log('userOrderID: --- ', userOrderID);

  const [fireStoreFood, setfireStoreFood] = useState([]);

  // console.log('loggedIn__', );
  useEffect(() => {
    const getMyOrder = async () => {
      try {
        const res = await firestore()
          .collection('AllFoodOrders')
          .doc(loggedIn.userId)
          .collection('userOrder')
          .doc(userOrderID)
          .collection('food')
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(e => {
              // console.log('dta_a_>>>New:\n\n', e.data());
              setfireStoreFood(e.data());
            });
          });
      } catch (error) {
        console.log('food__:err\n', error);
      }
    };
    getMyOrder();
  }, []);

  console.log('fireStoreFood__1:\n\n', fireStoreFood?.DeliverTo);

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
      {/* primary Header */}
      <View style={styles.primaryNotiContainer}>
        <AppText
          style={{
            fontWeight: 'bold',
            fontSize: scale(22),
            color: mycolors.white,
          }}>
          My Current Order
        </AppText>
        <Image style={{width: 65, height: 50}} source={imagesPath.kake} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* next */}
        <Smcard style={styles.ordersummaryContainer}>
          <AppText style={styles.deliveryText}>
            Delivery to: {fireStoreFood?.DeliverTo?.name}
          </AppText>
          <AppText style={{fontWeight: 'bold'}}>
            Delivery Address :{'  '}
            <AppText>{fireStoreFood?.DeliverTo?.address}</AppText>
          </AppText>
          <AppText style={{fontWeight: 'bold'}}>
            Estimated Delivery :
            <AppText>{fireStoreFood?.DeliverTo?.estimatedTime}</AppText>
          </AppText>
        </Smcard>

        <View style={styles.line} />

        {/* food items details */}

        <Smcard style={styles.ordersummaryContainer}>
          <AppText style={{...styles.deliveryText}}>BBQ Fast Food </AppText>
          <View style={styles.line} />

          <FlatList
            data={fireStoreFood?.UserFoodItems}
            renderItem={itemsRender}
          />
        </Smcard>
        {/* order summary 3 */}
        <Smcard style={styles.ordersummaryContainer}>
          <AppText style={{...styles.deliveryText}}>Order Summary</AppText>

          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>Items Total</AppText>
            <AppText>${fireStoreFood?.OrderSummary?.itemsTotal}</AppText>
          </View>

          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>Delivery Fee</AppText>
            <AppText>${fireStoreFood?.OrderSummary?.deliveryFee}</AppText>
          </View>
          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>Discount Voucher</AppText>
            <AppText>${fireStoreFood?.OrderSummary?.Voucher}</AppText>
          </View>
          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>Total Payment</AppText>
            <AppText>${fireStoreFood?.OrderSummary?.megaTotal}</AppText>
          </View>
        </Smcard>
        <CartButton style={{marginTop: 3}}>Track Your Order</CartButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkout: {
    // paddingHorizontal: respWidth(3),
    backgroundColor: mycolors.whitelight,
    flex: 1,
    // marginTop: moderateScale(10),
    justifyContent: 'space-between',
    // marginBottom: moderateScale(10),
  },
  primaryNotiContainer: {
    backgroundColor: mycolors.pink,
    paddingVertical: 10,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // apply shadow effect
    shadowColor: mycolors.black,
    shadowOffset: {
      height: 2,
      width: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
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

export default TrackOrder;
