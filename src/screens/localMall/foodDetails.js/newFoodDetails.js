import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
import {moderateScale, scale} from 'react-native-size-matters';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import {useDispatch, useSelector} from 'react-redux';
import Rating from 'react-native-easy-rating';
import {cartActions} from '../../../Redux/cartSlice';
import {useNavigation} from '@react-navigation/native';

const NewFoodDetails = ({route}) => {
  const myFood = useSelector(state => state.foodapi.foodapidata);
  const foodCart = useSelector(state => state.cart.foodCart);

  const navigation = useNavigation();
  const Dispatch = useDispatch();

  const addTOCartHandler = (id, title, image, price) => {
    Dispatch(
      cartActions.addToCart({
        id: id,
        title,
        url: image,
        quant: 1,
        price: price,
        subtotal: price * 1,
      }),
    );
  };

  const removeToCartHandler = id => {
    Dispatch(cartActions.removeToCart({id: id}));
  };

  const backHandler = () => {
    navigation.goBack();
  };
  const {oneFood} = route.params;
  const FoodQuant = foodCart.find(food => food.id === oneFood.id);

  console.log('oneFood100  >>> ', oneFood);
  const handleStar =
    oneFood.servings * 1 > 6 ? oneFood.servings / 2 : oneFood.servings;

  return (
    <View style={styles.mainDetails}>
      <View style={styles.secondaryContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: oneFood.img}} style={styles.imgStyle} />
          </View>

          <AppText lines={1} style={styles.welcomText}>
            {oneFood.title}
          </AppText>
          <AppText style={styles.descriptionText}>
            Best pizza forever , this pizza is just for you , very delicious and
            even have too much tasty , just try once pizza, please go order and
            enjoy best pizza
          </AppText>

          <View
            style={{
              ...styles.ratingContainer,
              position: 'relative',
              bottom: respHeight(12),
            }}>
            <AppText style={{fontSize: 18, fontWeight: 'bold'}}>
              Price{'  '} ${oneFood.price}
            </AppText>
            <View style={{...styles.ratingContainer}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={removeToCartHandler.bind(this, oneFood.id)}>
                <View style={styles.iconContainer}>
                  <AppText style={{fontSize: 25, color: mycolors.white}}>
                    -
                  </AppText>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: mycolors.red,
                  paddingHorizontal: moderateScale(12),
                  paddingVertical: moderateScale(9),
                }}>
                <AppText style={{fontSize: 18, color: mycolors.white}}>
                  {FoodQuant?.quant ? FoodQuant.quant : 0}
                </AppText>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={addTOCartHandler.bind(
                  this,
                  oneFood.id,
                  oneFood.dsc,
                  oneFood.img,
                  oneFood.rate,
                )}>
                <View style={styles.iconContainer2}>
                  <AppText style={{fontSize: 25, color: mycolors.white}}>
                    +
                  </AppText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              ...styles.ratingContainer,
              position: 'relative',
              bottom: respHeight(12),
            }}>
            <AppText style={{fontSize: 18, fontWeight: 'bold'}}>
              Delivery Time {'   '}
              <AppText style={{color: mycolors.l2black}}>
                {' '}
                {oneFood.rate} Mins
              </AppText>
            </AppText>
          </View>
          <View
            style={{
              alignSelf: 'center',
              position: 'relative',
              bottom: respHeight(12),
            }}>
            <Rating
              rating={handleStar}
              max={6}
              style={{marginHorizental: 10}}
            />
            {/* <AppText style={{fontWeight: 'bold'}}>rating(190)</AppText> */}
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={0.7} onPress={backHandler}>
            <View style={styles.cartbtn}>
              <AppText
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: mycolors.white,
                }}>
                Add to Cart {FoodQuant?.subtotal && `$${FoodQuant?.subtotal}`}
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDetails: {
    flex: 1,
    backgroundColor: mycolors.red,
  },
  secondaryContainer: {
    marginTop: respHeight(20),
    backgroundColor: mycolors.white,
    justifyContent: 'space-between',
    paddingBottom: moderateScale(5),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    paddingHorizontal: moderateScale(10),
    display: 'flex',
    flexDirection: 'column',
    gap: respHeight(1.9),

    // justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: mycolors.red,
    paddingVertical: moderateScale(4.5),
    paddingHorizontal: moderateScale(15),
    borderTopLeftRadius: moderateScale(25),
    borderBottomLeftRadius: moderateScale(25),
  },
  iconContainer2: {
    backgroundColor: mycolors.red,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(4.4),
    borderTopRightRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
  },
  ratingContainer: {
    paddingHorizontal: moderateScale(4),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartbtn: {
    backgroundColor: mycolors.primaryorange,
    // width: respWidth(50),
    paddingHorizontal: moderateScale(105),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(25),
    position: 'relative',
    bottom: respHeight(8),
  },
  imageContainer: {
    width: '75%',
    height: respHeight(34),
    padding: 10,
    backgroundColor: mycolors.lightgrey,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    position: 'relative',
    bottom: respHeight(14),
    borderRadius: moderateScale(155),
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: moderateScale(155),
  },
  welcomText: {
    fontSize: scale(22),
    fontWeight: '700',
    paddingHorizontal: moderateScale(5),
    position: 'relative',
    bottom: respHeight(12),
    // alignSelf: 'center',
  },
  descriptionText: {
    textAlign: 'justify',
    // paddingHorizontal: moderateScale(4),
    position: 'relative',
    width: '85%',
    alignSelf: 'center',
    bottom: respHeight(15),
  },
  gobtn: {
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
});

export default NewFoodDetails;
