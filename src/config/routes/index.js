import React from 'react'
import {StyleSheet} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MusicPlayer from '../../../screens/MusicPlayer'


const BottomTab = createBottomTabNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name='MusicPlayer' component={MusicPlayer} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}



export default Routes