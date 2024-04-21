import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../components/UI/AppText';
import mycolors from '../../styles/mycolors';
import Smcard from '../../components/UI/SmallCard/smcard';

import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import {moderateScale, scale} from 'react-native-size-matters';
import {brownie, cakes, chocolate, custom, gulabjamun, storedata} from './data';

import {useState} from 'react';
import {StatusBar} from 'react-native';
import {BestFoods} from '../../assets/MainData/bestFoods';
import {Burger} from '../../assets/MainData/Burger';
import {Pizza} from '../../assets/MainData/Pizza';
import {Sandwitch} from '../../assets/MainData/Sandwitch';
import {IceCream} from '../../assets/MainData/IceCream';
import {useNavigation} from '@react-navigation/native';
import stackscreens from '../../constants/stackscreens';

const allstoredata = cakes.concat(custom, brownie, chocolate);

const Restaurants = () => {
  const [selectIndex, setselectIndex] = useState({id: 1});
  let bestFoods = BestFoods;
  let burger = Burger;
  let pizza = Pizza;
  let sandwitch = Sandwitch;
  let iceCream = IceCream;

  const navigation = useNavigation();

  const selectHandler = (ind, bgc) => {
    setselectIndex({id: ind, bgc: bgc});
  };

  //  **************** Horizontal line render Item  ****************
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={selectHandler.bind(this, item.id, item.color)}
        activeOpacity={0.9}>
        <Smcard
          style={{
            ...styles.storeCardStyle,
            backgroundColor:
              item.id === selectIndex.id ? mycolors.pink : mycolors.grey,
          }}>
          <Image source={item.image} style={styles.img} />
          <AppText
            style={{
              ...styles.title,
              color:
                item.id === selectIndex.id ? mycolors.white : mycolors.l2black,
            }}>
            {item.name}
          </AppText>
        </Smcard>
      </TouchableOpacity>
    );
  };

  // **************** Cakes data render Item  ****************
  const renderCakes = ({item, index}) => {
    // console.log('img__', item?.img);
    // const imageUrl = `${item.img}.jpg`;
    // p1
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(stackscreens.newfoodDetail, {oneFood: item})
        }>
        <Smcard style={styles.storeCakeStyle}>
          {/* sometime image not be displays because of error */}

          <Image source={{uri: item?.img}} style={styles.cakeimg} />
          <AppText lines={1} style={styles.cakeTitle}>
            {item.name}
          </AppText>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <AppText style={styles.cakeTitle}>{`$ ${item.price}`}</AppText>
            <AppText style={styles.cakeTitle}>{`${item.rate} s`}</AppText>
          </View>
          <AppText
            lines={1}
            style={styles.cakeTitle}>{`${item.country}`}</AppText>
        </Smcard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      {/* <Smcard style={{...styles.cardStyle, backgroundColor: selectIndex.bgc}}>
        <AppText style={{...styles.headerText}}>Jdk Store</AppText>
      </Smcard> */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={storedata}
        contentContainerStyle={{
          paddingBottom: selectIndex.id === 0 ? respHeight(7) : 15,
        }}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />
      <AppText style={styles.mainTitle}>Recommendation</AppText>
      {selectIndex.id === 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: respHeight(38)}}
          data={bestFoods?.splice(0, 17)}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderCakes}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
          data={
            selectIndex.id === 1
              ? burger.splice(0, 16)
              : selectIndex.id === 2
              ? pizza.splice(0, 16)
              : selectIndex.id === 3
              ? sandwitch.splice(0, 16)
              : selectIndex.id === 4
              ? sandwitch.splice(0, 16)
              : selectIndex.id === 5 && iceCream.splice(0, 16)
          }
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderCakes}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: respHeight(1.5),
    paddingTop: respHeight(2),
    // paddingTop: (Platform.OS = 'android' && StatusBar.currentHeight),
    backgroundColor: mycolors.whitelight,
  },
  headerText: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: mycolors.white,
  },

  cardStyle: {
    backgroundColor: mycolors.jaman,
    paddingHorizontal: respWidth(3),
    paddingVertical: respHeight(2.5),
    marginBottom: respHeight(2.5),
    borderRadius: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  // ------ horixontal renderItem
  storeCardStyle: {
    // width: respWidth(35),
    height: respHeight(5),
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    width: respWidth(10),
    height: respHeight(5),
    marginLeft: 5,
    resizeMode: 'center',
    // padding: 10,
  },
  title: {
    fontSize: scale(14),
    paddingHorizontal: respWidth(1.5),
    // paddingVertical: respHeight(1.1),
    color: mycolors.white,
  },

  // cakes data render
  storeCakeStyle: {
    width: respWidth(44),
    height: respHeight(30),
    backgroundColor: mycolors.white,
    marginVertical: moderateScale(5),
    borderRadius: 12,
    overflow: 'hidden',
    display: 'flex',
    gap: 10,
  },

  cakeimg: {
    width: '100%',
    height: respHeight(15),
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

export default Restaurants;
