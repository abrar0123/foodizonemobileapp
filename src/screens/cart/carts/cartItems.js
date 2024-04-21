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
import {
  height,
  width,
} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const CartItems = ({userFoodCart}) => {
  const dispatch = useDispatch();

  const addToCart = id => {
    dispatch(cartActions.addToCart({id: id}));
  };
  const removeToCart = id => {
    dispatch(cartActions.removeToCart({id: id}));
  };

  const deleteProduct = id => {
    dispatch(cartActions.deleteProduct({id: id}));
  };

  const renderItem = ({item}) => {
    const myCart = userFoodCart.find(cart => cart.id === item.id);

    return (
      <View style={styles.mainContainer} key={item.id}>
        <View style={styles.boxCard}>
          {/* 1st  */}
          <Smcard
            style={{
              width: respWidth(32),
              backgroundColor: mycolors.green100,
              borderRadius: 10,
              paddingVertical: 10,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={{uri: item.url}} style={styles.img} />
          </Smcard>
          {/*  2nd  */}
          <View
            style={{
              width: '60%',
            }}>
            <View
              style={{
                paddingRight: 10,
                width: '60%',
              }}>
              <AppText lines={2} style={styles.titleText}>
                {item.title}
              </AppText>
            </View>
            <AppText style={styles.idtextStyle}>Price: ${item.price}</AppText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: '30%',
                marginBottom: 6,
              }}>
              <AppText style={styles.idtextStyle}>${item.subtotal}</AppText>
              {/* p1 */}
              <View style={{...styles.cartContainer}}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={removeToCart.bind(this, item.id)}>
                  <View style={styles.iconContainer}>
                    <AppText style={{fontSize: 25, color: mycolors.black}}>
                      -
                    </AppText>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: mycolors.green100,
                    paddingHorizontal: moderateScale(14),
                    paddingVertical: respHeight(0.5),
                  }}>
                  <AppText
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: mycolors.black,
                    }}>
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
        </View>
      </View>
    );
  };

  const renderHiddenItems = ({item}) => {
    return (
      <View style={styles.deletbtn}>
        <Smcard
          style={{
            backgroundColor: mycolors.red,
            height: respHeight(13.5),
            marginHorizontal: respHeight(2.5),
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: respWidth(10),
          }}>
          <TouchableOpacity
            style={{position: 'relative', right: -25, top: 40}}
            onPress={deleteProduct.bind(this, item.id)}>
            <Image
              style={{
                width: 45,
                height: 45,
                tintColor: mycolors.white,
              }}
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
        contentContainerStyle={{paddingBottom: 150}}
        data={userFoodCart}
        renderHiddenItem={renderHiddenItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        rightOpenValue={-100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deletbtn: {
    alignItems: 'center',
    backgroundColor: mycolors.white,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    // marginHorizontal: 10,
  },
  mainContainer: {
    width: respWidth(95),
    marginHorizontal: respWidth(2),
    height: respHeight(14),
    paddingHorizontal: moderateScale(4),
    backgroundColor: mycolors.whitelight,
    paddingVertical: '2%',
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
    color: mycolors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  idtextStyle: {
    color: mycolors.blue,
    fontSize: 19,
    fontWeight: 'bold',
  },

  img: {
    height: '80%',
    width: '60%',
    borderRadius: 10,
    resizeMode: 'center',
  },

  boxCard: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // marginTop: 20,
  },

  //

  cartContainer: {
    // paddingHorizoratingContainerntal: moderateScale(4),
    backgroundColor: mycolors.green100,
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 2,
    justifyContent: 'space-between',
  },
  cartStyle: {
    backgroundColor: mycolors.green100,
  },
  iconContainer: {
    backgroundColor: mycolors.white,
    paddingHorizontal: moderateScale(12),
    borderRadius: 10,
  },
  iconContainer2: {
    backgroundColor: mycolors.jaman,
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
  },
});

export default CartItems;
