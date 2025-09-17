import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useState, useEffect } from 'react';
import AppText from '../../../components/UI/AppText';
import ListFood from './listfood';
import Card from '../../../components/UI/Card/Card';
import mycolors from '../../../styles/mycolors';
import { scale } from 'react-native-size-matters';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import { useDispatch, useSelector } from 'react-redux';
import SkLoader from '../../../components/CustomLoader/SkLoader';
import PlacesModal from '../../../components/CustomModal/PlacesModal';
import { setSearchedMovies } from '../../../Redux/foodapiSlice';



const MyFood = ({ foodapidata, home, userSearch, searchedFood, openModal1, navigation }) => {
  const [ind, setind] = useState(1);

  const [Loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);

  const isLoading = useSelector(state => state.foodapi.loading);
  // const isLoading = true;
  const dispatch = useDispatch();

  const api_key = 'c8ff365567fa75e6c1ca3f5ebb1190de';

  const fetchPopularMovies = async () => {
    try {
      setLoader(true);
      console.log('Fetching popular movies...');

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
      );

      const json = await response.json();

      if (json?.results) {

        setMovies(json?.results);

        dispatch(setSearchedMovies(json?.results));
        setLoader(false);
      }

      // console.log('Popular Movies:', json.results?.length);
      // You can now store this in state if needed
      // setMovies(json.results);

    } catch (error) {
      console.log('TMDB_API_Error:', error);
    } finally {
      setLoader(false);
    }
  };

  const pressHandler = id => {
    setind(id);
  };

  useEffect(() => {
    fetchPopularMovies()
  }, [])



  return (
    <React.Fragment>
      {(Loader) ? (
        <SkLoader />
      ) : (
        <ListFood
          // MyFood={movies}
          MyFood={userSearch ? searchedFood : movies}
          searched={(userSearch) ? true : false}
          Loader={Loader}
          navigation={navigation}
          userSearch={searchedFood}
          home={home}
        />
      )}
      {openModal1 && <PlacesModal isVisible={openModal1} />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: scale(23),
    fontWeight: 'bold',
    marginBottom: respHeight(2),
    width: respWidth(47),
    borderBottomColor: mycolors.primaryorange,
    borderBottomWidth: 3,
    color: mycolors.primaryorange,
    backgroundColor: '#F2F2F6',
  },
});

export default MyFood;
