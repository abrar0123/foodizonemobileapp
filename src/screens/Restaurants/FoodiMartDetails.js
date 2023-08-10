import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BestFoods} from '../../assets/MainData/bestFoods';
import {Burger} from '../../assets/MainData/Burger';
import {Pizza} from '../../assets/MainData/Pizza';
import {Sandwitch} from '../../assets/MainData/Sandwitch';
import {IceCream} from '../../assets/MainData/IceCream';
import Smcard from '../../components/UI/SmallCard/smcard';
import AppText from '../../components/UI/AppText';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import {moderateScale, scale} from 'react-native-size-matters';
import mycolors from '../../styles/mycolors';
import {useGetAllProductsQuery} from '../../Redux/rtxQuery/apiSliceProducts';

const FoodiMartDetails = ({route}) => {
  const {data} = route.params;
  let bestFoods = BestFoods;
  let burger = Burger;
  let pizza = Pizza;
  let sandwitch = Sandwitch;
  let iceCream = IceCream;
  bestFoods.length = 16;
  burger.length = 16;
  pizza.length = 16;
  iceCream.length = 16;



  // **************** Cakes data render Item  ****************

  const renderCakes = ({item, index}) => {
    // console.log('img__', item?.img);
    // const imageUrl = `${item.img}.jpg`;
    // console.log('useGetAllProductsQuery__', useGetAllProductsQuery);

    return (
      <TouchableOpacity activeOpacity={0.9}>
        <Smcard style={styles.storeCakeStyle}>
          {/* sometime image not be displays because of error */}

          <Image source={{uri: item?.img}} style={styles.cakeimg} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <AppText lines={1} style={styles.cakeTitle}>
              {item.name}
            </AppText>
            <AppText style={styles.cakeTitle}>{`$ ${item.price}`}</AppText>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <AppText
              lines={1}
              style={styles.cakeTitle}>{`${item.country}`}</AppText>
            <AppText
              lines={1}
              style={styles.cakeTitle}>{`${item.rate} s`}</AppText>
          </View>
        </Smcard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.homeStyle}>
      {
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
          data={
            data === 1
              ? burger
              : data === 2
              ? pizza
              : data === 3
              ? sandwitch
              : data === 4
              ? sandwitch
              : data === 5 && iceCream
          }
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderCakes}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    paddingHorizontal: respWidth(3),
    backgroundColor: mycolors.whitelight,
    // flex: 1,
  },
  // cakes data render
  storeCakeStyle: {
    width: respWidth(94),
    height: respHeight(35),
    backgroundColor: mycolors.white,
    marginVertical: moderateScale(5),
    borderRadius: 12,
    overflow: 'hidden',
    display: 'flex',
    gap: 10,
  },

  cakeimg: {
    width: '100%',
    height: respHeight(23),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  cakeTitle: {
    fontSize: scale(18),
    alignSelf: 'center',
    // marginVertical: respWidth(0.6),
    fontWeight: 'bold',
    color: mycolors.black,
  },
});

export default FoodiMartDetails;
