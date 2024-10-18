import * as React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export function ListDemoWidgetPreviewDeepLinkScreen({route}) {
  return (
    <View style={styles.container}>
      <Text>Viewing details for release: 0.{route.params?.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  list: {
    width: '100%',
  },
  listItem: {
    padding: 16,
  },
  separator: {
    backgroundColor: 'gray',
    height: 1,
  },
});
