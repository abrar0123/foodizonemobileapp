import {View, Text, StyleSheet, Image, ScrollView, LogBox} from 'react-native';
import React, {useEffect} from 'react';
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

export default function Localmall({navigation}) {
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

  return (
    <SafeArea>
      <View style={styles.mystyle}>
        <View style={styles.primaryNotiContainer}>
          <AppText style={styles.welcomeText}>
            What would to like to eat you
          </AppText>

          <Image
            style={{width: 35, height: 30}}
            source={imagesPath.notification}
          />
        </View>

        <View style={{marginVertical: moderateScale(12)}}>
          <SearchBar />
        </View>
        <ScrollView showsVerticalScrollIndicator>
          <View>
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
          </View>
          <View style={{marginVertical: moderateScale(5)}}>
            <MyFood foodapidata={foodapidata} navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  mystyle: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: mycolors.white,
  },
  welcomeText: {
    fontSize: scale(25),
    width: respWidth(60),
    fontWeight: 'bold',
  },
  primaryNotiContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
