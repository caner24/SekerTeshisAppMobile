import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Image} from 'react-native-svg';
import {useSelector} from 'react-redux';
export default function Food() {
  const userDet = useSelector(state => state.user);
  const [foodList, setFoodList] = useState([{}]);
  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);
    myHeaders.append(
      'Cookie',
      'ARRAffinity=7728a9db7a843ce19ed47ff831421589468bd2f1f7c07638fcce4ad2da6697ff; ARRAffinitySameSite=7728a9db7a843ce19ed47ff831421589468bd2f1f7c07638fcce4ad2da6697ff',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://sekerteshisappwebapi20231207213233.azurewebsites.net/api/home/exercisesList?UserId=${userDet.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setFoodList(result);
      })
      .catch(error => console.log('error', error));
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        padding: 10,
      }}>
      <Image
        style={{width: 50, height: 50}}
        uri={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        resizeMode={'cover'} // cover or contain its upto you view look
      />
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        {item.id % 2 === 0 ? 'Öğle Sporu' : 'Akşam Sporu'}
      </Text>
      <Text>Calories: {item.exercisesType}</Text>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <View style={{flex: 0.4}}>
        <Text
          style={{
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          Egzersiz Listesi
        </Text>
      </View>
      <View style={{flex: 0.6}}>
        <FlatList
          data={foodList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
