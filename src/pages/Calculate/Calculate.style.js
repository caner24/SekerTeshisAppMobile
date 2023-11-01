import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main_text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  center_item: {
    backgroundColor: 'black',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  range_style: {
    marginTop: '10%',
    width: '100%',
    height: '5%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  pressable_style: {
    width: '100%',
    padding: '1%',
    borderRadius: 20,
    marginBottom: '5%',
    backgroundColor: 'yellow',
  },
  press_text_style: {
    backgroundColor: 'black',
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
