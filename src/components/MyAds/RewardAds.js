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
        setLoaded(true);
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
