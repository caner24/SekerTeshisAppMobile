import React from 'react';
import {View, Text} from 'react-native';
import ValidationInput from '../../components/ValidationInput/ValidationInput';
import styles from './Register.style';
import axios from 'axios';

function RegisterUser(email, password) {
  const datas = {
    MailAdress: email,
  };

  axios
    .post(`http://192.168.1.4:82/Account/forgottonPassword`, datas)
    .then(response => {
      // Handle the success response here
      console.log('User registration successful:', response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log('Request failed with status code', error.response.status);
        console.log('Response data:', error.response.data.errors);
      } else {
        console.log('An error occurred:', error.message);
      }
    });
}

export default function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.banner_text}>SekerTeshis</Text>
      </View>
      <View style={styles.text_input}>
        <ValidationInput
          pType={true}
          onSubmit={(email, password) => RegisterUser(email, password)}
        />
      </View>
    </View>
  );
}
