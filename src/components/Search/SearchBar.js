import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import {moderateScale, scale} from 'react-native-size-matters';
import Smcard from '../UI/SmallCard/smcard';
import {respWidth} from '../responsiveness/RespHeight';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import PlacesModal from '../CustomModal/PlacesModal';
import AppText from '../UI/AppText';

const SearchBar = ({userSearchedFood1, openModal}) => {
  const [userSearch, setuserSearch] = useState('');
  const [MySearchdFood, setMySearchdFood] = useState([]);
  const foodapidata = useSelector(state => state.foodapi.foodapidata);
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
    // console.log('MySearchdFood___1:\n\n', MySearchdFood);
  }, [userSearch]);

  // console.log('userSearch__', userSearch);

  const myOpenModal = () => {
    openModal(true);
  };
  return (
    <View style={styles.searchContainer}>
      <Smcard style={styles.inputContainer}>
        <Image source={imagesPath.search} style={styles.imagstyle} />
        {/* <FontAwesome name="search" size={30}  /> */}
        <TextInput
          value={userSearch}
          onChangeText={event => setuserSearch(event)}
          style={styles.textInput}
          placeholder="Search for Foods"
        />
      </Smcard>
      <Smcard
        style={{
          paddingVertical: moderateScale(12),
          paddingHorizontal: moderateScale(7),
          borderRadius: 5,
        }}>
        <TouchableOpacity activeOpacity={0.3} onPress={myOpenModal}>
          <Image source={imagesPath.filter} style={styles.imagstyle} />
        </TouchableOpacity>
      </Smcard>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // gap: 5,
    justifyContent: 'space-between',
  },
  imagstyle: {
    width: respWidth(8),
    height: 25,
  },
  inputContainer: {
    paddingLeft: 10,
    width: respWidth(80),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    // backgroundColor: mycolors.red,

    // backgroundColor: mycolors.grey,
  },
  textInput: {
    width: '85%',
    fontSize: scale(18),
    // backgroundColor: mycolors.jamanlight,
  },
});

export default SearchBar;
