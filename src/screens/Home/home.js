import { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Text,
  Pressable,
} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import mycolors from '../../styles/mycolors';
import imagesPath from '../../constants/imagesPath';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';

import MyFood from '../localMall/MyFood/MyFood';
import { useSelector } from 'react-redux';
import stackscreens from '../../constants/stackscreens';

const Home = ({ navigation }) => {
  const foodapidata = useSelector(state => state.foodapi.foodapidata);

  const [searchedFood, setsearchedFood] = useState([]);
  const [userSearch, setuserSearch] = useState('');

  return (
    <View style={styles.mystyle}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.topContainer}>
        <Text style={{ ...styles.title, color: 'black', width: respWidth(30) }} numberOfLines={1}>
          Watch
        </Text>
        <Pressable onPress={() => navigation.navigate(stackscreens.mall)}>

          <Image source={imagesPath.Search} style={styles.imagstyle1} />
        </Pressable>

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
            userSearch={userSearch}
            home
          />
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  mystyle: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: mycolors.white,
  },
  homeStyle: {
    // paddingHorizontal: moderateScale(10),
    paddingHorizontal: respWidth(3),

    backgroundColor: mycolors.whitelight,
    // flex: 1,
  },
  flexstyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    padding: moderateScale(5),
    justifyContent: 'space-between',
  },
  topContainer: {
    flexDirection: 'row', paddingHorizontal: 20, backgroundColor: '#ffffff', paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between', marginVertical: moderateScale(10)
  },
  imagstyle1: {
    width: respWidth(10),
    height: 25,
  },
  flexcolum0: {
    display: 'flex',
    width: respWidth(55),
    gap: 2,
    flexDirection: 'column',
  },
  flexcolum: {
    display: 'flex',
    // width: respWidth(55),
    gap: 2,
    flexDirection: 'column',
  },
  imagestyle: {
    width: respWidth(35),
    height: respHeight(15),
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: scale(22),
    width: '100%',
    fontWeight: 'bold',
  },
  desText: {
    width: '100%',
    fontSize: scale(13),
  },
  primaryBox2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    paddingVertical: moderateVerticalScale(10),
    backgroundColor: mycolors.silk,
    gap: 10,
    justifyContent: 'center',
  },

  box2Text: {
    fontSize: scale(23),
    fontWeight: 'bold',
    color: mycolors.white,
  },
  box2imgstyle: {
    width: respWidth(45),
    height: respHeight(15),
    resizeMode: 'contain',
  },

  //  box 3 design

  primaryBox3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: respWidth(3),
    // justifyContent: 'center',
  },
  Box3container1: {
    paddingVertical: moderateScale(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: respWidth(47),
    height: respHeight(40),
    gap: moderateScale(5),
    backgroundColor: mycolors.blue,
    borderRadius: moderateScale(10),
  },
  Box3container2: {
    paddingVertical: moderateScale(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: respWidth(45),
    height: respHeight(22),
    gap: moderateScale(2),
    backgroundColor: mycolors.mxprimary,
    borderRadius: moderateScale(10),
  },
  Box3container3: {
    paddingVertical: moderateScale(5),
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: respWidth(45),
    height: respHeight(16),
    // gap: moderateScale(2),
    backgroundColor: mycolors.pink,
    borderRadius: moderateScale(10),
  },
  box3imgstyle: {
    width: '100%',
    height: respHeight(20),
    resizeMode: 'contain',
  },
  box3imgstyle2: {
    width: respWidth(20),
    height: respHeight(13),
    resizeMode: 'contain',
  },
  box3Text: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: mycolors.white,
  },
});

export default Home;
