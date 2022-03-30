import { View, SafeAreaView, TouchableOpacity, Dimensions, Image, Text, FlatList, Animated } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import songs from '../../model/Data'
import Slider from '@react-native-community/slider';
import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState, usePlayerbackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player'
import readFavorite from '../utils/readFavorite'
import addToFavorite from '../utils/addToFavorite'
import removeFromFavorite from '../utils/removeFromFavorite'

Icon.loadFont(); 


const checkFavorite = async item => {
  const allFav = await readFavorite()

  const index = allFav.map(f => f.id).findIndex(itemId => itemId === item.id)
  if (index === -1) {
    addToFavorite(item)
  } else {
    removeFromFavorite(item)
  }
}

const {width, height} = Dimensions.get('window');


const setUpPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
      capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
      ]
    })
    await TrackPlayer.add(songs)
  } catch(e){
    console.log(e)
  }
}

const togglePayBack = async PlayBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if(currentTrack != null){
    if(PlayBackState == State.Paused) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }
}

const MusicPlayer = () => {
  const PlayBackState = usePlaybackState()
  const progress = useProgress()
  const [songIndex, setSongIndex] = useState(0)
  const [repeatMode, setRepeatMode] = useState('off')
  const [trackTitle, setTrackTitle] = useState()
  const [trackArtist, setTrackArtist] = useState()
  const [trackArtWork, setTrackArtWork] = useState()


    // custom references
  const scrollX = useRef(new Animated.Value(0)).current
  const songSlider = useRef(null) // Flatlist reference

    // Changing the track on complete
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if(event.type === Event.PlaybackTrackChanged && event.nextTrack !== null){
        const track = await TrackPlayer.getTrack(event.nextTrack)
        const {title, artwork, artist} = track
        setTrackTitle(title)
        setTrackArtist(artist)
        setTrackArtWork(artwork)
      }
    })

    const repeatIcon = () => {
      if(repeatMode == 'off') {
        return 'repeat-off'
      }
      if(repeatMode == 'track') {
        return 'repeat-once'
      }
      if(repeatMode == 'repeat') {
        return 'repeat'
      }
    }

    const changeRepeatMode = () => {
      if(repeatMode == 'off') {
        TrackPlayer.setRepeatMode(RepeatMode.Track)
        setRepeatMode('track')
      }
      if(repeatMode == 'track') {
        TrackPlayer.setRepeatMode(RepeatMode.Queue)
        setRepeatMode('repeat')
      }
      if(repeatMode == 'repeat') {
        TrackPlayer.setRepeatMode(RepeatMode.Off)
        setRepeatMode('off')
      }
    }

    const skipTo = async trackId => {
      await TrackPlayer.skip(trackId)
    }

  useEffect(() => {
    setUpPlayer()
    scrollX.addListener(({value}) => {

      const index = Math.round(value / width)
      skipTo(index)
      setSongIndex(index)
    })

    return () => {
      scrollX.removeAllListeners()
      TrackPlayer.destroy()
    }
  }, [])

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1 ) * width,
    }) 
}

  const skipToPrevious = () => {
      songSlider.current.scrollToOffset({
        offset: (songIndex - 1 ) * width,
      })
  }


  const renderSongs = ({item, index}) => {
    return(
      <Animated.View>
        <ImageWrapper>
          <MusicImage 
            source={trackArtWork}/>
        </ImageWrapper>
      </Animated.View>
    )
  }

  return (
    <Container>
      <MainContainer>
        <Animated.FlatList
          ref= {songSlider}
          renderItem={renderSongs}
          data={songs} 
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator = {false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent : {
                  contentOffset : {x : scrollX},
                },
              },
            ],
          {useNativeDriver: true},
        )}
      />

      <View>
          <SongTitle>{trackTitle}</SongTitle>
          <SongArtist>{trackArtist}</SongArtist>
      </View>
     
      <View>
        <ProgressBar value={progress.position} minimumValue={0} 
          maximumValue={progress.duration} 
          thumbTintColor='#FFD369' 
          minimumTrackTintColor='#FFD369' 
          maximumTrackTintColor='#fff' 
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value)
          }}/>

        <ProgressLevelDuration>
          <ProgressLabelText>
            {new Date(progress.position * 1000)
            .toLocaleTimeString()
            .substring(3)}
          </ProgressLabelText>
          <ProgressLabelText> {new Date((progress.duration - progress.position) * 1000)
            .toLocaleTimeString()
            .substring(3)}
          </ProgressLabelText>
        </ProgressLevelDuration>
      
        <MusicControlsContainer>
          <TouchableOpacity onPress={skipToPrevious}>
            <Icon name="skip-backward" size={40}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => togglePayBack(PlayBackState)}>
            <Icon name={
              PlayBackState === State.Playing ? "pause" : "play" } size={40}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={skipToNext}>
            <Icon name="skip-forward" size={40}/>
          </TouchableOpacity>
        </MusicControlsContainer>
      </View>
      

      <BottomSection>
        <BottomIconContainer>

        <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart" size={40}/>
          </TouchableOpacity>
          )}
        />
          <TouchableOpacityIcon onPress={changeRepeatMode}>
            <Icon name={`${repeatIcon()}`} size={40}
            color={repeatMode !== 'repeat' ? '#FFD369' : "#888888"}/>
          </TouchableOpacityIcon>

          <TouchableOpacityIcon onPress={() => {}}>
            <Icon name="view-headline" size={40}/>
          </TouchableOpacityIcon>

          <TouchableOpacityIcon onPress={() => {}}>
            <Icon name="share" size={40}/>
          </TouchableOpacityIcon>
        </BottomIconContainer>
      </BottomSection>
      </MainContainer>
    </Container>
    
  )
}

export default MusicPlayer


const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #146B5C;
`

const MainContainer = styled.View`
  flex: 1;
  justifyContent: center;
`

const BottomSection = styled.View`
  borderTopColor: #393E46;
  borderWidth: 1px;
  alignItems: center;
  paddingVertical: 15px;
`
const BottomIconContainer = styled.View `
  flexDirection: row;
  width: 95%;
  justifyContent: space-between;
  
`

const ImageWrapper = styled.View`
  width: 400px;
  height: 340px;
  marginBottom: 10px;
  marginTop: 40px;
  elevation: 5;
  shadowColor: #ccc;
     shadowOffset: {
       width: 5px;
      height: 5px;
  },
  shadowOpacity: 0.5;
  shadowRadius: 3.84;
`

const MusicImage = styled.Image`
  width: 100%;
  height: 100%;
  borderRadius: 5;
  `

  const SongTitle = styled.Text`
  fontSize: 18px;
  fontWeight: 600;
  textAlign: center;
  color: #EEEEEE;
`

const SongArtist = styled.Text`
  fontSize: 16;
  fontWeight: 300;
  textAlign: center;
  color: #EEEEEE;
`

const ProgressBar = styled.Slider`
  width: 350px;
  height: 40px;
  marginTop: 25px;
  margin-left : 4%;
`
const ProgressLevelDuration = styled.View `
  width: 360px;
  flexDirection: row;
  justifyContent: space-between;
  marginLeft: 3%;
`
const ProgressLabelText = styled.Text`
  color: #FFF;
`

const MusicControlsContainer = styled.View `
  flexDirection: row;
  justifyContent: space-between;
  marginTop: 15px;
  width: 70%;
  alignItems: center;
  marginLeft: 15%
  marginBottom: 5%;
`
const TouchableOpacityIcon = styled.TouchableOpacity`
  margin-right: 55px;
`

const FlatListImage = styled.View`
 

`









