export const linkingOptions = {
  prefixes: ['foodizone://'],
  config: {
    initialRouteName: 'ListScreen',
    screens: {
      ListScreen: 'list',
      FitnessWidgetPreviewScreen: 'list/fitness',
      ResizableMusicWidgetPreviewScreen: 'list/list-demo',
      ListDemoWidgetPreviewDeepLinkScreen: 'list/list-demo/:id',
    },
  },
};
