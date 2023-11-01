import {View, Text, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default function Statistics() {
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
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
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
            ŞEKER HASTASI
          </Text>
        </View>
      </View>
    </View>
  );
}
