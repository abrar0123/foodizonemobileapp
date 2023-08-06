import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import {foodCartActions} from '../../../ReduxSlice/cartSlice';
import {FlatList} from 'react-native';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import Smcard from '../../../components/UI/SmallCard/smcard';
import {moderateScale} from 'react-native-size-matters';
import stackscreens from '../../../constants/stackscreens';
import imagesPath from '../../../constants/imagesPath';
import {scale} from 'react-native-size-matters';
import Button from '../../../components/UI/Button/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from '../../../Redux/cartSlice';
import Entypo from 'react-native-vector-icons/Entypo';

const Listfood = ({MyFood, navigation}) => {
  const foodCart = useSelector(state => state.cart.foodCart);
  const Dispatch = useDispatch();

  const itemIndex = 0;

  // ************  open detail section of each product  ************
  const HandleDetails = id => {
    navigation.navigate(stackscreens.foodDetail, {id: id});
  };

  // ************  Add to Cart In Redux ************
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

  // ************  Remove to Cart In Redux ************
  const removeToCartHandler = id => {
    Dispatch(cartActions.removeToCart({id: id}));
  };
  // ************  render FlatList  ************

  const renderItem = ({item}) => {
    const imageUrl = `${imagesPath.apiImage}/${item.image}`;
    const description = `The Top and best ${item.title} forever, you must enjoy once you place order `;

    const findItem = foodCart.find(e => e.id === item.id);
    return (
      <Smcard style={styles.fastFoodCard}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={HandleDetails.bind(this, item.id)}>
          <Image source={{uri: imageUrl}} style={styles.img} />
        </TouchableOpacity>
        <AppText lines={1} style={styles.title}>
          {item.title}
        </AppText>
        <AppText
          lines={1}
          style={{
            fontSize: scale(12),
            color: mycolors.grey,
            paddingHorizontal: respWidth(2),
          }}>
          {description}
        </AppText>
        <AppText
          lines={2}
          style={{
            ...styles.title,
            marginBottom: respHeight(2),
            color: mycolors.dgrey,
          }}>
          ${item.readyInMinutes}
        </AppText>
        {findItem?.quant ? (
          <React.Fragment>
            <View style={styles.addCartBtn}>
              <TouchableOpacity>
                <Entypo
                  name="minus"
                  size={30}
                  color={mycolors.white}
                  onPress={removeToCartHandler.bind(this, item.id)}
                />
              </TouchableOpacity>
              <AppText style={styles.addCartText}>
                {findItem ? findItem?.quant : 0}
              </AppText>

              <TouchableOpacity>
                <Entypo
                  name="plus"
                  size={30}
                  color={mycolors.white}
                  onPress={addTOCartHandler.bind(
                    this,
                    item.id,
                    item.title,
                    imageUrl,
                    item.readyInMinutes,
                  )}
                />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ) : (
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={addTOCartHandler.bind(
              this,
              item.id,
              item.title,
              imageUrl,
              item.readyInMinutes,
            )}>
            <AntDesign name="pluscircle" size={40} color={mycolors.pink} />
          </TouchableOpacity>
        )}
      </Smcard>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 140}}
        data={MyFood}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fastFoodCard: {
    width: respWidth(46),
    height: respHeight(30),
    marginVertical: respHeight(2),
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: respWidth(2),
  },

  img: {
    width: respWidth(40),
    height: respHeight(12),
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    resizeMode: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    fontSize: scale(18),
    paddingHorizontal: respWidth(0.5),
    fontWeight: 'bold',
  },
  circleButton: {
    backgroundColor: mycolors.red,
    borderRadius: 50,
  },
  addCartBtn: {
    backgroundColor: mycolors.pink,
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addCartText: {
    backgroundColor: mycolors.white,
    // color: black,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 25,
    fontWeight: '600',
    fontSize: scale(16),
    alignItems: 'center',
  },
});

export default Listfood;
