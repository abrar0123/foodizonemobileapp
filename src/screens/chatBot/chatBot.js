import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import AppText from '../../components/UI/AppText';
import Smcard from '../../components/UI/SmallCard/smcard';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import mycolors from '../../styles/mycolors';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {useState} from 'react';
import {useEffect} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import {DB} from '../../firebase_Configue';

const ChatBot = () => {
  const [myMessage, setmyMessage] = useState([]);

  // console.log('route\n:', route.params.data);
  useEffect(() => {
    setmyMessage([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const sendHandler = async messageArray => {
    setmyMessage(previousMessage =>
      GiftedChat.append(previousMessage, messageArray),
    );
    console.log('messages__:', messageArray, '\n\n', myMessage[0]);

    const myCollection = await collection(DB, 'TDMChats');

    try {
      const insertMSG = await addDoc(myCollection, messageArray[0]);
      insertMSG
        .then(e => console.log('resolve', e))
        .catch(e => console.log('reject', e));
    } catch (error) {
      console.log('error_:', error);
    }
  };

  //   **************** DB Messages ****************

  const messageDB = async () => {};
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: mycolors.cyan,
            color: mycolors.white,
          },
        }}
      />
    );
  };
  return (
    <View style={styles.chat}>
      <Smcard
        style={{
          backgroundColor: mycolors.cyan,
          padding: 15,
          marginBottom: respHeight(5),
        }}>
        <AppText style={styles.headerText}>Welcome to ChatBot </AppText>
      </Smcard>

      <GiftedChat
        messages={myMessage}
        onSend={message => sendHandler(message)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    flex: 1,
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

export default ChatBot;
