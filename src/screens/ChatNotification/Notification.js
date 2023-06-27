import React from 'react';
import {useEffect} from 'react';
import {View, StyleSheet, Alert, Platform, StatusBar} from 'react-native';
import AppText from '../../components/UI/AppText';
import {format} from 'date-fns/esm';
import {set} from 'date-fns';
import notifee, {
  AndroidStyle,
  RepeatFrequency,
  TriggerType,
  TimestampTrigger,
} from '@notifee/react-native';
import {isToday} from 'date-fns';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import Smcard from '../../components/UI/SmallCard/smcard';
import Button from '../../components/UI/Button/Button';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import messaging from '@react-native-firebase/messaging';
import {
  deviceToken,
  notificationListener,
  requestUserPermission,
} from '../../Utils/commonUtils';

const Notification = () => {
  const formate = format(new Date(), 'yyyy-MMM-dd');
  const setDate = set(new Date(), {hours: 7, minutes: 12, seconds: 0});
  //   console.log('formats__:\n', setDate);

  // Local Notification in android + ios

  const displayNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification(
      {
        title: 'Appointment with Mrs. Zara',
        body: 'You have one appointment with Mrs. Zara at 11pm ',
        android: {
          channelId: channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed

          pressAction: {
            id: 'default',
          },
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: imagesPath.notificationPic,
          },
        },
      },
      // trigger,
    );
  };

// background notification like alert msg
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    // when noti come and go
    notificationListener();
    deviceToken();
  }, []);

  return (
    <View style={styles.notif}>
      <Smcard
        style={{
          backgroundColor: mycolors.jaman,
          padding: 15,
          marginBottom: respHeight(5),
        }}>
        <AppText style={styles.headerText}>Push Notification </AppText>
      </Smcard>
      <Button onPress={displayNotification}>Local Notifications</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  notif: {
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
    paddingHorizontal: respWidth(2.5),
    backgroundColor: mycolors.white,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: mycolors.white,
    // alignSelf:'center'
  },
  primaryText: {
    fontSize: 16,
    color: mycolors.white,
    marginVertical: 5,
  },
});

export default Notification;
