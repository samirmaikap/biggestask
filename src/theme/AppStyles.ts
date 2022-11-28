import {StyleSheet} from 'react-native';
const appStyles = StyleSheet.create({
  textSmall: {
    fontSize: 12,
  },
  textMedium: {
    fontSize: 17,
    // fontFamily: 'F37 Moon',
  },
  textLarge: {
    fontSize: 30,
  },
  textBold: {
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    paddingVertical: 3,
  },
  textInput: {

  },
  appBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    paddingBottom: 8,
  },
  appbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  appbarAction: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default appStyles;
