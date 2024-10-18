/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {
  FlexWidget,
  TextWidget,
  ListWidget,
  IconWidget,
} from 'react-native-android-widget';

export function ClickDemoWidget({archivedIndex}) {
  const data = [
    {id: 1, text: 'Item 1'},
    {id: 2, text: 'Item 2'},
    {id: 3, text: 'Item 3'},
  ];
  const renderItem = ({item}) => (
    <View>
      <Text>{item.text}</Text>
    </View>
  );
  return (
    <FlexWidget
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4500',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 32,
        flex: 1,
        flexDirection: 'column',
      }}>
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 'wrap_content',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
        clickAction="OPEN_APP">
        <TextWidget style={{fontSize: 12}} text="Open App abc" />
        <ListWidget children={renderItem}>
          {Array.from({length: 5}).map((_, i) => (
            <TextWidget
              key={i}
              style={{fontSize: 12}}
              text={`Open App abc ${i}`}
            />
          ))}
        </ListWidget>
      </FlexWidget>
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 'wrap_content',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
        clickAction="OPEN_URI"
        clickActionData={{uri: 'androidwidgetexample://list/fitness'}}>
        <TextWidget style={{fontSize: 12}} text="Open Fitness Abrar DeepLink" />
      </FlexWidget>
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 'wrap_content',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
        clickAction="OPEN_URI"
        clickActionData={{
          uri: 'https://github.com/sAleksovski/react-native-android-widget',
        }}>
        <TextWidget style={{fontSize: 12}} text="Open GitHub Link" />
      </FlexWidget>
    </FlexWidget>
  );
}
