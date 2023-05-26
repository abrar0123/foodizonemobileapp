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

const Listfood = ({MyFood, navigation}) => {
  const HandleDetails = id => {
    navigation.navigate(stackscreens.foodDetail, {id: id});
  };

  const renderItem = ({item}) => {
    const imageUrl = `${imagesPath.apiImage}/${item.image}`;
    const description = `The Top and best ${item.title} forever, you must enjoy once you place order `;

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
        </Smcard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 140}}
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
    height: respHeight(35),
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
