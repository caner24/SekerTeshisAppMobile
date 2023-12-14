import React from 'react';
import {View, Text, TextInput, Pressable, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import UserDetail from '../UserDetail/UserDetail';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Admin.style';
const Tab = createBottomTabNavigator();

export default function Admin() {
  const userDet = useSelector(state => state.user);

  function RenderUserData(item) {
    return (
      <View
        style={{
          marginTop: '1%',
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '25%',
            color: 'black',
            backgroundColor: 'yellow',
            borderRadius: 5,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>{item.Situation}</Text>
          </View>
        </View>
        <View style={{width: '25%', color: 'yellow', backgroundColor: 'black'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{color: 'yellow'}}>
              {item.MeasureDate.substring(0, item.MeasureDate.indexOf('-'))}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '25%',
            color: 'black',
            backgroundColor: 'yellow',
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}>{item.MeasureValue}</Text>
        </View>
        <View style={{width: '25%', color: 'yellow', backgroundColor: 'black'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{color: 'yellow'}}>
              {item.MeasureType === 'Hungry' ? 'Aç' : 'Tok'}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function HomeScreen({navigation}) {
    function GetDatas() {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);
      myHeaders.append(
        'Cookie',
        'ARRAffinity=aa5da807acbfc559bca55ef24c1fd7d38ec19e63d1268fa63fb6c8ab6fa58858; ARRAffinitySameSite=aa5da807acbfc559bca55ef24c1fd7d38ec19e63d1268fa63fb6c8ab6fa58858',
      );

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        `https://sekerteshisappwebapi20231213195554.azurewebsites.net/api/admin/userStatics?DiabetesName=${type}&OrderBy=${orderBy}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setDatas(result);
        })
        .catch(error => console.log('error', error));
    }
    const [datas, setDatas] = React.useState([]);
    const [type, setType] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('');
    const [fields, setFields] = React.useState('');

    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <View style={{flex: 0.2}}>
          <Text style={styles.main_text}>Kullanici Bilgileri</Text>
        </View>
        <View style={styles.data_shape_container}>
          <Text style={{flex: 0.2, color: 'white'}}>Tip</Text>
          <TextInput
            editable={true}
            onChangeText={setType}
            defaultValue={type}
            style={{flex: 0.8, backgroundColor: 'yellow', borderRadius: 10}}
          />
        </View>
        <View style={styles.data_shape_container}>
          <Text style={{flex: 0.2, color: 'white'}}>Sıralama</Text>
          <TextInput
            onChangeText={text => setOrderBy(text)}
            defaultValue={orderBy}
            style={{flex: 0.8, backgroundColor: 'yellow', borderRadius: 10}}
          />
        </View>
        <View
          style={{
            marginTop: '2%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              width: '100%',
              borderColor: 'yellow',
              borderWidth: 5,
              backgroundColor: 'black',
              borderRadius: 15,
            }}
            onPress={() => GetDatas()}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Getir
            </Text>
          </Pressable>
        </View>
        {setDatas.length > 0 && (
          <>
            <View
              style={{
                marginTop: '2%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  width: '24%',
                  backgroundColor: 'black',
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <Text style={{textAlign: 'center', color: 'yellow'}}>
                  Durum
                </Text>
              </View>
              <View
                style={{
                  width: '24%',
                  backgroundColor: 'black',
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <Text style={{textAlign: 'center', color: 'yellow'}}>
                  Tarih
                </Text>
              </View>
              <View
                style={{
                  width: '24%',
                  backgroundColor: 'black',
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <Text style={{textAlign: 'center', color: 'yellow'}}>
                  Değer
                </Text>
              </View>
              <View
                style={{
                  width: '24%',
                  backgroundColor: 'black',
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <Text style={{textAlign: 'center', color: 'yellow'}}>
                  Aç/Tok
                </Text>
              </View>
            </View>
            <FlatList
              initialNumToRender={datas.length}
              style={{flex: 1, padding: 10}}
              data={datas}
              renderItem={({item}) => RenderUserData(item)}
            />
          </>
        )}
      </View>
    );
  }

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
