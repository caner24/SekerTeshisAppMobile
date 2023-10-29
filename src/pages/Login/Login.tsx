import React from 'react';
import {Text, View} from 'react-native';
import ValidationInput from '../../components/ValidationInput/ValidationInput';
import styles from './Login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.banner_text}>SekerTeshis</Text>
      </View>
      <View style={styles.text_input}>
        <ValidationInput
          onSubmit={async () =>
            await AsyncStorage.setItem('isLoggedIn', 'loggedIn')
          }
        />
      </View>
    </View>
  );
}
