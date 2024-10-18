import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {FitnessWidget} from './src/navigations/widgets/FitnessWidget';
import {ResizableMusicWidget} from './src/navigations/widgets/ResizableMusicWidget';
import {ConfigurableWidget} from './src/navigations/widgets/ConfigurableWidget';
import {ClickDemoWidget} from './src/navigations/widgets/ClickDemoWidget';
import {
  DebugEventsWidget,
  DEBUG_EVENTS_STORAGE_KEY,
} from './src/navigations/widgets/DebugEventsWidget';

const nameToWidget = {
  Fitness: FitnessWidget,
  ClickDemo: ClickDemoWidget,
  Resizable: ResizableMusicWidget,
  DebugEvents: DebugEventsWidget,
  Configurable: ConfigurableWidget,
};

const COUNTER_STORAGE_KEY = 'CounterWidget:count';
const CONFIGURABLE_WIDGET_STORAGE_KEY = 'ConfigurableWidget:config';

export async function widgetTaskHandler(props) {
  console.log('open0 :', props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName];

  if (widgetInfo.widgetName === 'DebugEvents') {
    let events = await writeAndGetEvents(
      widgetInfo.widgetId,
      props.widgetAction,
    );
    if (props.widgetAction === 'WIDGET_CLICK') {
      AsyncStorage.setItem(DEBUG_EVENTS_STORAGE_KEY, '[]');
      events = [];
    }
    props.renderWidget(<DebugEventsWidget events={events} />);
    return;
  }

  if (widgetInfo.widgetName === 'Configurable') {
    const configStr = await AsyncStorage.getItem(
      CONFIGURABLE_WIDGET_STORAGE_KEY,
    );

    const config = JSON.parse(configStr ?? '{}');

    const widgetConfig = config[widgetInfo.widgetId] ?? {
      value: 1,
      increment: 1,
    };

    switch (props.widgetAction) {
      case 'WIDGET_RESIZED':
      case 'WIDGET_ADDED':
      case 'WIDGET_UPDATE':
        props.renderWidget(<ConfigurableWidget value={widgetConfig.value} />);
        break;

      case 'WIDGET_DELETED':
        delete config[widgetInfo.widgetId];
        AsyncStorage.setItem(
          CONFIGURABLE_WIDGET_STORAGE_KEY,
          JSON.stringify(config),
        );
        break;

      case 'WIDGET_CLICK':
        widgetConfig.value =
          widgetConfig.value +
          widgetConfig.incrementBy *
            (props.clickAction === 'INCREMENT' ? 1 : -1);
        props.renderWidget(<ConfigurableWidget value={widgetConfig.value} />);
        config[widgetInfo.widgetId] = widgetConfig;
        AsyncStorage.setItem(
          CONFIGURABLE_WIDGET_STORAGE_KEY,
          JSON.stringify(config),
        );
        break;
    }
    return;
  }

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
      if (widgetInfo.widgetName === 'Counter') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<CounterWidget count={count} />);
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;

    case 'WIDGET_ADDED':
      if (widgetInfo.widgetName === 'Counter') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<CounterWidget count={count} />);
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;

    case 'WIDGET_UPDATE':
      if (widgetInfo.widgetName === 'Counter') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<CounterWidget count={count} />);
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;

    case 'WIDGET_DELETED':
      // Do nothing
      break;

    case 'WIDGET_CLICK':
      if (widgetInfo.widgetName === 'Fitness') {
        props.renderWidget(
          <Widget {...widgetInfo} activeView={props.clickAction} />,
        );
      }

      if (widgetInfo.widgetName === 'Counter') {
        const count =
          props.clickActionData?.value +
          (props.clickAction === 'INCREMENT' ? 1 : -1);
        props.renderWidget(<CounterWidget count={count} />);

        AsyncStorage.setItem(COUNTER_STORAGE_KEY, `${count}`);
      }

      if (widgetInfo.widgetName === 'Resizable') {
        props.renderWidget(
          <Widget
            {...widgetInfo}
            status={props.clickAction === 'pause' ? 'stopped' : 'playing'}
            songId={props.clickActionData?.songId ?? 0}
          />,
        );
      }

      if (widgetInfo.widgetName === 'List' && props.clickAction === 'ARCHIVE') {
        props.renderWidget(
          <Widget archivedIndex={props.clickActionData?.listItemId} />,
        );
      }
      break;

    default:
      break;
  }
}

async function writeAndGetEvents(widgetId, action) {
  const data = await AsyncStorage.getItem(DEBUG_EVENTS_STORAGE_KEY);
  const items = JSON.parse(data ?? '[]');
  items.push(`Widget #${widgetId} ${action} - ${new Date().toLocaleString()}`);
  AsyncStorage.setItem(DEBUG_EVENTS_STORAGE_KEY, JSON.stringify(items));
  return items;
}
