import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Button,
} from 'react-native';
import ValidationInput from '../../components/ValidationInput/ValidationInput';
import styles from './Login.style';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import Modal from 'react-native-modal';

export default function Login() {
  const dispatch = useDispatch();
  const [indicator, setIndicator] = React.useState(false);
  const [isForget, setForget] = React.useState(false);
  const handleUserLogin = user => {
    dispatch({type: 'LOGIN_USER', payload: {user}});
  };

  async function LoginUser(userEmail, userPassword) {
    setIndicator(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'ARRAffinity=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98; ARRAffinitySameSite=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98',
    );

    var raw = JSON.stringify({
      email: userEmail,
      password: userPassword,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      'https://sekerteshisappwebapi20231104135624.azurewebsites.net/api/account/login',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.message != 'Giris') {
          return Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Hata',
            textBody: result.Message,
            button: 'kapat',
          });
        } else {
          var data = {beerer: result.AccessToken, id: result.UserId};
          // await AsyncStorage.setItem('loginInfo', JSON.stringify(data));
          handleUserLogin(JSON.stringify(data));
        }
      })
      .catch(error => console.log('error', error));

    setIndicator(false);
  }

  function ForgetPassword(email) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'ARRAffinity=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98; ARRAffinitySameSite=4b3e9d7243043145f30ef214452b71163b8defc4e171d81090f8c904e96ebe98',
    );

    var raw = JSON.stringify({
      mailAdress: email,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://sekerteshisappwebapi20231104135624.azurewebsites.net/api/account/forgottonPassword',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.Message) {
          return Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Hata',
            textBody: result.Message,
            button: 'kapat',
          });
        } else {
          return Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Başarili',
            textBody: result.message,
            button: 'kapat',
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        {isForget && (
          <Modal isVisible={true}>
            <View
              style={{
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                height: '55%',
              }}>
              <Pressable
                style={{
                  width: '25%',
                  borderWidth: 15,
                  borderColor: 'yellow',
                  borderRadius: 30,
                }}
                onPress={() => setForget(false)}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  X
                </Text>
              </Pressable>
              <View style={{marginTop: '10%'}}></View>
              <ValidationInput
                forgetEmail={true}
                onSubmit={async (email, password) => {
                  ForgetPassword(email);
                }}
              />
            </View>
          </Modal>
        )}
        <View style={styles.banner}>
          <Text style={styles.banner_text}>SekerTeshis</Text>
        </View>
        {indicator && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={styles.text_input}>
          <ValidationInput
            onSubmit={async (email, password) => {
              LoginUser(email, password);
            }}
          />
          <Pressable
            style={{
              marginTop: 10,
              borderWidth: 15,
              borderRadius: 30,
              borderColor: 'yellow',
            }}
            onPress={() => setForget(true)}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Şifremi Unuttum
            </Text>
          </Pressable>
        </View>
      </View>
    </AlertNotificationRoot>
  );
}
