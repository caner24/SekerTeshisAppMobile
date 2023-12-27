import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
export default function Food() {
  const userDet = useSelector(state => state.user);
  const [foodList, setFoodList] = useState([{}]);

  async function GetData() {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        `https://sekerteshisappwebapi20231224223342.azurewebsites.net/api/home/exercisesList?UserId=${userDet.id}`,
        requestOptions,
      );
      const result = await response.json();
      setFoodList(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const fetchData = React.useCallback(async () => {
    await GetData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        padding: 10,
      }}>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        {item.id % 2 === 0 ? 'Öğle Sporu' : 'Akşam Sporu'}
      </Text>
      <Text style={{color: 'white'}}>Calories: {item.exercisesType}</Text>
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
        <FlatList data={foodList} renderItem={renderItem} />
      </View>
    </View>
  );
}
