import React from 'react';
import {Text, View} from 'react-native';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const RewardAds = () => {
  const adrewa = TestIds.REWARDED;
  const rewardAd = RewardedAd.createForAdRequest(adrewa, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['art', 'science'],
  });

  // ****************** u control + save OR navigate to show rewarded ads ******************

  React.useEffect(() => {
    const unsubLoaded = rewardAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        rewardAd.show();
      },
    );
    const unsubscribe = rewardAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      rew => {
        console.log('my daily earnings ---> ', rew);
      },
    );
    rewardAd.load();
    return () => {
      unsubscribe();
      unsubLoaded();
    };
  });

  return (
    <View>
      <Text>This is RewardAds </Text>
    </View>
  );
};
export default RewardAds;
