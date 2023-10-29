import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'yellow',
    flex: 0.5,
  },
  text_input: {
    flex: 0.5,
    display: 'flex',
  },
  banner_text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
