import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../../components/UI/AppText';
import mycolors from '../../../styles/mycolors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {
  respHeight,
  respWidth,
} from '../../../components/responsiveness/RespHeight';
import imagesPath from '../../../constants/imagesPath';
import {useSelector} from 'react-redux';
import Rating from 'react-native-easy-rating';

const FoodDetails = ({route}) => {
  const myFood = useSelector(state => state.foodapi.foodapidata);

  const {id} = route.params;

  const oneFood = myFood.find(food => food.id === id);
  console.log('oneFood__', oneFood);
  const handleStar =
    oneFood.servings * 1 > 6 ? oneFood.servings / 2 : oneFood.servings;
  const imageUrl = `${imagesPath.apiImage}/${oneFood.image}`;
  return (
    <View style={styles.mainDetails}>
      <View style={styles.mainContainer}>
        <Image source={{uri: imageUrl}} style={styles.imgStyle} />

        <AppText lines={1} style={styles.welcomText}>
          {oneFood.title}
        </AppText>
        <AppText style={styles.descriptionText}>
          this is bestest pizza forever , please go order and enjoy best pizza
        </AppText>
        <View style={styles.ratingContainer}>
          <AppText style={{fontSize: 18, fontWeight: 'bold'}}>
            Price{'  '} ${oneFood.readyInMinutes}
          </AppText>
          <View style={{...styles.ratingContainer}}>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <AppText style={{fontSize: 25, color: mycolors.white}}>
                  -
                </AppText>
              </View>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: mycolors.red,
                paddingHorizontal: moderateScale(12),
                paddingVertical: moderateScale(9),
              }}>
              <AppText style={{fontSize: 18, color: mycolors.white}}>
                10
              </AppText>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.iconContainer2}>
                <AppText style={{fontSize: 25, color: mycolors.white}}>
                  +
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <AppText style={{fontSize: 18, fontWeight: 'bold'}}>
            Delivery Time {'   '}
            <AppText style={{color: mycolors.l2black}}>
              {' '}
              {oneFood.readyInMinutes} Mins
            </AppText>
          </AppText>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Rating rating={handleStar} max={6} style={{marginHorizental: 10}} />
          {/* <AppText style={{fontWeight: 'bold'}}>rating(190)</AppText> */}
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.cartbtn}>
            <AppText
              style={{fontSize: 18, fontWeight: 'bold', color: mycolors.white}}>
              Add to Cart
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDetails: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: mycolors.white,
    paddingBottom: moderateScale(5),
  },
  mainContainer: {
    paddingHorizontal: moderateScale(10),
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: respHeight(1.9),
    // justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: mycolors.red,
    paddingVertical: moderateScale(4.5),
    paddingHorizontal: moderateScale(15),
    borderTopLeftRadius: moderateScale(25),
    borderBottomLeftRadius: moderateScale(25),
  },
  iconContainer2: {
    backgroundColor: mycolors.red,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(4.4),
    borderTopRightRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
  },
  ratingContainer: {
    paddingHorizontal: moderateScale(4),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartbtn: {
    backgroundColor: mycolors.primaryorange,
    // width: respWidth(50),
    paddingHorizontal: moderateScale(115),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(25),
  },
  imgStyle: {
    // width: '100%',
    height: respHeight(40),
    marginTop: moderateScale(15),
    // backgroundColor: mycolors.lightgrey,
    resizeMode: 'contain',
    borderRadius: moderateScale(8),
  },
  welcomText: {
    fontSize: scale(22),
    fontWeight: '700',
    paddingHorizontal: moderateScale(4),

    // alignSelf: 'center',
  },
  descriptionText: {
    textAlign: 'justify',
    paddingHorizontal: moderateScale(4),
  },
  gobtn: {
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
});

export default FoodDetails;
