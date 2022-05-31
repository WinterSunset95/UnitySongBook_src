import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function Song({title, composer, link, song, navigation}) {
  const switchScreen = () => {
    navigation.navigate('Song', {title, composer, link, song})
  }
  return (
    <TouchableOpacity 
      style={styles.main}
      onPress={switchScreen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.composer}>{composer}</Text>
    </TouchableOpacity>
  )
} 

const styles = StyleSheet.create({
  main: {
    height: 60,
    width: '100%',
    backgroundColor: 'rgba(240,240,240,0.5)',
    borderRadius: 10,
    marginBottom: 10, 
    justifyContent: 'center',
    paddingHorizontal: 5, 
  },
  title: {
    fontSize: 25,
  }, 
  composer: {
    fontSize: 10,
  }
})
