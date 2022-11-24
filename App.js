import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Intro from './app/pages/Intro';
import NoteScreen from './app/pages/NoteScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/context/NoteProvider';
const App = () => {
  const [user, setUser] = useState('');
  let findUser = async () => {
    const user = await AsyncStorage.getItem('user');
    setUser(user);
  };
  const Stack = createStackNavigator();
  useEffect(() => {
    findUser();
    // AsyncStorage.clear()
  }, []);
  return !user ? (
    <Intro onUserSet={findUser} />
  ) : (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator>
          <Stack.Screen component={NoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetail} name="NoteDetail" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;
