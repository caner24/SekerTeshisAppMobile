import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main_text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  data_shape_container: {
    marginTop: '1%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  data_shape_text_input: {
    flex: 0.8,
    backgroundColor: 'yellow',
    borderRadius: 10,
  },
});
