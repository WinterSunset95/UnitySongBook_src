import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongPage from './app/components/SongPage';
import HomeLoadingPage from './app/components/HomeLoadingPage';
import Home from './app/Home'

const Stack = createNativeStackNavigator()

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Home navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
  );
}
function HomeLoadingScreen({navigation}) {
  return (
    <View>
      <HomeLoadingPage navigation={navigation} />
    </View>
  )
}
function SongScreen({route}) {
  const {title, composer, link} = route.params
  return (
    <View style={styles.container}>
      <SongPage title={title} composer={composer} link={link}/>
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
	<Stack.Screen name="LoadHome" component={HomeLoadingScreen} options={{headerShown: false}} />
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
