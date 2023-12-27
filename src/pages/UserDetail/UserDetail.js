import React from 'react';
import {View, Text, TextInput, Pressable, Alert, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
export default function UserDetail() {
  const [userData, setUserData] = React.useState([]);
  const [userId, setUserId] = React.useState('');
  const userDet = useSelector(state => state.user);

  function GetUserDetail(id) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://sekerteshisappwebapi20231224223342.azurewebsites.net/api/admin/getUser?UserId=${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.diabetesDetail.length === 0) {
          console.log('Hata !. bu id ye sahip kullanici yok');
          return Alert.alert('Hata', 'Bu id ye sahip kullanici yok', [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'default',
            },
          ]);
        } else {
          setUserData(result.diabetesDetail);
        }
      })
      .catch(error => {
        console.log('Error : ' + error.message);
      });
  }

  function RenderUserData({item}) {
    console.log(item.diabetesId);
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
            <Text style={{color: 'black'}}>{item.diabetes.user.userName}</Text>
          </View>
        </View>
        <View style={{width: '25%', color: 'yellow', backgroundColor: 'black'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{color: 'yellow'}}>{item.measureType}</Text>
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
          <Text style={{color: 'black'}}>{item.situation}</Text>
        </View>
        <View
          style={{
            width: '25%',
            color: 'yellow',
            backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <Text style={{color: 'yellow'}}>{item.measureValue}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        backgroundColor: 'black',
      }}>
      <View style={{flex: 0.3}}>
        <Text
          style={{
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          Kullanici Detay
        </Text>
      </View>

      <TextInput
        onChangeText={text => setUserId(text)}
        style={{borderRadius: 10, backgroundColor: 'white', color: 'black'}}
        placeholder="Kullanici Id"></TextInput>
      <Pressable
        style={{
          marginTop: 10,
          borderWidth: 5,
          borderRadius: 30,
          borderColor: 'yellow',
        }}
        onPress={() => {
          GetUserDetail(userId);
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          Kullaniciyi Getir
        </Text>
      </Pressable>
      {userData.length > 0 && (
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
                Kullanici
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
                Ölçüm Tipi
              </Text>
            </View>
            <View
              style={{
                width: '24%',
                backgroundColor: 'black',
                borderColor: 'white',
                borderWidth: 3,
              }}>
              <Text style={{textAlign: 'center', color: 'yellow'}}>Durum</Text>
            </View>
            <View
              style={{
                width: '24%',
                backgroundColor: 'black',
                borderColor: 'white',
                borderWidth: 3,
              }}>
              <Text style={{textAlign: 'center', color: 'yellow'}}>Değeri</Text>
            </View>
          </View>

          <FlatList data={userData} renderItem={item => RenderUserData(item)} />
        </>
      )}
    </View>
  );
}
