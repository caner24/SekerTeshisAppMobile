import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Slider from 'react-native-a11y-slider';
import RangePart from '../../components/RangePart/RangePart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Exercises from './../Exercise/Exercise';
import Food from './../Food/Food';
import Statistics from './../Statistics/Statistics';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          Şeker Ölçüm
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: '25 %',
            resizeMode: 'contain',
          }}
          source={require('../../assets/ezgif-2-25b1f30692.gif')}
        />

        <Slider min={1} max={100} values={[10, 87]} />

        <View
          style={{
            marginTop: '10%',
            width: '100%',
            height: '5%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}>
          <RangePart
            color="#FFF5E0"
            rangeVal={50}
            rangeVal2={70}
            diabetType={'Hipoglisemi'}
          />
          <RangePart
            color="#FF6969"
            rangeVal={70}
            rangeVal2={100}
            diabetType={'Normal'}
          />
          <RangePart
            color="red"
            rangeVal={100}
            rangeVal2={125}
            diabetType={'Gizli Şeker'}
          />
          <RangePart
            color="#BB2525"
            rangeVal={126}
            rangeVal2={'...'}
            diabetType={'Diyabet'}
          />
        </View>
      </View>
      <Pressable
        style={{
          width: '100%',
          padding: '1%',
          borderRadius: 20,
          marginBottom: '5%',
          backgroundColor: 'yellow',
        }}
        onPress={() => console.log('sa')}>
        <Text
          style={{
            backgroundColor: 'black',
            borderRadius: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,

            color: 'white',
          }}>
          Gönder
        </Text>
      </Pressable>
    </View>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveBackgroundColor: '#FFD700',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'black',
            tabBarLabel: 'Ölçüm',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="diabetes"
                color={color}
                size={size}
              />
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
            tabBarLabel: 'İstatisikler',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="stats-chart" color={color} size={size} />
            ),
          }}
          name="Statistics"
          component={Statistics}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveBackgroundColor: '#FFD700',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'black',
            tabBarLabel: 'Yemek',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="food-fork-drink"
                color={color}
                size={size}
              />
            ),
          }}
          name="Food"
          component={Food}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveBackgroundColor: '#FFD700',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'black',
            tabBarLabel: 'Egzersiz',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="running" color={color} size={size} />
            ),
          }}
          name="Exercises"
          component={Exercises}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
