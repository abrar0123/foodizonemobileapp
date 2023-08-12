import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import Smcard from '../../../components/UI/SmallCard/smcard';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import CartButton from '../../../components/Buttons/AppButtons/CartButton';
import {authActions} from '../../../Redux/authSlice';
import imagesPath from '../../../constants/imagesPath';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome, {Button} from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {cartActions} from '../../../Redux/cartSlice';

const Account = () => {
  const loggedInCred = useSelector(state => state.auth.loggedInCredential);
  const myProfile = useSelector(state => state.cart.profilePic);
  // console.log('profilePic__:', myProfile);

  const Dispatch = useDispatch();

  const logoutHandler = () => {
    Dispatch(authActions.logout());
  };

  const imagePicker = () => {
    const options = {
      storageOptions: {
        path: 'image',
      },
    };

    console.log('uploaded');
    launchImageLibrary(options, res => {
      // console.log('res:', res);
      if (res.didCancel !== true) {
        Dispatch(cartActions.profilepicSave({profile: res?.assets[0]?.uri}));
        // setselectedImage(res?.assets[0]?.uri);
      }
    });
  };

  return (
    <View style={styles.profile}>
      {/* new design */}
      <View style={styles.newDesignView}>
        {myProfile ? (
          <TouchableOpacity onPress={imagePicker}>
            <Image
              source={{uri: myProfile}}
              style={{
                height: respHeight(12),
                resizeMode: 'center',
                width: respWidth(25),
                borderRadius: 150,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={imagePicker}>
            <Ionicons
              name="person-circle-outline"
              size={80}
              color={mycolors.blue}
            />
          </TouchableOpacity>
        )}

        <AppText style={styles.profileText}>
          {loggedInCred?.username?.toUpperCase()} Software Engr.
        </AppText>
      </View>

      {/*bottom design */}
      <ScrollView>
        <View style={styles.ordersummaryContainer}>
          <View>
            {/* <AppText style={{...styles.orderText, marginBottom: 10}}>
            My Account
          </AppText> */}
          </View>
          <View
            style={{
              ...styles.itemsflexContainer,
              alignItems: 'flex-start',
            }}>
            <Foundation name="mail" size={28} color={mycolors.dgrey} />
            <View>
              <AppText style={styles.profileheaderText}>Email </AppText>

              <AppText style={styles.orderText1}>{loggedInCred.email}</AppText>
            </View>
          </View>
          <View
            style={{
              ...styles.itemsflexContainer,
              alignItems: 'flex-start',
            }}>
            <AntDesign name="tag" size={28} color={mycolors.dgrey} />
            <View>
              <AppText style={styles.profileheaderText}>UserID</AppText>

              <AppText style={{...styles.orderText1}}>
                {loggedInCred.userId}
              </AppText>
            </View>
          </View>
          <View
            style={{
              ...styles.itemsflexContainer,
              alignItems: 'flex-start',
            }}>
            <FontAwesome name="eye" size={28} color={mycolors.dgrey} />
            <View>
              <AppText style={styles.profileheaderText}>Password</AppText>
              <AppText style={styles.orderText1}>
                {loggedInCred.password}
              </AppText>
            </View>
          </View>
          <View
            style={{
              ...styles.itemsflexContainer,
              alignItems: 'flex-start',
            }}>
            <FontAwesome name="eye" size={28} color={mycolors.dgrey} />
            <View>
              <AppText style={styles.profileheaderText}>Password</AppText>

              <AppText style={styles.orderText1}>
                {loggedInCred.password}
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      <CartButton
        opacity={0.9}
        style={{backgroundColor: mycolors.orange, borderRadius: 1}}
        onPress={logoutHandler}>
        Logout
      </CartButton>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: mycolors.white,
    flex: 1,
    justifyContent: 'space-between',
    // paddingHorizontal: respWidth(3),
  },
  profileContainer: {
    // height: respHeight(35),
  },

  ordersummaryContainer: {
    flexDirection: 'column',
    backgroundColor: mycolors.white,
    paddingHorizontal: respWidth(3),
    // gap: respHeight(1.2),
  },
  orderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: mycolors.black,
  },
  orderText1: {
    color: mycolors.black,
    marginTop: 4,
  },
  profileheaderText: {
    color: mycolors.black,
    fontSize: 19,
  },
  itemsflexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: respWidth(3),
    borderBottomColor: mycolors.grey,
    borderBottomWidth: 0.5,
    paddingVertical: respHeight(2),
  },
  viewAllText: {
    color: mycolors.red,
    fontSize: 16,
  },
  profileText: {
    color: mycolors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },

  // new design
  newDesignView: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: respHeight(27),
    padding: 10,
    backgroundColor: mycolors.orange,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
});

export default Account;
