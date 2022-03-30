import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native'
import readFavorite from '../utils/readFavorite'

const Favorite = () => {
  const [fav, setFav] = useState([])

  const addFavToState = async () => {
    const allFav = await readFavorite()
    setFav(allFav)
  }

  useFocusEffect(() => {
    addFavToState()
  })

  useEffect(() => {
    addFavToState()
  }, [])

  useEffect(() => {
    console.log(fav)
  }, [fav])

  return (
    <>
      {fav.map(f => (
        <Text>{f.title}</Text>
      ))}
    </>
  )
}

export default Favorite
