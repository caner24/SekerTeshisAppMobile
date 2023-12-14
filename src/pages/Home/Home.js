import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import RangePart from '../../components/RangePart/RangePart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Exercises from './../Exercise/Exercise';
import Food from './../Food/Food';
import Statistics from './../Statistics/Statistics';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  var [slider, SetSlider] = React.useState('0');
  var [isDisabled, SetDisabled] = React.useState(false);
  var [loading, setLoading] = React.useState(true);
  var [hungry, setHungry] = React.useState('yellow');
  var [full, setFull] = React.useState('yellow');
  var [isLockDown, setLockDown] = React.useState(false);

  var [calculate, setCalculate] = React.useState(false);
  const userDet = useSelector(state => state.user);

  async function CalculateSugar() {
    setCalculate(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);
    myHeaders.append(
      'Cookie',
      'ARRAffinity=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98; ARRAffinitySameSite=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98',
    );

    var raw = JSON.stringify({
      diabetesId: userDet.id,
      measureType: hungry === 'yellow' ? 'Full' : 'Hungry',
      measureValue: parseInt(slider),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://sekerteshisappwebapi20231213195554.azurewebsites.net/api/home/calculateSugar',
        requestOptions,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      SetDisabled(true);
      setCalculate(false);
      return Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Alindi',
        textBody: 'Şeker ölçümünüz alindi !.',
        button: 'kapat',
      });
    } catch (error) {
      console.log('Fetch error:', error);
      return Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: 'Hata',
        textBody: 'Bir hata oluştu.',
        button: 'kapat',
      });
    }
  }

  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);
    myHeaders.append(
      'Cookie',
      'ARRAffinity=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98; ARRAffinitySameSite=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://sekerteshisappwebapi20231213195554.azurewebsites.net/api/home/getCalculateStatus?Id=${userDet.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLockDown(result.isLockDown);
        if (result.isLockDown) SetDisabled(true);
      })
      .catch(error => console.log('error', error));
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <AlertNotificationRoot>
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

          <Slider
            style={{
              marginTop: '1%',
              width: '100%',
              height: 40,
              backgroundColor: 'black',
            }}
            minimumValue={0}
            maximumValue={126}
            thumbTintColor="white"
            minimumTrackTintColor="yellow"
            maximumTrackTintColor="white"
            onValueChange={val => {
              SetSlider(val);
            }}
          />
          <Text style={{color: 'white'}}>{slider}</Text>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (hungry == 'yellow') {
                  setHungry('white');
                  setFull('yellow');
                } else setHungry('yellow');
              }}
              style={{
                backgroundColor: 'black',
                borderColor: `${hungry}`,
                borderWidth: 3,
                width: '45%',
                padding: '2%',
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: 'yellow'}}>Aç</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => {
                if (full == 'yellow') {
                  setFull('white');
                  setHungry('yellow');
                } else setFull('yellow');
              }}
              style={{
                backgroundColor: 'black',
                borderColor: `${full}`,
                borderWidth: 3,
                width: '45%',
                padding: '2%',
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: 'yellow'}}>Tok</Text>
            </Pressable>
          </View>

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

        {calculate && <ActivityIndicator size="large" color="#0000ff" />}

        <Pressable
          disabled={isDisabled === true ? true : false}
          style={{
            width: '100%',
            padding: '1%',
            borderRadius: 20,
            marginBottom: '5%',
            backgroundColor: 'yellow',
          }}
          onPress={async () => await CalculateSugar()}>
          <Text
            style={{
              backgroundColor: 'black',
              borderRadius: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,

              color: isLockDown === true ? 'red' : 'white',
            }}>
            {isLockDown === true
              ? 'Son ölçüm üzerinden 7 saat geçmeli'
              : 'Gönder'}
          </Text>
        </Pressable>
      </View>
    </AlertNotificationRoot>
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
