import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground, Text, Dimensions, Pressable } from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { foodCartActions } from '../../../ReduxSlice/cartSlice';
import { FlatList } from 'react-native';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import Smcard from '../../../components/UI/SmallCard/smcard';
import { moderateScale } from 'react-native-size-matters';
import stackscreens from '../../../constants/stackscreens';
import imagesPath from '../../../constants/imagesPath';
import { scale } from 'react-native-size-matters';
import Button from '../../../components/UI/Button/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../Redux/cartSlice';
import Entypo from 'react-native-vector-icons/Entypo';

const Listfood = ({ MyFood, searched, userSearch, home, navigation }) => {
  const Dispatch = useDispatch();

  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  // ************  open detail section of each product  ************
  const HandleDetails = id => {
    navigation.navigate(stackscreens.foodDetail, { id: id });
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
    Dispatch(cartActions.removeToCart({ id: id }));
  };
  // ************  render FlatList  ************


  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 46) / 2; // margin: 16 + 16 + 8 spacing
  const cardWidth1 = (screenWidth - 46) / 1; // margin: 16 + 16 + 8 spacing

  const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';



  const renderItem = ({ item }) => {

    return <Pressable style={[styles.card, { width: cardWidth }]}
      onPress={() => navigation.navigate(stackscreens.newfoodDetail, { oneFood: item })
      }
    >
      <Image
        source={{ uri: `${TMDB_IMAGE_URL}${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  }

  const renderItem1 = ({ item }) => {

    return <Pressable
      style={[styles.card1, { width: respWidth(89) }]}
      onPress={() => navigation.navigate(stackscreens.newfoodDetail, { oneFood: item })
      }
    >
      <View style={{ width: respWidth(43) }}>

        <Image
          source={{ uri: `${TMDB_IMAGE_URL}${item.poster_path}` }}
          style={{ ...styles.image2, width: '96%', height: 90 }}
        />
      </View>

      <View >
        <Text style={{ ...styles.title, color: 'black', width: respWidth(30) }} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={{ ...styles.title, color: '#DBDBDF', width: respWidth(30) }} numberOfLines={1}>
          {genreMap[item.genre_ids[0]]}
        </Text>

      </View>
      <Image
        source={imagesPath.dots}
        style={{ resizeMode: 'contain', width: 20, height: 10 }}
      />
    </Pressable>
  }
  const renderItem2 = ({ item }) => {

    return <Pressable style={[styles.card, { width: cardWidth1, height: respHeight(22) }]}
      onPress={() => navigation.navigate(stackscreens.newfoodDetail, { oneFood: item })
      }
    >
      <Image
        source={{ uri: `${TMDB_IMAGE_URL}${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  }




  return (
    <View style={styles.container}>
      {(searched && userSearch.length > 0) &&
        <>
          <Text style={{ color: 'black', marginBottom: 10, fontWeight: '500' }}>Top Results</Text>
          <View style={{ width: '100%', backgroundColor: '#0000001C', height: 1, marginBottom: 20 }} />
        </>

      }
      {(searched && userSearch.length < 1) &&
        <Text style={{ color: 'black', marginBottom: 10, marginStart: 100, fontWeight: '500' }}>No Movies Founded</Text>}


      <FlatList
        key={home ? 'list3' : searched ? 'list1' : 'list2'} // 👈 This forces re-render
        contentContainerStyle={{ paddingBottom: 100 }}
        data={MyFood}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={home ? renderItem2 : searched ? renderItem1 : renderItem}
        numColumns={(searched || home) ? 1 : 2}
        columnWrapperStyle={(!searched && !home) ? { justifyContent: 'space-between' } : null}

      />

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#F2F2F6',
  },
  card: {
    height: 100,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  card1: {
    height: 100,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  image2: {
    // flex: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    // width: '100%',
    padding: 8,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

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
    fontSize: scale(14),
    paddingHorizontal: respWidth(0.5),
    fontWeight: '500',
    color: '#FFFFFF',
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
