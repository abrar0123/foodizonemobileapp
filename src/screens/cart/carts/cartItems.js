import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../../components/UI/AppText';
import {useDispatch} from 'react-redux';
import {cartActions} from '../../../Redux/cartSlice';
import Card from '../../../components/UI/Card/Card';
import {SwipeListView} from 'react-native-swipe-list-view';
import Smcard from '../../../components/UI/SmallCard/smcard';
import mycolors from '../../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import imagesPath from '../../../constants/imagesPath';
import {moderateScale} from 'react-native-size-matters';

const CartItems = ({userFoodCart}) => {
  const dispatch = useDispatch();

  const addToCart = id => {
    dispatch(cartActions.addToCart({id: id}));
  };
  console.log('userFoodCart__', userFoodCart);
  const removeToCart = id => {
    dispatch(cartActions.removeToCart({id: id}));
  };

  const deleteProduct = id => {
    dispatch(cartActions.deleteProduct({id: id}));
  };

  const renderItem = ({item}) => {
    const myCart = userFoodCart.find(cart => cart.id === item.id);

    return (
      <Smcard style={styles.mainContainer} key={item.id}>
        <View style={styles.boxCard}>
          {/* 1st  */}
          <View style={{width: respWidth(45)}}>
            <Image source={{uri: item.url}} style={styles.img} />
          </View>
          {/*  2nd  */}
          <View style={{width: '48%'}}>
            <View>
              <AppText lines={2} style={styles.titleText}>
                {item.title}
              </AppText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <AppText style={styles.idtextStyle}>${item.price}</AppText>
              <AppText style={styles.idtextStyle}>${item.subtotal}</AppText>
            </View>
            {/* button style */}

            {/* carts */}
            <View style={{...styles.ratingContainer}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={removeToCart.bind(this, item.id)}>
                <View style={styles.iconContainer}>
                  <AppText style={{fontSize: 25, color: mycolors.white}}>
                    -
                  </AppText>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: mycolors.jaman,
                  paddingHorizontal: moderateScale(14),
                  paddingVertical: moderateScale(4.6),
                }}>
                <AppText style={{fontSize: 18, color: mycolors.white}}>
                  {myCart?.quant ? myCart.quant : 0}
                </AppText>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={addToCart.bind(this, item.id)}>
                <View style={styles.iconContainer2}>
                  <AppText style={{fontSize: 25, color: mycolors.white}}>
                    +
                  </AppText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Smcard>
    );
  };

  const renderHiddenItems = ({item}) => {
    return (
      <View style={styles.deletbtn}>
        <Smcard
          style={{
            backgroundColor: mycolors.red,
            height: respHeight(19),
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            paddingHorizontal: 30,
            paddingVertical: 50,
          }}>
          <TouchableOpacity onPress={deleteProduct.bind(this, item.id)}>
            <Image
              style={{width: 45, height: 45, tintColor: mycolors.white}}
              source={imagesPath.delete}
            />
          </TouchableOpacity>
        </Smcard>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SwipeListView
        contentContainerStyle={{paddingBottom: 50}}
        data={userFoodCart}
        renderHiddenItem={renderHiddenItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        rightOpenValue={-80}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deletbtn: {
    alignItems: 'center',
    backgroundColor: mycolors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  mainContainer: {
    width: respWidth(95),
    // width: '100%',
    aspectRatio: 2.5,
    marginVertical: '2%',
    borderRadius: 10,
  },
  cartcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    borderRadius: 3,
    backgroundColor: mycolors.mxprimary,
  },
  titleText: {
    // width: '100%',
    color: mycolors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  idtextStyle: {
    color: mycolors.blue,
    fontSize: 19,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  img: {
    height: '88%',
    borderRadius: 5,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 13,
  },

  boxCard: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // alignItems: "center",
    marginTop: 20,
  },

  //

  ratingContainer: {
    // paddingHorizontal: moderateScale(4),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    backgroundColor: mycolors.jaman,
    // paddingVertical: moderateScale(1.4),
    paddingHorizontal: moderateScale(15),
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
  },
  iconContainer2: {
    backgroundColor: mycolors.jaman,
    paddingHorizontal: moderateScale(15),
    // paddingVertical: moderateScale(1.4),
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
  },
});

export default CartItems;
