import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Main/HomePage';
import Started from './Screens/Auth/Started';
import Login from './Screens/Auth/Login';
import Signup from './Screens/Auth/Signup'
import Profile from './Screens/Main/Profile'


const Stack = createStackNavigator();


const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Started' component={Started} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App