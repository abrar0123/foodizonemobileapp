import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  LogBox,
  Alert,
} from 'react-native';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import AppText from '../../components/UI/AppText';
import Smcard from '../../components/UI/SmallCard/smcard';
import {useDispatch, useSelector} from 'react-redux';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Card from '../../components/UI/Card/Card';
import CartButton from '../../components/Buttons/AppButtons/CartButton';
import {collection, addDoc} from 'firebase/firestore';
import {DB} from '../../firebase_Configue';
import SelectDropdown from 'react-native-select-dropdown';
import firestore from '@react-native-firebase/firestore';
import {insert} from 'formik';
import stackscreens from '../../constants/stackscreens';
import {cartActions} from '../../Redux/cartSlice';
import uuid from 'react-native-uuid';
import {authActions} from '../../Redux/authSlice';
const options = ['Gujrat', 'Lahore', 'LalaMosa', 'Islamabad'];

const Checkout = ({navigation}) => {
  const foodCart = useSelector(state => state.cart.foodCart);
  const loggedIn = useSelector(state => state.auth.loggedInCredential);
  const orderID = uuid.v4();
  console.log('uuid_:-', orderID);

  // console.log('myEmail__:', loggedIn);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectError, setselectError] = useState('');
  // console.log('selectedOption__', selectedOption);
  const Dispatch = useDispatch();
  const deliverTo = {
    name: 'Abrar Hussain',
    address: 'chak road shah e noor bazar shop 29, lahore,punjab',
    estimatedTime: '25 mins',
  };
  let total = 0;
  for (let items in foodCart) {
    total += foodCart[items].quant * foodCart[items].price;
  }

  const discount = total * 0.01;
  const megaTotal = total + 5 - discount;

  const OrderSummary = {
    itemsTotal: total,
    deliveryFee: '$5',
    Voucher: discount,
    megaTotal: megaTotal,
  };

  // ******************* Order Placed at Firestore *******************

  const orderPlaceAtFirestore = () => {
    if (selectedOption === null || selectedOption === '') {
      setselectError('City Must Select');
      return;
    }
    setselectError('');
    try {
      const UpdatedOrder = {
        DeliverTo: deliverTo,
        UserFoodItems: foodCart,
        OrderSummary: OrderSummary,
      };
      const res = firestore()
        .collection('AllFoodOrders')
        .doc(loggedIn.userId)
        .collection('userOrder')
        .doc(orderID)
        .collection('food')
        .add(UpdatedOrder);
      Dispatch(cartActions.placedOrder({orderID: orderID}));
      Dispatch(cartActions.removeFullCart());
      Alert.alert('Order Placed', 'your order is placed successfully', [
        {text: 'See', onPress: () => console.log('object')},
        {text: 'Track', onPress: () => console.log('object')},
        {text: 'Ok', onPress: () => navigation.navigate(stackscreens.home)},
      ]);
    } catch (error) {
      console.log('error__', error);
    }
    // const mycollection = collection(DB, 'userOrders');
    // try {
    //   const response = addDoc(mycollection, {
    //     UpdatedOrder: {
    //       DeliverTo: deliverTo,
    //       UserFoodItems: foodCart,
    //       OrderSummary: OrderSummary,
    //     },
    //   });
    //   response
    //     .then(e => console.log('resolved', e))
    //     .catch(e => console.log('reject', e));
    // } catch (error) {
    //   console.log('err', error);
    // }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

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
              Delivery to: {deliverTo.name}
            </AppText>
            <AppText style={{fontWeight: 'bold'}}>
              Delivery Address :{'  '}
              <AppText>{deliverTo.address}</AppText>
            </AppText>
            <AppText style={{fontWeight: 'bold'}}>
              Estimated Delivery : <AppText>{deliverTo.estimatedTime}</AppText>
            </AppText>
          </Smcard>
          {/* select drop down list  */}
          <SelectDropdown
            data={options}
            onSelect={(selectedItem, index) => {
              setSelectedOption(selectedItem);
              setselectError('');
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // Text to display after an option is selected
              return selectedItem;
            }}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownText}
            renderDropdownIcon={() => (
              <AppText style={styles.dropdownIcon}>▼</AppText>
            )}
          />
          {selectError && (
            <AppText style={{color: mycolors.red}}> {selectError}</AppText>
          )}

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
              <AppText>{OrderSummary.deliveryFee}</AppText>
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
      <CartButton onPress={orderPlaceAtFirestore}>Place Order</CartButton>
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
  dropdownButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  dropdownText: {
    color: 'black',
    fontSize: 16,
  },
  dropdownIcon: {
    fontSize: 16,
  },
});

export default Checkout;
