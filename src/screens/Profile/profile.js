import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import {moderateScale} from 'react-native-size-matters';
import Smcard from '../../components/UI/SmallCard/smcard';
import AppText from '../../components/UI/AppText';
import Card from '../../components/UI/Card/Card';
import imagesPath from '../../constants/imagesPath';
import stackscreens from '../../constants/stackscreens';

const Profile = ({navigation}) => {
  const goProfileHandler = () => {
    navigation.navigate(stackscreens.account);
  };
  return (
    <View style={styles.profile}>
      <View style={{display: 'flex', gap: moderateScale(5)}}>
        <Card style={styles.profileContainer}>
          <ImageBackground
            source={imagesPath.background}
            style={styles.profileContainerBackground}>
            <View style={{...styles.itemsDetailContainer}}>
              <AppText style={styles.profileText}>My Profile</AppText>
              <TouchableOpacity activeOpacity={0.5} onPress={goProfileHandler}>
                <Image
                  source={imagesPath.profile}
                  style={{tintColor: mycolors.white}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '75%',
              }}>
              <AppText
                style={{
                  ...styles.profileText,
                  borderWidth: 2,
                  padding: 10,
                  borderColor: mycolors.white,
                }}>
                Abrar Hussain
              </AppText>
            </View>
          </ImageBackground>
        </Card>

        <Smcard style={styles.ordersummaryContainer}>
          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>MyOrders</AppText>
            <AppText style={styles.viewAllText}>View All {'>'}</AppText>
          </View>

          <View
            style={{
              ...styles.itemsDetailContainer,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}>
            <AppText style={styles.orderText1}>To Pay</AppText>
            <AppText style={styles.orderText1}>To Ship</AppText>
            <AppText style={styles.orderText1}>To receive</AppText>
            <AppText style={styles.orderText1}>To Review</AppText>
          </View>
          <View
            style={{
              ...styles.itemsDetailContainer,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}>
            <AppText style={styles.orderText1}>My returns</AppText>
            <AppText style={styles.orderText1}>To Cancellation</AppText>
          </View>
        </Smcard>
        <Smcard style={styles.ordersummaryContainer}>
          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>My Coins</AppText>
            <AppText style={styles.viewAllText}>Earn Coins {'>'}</AppText>
          </View>
        </Smcard>
      </View>
      <Smcard style={styles.ordersummaryContainer}>
        <View style={{...styles.itemsDetailContainer}}>
          <AppText style={styles.orderText}>My Account</AppText>
          <AppText style={styles.viewAllText}>See Details {'>'}</AppText>
        </View>
      </Smcard>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: mycolors.whitelight,
    flex: 1,
    justifyContent: 'space-between',
    // padding move below
  },
  profileContainer: {
    height: respHeight(35),
    // backgroundColor: mycolors.silk,
  },
  profileContainerBackground: {
    paddingHorizontal: respWidth(3),
  },
  ordersummaryContainer: {
    flexDirection: 'column',
    paddingHorizontal: respWidth(3),
    gap: respHeight(1.2),
    padding: moderateScale(10),
    borderRadius: moderateScale(0),
    shadowColor: mycolors.l2black,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsDetailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10),
  },
  viewAllText: {
    color: mycolors.red,
    fontSize: 16,
  },
  profileText: {
    color: mycolors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
