import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import UserDetail from '../UserDetail/UserDetail';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export default function Admin() {
  const userDet = useSelector(state => state.user);
  function HomeScreen() {
    return (
      <View>
        <Text>Selam</Text>
      </View>
    );
  }

  function GetAllData() {}

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveBackgroundColor: '#FFD700',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'black',
            tabBarLabel: 'Istatistik',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="stats-chart" color={color} size={size} />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveBackgroundColor: '#FFD700',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'black',
            tabBarLabel: 'Kullanici',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
          name="Statistics"
          component={UserDetail}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
