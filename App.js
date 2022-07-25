import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongPage from './app/components/SongPage';
import Home from './app/Home'
import Pager from './app/components/Pager'
import { WebView } from 'react-native-webview'

const Stack = createNativeStackNavigator()

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
      <SongPage index={index} title={title} array={array}/>
      <StatusBar style="auto" />
    </View>
  );
}
function PagerScreen({route}) {
  const {index, num, array} = route.params
  return (
    <View style={styles.container}>
      <Pager index={index} num={num} array={array}/>
      <StatusBar style="auto" />
    </View>
  );
}



export default function App() {
  return (
//    <NavigationContainer style={styles.container}>
//      <Stack.Navigator>
//        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
//        <Stack.Screen name="Song" component={SongScreen}/>
//	      <Stack.Screen name="Pager" component={PagerScreen} options={{headerShown: false}}/> 
//      </Stack.Navigator>
//    </NavigationContainer>
    <View style={styles.container}>
      <WebView source={{ uri: "https://unity-song-book-web.vercel.app" }} />
      <StatusBar style="auto" />
    </View>
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
