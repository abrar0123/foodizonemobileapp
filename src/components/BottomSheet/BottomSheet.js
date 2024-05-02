import {Modal, StyleSheet, View} from 'react-native';
import AppText from '../UI/AppText';
import mycolors from '../../styles/mycolors';
import {respWidth} from '../responsiveness/RespHeight';
import CartButton from '../Buttons/AppButtons/CartButton';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {useState} from 'react';

const BottomSheet = ({total, goCheckoutHandler}) => {
  const [view, setView] = useState(false);
  const t1 = total;
  const t2 = total / 5;
  const t3 = total / 20;
  const mtotal = t1 + t2 + t3;

  return (
    // <Modal
    //   visible={true}
    //   transparent={true}
    //   onRequestClose={() => console.log(' setView')}
    //   animationType="slide">
    <View style={styles.mainContainer}>
      <View style={styles.cmpConatiner}>
        <View style={styles.verticalStyle}>
          <AppText style={styles.priceText}>Subtotal</AppText>
          <AppText style={styles.priceText}>Delivery fee</AppText>
          <AppText style={styles.priceText}>Total Tax</AppText>
        </View>
        <View style={styles.verticalStyle}>
          <AppText style={styles.priceText}>$ {total}</AppText>
          <AppText style={styles.priceText}>$ {total / 5}</AppText>
          <AppText style={styles.priceText}>$ {total / 20}</AppText>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: mycolors.white,
          marginTop: 12,
        }}
      />
      <View style={styles.cmpConatiner}>
        <AppText style={[styles.priceText, {fontSize: 22, fontWeight: 'bold'}]}>
          Total Bill
        </AppText>
        <AppText style={[styles.priceText, {fontSize: 22, fontWeight: 'bold'}]}>
          $ {mtotal}
        </AppText>
      </View>

      <CartButton
        style={{
          backgroundColor: mycolors.white,
          paddingHorizontal: '30%',
          marginTop: '3%',
          marginBottom: '2%',
          // width: '100%',
        }}
        styleT={{color: mycolors.black}}
        onPress={goCheckoutHandler}>
        Check Out
      </CartButton>
    </View>
    // </Modal>
  );
};
export default BottomSheet;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: mycolors.jaman,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cmpConatiner: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // gap: 100,
    paddingHorizontal: respWidth(7),
  },
  verticalStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  priceText: {
    color: mycolors.white,
    fontSize: 20,
    marginTop: 3,
  },
});
