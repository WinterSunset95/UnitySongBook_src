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
import ImageViewer from 'react-native-image-zoom-viewer'
import ImageZoom from 'react-native-image-pan-zoom';
import { WebView } from 'react-native-webview'

export default function SongPage({title, composer, link, song}) {
  const [songindex, setSongindex] = useState(index)
  const [lyrics, setLyrics] = useState()
  const [zoom, setZoom] = useState(20)
  const [Loaded, SetLoaded] = useState(false)
  const [Loading, SetLoading] = useState(false)
  const [playing, setPlaying] = useState('not playing')
  const [audlen, setAudlen] = useState(0)
  const [slival, setSlival] = useState(0)
  const [imageheight, setImageheight] = useState(0)
  const [imagewidth, setImagewidth] = useState(0)
  useEffect(() => {
    Image.getSize(link, (w, h) => {
      setImagewidth(w)
      setImageheight(h)
    })
  }, [])
  const sound = useRef(new Audio.Sound())
  const AudioStatus = () => {
    if(Loaded == true) {
      return <PlayPause />
    } else {
      return <Text></Text>
    }
  }
  const array_length = array.length
  const PlayPause = () => {
    if(playing === 'playing') {
      return (
	      <AntDesign 
	        onPress={PauseAudio} style={styles.zoomItem} name="pausecircle" size={40} color="black" />
      )
    } else {
      return (
	      <AntDesign 
	        onPress={PlayAudio} style={styles.zoomItem} name="play" size={40} color="black" />
      )
    }
  }
  async function getLyrics() {
    try {
      let response = await fetch(link)
      let my_json = await response.text()
      setLyrics(my_json)
    }
    catch {
      setLyrics(null)
    }
  }
  getLyrics()
  
  useEffect(() => {
    LoadAudio();
    return sound
    ? () => {
      sound.current.unloadAsync()
      setPlaying('not playing')
    }
    : undefined
  }, []);
  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      console.log(result)
      if (result.isLoaded) {
        if (result.isPlaying === false) {
     	  sound.current.playAsync()
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
        console.log('Audio not loaded');
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };
  const images = [
    {url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'}
  ]
    return (
      <WebView source={{ uri: link }} style={{ width: Dimensions.get('window').width}}/>
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
  audioContainer: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    marginLeft: 20, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  audioItem: {
    margin: 5
  }, 
  audioSlider: {
    width: 200,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'black'
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
