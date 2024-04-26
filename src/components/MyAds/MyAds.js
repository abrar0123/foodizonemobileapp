import {StyleSheet, View} from 'react-native';
import AppText from '../UI/AppText';
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAd,
  InterstitialAd,
  BannerAdSize,
  GAMBannerAd,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import mycolors from '../../styles/mycolors';
import React from 'react';
import Button from '../UI/Button';

const adUnitId0 = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2387560791010168~8112655004';

const MyAds = () => {
  const adUnitId = 'ca-app-pub-9527224403866905/5362621205';
  const adInter = TestIds.INTERSTITIAL;

  const interstitial = InterstitialAd.createForAdRequest(adInter, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['art', 'science'],
  });

  // const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId, {
  //   requestNonPersonalizedAdsOnly: true,
  // });

  const [loaded, setLoaded] = React.useState(false);

  // ****************** u control + save OR navigate to show interesstitial ads ******************
  // React.useEffect(() => {
  //   // load();
  //   if (isClosed) {
  //     load();
  //   }
  // }, [isClosed, load]);

  React.useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
        setLoaded(true);
        console.log('ads here loadded ========');
      },
    );
    interstitial.load();
    return unsubscribe;
  });

  console.log('loaded ========= :', loaded);

  return (
    <View style={styles.mainC}>
      <AppText style={{marginBottom: 15}}> This is test ads opened</AppText>

      <Button
        onPress={() => {
          // interstitial.show();
        }}>
        Show Interstitial
      </Button>
      <BannerAd
        // unitId={adUnitId}
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{requestNonPersonalizedAdsOnly: true}}
        // requestOptions={{
        //   networkExtras: {
        //     collapsible: 'bottom',
        //   },
        // }}
      />
    </View>
  );
};
export default MyAds;

const styles = StyleSheet.create({
  mainC: {
    flex: 1,
    backgroundColor: mycolors.whitelight,
    // backgroundColor: mycolors.jamanlight,
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
