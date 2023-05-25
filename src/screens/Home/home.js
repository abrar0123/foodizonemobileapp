import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import AppText from '../../components/UI/AppText/AppText';
import {useSelector} from 'react-redux';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import SafeArea from '../../components/Safearea/SafeArea';
import mycolors from '../../styles/mycolors';
import imagesPath from '../../constants/imagesPath';
import {
  respHeight,
  respWidth,
  screenwidth,
} from '../../components/responsiveness/RespHeight';
import Card from '../../components/UI/Card/Card';
import Container from '../../components/UI/Container/Container';
import SmCard from '../../components/UI/SmallCard/smcard';
import {SearchBar} from 'react-native-screens';
import Search from '../../components/Search/SearchBar';

const Home = () => {
  const loginEmail = useSelector(state => state.auth.loginEmail);

  return (
    <ScrollView>
      <View style={styles.homeStyle}>
        <Text>home</Text>

        <SmCard style={styles.flexstyle}>
          <View style={styles.flexcolum}>
            <AppText style={styles.welcomeText}>Good Morning, Abrar </AppText>
            <AppText style={styles.desText}>
              Almost 50 + Restaurants opens in Area, Enjoy Your Best Food
            </AppText>
          </View>
          <View>
            <Image style={styles.imagestyle} source={imagesPath.burger} />
          </View>
        </SmCard>
        <View style={{marginVertical: moderateScale(20)}}>
          <Search />
        </View>
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
        <View style={{marginVertical: 15}}>
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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: mycolors.white,
    flex: 1,
  },
  flexstyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    backgroundColor: mycolors.white,
    justifyContent: 'space-between',
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
  flexcolum: {
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
  },
  imagestyle: {
    width: respWidth(35),
    height: respHeight(15),
    resizeMode: 'contain',
    // backgroundColor: mycolors.red,
  },
  welcomeText: {
    fontSize: scale(22),
    width: respWidth(60),
    fontWeight: 'bold',
  },
  desText: {
    width: respWidth(60),
    fontSize: scale(13),
  },
});

export default Home;
