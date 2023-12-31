import React from 'react';
import {View, TextInput, Text, Pressable} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import styles from './ValidationInput.style';
export default function ValidationInput({
  onSubmit,
  pType = false,
  forgetEmail = false,
  resetEmail = false,
}) {
  const loginValidationSchema = () => {
    if (forgetEmail) {
      return yup.object().shape({
        email: yup
          .string()
          .email('Lütfen email adresinizi giriniz')
          .required('Email Adressi Zorunludur !.'),
      });
    }
    if (resetEmail) {
      return yup.object().shape({
        token: yup.string().required('Token  Zorunludur !.'),
        password: yup.string().required('Yeni şifrenizi boş geçemezsiniz'),
        rePassword: yup
          .string()
          .oneOf(
            [yup.ref('password'), null],
            'Şifreleriniz eşleşmemektedir !.',
          ),
      });
    }
    if (!pType) {
      return yup.object().shape({
        email: yup
          .string()
          .email('Lütfen email adresinizi giriniz')
          .required('Email Adressi Zorunludur !.'),
        password: yup.string().required('Şifrenizi boş geçemezsiniz'),
      });
    } else {
      return yup.object().shape({
        email: yup
          .string()
          .email('Lütfen email adresinizi giriniz')
          .required('Email Adressi Zorunludur !.'),
        password: yup.string().required('Şifrenizi boş geçemezsiniz'),
        rePassword: yup
          .string()
          .oneOf(
            [yup.ref('password'), null],
            'Şifreleriniz eşleşmemektedir !.',
          ),
      });
    }
  };
  if (forgetEmail) {
    return (
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: ''}}
        onSubmit={values => onSubmit(values.email)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <>
            <View style={styles.input_group}>
              <Text style={styles.input_text}>Email</Text>
              <TextInput
                style={styles.textInput}
                name="email"
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <Pressable style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btn_text}>
                {pType === true ? 'Kayit' : 'Gönder'}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    );
  } else if (resetEmail === true) {
    return (
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{token: '', password: '', rePassword: ''}}
        onSubmit={values => onSubmit(values.token, values.password)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <>
            <View style={styles.input_group}>
              <Text style={styles.input_text}>Token</Text>
              <TextInput
                style={styles.textInput}
                name="token"
                placeholder="Token"
                onChangeText={handleChange('token')}
                onBlur={handleBlur('token')}
                value={values.token}
              />
              {errors.token && touched.token && (
                <Text style={styles.errorText}>{errors.token}</Text>
              )}
            </View>
            <View style={styles.input_group}>
              <Text style={styles.input_text}>Şifre</Text>
              <TextInput
                style={styles.textInput}
                name="password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            {pType && (
              <View style={styles.input_group}>
                <Text style={styles.input_text}>Şifre Tekrarı</Text>
                <TextInput
                  style={styles.textInput}
                  name="rePassword"
                  placeholder="RePassword"
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  value={values.rePassword}
                  secureTextEntry
                />
                {errors.rePassword && touched.rePassword && (
                  <Text style={styles.errorText}>{errors.rePassword}</Text>
                )}
              </View>
            )}

            <Pressable style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btn_text}>
                {pType === true ? 'Kayit' : 'Kaydet'}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    );
  } else {
    return (
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: '', rePassword: ''}}
        onSubmit={values => onSubmit(values.email, values.password)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <>
            <View style={styles.input_group}>
              <Text style={styles.input_text}>Email</Text>
              <TextInput
                style={styles.textInput}
                name="email"
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.input_group}>
              <Text style={styles.input_text}>Şifre</Text>
              <TextInput
                style={styles.textInput}
                name="password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            {pType && (
              <View style={styles.input_group}>
                <Text style={styles.input_text}>Şifre Tekrarı</Text>
                <TextInput
                  style={styles.textInput}
                  name="rePassword"
                  placeholder="RePassword"
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  value={values.rePassword}
                  secureTextEntry
                />
                {errors.rePassword && touched.rePassword && (
                  <Text style={styles.errorText}>{errors.rePassword}</Text>
                )}
              </View>
            )}

            <Pressable style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btn_text}>
                {pType === true ? 'Kayit' : 'Giriş'}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    );
  }
}
