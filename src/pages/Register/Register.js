import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import ValidationInput from '../../components/ValidationInput/ValidationInput';
import styles from './Register.style';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

export default function Register() {
  const [indicator, setIndicator] = React.useState(false);

  async function RegisterUser(userEmail, userPassword) {
    setIndicator(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      email: userEmail,
      password: userPassword,
      userName: userEmail.substring(0, userEmail.indexOf('@')),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      'https://sekerteshisappwebapi20231224223342.azurewebsites.net/api/account/register',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.isCreated.succeeded) {
          return Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Başarili',
            textBody: 'Başarili Bir Şekilde Kaydolundu.',
            button: 'kapat',
          });
        } else {
          return Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Hata',
            textBody: result.isCreated.errors[0].description,
            button: 'kapat',
          });
        }
      })
      .catch(error => console.log('error', error));

    setIndicator(false);
  }

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.banner_text}>SekerTeshis</Text>
        </View>
        {indicator && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={styles.text_input}>
          <ValidationInput
            pType={true}
            onSubmit={(email, password) => {
              RegisterUser(email, password);
            }}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
}
