import { View, Text, StyleSheet, ScrollView, LogBox, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import MyFood from './MyFood/MyFood';
import SearchBar from '../../components/Search/SearchBar';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { getFoodData } from '../../Redux/foodapiSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Localmall({ navigation }) {
  const [searchedFood, setsearchedFood] = useState([]);
  const [userSearch, setuserSearch] = useState('');

  const foodapidata = useSelector(state => state.foodapi.foodapidata);
  const isLoading = useSelector(state => state.foodapi.loading);
  const [openModal1, setopenModal1] = useState(false);
  // console.log('foodapidata__', foodapidata, isLoading);

  const Dispatch = useDispatch();
  useEffect(() => {
    // console.log('fooddata__');
    Dispatch(getFoodData());
  }, [Dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const userSearchedFood = data => {
    setsearchedFood(data);
  };
  const openModal = data => {
    setopenModal1(data);
  };

  return (
    // <SafeArea style={{backgroundColor: mycolors.whitelight}}>
    <View style={styles.mystyle}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ alignItems: 'center', marginVertical: moderateScale(10) }}>
        <SearchBar userSearchedFood1={userSearchedFood} userSearch={userSearch} setuserSearch={setuserSearch} setsearchedFood={setsearchedFood} openModal={openModal} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{
          backgroundColor: '#F2F2F6', paddingTop: moderateScale(20),
          paddingHorizontal: moderateScale(10)
        }}>
          <MyFood
            foodapidata={foodapidata}
            navigation={navigation}
            searchedFood={searchedFood}
            openModal1={openModal1}
            userSearch={userSearch}
          />
        </View>
      </ScrollView>
    </View>
    // </SafeArea>
  );
}
const styles = StyleSheet.create({
  mystyle: {
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: scale(23),
    fontWeight: 'bold',
    marginBottom: respHeight(2),
    width: respWidth(47),
    borderBottomColor: mycolors.blue,
    borderBottomWidth: 3,
    color: mycolors.blue,
  },
  primaryNotiContainer: {
    backgroundColor: mycolors.pink,
    paddingVertical: 10,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // apply shadow effect
    shadowColor: mycolors.black,
    shadowOffset: {
      height: 2,
      width: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  // box 2
  primaryBox2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    paddingVertical: moderateVerticalScale(5),
    backgroundColor: mycolors.red,
    gap: moderateScale(5),
    justifyContent: 'center',
  },

  flexcolum: {
    display: 'flex',
    gap: moderateScale(3),
    flexDirection: 'column',
  },

  box2Text: {
    fontSize: scale(23),
    fontWeight: 'bold',
    width: respWidth(45),
    color: mycolors.white,
  },
  box2imgstyle: {
    width: respWidth(40),
    height: respHeight(18),
    resizeMode: 'cover',
  },
});
