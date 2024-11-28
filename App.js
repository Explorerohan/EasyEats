import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './Screens/Main/HomePage';
import Started from './Screens/Auth/Started';
import login from './Screens/Auth/Login';
import signup from './Screens/Auth/Signup'
import profile from './Screens/Main/Profile'


const Stack = createStackNavigator();


const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Started' component={Started} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='home' component={home} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='login' component={login} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='signup' component={signup} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='profile' component={profile} options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App