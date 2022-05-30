import React, {useEffect, useState} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import Song from './Song'

export default function Home({navigation}) {
  const [json, setJson] = useState()
  const [search, setSearch] = useState("")
  const [text, setText] = useState("")
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const switchScreen = () => {
    navigation.navigate('LoadHome')
  }
  function GetSortOrder(prop) {    
    return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
    }    
  }
  async function fetch_autumn() {
    let response = await fetch('https://wintersunset95.github.io/UnitySongBook/list.json')
    let my_json = await response.json()
    work_with_json(my_json)
  }
  function work_with_json(file) {
    file.sort(GetSortOrder("title"))
    for(let i = 0; i<file.length; i++) {
      item = file[i]
      title_string = item.title
      title_index = title_string.charAt(0)
      item["class"] = title_index
    }
    for(let i = 0; i<file.length; i++){
      item = file[i]
      const search_text = search.toLowerCase()
      const length = search.length
      const title = item.title
      const title_formatted = title.toLowerCase()
      const to_match = title_formatted.slice(0, length)
      if (search_text===to_match) {
	item['index'] = true
      }
      else {
	item['index'] = false
      }
    }
    const results = file.filter(function(item) {
      return item.index
    })
    try {
      setJson(results)
    }
    catch(err) {
      setJson(file)
    }
  }
  fetch_autumn()
  try {
    window.songList = json
  }
  catch(err) {
    console.log('data does not exist')
  }
  try {
    return (
      <View>
      <View style={[styles.header]}>
        <View style={styles.headerItem}>
	  <Image source={require('../assets/unity_logo.png')} style={[styles.logo_image, styles.headerSubItem]}/>
	  <Text style={[styles.headerSubItem, styles.logoText]}>Unity Church</Text>
	</View>
	<View style={styles.headerItem}>
	  <TextInput 
	    placeholder={'Search'}
	    style={[styles.headerSubItem, styles.inputField]}
	    onChangeText={text => {
	      setSearch(text)
	    }}
	  />
	  <TouchableOpacity onPress={() => {
	    Keyboard.dismiss()
	  }} >
	    <FontAwesome name="search" size={24} color="black" style={styles.headerSubItem}/>
	  </TouchableOpacity>
	</View>
      </View>
      
      <ScrollView style={styles.body}>
	{
	  songList.map(({title, composer, link}) => {
	    return <Song key={title} title={title} composer={composer} link={link} navigation={navigation}/>
	  })
	}
      </ScrollView>
      </View>
    )
  }
  catch(err) {
    return (
      <View>
	<TouchableOpacity onPress={switchScreen}>
        <Text>Loading . . . .</Text>
	</TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 10, 
  },
  header: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 5, 
  },
  headerItem: {
    alignItems: 'center', 
    flexDirection: 'row', 
    width: '50%'
  },
  headerSubItem: {
    margin: 5, 
  }, 
  inputField: {
    width: '80%', 
    height: 35,
    borderColor: 'rgba(200,200,200,0.5)',
    borderRadius: 5,
    borderWidth: 2, 
    paddingHorizontal: 10,
  },
  logo_image: {
    width: 60,
    height: 60,
    resizeMode: 'contain', 
  },
  logoText: {
    fontSize: 25,
  },
  test: {
    height: 500,
    backgroundColor: 'cyan',
    margin: 50, 
  }
})
