import React, {useEffect, type PropsWithChildren} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './screens/Home/Home';
import Detail from './screens/Detail/Details';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#4b567a',
            },
            headerTitleStyle: {
              color: '#bfc4d6'
            },
            headerTitleAlign: 'center',
            contentStyle: {
              backgroundColor: '#464a57'
            }
          }} />
        <Stack.Screen 
          name="Detail"
          component={Detail}
          options={({route, navigation}) => ({
            title: route.params.show.name,
            headerStyle: {
              backgroundColor: '#4b567a',
            },
            headerTitleStyle: {
              color: '#bfc4d6'
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" color="#bfc4d6" size={25} />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            contentStyle: {
              backgroundColor: '#464a57'
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
