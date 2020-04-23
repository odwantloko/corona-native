import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import AfricaScreen from '../screens/AfricaScreen';
import GlobalScreen from '../screens/GlobalScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home Map',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />,
        }}
      />
      <BottomTab.Screen
        name="Africa"
        component={AfricaScreen}
        options={{
          title: 'Africa\'s Stats',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-browsers" />,
        }}
      />
        <BottomTab.Screen
        name="Global"
        component={GlobalScreen}
        options={{
          title: 'Global Stats',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-browsers" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'The Rona Visualizer';
    case 'Global':
      return 'Global Stats';
    case 'Africa':
      return 'Africa\'s Stats';
  }
}
