import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import {moderateScale, scale} from 'react-native-size-matters';
import Smcard from '../../components/UI/SmallCard/smcard';
import AppText from '../../components/UI/AppText';
import Card from '../../components/UI/Card/Card';
import imagesPath from '../../constants/imagesPath';
import stackscreens from '../../constants/stackscreens';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const Profile = ({navigation}) => {
  const goProfileHandler = () => {
    navigation.navigate(stackscreens.account);
  };

  const goOrder = () => {
    navigation.navigate(stackscreens.myorder);
  };

  const goCamera = () => {
    navigation.navigate(stackscreens.camera);
  };

  const goQrCode = () => {
    navigation.navigate(stackscreens.qrcode);
  };

  const goDevceInfo = () => {
    navigation.navigate(stackscreens.deviceinfo);
  };

  const goTabActivity = () => {
    navigation.navigate(stackscreens.myTabsView);
  };
  const goNotification = () => {
    navigation.navigate(stackscreens.notification);
  };
  const goChatBot = () => {
    navigation.navigate(stackscreens.userChat);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.profile}>
        <View style={{display: 'flex', gap: moderateScale(5)}}>
          <Card style={styles.profileContainer}>
            <ImageBackground
              source={imagesPath.background}
              style={styles.profileContainerBackground}>
              <View style={{...styles.itemsDetailContainer}}>
                <AppText style={styles.profileText}>My Profile</AppText>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={goProfileHandler}>
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
              <TouchableOpacity activeOpacity={0.7} onPress={goOrder}>
                <AppText style={styles.viewAllText}>View All {'>'}</AppText>
              </TouchableOpacity>
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

          {/* My Features  */}
          <Smcard style={styles.ordersummaryContainer}>
            <View style={{...styles.itemsDetailContainer}}>
              <AppText style={styles.orderText}>My Features</AppText>
              <TouchableOpacity onPress={goTabActivity} activeOpacity={0.7}>
                <AppText style={styles.viewAllText}>See Details {'>'}</AppText>
              </TouchableOpacity>
            </View>

            <View style={{...styles.itemsDetailContainer}}>
              <TouchableOpacity activeOpacity={0.5} onPress={goDevceInfo}>
                <Icon name="cc-mastercard" size={28} color={mycolors.cyan} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={goQrCode}>
                <Icon name="qrcode" size={35} color={mycolors.cyan} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={goCamera}>
                <Icon name="camera-retro" size={30} color={mycolors.cyan} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={goNotification}>
                <Ionicons
                  name="md-notifications-circle-outline"
                  size={38}
                  color={mycolors.cyan}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={goChatBot}>
                <Ionicons
                  name="chatbox-ellipses"
                  size={35}
                  color={mycolors.cyan}
                />
              </TouchableOpacity>
            </View>
            {/* p2 */}
            <View style={{...styles.itemsDetailContainer}}>
              <TouchableOpacity activeOpacity={0.5} onPress={goDevceInfo}>
                <MaterialIcons
                  name="video-call"
                  size={35}
                  color={mycolors.cyan}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={goQrCode}>
                <MaterialCommunityIcons
                  name="text-to-speech"
                  size={35}
                  color={mycolors.cyan}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={goCamera}>
                <MaterialCommunityIcons
                  name="cellphone-nfc"
                  size={30}
                  color={mycolors.cyan}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={goNotification}>
                <AppText style={{color: mycolors.cyan}}>Testing</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Bluetooth')}>
                <Feather name="bluetooth" size={30} color={mycolors.cyan} />
              </TouchableOpacity>
            </View>
          </Smcard>
        </View>

        {/* my accout card */}
        <Smcard style={styles.ordersummaryContainer}>
          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>My Account</AppText>
            <AppText style={styles.viewAllText}>See Details {'>'}</AppText>
          </View>
        </Smcard>
      </View>
    </ScrollView>
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
    fontSize: scale(17),
    fontWeight: 'bold',
  },
  orderText1: {
    fontSize: scale(17),
    // fontWeight: 'bold',
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
    fontSize: scale(16),
  },
  profileText: {
    color: mycolors.white,
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});

export default Profile;
