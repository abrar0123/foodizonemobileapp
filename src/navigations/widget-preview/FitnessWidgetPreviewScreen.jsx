import * as React from 'react';

import {StyleSheet, View} from 'react-native';
import {WidgetPreview} from 'react-native-android-widget';
import {FitnessWidget} from '../widgets/FitnessWidget';

export function FitnessWidgetPreviewScreen() {
  const [view, setView] = React.useState();

  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <FitnessWidget activeView={view} />}
        onClick={({clickAction}) => setView(clickAction)}
        height={209}
        width={320}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
