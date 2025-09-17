// screens/ChatScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Text } from 'react-native-gesture-handler';
import { Channel, MessageList, MessageInput } from 'stream-chat-react-native';
import { CustomMessage } from '../../components/task/messages/CustomMessages';

export default function ChatScreen({ route })    {
  const { channel } = route.params;
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={{ flex: 1, marginBottom: 50 }}>
    <TouchableOpacity onPress={() => navigation.goBack()} >
          <Text style={{}}>← Back</Text>
        </TouchableOpacity>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Channel channel={channel}>
        <MessageList  MessageSimple={CustomMessage} />
        <MessageInput />
      </Channel>
    </View>
  </GestureHandlerRootView>
  );
}