import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';

export default function Statistics() {
  const [userSituation, setUserSituation] = React.useState('BELİRSİZ');
  const [userData, setUserData] = React.useState([]);
  const userDet = useSelector(state => state.user);

  React.useEffect(() => {
    var myHeaders = new Headers();
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
      `https://sekerteshisappwebapi20231104135624.azurewebsites.net/api/home/getLast7Diabetes?UserId=${userDet.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.diabetesDetail[0].situation != null) {
          console.log(result);

          setUserData(result.diabetesDetail);
          console.log(userData[0].measureValue);
          setUserSituation(result.diabetesDetail[0].situation);
        }
      })
      .catch(error => console.log('error', error));
  }, []);

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
            Son 1 haftadaki şeker durumum
          </Text>
        </View>
        <LineChart
          data={{
            labels: [
              'Pazartesi',
              'Salı',
              'Çarşamba',
              'Cuma',
              'Cumartesi',
              'Pazar',
            ],
            datasets: [
              {
                data: [
                  userData.length >= 1 ? userData[0].measureValue : 0,
                  userData.length >= 2 ? userData[1].measureValue : 0,
                  userData.length >= 3 ? userData[2].measureValue : 0,
                  userData.length >= 4 ? userData[3].measureValue : 0,
                  userData.length >= 5 ? userData[4].measureValue : 0,
                  userData.length >= 6 ? userData[5].measureValue : 0,
                  userData.length >= 7 ? userData[6].measureValue : 0,
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
