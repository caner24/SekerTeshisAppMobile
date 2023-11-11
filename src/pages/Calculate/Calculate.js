import {View, Text, Image, Pressable} from 'react-native';
import styles from './Calculate.style';
export default function Calculate() {
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View>
        <Text style={styles.main_text}>Şeker Ölçüm</Text>
      </View>
      <View style={styles.center_item}>
        <Image
          style={{
            width: '100%',
            height: '25 %',
            resizeMode: 'contain',
          }}
          source={require('../../assets/ezgif-2-25b1f30692.gif')}
        />

       

        <View style={styles.range_style}>
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
        style={styles.pressable_style}
        onPress={() => console.log('sa')}>
        <Text style={styles.press_text_style}>Gönder</Text>
      </Pressable>
    </View>
  );
}
