import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function Song({title, composer, link, song, num, navigation, array}) {
  const switchScreen = () => {
    for(let i=0; i<array.length; i++){
      item = array[i]
      if(title == item.title){
	      index = i
	      console.log(index)
	      navigation.navigate('Pager', {index, num, array})
      }
    }
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
