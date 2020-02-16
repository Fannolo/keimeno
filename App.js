/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './src/screens/Homepage';
import PictureScreen from './src/screens/PictureScreen';
const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" headerMode="none">
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="PictureScreen"
            component={PictureScreen}
            options={{
              animationEnabled: false,
              gestureDirection: 'vertical',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
