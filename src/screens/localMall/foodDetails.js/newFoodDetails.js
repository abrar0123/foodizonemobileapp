import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, ImageBackground, Text } from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
import { moderateScale, scale } from 'react-native-size-matters';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-native-easy-rating';
import { cartActions } from '../../../Redux/cartSlice';
import { useNavigation } from '@react-navigation/native';
import imagesPath from '../../../constants/imagesPath';
import stackscreens from '../../../constants/stackscreens';

const NewFoodDetails = ({ route }) => {
  const myFood = useSelector(state => state.foodapi.foodapidata);
  const foodCart = useSelector(state => state.cart.foodCart);

  // const [oneFood, setoneFood] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const fetchoneFoodDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.theoneFooddb.org/3/oneFood/${oneFood.id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      // setoneFood(data);
    } catch (error) {
      console.error('oneFood Details Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchoneFoodDetails();
  }, []);

  const navigation = useNavigation();
  const Dispatch = useDispatch();

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

  const removeToCartHandler = id => {
    Dispatch(cartActions.removeToCart({ id: id }));
  };

  const getRandomColor = () => {
    const colors = ['#FFC107', '#03A9F4', '#E91E63', '#4CAF50', '#9C27B0', '#FF5722', '#00BCD4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const backHandler = () => {
    navigation.goBack();
  };

  const { oneFood } = route.params;
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';



  const genres = oneFood.genre_ids.map((id) => genreMap[id]);


  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: `${IMAGE_URL}${oneFood?.backdrop_path}` }}
        style={styles.backdrop}
      // imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={imagesPath.arrowBack}
              style={{ width: 18, height: 18, tintColor: 'white', marginRight: 10, }}
            />

          </TouchableOpacity>
          <Text style={styles.titleText}>Watch</Text>
        </View>
        <View style={{ marginTop: respHeight(10) }} />

        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          {/* <Text style={styles.title}>{oneFood.title}</Text> */}
          <Text style={styles.title}>In Theaters {oneFood.release_date}</Text>

          <TouchableOpacity style={styles.getTickets} onPress={() => navigation.navigate(stackscreens.ticketDetails, { oneFood: oneFood })}>
            <Text style={styles.getTicketsText}>Get Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.watchTrailer}>
            <Text style={styles.watchTrailerText}>▶ Watch Trailer</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.genresContainer}>
          {genres.map((genre) => (
            <View key={genre}
              style={[styles.genreTag, { backgroundColor: getRandomColor() }]}

            >
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
        <View style={{ width: '100%', backgroundColor: '#0000001C', height: 1, marginBottom: 20 }} />

        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{oneFood.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: respHeight(52),
    justifyContent: 'flex-start',
  },

  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  backButton: {
    padding: 8,
    borderRadius: 20,
  },

  titleText: {
    color: '#ffffff',
    fontSize: 16,
    // fontWeight: 'bold',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // backdrop: {
  //   height: 400,
  //   justifyContent: 'flex-end',
  // },
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   borderBottomLeftRadius: 20,
  //   borderBottomRightRadius: 20,
  // },
  headerContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  releaseDate: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 12,
  },
  getTickets: {
    backgroundColor: '#3EB5FF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: respWidth(65),
    marginBottom: 10,
    marginTop: 10,
  },
  getTicketsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,

    textAlign: 'center'
  },
  watchTrailer: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: respWidth(65),
    marginBottom: 20

  },
  watchTrailerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  content: {
    padding: 30,


  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#222',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  genreTag: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  genreText: {
    fontSize: 14,
    color: '#333',
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
});

export default NewFoodDetails;
