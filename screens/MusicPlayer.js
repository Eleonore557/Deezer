import { View, SafeAreaView, TouchableOpacity, Dimensions, Image, Text, FlatList } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import songs from '../model/Data'
import Slider from '@react-native-community/slider';
Icon.loadFont(); 

const {width, height} = Dimensions.get('window');

const MusicPlayer = () => {
  const renderSongs = ({item, index}) => {
    return(
      <View>
        <Image 
         style={{
          height: 100,
          width: 200
        }}
        source={require('../assets/img/Kamaz.jpeg')}/>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList renderItem={renderSongs} data={songs} 
        keyExtractor={item => item.id}
        horizontal pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={() => {}}
        />


      </View>

      <View>
          <Text>Some Title</Text>
          <Text>Some Artist Name</Text>
        </View>
     
      <View>
        <Slider value={10} minimumValue={0} maximumValue={1} thumbTintColor='#FFD369' 
        minimumTrackTintColor='#FFD369' 
        maximumTrackTintColor='#fff' onSlidingComplete={() => {}}/>
        <View>
          <Text>00:00</Text>
          <Text>00:00</Text>
        </View>
      </View>


      <View>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="file-audio-o" size={30}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="angle-down" size={30}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="arrow-up-from-square" size={30}/>
          </TouchableOpacity>
        </View>
      </View>
      

      <View>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart" size={30}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="repeat" size={30}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="arrow-up-from-square" size={30}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart" size={30}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    
  )
}

const TextStyled = styled.SafeAreaView`
  flex: 1,
  backgroundColor: '#222831',
  alignItems: 'center',
  justifyContent: 'center',
`

const ViewStyled = styled.View`
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
`

export default MusicPlayer