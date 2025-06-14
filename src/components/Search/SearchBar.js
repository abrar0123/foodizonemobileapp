import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import { moderateScale, scale } from 'react-native-size-matters';
import Smcard from '../UI/SmallCard/smcard';
import { respWidth } from '../responsiveness/RespHeight';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import PlacesModal from '../CustomModal/PlacesModal';
import AppText from '../UI/AppText';

const SearchBar = ({ userSearchedFood1, userSearch, setuserSearch, openModal, setsearchedFood }) => {
  const [MySearchdFood, setMySearchdFood] = useState([]);

  const foodapidata = useSelector(state => state.foodapi.sMovies);

  const searchUserFood = () => {

    const data = foodapidata.filter(item => {
      const prodTitle = item.title.toLowerCase();
      const userrsearch = userSearch?.toLowerCase();
      return prodTitle?.includes(userrsearch);
    });
    // setMySearchdFood(data);
    userSearchedFood1(data);
  };

  useEffect(() => {
    searchUserFood();
  }, [userSearch]);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Image source={imagesPath.Search} style={styles.imagstyle} />
        {/* <FontAwesome name="search" size={30}  /> */}
        <TextInput
          value={userSearch}
          onChangeText={event => setuserSearch(event)}
          style={styles.textInput}
          placeholderTextColor={'#202C434D'}
          placeholder="TV shows, movies and more"
        />
        <Pressable onPress={() => {
          setuserSearch('');
          setsearchedFood('');
        }
        }>
          <Image source={imagesPath.Close} style={styles.imagstyle1} />

        </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // gap: 5,
    padding: 10,
    justifyContent: 'space-between',
  },
  imagstyle: {
    width: respWidth(12),
    height: 20,
    // resizeMode: 'contain'
  },
  imagstyle1: {
    width: respWidth(8),
    height: 25,
  },
  inputContainer: {
    paddingLeft: 5,
    paddingRight: 40,
    width: respWidth(88),
    display: 'flex',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: respWidth(30),
    backgroundColor: '#F2F2F6',

    // backgroundColor: mycolors.grey,
  },
  textInput: {
    width: '85%',
    fontSize: scale(14),
    color: '#202C43'
    // backgroundColor: mycolors.jamanlight,
  },
});

export default SearchBar;
