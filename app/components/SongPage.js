import React, {useState} from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default function SongPage({title, composer, link}) {
  const [lyrics, setLyrics] = useState()
  const [zoom, setZoom] = useState(15)
  async function getLyrics() {
    let response = await fetch(link)
    let my_json = await response.text()
    setLyrics(my_json)
  }
  getLyrics()
  return (
    <View>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
	<Text style={styles.title}>{title}</Text>
	<Text style={styles.composer}>{composer}</Text>
      </View>
      <View style={styles.body}>
	<Text style={{fontSize: zoom, padding: 10}}>{lyrics}</Text>
      </View>
    </View>
    </ScrollView>
    <View style={styles.zoomer}>
      <Feather onPress={() => setZoom(zoom + 1)} style={styles.zoomItem} name="zoom-in" size={40} color="black" />
      <Feather onPress={() => setZoom(zoom - 1)} style={styles.zoomItem} name="zoom-out" size={40} color="black" />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    minHeight: '50%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  composer: {
    fontSize: 10,
    marginHorizontal: 5,
  },
  header: {
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 25,
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
