import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './pages/Login/Login';
import RegisterScreen from './pages/Register/Register';
import HomeScreen from './pages/Home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const value = async () => {
  await AsyncStorage.getItem('isLoggedIn');
};

const Tab = createBottomTabNavigator();
export default function Router() {
  if (value != 'loggedIn') {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarActiveBackgroundColor: '#FFD700',
              tabBarInactiveBackgroundColor: 'black',
              tabBarActiveTintColor: 'white',
              tabBarLabel: 'Giriş',
              tabBarLabelStyle: {fontWeight: 'bold'},
              tabBarIcon: ({color, size}) => (
                <MaterialIcons name="login" color={color} size={size} />
              ),
            }}
            name="Login"
            component={LoginScreen}
          />
          <Tab.Screen
            options={{
              tabBarActiveBackgroundColor: '#FFD700',
              tabBarInactiveBackgroundColor: 'black',
              tabBarActiveTintColor: 'white',
              tabBarLabel: 'Kayit',
              tabBarIcon: ({color, size}) => (
                <EvilIcons name="unlock" color={color} size={size} />
              ),
              headerStyle: {
                backgroundColor: 'black',
                borderColor: '#FFD700',
              },
              headerShown: false,
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerTitle: 'Kayit',
            }}
            name="Register"
            component={RegisterScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
