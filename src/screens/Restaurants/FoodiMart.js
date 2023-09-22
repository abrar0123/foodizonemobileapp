import React, {useEffect} from 'react';
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
  respHeight1,
  respWidth,
  respWidth1,
} from '../../components/responsiveness/RespHeight';
import {moderateScale, scale} from 'react-native-size-matters';
import {storedata} from './data';

import {useState} from 'react';

import stackscreens from '../../constants/stackscreens';
import {moderateScaleVertical} from '../../components/responsiveness copy/responsive';
// import {useGetDataQuery} from '../../Redux/rtxQuery/apiSliceProducts';

const FoodiMart = ({navigation}) => {
  const [selectIndex, setselectIndex] = useState({id: -1});

  // s1
  const selectHandler_goFoodie = (ind, bgc) => {
    setselectIndex({id: ind, bgc: bgc});
    navigation.navigate(stackscreens.foodiMartDetails1, {data: ind});
  };

  useEffect(() => {
    console.log('First');
    return () => {
    
    };
  }, []);

  // const {data} = useGetDataQuery();

  // console.log('rtxQuery__:', data);

  // console.log('select', selectIndex);

  // **************** Horizontal line render Item  ****************
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={selectHandler_goFoodie.bind(this, item.id, item.color)}
        activeOpacity={0.9}>
        <Smcard
          style={{
            ...styles.storeCardStyle,
            backgroundColor:
              item.id === selectIndex.id ? mycolors.pink : item.color,
          }}>
          <Image source={item.image} style={styles.img} />
          <AppText
            style={{
              ...styles.title,
              color:
                item.id === selectIndex.id ? mycolors.white : mycolors.white,
            }}>
            {item.name}
          </AppText>
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
        showsHorizontalScrollIndicator={false}
        data={storedata}
        contentContainerStyle={{
          paddingBottom: 15,
        }}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
      />
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

  // ------ horixontal renderItem
  storeCardStyle: {
    // width: respWidth1(200),
    // height: respHeight(18),
    // height: 170,
    height: moderateScaleVertical(170),
    // height: respHeight1(170),
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    width: respWidth(50),
    height: respHeight(23),
    resizeMode: 'center',
    padding: 10,
  },

  title: {
    fontSize: scale(27),
    paddingHorizontal: respWidth(3),
    paddingVertical: respHeight(1.1),
    fontWeight: 'bold',
    color: mycolors.white,
  },
});

export default FoodiMart;
