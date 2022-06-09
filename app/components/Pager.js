import React, {useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions
} from 'react-native'
import SongPage from './SongPage'

function Page({title, composer, link, song}) {
  return (
      <View style={{
	height: '100%', 
	width: Dimensions.get('window').width, 
	}}>  
	<SongPage title={title} composer={composer} link={link} song={song}/>
      </View>
  )
}
export default function Pager({title, composer, link, song, array}) {
  () => {
    for(let i=0; i<array.length; i++) {
      item = array[i]
      if(title === item.title){
	window.index = i
      }
      else {
	console.log('')
      }
    }
  }
  const renderItem = ({item}) => {
    return (
      <Page key={item.title} title={item.title} composer={item.composer} link={item.link} song={item.song}/>
    )
  }
  return (
    <View>
      <FlatList style={{borderWidth: 5, height: '100%', width: '100%'}}
	data={array}
	ref={(ref) => {
	  setRef(ref)
	}}
	renderItem={renderItem}
	keyExtractor={item => item.title}
	horizontal
	pagingEnabled={true}
	showsHorizontalScrollIndicator={false}
	// getItemLayout={(array, index) => (
	//   {length: array.length, offset: array.length * index, index}
	// )}
	initialNumToRender={to_scroll}
	initialScrollIndex={to_scroll}
      />
    </View>
  )
}

// const styles = StyleSheet.create({
//   main: {
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   flat: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#000000'
//   }
// })
