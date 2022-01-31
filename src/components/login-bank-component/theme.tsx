import { useContext } from 'react';
import { LoginBankComponentStyle } from '.';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { defaultsDeep } from 'lodash';

const useMergeStyle = (style?: LoginBankComponentStyle): LoginBankComponentStyle => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyle: LoginBankComponentStyle = StyleSheet.create({
    containerStyle: { flex: 1 },
    mainContainerStyle: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 35,
      paddingHorizontal: 15,
      backgroundColor: 'white',
    },
    bankLogoStyle: { width: 150, height: 113 },
    bankNameTextStyle: {
      fontSize: 20,
      fontFamily: fonts.semiBold,
      color: '#0D2050',
      marginVertical: 15,
      textAlign: 'center',
      lineHeight: 25,
    },
    messageTextStyle: {
      fontSize: 14,
      lineHeight: 25,
      fontFamily: fonts.regular,
      textAlign: 'center',
      marginBottom: 25,
      color: '#0D2050',
    },
    creditScoreImageStyle: {
      width: 152,
      height: 170,
    },
    warningContainerStyle: {
      backgroundColor: '#F7F9FB',
      borderColor: '#E4F2FF',
      borderWidth: 1,
      paddingTop: 6,
      paddingBottom: 14,
      marginTop: 10,
      marginBottom: 30,
      marginHorizontal: 16,
      borderRadius: 5,
      flexDirection: 'row',
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    warningMessageTextStyle: {
      fontSize: 12,
      lineHeight: 25,
      fontFamily: fonts.regular,
      color: '#0D2050',
    },
    applyContainerStyle: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: '#000028',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    warningMessageWrapStyle: {
      flex: 1,
      marginLeft: 14,
      marginRight: 16,
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return defaultsDeep(style, defaultStyle);
};

export default useMergeStyle;
