import React from 'react';
import {Text, View} from 'react-native';
import ValidationInput from '../../components/ValidationInput/ValidationInput';
import styles from './Login.style';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();

  const handleUserLogin = user => {
    dispatch({type: 'LOGIN_USER', payload: {user}});
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.banner_text}>SekerTeshis</Text>
      </View>
      <View style={styles.text_input}>
        <ValidationInput
          onSubmit={async () => {
            var data = {beerer: '123456', id: 'asd-2332d--'};
            // await AsyncStorage.setItem('loginInfo', JSON.stringify(data));
            handleUserLogin(JSON.stringify(data));
          }}
        />
      </View>
    </View>
  );
}
