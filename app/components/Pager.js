import React, {useState, useEffect, useRef} from 'react'
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Button, 
  FlatList,
  Dimensions,
  Image,
  Animated} from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons';
import {Audio} from 'expo-av'
import Slider from '@react-native-community/slider'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SongPage from './SongPage'

export default function Pager({index, num, array}) {
  const num_ind = num - 1
  // const song_item = array.find((element) => element.title == song_title)
  // const song_index = array.findIndex((element) => element.title == song_title)
  const [ref, setRef] = useState(null)
  const [songindex, setSongindex] = useState(num_ind)
  const sorted_array = array.sort((a, b) => {
    return a.num - b.num
  })
  const dataItem = sorted_array[songindex]
  const {title, composer, link, song} = dataItem
  const array_length = array.length
  const myData = [
    {
      title: 1,
      'none': false,
      direction: 'left'
    },
    {
      title: title,
      composer: composer,
      link: link,
      song: song,
      to_render: true,
      direction: false
    },
    {
      title: 3,
      'none': false,
      direction: 'right'
    }
  ]
  const goToPage = (dir) => {
    ref.scrollToIndex({
      animated: false,
      index: 1,
      viewPosition: 0
    })
    if(dir == 'left'){
      if(songindex != 0){
	      setSongindex(songindex - 1)
      }
    }
    else {
      if(songindex != array_length - 1){
	      setSongindex(songindex + 1)
      }
    }
  }
  const MainView = ({title, composer, link, song, to_render, direction}) => {
    if(to_render == true){
      return (
	<SongPage title={title} composer={composer} link={link} song={song} />
//	<View style={styles.loading}>
//	  <Text>This is supposed to be the song page {title} {composer} {link} {song}</Text>
//
//	</View>
      )
    }
    else {
      return ( 
	<View 
	  style={styles.loading}
	>
	  <Text>Loading . . . </Text>
	</View>
      )
    }
  }
  const renderItem = ({item, index}) => {
    return <MainView direction={item.direction} key={item.title} title={item.title} composer={item.composer} link={item.link} song={item.song} to_render={item.to_render} />
  }
  return (
  <View>
    <FlatList 
      data={myData}
      ref={(ref) => {
	      setRef(ref)
      }}
      renderItem={renderItem}
      keyExtractor={item => item.title}
      horizontal
      pagingEnabled={true}
      initialScrollIndex={1}
      extraData={title}
      onScroll={(r) => {
	const width = r.nativeEvent.layoutMeasurement.width
	if(r.nativeEvent.contentOffset.x == 0){
	  goToPage('left')	  
	} else if(r.nativeEvent.contentOffset.x == width * 2) {
	  goToPage('right')
	} 
      }}
    />
  </View>
  )
}

const styles = StyleSheet.create({
  audio: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  audioItem: {
    margin: 5
  }, 
  body: {
    minHeight: '50%', 
    marginTop: 50,
  },
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  composer: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  header: {
    alignItems: 'flex-end'
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  title: {
    fontSize: 30,
    margin: 5,
  },
  zoomer: {
    position: 'absolute',
    bottom: 10,
    right: 10, 
    alignItems: 'flex-end'
  },
  zoomItem: {
    margin: 10, 
  }
})
