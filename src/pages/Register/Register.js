import React from 'react';
import {View, Text} from 'react-native';
import ValidationInput from '../../components/ValidationInput/ValidationInput';
import Config from 'react-native-config';
import styles from './Register.style';
import axios from 'axios';

export default function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.banner_text}>SekerTeshis</Text>
      </View>
      <View style={styles.text_input}>
        <ValidationInput
          pType={true}
          onSubmit={() => console.log('Kayit Alindi')}
        />
      </View>
    </View>
  );
}
