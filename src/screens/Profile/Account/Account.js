import React from 'react';
import {View, StyleSheet} from 'react-native';
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

const Account = () => {
  const loginEmail = useSelector(e => e.auth.loginEmail);
  const username = useSelector(e => e.auth.username);
  const password = useSelector(e => e.auth.password);

  const Dispatch = useDispatch();

  const logoutHandler = () => {
    Dispatch(authActions.logout());
  };

  return (
    <View style={styles.profile}>
      <View style={styles.profileContainer}>
        <Smcard style={styles.ordersummaryContainer}>
          <View style={{...styles.itemsDetailContainer}}>
            <AppText style={styles.orderText}>My Account</AppText>
            {/* <AppText style={styles.viewAllText}>View</AppText> */}
          </View>
          <View
            style={{
              ...styles.itemsDetailContainer,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}>
            <AppText style={styles.orderText1}>Name: </AppText>
            <AppText style={styles.orderText1}>{username}</AppText>
          </View>
          <View
            style={{
              ...styles.itemsDetailContainer,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}>
            <AppText style={styles.orderText1}>Email: </AppText>
            <AppText style={styles.orderText1}>{loginEmail}</AppText>
          </View>
          <View
            style={{
              ...styles.itemsDetailContainer,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}>
            <AppText style={styles.orderText1}>Password: </AppText>
            <AppText style={styles.orderText1}>{password}</AppText>
          </View>
        </Smcard>
      </View>

      <CartButton
        opacity={0.9}
        style={{backgroundColor: mycolors.blue}}
        onPress={logoutHandler}>
        Logout
      </CartButton>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: mycolors.whitelight,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: respWidth(3),
  },
  profileContainer: {
    height: respHeight(35),
  },

  ordersummaryContainer: {
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: mycolors.orange,
    paddingHorizontal: respWidth(3),
    gap: respHeight(1.2),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    shadowColor: mycolors.l2black,
  },
  orderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: mycolors.white,
  },
  orderText1: {
    color: mycolors.white,
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

export default Account;
