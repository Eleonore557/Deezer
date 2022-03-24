import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MusicPlayer from '../../../screens/MusicPlayer'
import { StatusBar } from 'react-native'


const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <StatusBar barStyle="light-content"/>
      <Stack.Screen name='MusicPlayer' component={MusicPlayer} />
    </Stack.Navigator>
  )
}

export default HomeStack
