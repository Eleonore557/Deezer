import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MusicPlayer from '../../screens/MusicPlayer'
import Favorite from '../../screens/favorite'
import { StatusBar } from 'react-native'


const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <StatusBar barStyle="light-content"/>
      <Stack.Screen name="Let's do it !" component={MusicPlayer} />
      <Stack.Screen name='Favoris' component={Favorite} />
    </Stack.Navigator>
  )
}

export default HomeStack
