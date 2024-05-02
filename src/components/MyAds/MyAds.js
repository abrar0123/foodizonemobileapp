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

  // React.useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       interstitial.show();
  //       setLoaded(true);
  //       console.log('ads here loadded ========');
  //     },
  //   );
  //   interstitial.load();
  //   return unsubscribe;
  // });

  return (
    <View style={styles.mainC}>
      <AppText style={{marginBottom: 15}}> This is test ads opened</AppText>

      <Button
        onPress={() => {
          // interstitial.show();
        }}>
        Show Interstitial
      </Button>

      {/* <View style={{height:200,width:200, backgroundColor:'red'}}> */}
      <BannerAd
        // unitId={adUnitId}
        // unitId={TestIds.BANNER}
        unitId="ca-app-pub-2387560791010168/4151382781"
        // style={{width:'100%'}}
        // onSizeChange={()=>console.log('This is on Size Change')}
        // size={BannerAdSize.LARGE_BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={{requestNonPersonalizedAdsOnly: true}}
        onAdClosed={e => console.log('ad closed ', e)}
        onAdFailedToLoad={e => console.log('ad onAdFailedToLoad ', e)}
        onAdLoaded={e => console.log('ad onAdLoaded ', e)}
        onAdOpened={e => console.log('ad onAdOpened ', e)}

        // requestOptions={{
        //     networkExtras: {
        //         collapsible: 'bottom',
        //       },
        //     }}
      />
    </View>
    // </View>
  );
};
export default MyAds;

const styles = StyleSheet.create({
  mainC: {
    // flex: 1,
    // backgroundColor: mycolors.whitelight,
    // backgroundColor: mycolors.jamanlight,
    marginVertical: 15,
    paddingVertical: 20,
    borderRadius: 5,
  },
});