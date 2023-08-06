import {View, Text, StyleSheet, Image, ScrollView, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../components/UI/AppText';
import MyFood from './MyFood/MyFood';
import SearchBar from '../../components/Search/SearchBar';
import SafeArea from '../../components/Safearea/SafeArea';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import imagesPath from '../../constants/imagesPath';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Smcard from '../../components/UI/SmallCard/smcard';
import {getFoodData} from '../../Redux/foodapiSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Localmall({navigation}) {
  const [searchedFood, setsearchedFood] = useState([]);
  const foodapidata = useSelector(state => state.foodapi.foodapidata);
  const isLoading = useSelector(state => state.foodapi.loading);

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

  // console.log('searchedFood__New', searchedFood);
  return (
    // <SafeArea style={{backgroundColor: mycolors.whitelight}}>
    <View style={styles.mystyle}>
      <View style={styles.primaryNotiContainer}>
        {/* <AntDesign name="picture" size={30} color={mycolors.blue} /> */}
        {/* <AppText style={styles.welcomeText}>FastFood Deals</AppText> */}
        <Image style={{width: 65, height: 50}} source={imagesPath.burger} />
        <Image style={{width: 65, height: 50}} source={imagesPath.food2} />
        <Image style={{width: 65, height: 50}} source={imagesPath.kake} />
      </View>

      <View style={{margin: moderateScale(10)}}>
        <SearchBar userSearchedFood1={userSearchedFood} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View>
            <Smcard style={styles.primaryBox2}>
              <View style={styles.flexcolum}>
                <AppText style={styles.box2Text}>Best Burgers Deals </AppText>
                <AppText
                  style={{...styles.box2Text, fontSize: 14, fontWeight: '200'}}>
                  Order Food You Love
                </AppText>
                <AppText style={styles.box2Text}>Deals 30% OFF </AppText>
              </View>
              <View>
                <Image style={styles.box2imgstyle} source={imagesPath.plate2} />
              </View>
            </Smcard>
          </View> */}
        <View style={{marginHorizontal: moderateScale(10)}}>
          <MyFood
            foodapidata={foodapidata}
            navigation={navigation}
            searchedFood={searchedFood}
          />
        </View>
      </ScrollView>
    </View>
    // </SafeArea>
  );
}
const styles = StyleSheet.create({
  mystyle: {
    backgroundColor: mycolors.whitelight,
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
