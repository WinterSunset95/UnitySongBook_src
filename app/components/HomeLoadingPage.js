import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default function HomeLoadingPage({navigation}) {
  const switchScreen = () => {
    navigation.navigate('Home')
  }
  return (
    <View>
      <TouchableOpacity onPress={switchScreen}>
      <Text>Loading . . . .</Text>
      </TouchableOpacity>
    </View>
  )
}
