import React from 'react';
import {View, Text} from 'react-native';
import styles from './RangePart.style';

export default function RangePart({
  rangeVal,
  rangeVal2,
  color = 'yellow',
  diabetType,
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '20%',
        height: '100%',
        backgroundColor: color,
      }}>
      <Text style={styles.text_font}>{rangeVal}</Text>
      <Text style={styles.text_font}>{rangeVal2}</Text>

      <Text
        style={{
          position: 'absolute',
          top: '100%',
          left: '3%',
          right: '3%',
          textAlign: 'center',
          color: 'white',
          fontSize: 12.5,
        }}>
        {diabetType}
      </Text>
    </View>
  );
}
