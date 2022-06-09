import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongPage from './app/components/SongPage';
import Home from './app/Home'
import Pager from './app/components/Pager'

const Stack = createNativeStackNavigator()

// function PagerScreen({route}) {
//   const {title, composer, link, song, array} = route.params
//   return (
//     <View style={styles.container}>
//     <Pager array={array} title={title} composer={composer} link={link} song={song}/>
//     <StatusBar style="auto" />
//     </View>
//   );
// }
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Home navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
  );
}
function SongScreen({route}) {
  const {index, array} = route.params
  return (
    <View style={styles.container}>
      <SongPage index={index} array={array}/>
      <StatusBar style="auto" />
    </View>
  );
}



export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Song" component={SongScreen}/>
	{/* <Stack.Screen name="Pager" component={PagerScreen} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});
