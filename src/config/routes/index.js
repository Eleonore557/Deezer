import React from 'react'
import {StyleSheet} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MusicPlayer from '../../screens/MusicPlayer'
import Favorite from '../../screens/favorite'
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont(); 

const BottomTab = createBottomTabNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Let's do it !" component={MusicPlayer} options={{
          tabBarLabel: "Let's do it !",
          tabBarIcon: ({ color, size }) => (
            <Icon name="music" color={color} size={size} />
          ),
        }}/>
        <BottomTab.Screen name='Favoris' component={Favorite}  options={{
          tabBarLabel: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}



export default Routes