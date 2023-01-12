import { StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import BookList from './app/screens/BookList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
    setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 1000)

  
const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
          options={{ title: 'My Book App',
                     headerTitleAlign: 'center',
                      headerStyle: {
                        backgroundColor: '#f4511e'
                      }
                  }} 
        />
        <Stack.Screen name="BookList" component={BookList} 
            options={{ title: 'My Book App',
                       headerTitleAlign: 'center',
                       headerStyle: {
                        backgroundColor: '#f4511e'
                            }
                    }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
                                    
}

const styles = StyleSheet.create({

})
