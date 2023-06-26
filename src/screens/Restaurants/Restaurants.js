import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
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
const allstoredata = cakes.concat(custom, brownie, chocolate);

const Restaurants = () => {
  const [selectIndex, setselectIndex] = useState({id: 0, bgc: mycolors.black});

  // console.log('data:\n', cakes.concat(custom, brownie));

  const selectHandler = (ind, bgc) => {
    setselectIndex({id: ind, bgc: bgc});
  };
  console.log('select', selectIndex);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={selectHandler.bind(this, item.id, item.color)}
        activeOpacity={0.9}>
        <Smcard
          style={{
            ...styles.storeCardStyle,
            backgroundColor:
              item.id === selectIndex.id ? item.color : mycolors.lightgrey,
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

  const renderCakes = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <View
          style={{
            ...styles.storeCakeStyle,
            backgroundColor: selectIndex.bgc,
          }}>
          <Image source={item.img} style={styles.cakeimg} />
          <AppText style={styles.cakeTitle}>{item.name}</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <Smcard style={{...styles.cardStyle, backgroundColor: selectIndex.bgc}}>
        <AppText style={{...styles.headerText}}>Jdk Store</AppText>
      </Smcard>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={storedata}
        contentContainerStyle={{
          paddingBottom: selectIndex.id === 0 ? respHeight(7) : 5,
        }}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />

      {selectIndex.id === 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: respHeight(38)}}
          data={allstoredata}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderCakes}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={
            selectIndex.id === 1
              ? cakes
              : selectIndex.id === 2
              ? custom
              : selectIndex.id === 3
              ? brownie
              : selectIndex.id === 4
              ? chocolate
              : selectIndex.id === 5 && gulabjamun
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
    backgroundColor: mycolors.white,
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

  // ------
  storeCardStyle: {
    width: respWidth(36),
    height: respHeight(18),
    borderRadius: 10,
    overflow: 'hidden',
    // paddingVertical: respHeight(1),
  },

  img: {
    width: respWidth(35),
    height: respHeight(22),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
    position: 'relative',
    bottom: respHeight(6),
    left: respHeight(7),
  },
  title: {
    fontSize: scale(18),
    paddingHorizontal: respWidth(3),
    paddingVertical: respHeight(1.1),

    fontWeight: 'bold',
    color: mycolors.white,
    position: 'relative',
    bottom: respHeight(10),
  },

  storeCakeStyle: {
    width: respWidth(44),
    height: respHeight(16.3),
    marginVertical: moderateScale(5),
    borderRadius: 10,
    overflow: 'hidden',
  },
  cakeimg: {
    width: '80%',
    height: respHeight(11),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cakeTitle: {
    fontSize: scale(18),
    alignSelf: 'center',
    // marginVertical: respWidth(0.6),
    fontWeight: 'bold',
    color: mycolors.white,
  },
});

export default Restaurants;
