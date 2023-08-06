import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../components/UI/AppText/AppText';
import {useSelector} from 'react-redux';
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
import Card from '../../components/UI/Card/Card';
import SmCard from '../../components/UI/SmallCard/smcard';
import Search from '../../components/Search/SearchBar';
import stackscreens from '../../constants/stackscreens';

const Home = ({navigation}) => {
  const loginEmail = useSelector(state => state.auth.loginEmail);

  const goResaurant = () => {
    navigation.navigate(stackscreens.restaurant);
  };

  return (
    <ScrollView>
      <View style={styles.homeStyle}>
        {/* box 2 */}
        <SmCard style={styles.flexstyle}>
          <View style={styles.flexcolum0}>
            <AppText style={styles.welcomeText}>Welcome Back, Abrar </AppText>
            <AppText style={styles.desText}>
              Almost 50 + Restaurants opens in Area, Enjoy Your Best Food
            </AppText>
          </View>
          <View>
            <Image style={styles.imagestyle} source={imagesPath.burger} />
          </View>
        </SmCard>
        <View style={{marginVertical: moderateScale(20)}}>
          {/* <Search /> */}
        </View>
        
        {/* box 2  food delivery */}
        <TouchableOpacity onPress={goResaurant} activeOpacity={0.95}>
          <SmCard style={styles.primaryBox2}>
            <View style={styles.flexcolum}>
              <AppText style={styles.box2Text}>Food Delivery </AppText>
              <AppText
                style={{...styles.box2Text, fontSize: 14, fontWeight: '200'}}>
                Order Food You Love
              </AppText>
            </View>
            <View>
              <Image style={styles.box2imgstyle} source={imagesPath.plate} />
            </View>
          </SmCard>
        </TouchableOpacity>

        {/* box 3 added */}
        <Card style={{marginVertical: 15}}>
          <View style={styles.primaryBox3}>
            <SmCard style={styles.Box3container1}>
              <AppText style={styles.box3Text}>Foodie Mart </AppText>
              <AppText
                style={{...styles.box2Text, fontSize: 14, fontWeight: '200'}}>
                Best Mart Shops
              </AppText>
              <Image style={styles.box3imgstyle} source={imagesPath.kake} />
              <AppText
                style={{...styles.box2Text, fontSize: 14, fontWeight: 'bold'}}>
                Everyday upto 20% OFF
              </AppText>
              <AppText
                style={{...styles.box2Text, fontSize: 14, fontWeight: '400'}}>
                Go your Favourite Shop and place Order
              </AppText>
            </SmCard>
            <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <SmCard style={styles.Box3container2}>
                <AppText style={styles.box3Text}>Foodie Pickup </AppText>
                <AppText
                  style={{...styles.box2Text, fontSize: 14, fontWeight: '200'}}>
                  Order Food You Love
                </AppText>
                <Image style={styles.box2imgstyle} source={imagesPath.plate} />
              </SmCard>
              <SmCard style={styles.Box3container3}>
                <View style={{width: '45%'}}>
                  <AppText style={styles.box3Text}>Shops </AppText>
                  <AppText
                    style={{
                      ...styles.box2Text,
                      fontSize: 12,
                      fontWeight: '200',
                    }}>
                    Grocessery etc
                  </AppText>
                </View>
                <Image style={styles.box3imgstyle2} source={imagesPath.plate} />
              </SmCard>
            </View>
          </View>
        </Card>
        <View>
          <AppText
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: moderateScale(10),
            }}>
            Your Restuarants
          </AppText>
          <SmCard style={styles.primaryBox2}>
            <View style={styles.flexcolum}>
              <AppText style={styles.box2Text}>Food Foods </AppText>
              <AppText
                style={{...styles.box2Text, fontSize: 14, fontWeight: '200'}}>
                Order Food You Love
              </AppText>
            </View>
            <View>
              <Image style={styles.box2imgstyle} source={imagesPath.food1} />
            </View>
          </SmCard>
          <View style={{marginVertical: moderateScale(10)}}>
            <SmCard style={styles.primaryBox2}>
              <View style={styles.flexcolum}>
                <AppText style={styles.box2Text}>Food Foods </AppText>
                <AppText
                  style={{...styles.box2Text, fontSize: 14, fontWeight: '200'}}>
                  Order Food You Love
                </AppText>
              </View>
              <View>
                <Image style={styles.box2imgstyle} source={imagesPath.food2} />
              </View>
            </SmCard>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    // paddingHorizontal: moderateScale(10),
    paddingHorizontal: respWidth(3),

    backgroundColor: mycolors.white,
    flex: 1,
  },
  flexstyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    padding: moderateScale(5),
    justifyContent: 'space-between',
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
    width: respWidth(25),
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
