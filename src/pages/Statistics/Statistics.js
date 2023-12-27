import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';

export default function Statistics() {
  const [userSituation, setUserSituation] = React.useState('BELİRSİZ');
  const [userData, setUserData] = React.useState([]);
  const userDet = useSelector(state => state.user);
  async function GetData() {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userDet.bearer}`);
      myHeaders.append('Content-Type', 'application/json');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        `https://sekerteshisappwebapi20231224223342.azurewebsites.net/api/home/getLast7Diabetes?UserId=${userDet.id}`,
        requestOptions,
      );
      const result = await response.json();
      setUserData(result.diabetesDetail);
      if (result.diabetesDetail.length > 0) {
        setUserSituation(
          result.diabetesDetail[result.diabetesDetail.length - 1].situation,
        );
      }
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

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          color: 'white',
          fontSize: 50,
          fontWeight: 'bold',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
        Haftalık Değerler
      </Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: '3%',
            backgroundColor: 'yellow',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'black',
            }}>
            Son 5 günlük şeker durumum
          </Text>
        </View>
        <LineChart
          data={{
            labels: [
              userData.length >= 1 ? 'Pazartesi' : '',
              userData.length >= 2 ? 'Salı' : '',
              userData.length >= 3 ? 'Çarşamba' : '',
              userData.length >= 4 ? 'Perşembe' : '',
              userData.length >= 5 ? 'Cuma' : '',
            ],
            datasets: [
              {
                data: [
                  userData.length >= 1
                    ? userData[userData.length - 1].measureValue
                    : 0,
                  userData.length >= 2
                    ? userData[userData.length - 2].measureValue
                    : 0,
                  userData.length >= 3
                    ? userData[userData.length - 3].measureValue
                    : 0,
                  userData.length >= 4
                    ? userData[userData.length - 4].measureValue
                    : 0,
                  userData.length >= 5
                    ? userData[userData.length - 5].measureValue
                    : 0,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'yellow',
            padding: '3%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 15, color: 'black', fontStyle: 'italic'}}>
            Risk Durumu :
          </Text>
          <Text style={{fontSize: 15, color: 'red', fontStyle: 'italic'}}>
            {userSituation}
          </Text>
        </View>
      </View>
    </View>
  );
}
