import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import {foodCartActions} from '../../../ReduxSlice/cartSlice';
import {FlatList} from 'react-native';
import {respWidth} from '../../../components/responsiveness/RespHeight';
import Smcard from '../../../components/UI/SmallCard/smcard';
import {moderateScale} from 'react-native-size-matters';
import stackscreens from '../../../constants/stackscreens';

const Listfood = ({MyFood, Loader, navigation}) => {
  const HandleDetails = id => {
    navigation.navigate(stackscreens.foodDetail, {id: id});
  };

  // const userCart = useSelector((state) => state.foodcart.userFoodCart);
  // const cartIndex = useSelector((state) => state.cartIndex);

  // console.log("userCart____", userCart);

  // const dispatch = useDispatch();

  // const addToCart = (id, title, image, price) => {
  //   dispatch(
  //     foodCartActions.addToCart({
  //       id: id,
  //       title: title,
  //       image: image,
  //       quant: 1,
  //       price: price,
  //     })
  //   );
  //   // dispatch({ type: "addToCart", payload: { id: id, quant: 1 } });
  // };

  // const removeToCart = (id) => {
  //   // console.log("id_", id);
  //   dispatch(foodCartActions.deleteToCart({ id }));
  //   // dispatch({ type: "removeToCart", payload: { id: id, quant: 1 } });
  // };

  // const addToCartHandler = (productid) => {
  //   const updatedCartIndex = [...userFoodCart];
  //   const itemIndex = updatedCartIndex.findIndex((e) => e.id === productid);
  //   console.log("itemIndex___", itemIndex);
  //   if (itemIndex >= 0) {
  //     updatedCartIndex[itemIndex].cart++;
  //   } else {
  //     updatedCartIndex.push({ id: productid, cart: 1 });
  //   }
  //   // setUserFoodCart(updatedCartIndex);
  // };

  // const deleteToCartHandler = (pid) => {
  //   const updatedCartIndex = [...userFoodCart];
  //   const findIndex = updatedCartIndex.findIndex((e) => e.id === pid);
  //   console.log("findIndex", findIndex);
  //   if (findIndex >= 0) {
  //     if (updatedCartIndex[findIndex].cart > 0) {
  //       updatedCartIndex[findIndex].cart--;
  //     } else if (updatedCartIndex[findIndex].cart === 0) {
  //       updatedCartIndex.splice(findIndex, 1);
  //     }
  //     setUserFoodCart(updatedCartIndex);
  //   }
  // };

  const renderItem = ({item, index}) => {
    const imageUrl = `https://spoonacular.com/recipeImages/${item.image}`;
    const description = `The Top and best ${item.title} forever, you must enjoy once you place order `;

    // const mycarts = userCart && userCart.find((e) => e.id === item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={HandleDetails.bind(this, item.id)}>
        <Smcard style={styles.fastFoodCard}>
          <Image source={{uri: imageUrl}} style={styles.img} />
          <AppText lines={2} style={styles.title}>
            {item.title}
          </AppText>
          <AppText
            lines={3}
            style={{
              fontSize: 13,
              color: mycolors.grey,
              paddingHorizontal: 10,
            }}>
            {description}
          </AppText>
          <AppText lines={2} style={{...styles.title, marginBottom: 5}}>
            ${item.readyInMinutes}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={styles.cartcontainer}>
              <TouchableOpacity
              // onPress={deleteToCartHandler.bind(this, item.id, index)}
              // onPress={removeToCart.bind(this, item.id)}
              >
                {/* <AntDesign
            name="minuscircle"
            size={30}
            color={colors.jamanlight}
          /> */}
              </TouchableOpacity>

              {/* {mycarts && (
          <AppText style={{ color: colors.white }}>{mycarts.quant}</AppText>
        )} */}

              <TouchableOpacity
              // onPress={addToCartHandler.bind(this, item.id, index)}
              // onPress={addToCart.bind(
              //   this,
              //   item.id,
              //   item.title,
              //   imageUrl,
              //   item.readyInMinutes
              // )}
              >
                {/* <AntDesign
            name="pluscircle"
            size={30}
            color={colors.jamanlight}
          /> */}
              </TouchableOpacity>
            </View>
          </View>
        </Smcard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 700}}
        data={MyFood}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fastFoodCard: {
    width: respWidth(46),
    // height: 300,
    marginVertical: moderateScale(5),
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: moderateScale(3),
  },

  img: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 3,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});

export default Listfood;
