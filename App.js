import { View, Text } from 'react-native'
import React from 'react'
import Authentification from './Screens/Authentification'
import NewAccount from './Screens/NewAccount'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Acceuil from './Screens/Acceuil'
import { Title } from 'react-native-paper'
import Chat from './Screens/Chat'
const stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
<stack.Navigator screenOptions={{ headerShown: false }}>

        <stack.Screen name="Auth" component={Authentification}></stack.Screen>
        <stack.Screen name="NewAccount" component={NewAccount}></stack.Screen>

        <stack.Screen name="acceuil" component={Acceuil}></stack.Screen>
        <stack.Screen name="Chat" component={Chat}></stack.Screen>


      </stack.Navigator>

    </NavigationContainer>
  )
}