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
  Animated} from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons';
import {Audio} from 'expo-av'
import Slider from '@react-native-community/slider'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default function SongPage({title, composer, link, song}) {
  const [songindex, setSongindex] = useState(index)
  const [lyrics, setLyrics] = useState()
  const [zoom, setZoom] = useState(20)
  const [Loaded, SetLoaded] = useState(false)
  const [Loading, SetLoading] = useState(false)
  const [playing, setPlaying] = useState('not playing')
  const sound = useRef(new Audio.Sound())
  const AudioStatus = () => {
    if(Loaded == true) {
      return <Text style={styles.audioItem}>Demo available</Text>
    } else {
      return <Text style={styles.audioItem}>Demo is either unavailable or loading, please wait</Text>
    }
  }
  const PlayPause = () => {
    if(playing === 'playing') {
      return (
	<AntDesign 
	  onPress={PauseAudio} style={styles.zoomItem} name="pausecircle" size={40} color="black" />
    )}
    else {
      return (
	<AntDesign 
	  onPress={PlayAudio} style={styles.zoomItem} name="play" size={40} color="black" />
    )}
  }
  async function getLyrics() {
    let response = await fetch(link)
    let my_json = await response.text()
    setLyrics(my_json)
  }
  getLyrics()
  
  useEffect(() => {
    LoadAudio();
    return sound
    ? () => {
      sound.current.unloadAsync()
    }
    : undefined
  }, []);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
	  setPlaying('playing')
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
	  setPlaying('not playing')
        }
      }
    } catch (error) {}
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({uri: song}, {}, true);
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log('Error in Loading Audio');
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };
  return (
  <View>
	<ScrollView
	  style={{
	    width: Dimensions.get('window').width
	  }}
	  showsVerticalScrollIndicator={false}
	>
	  <View style={styles.container}>
	    <View style={styles.header}>
	      <Text style={styles.title}>{title}</Text>
	      <Text style={styles.composer}> - {composer}</Text>
	    </View>
	    <View style={styles.body}>
	      <Text style={{fontSize: zoom, padding: 10}}>{lyrics}</Text>
	    </View>
	  </View>
	  <View style={styles.audio}>
	    <AudioStatus />
	  </View>
	  <Slider 
	    style={{width: 200, height: 40}}
	    minimumValue={0}
	    maximumValue={1}
	    minimumTrackTintColor="f0f0f0"
	    maximumTrackTintColor="#000000"
	  />
	</ScrollView>
      <View style={styles.zoomer}>
	<PlayPause />
	<AntDesign onPress={() => setZoom(zoom + 1)} style={styles.zoomItem} name="pluscircle" size={40} color="black" />
	<AntDesign onPress={() => setZoom(zoom - 1)} style={styles.zoomItem} name="minuscircle" size={40} color="black" />
      </View>
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
