import { CheckingScoreComponentStyle } from '.';
import { StyleSheet } from 'react-native';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyle = (style?: CheckingScoreComponentStyle): CheckingScoreComponentStyle => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: CheckingScoreComponentStyle = StyleSheet.create({
    mainContainerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 25,
    },
    containerStyle: {
      flex: 1,
    },
    loadingImageStyle: {
      width: 75,
      height: 75,
    },
    titleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 18,
      color: '#0D2050',
      lineHeight: 25,
      marginVertical: 25,
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      lineHeight: 25,
      fontSize: 14,
      textAlign: 'center',
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
      flexDirection: 'row',
    },
    scoreValueTextStyle: {
      fontSize: 45,
      fontFamily: fonts.bold,
      color: '#0D2050',
      lineHeight: 53,
    },
    scoreTitleTextStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      fontWeight: '300',
      color: '#0D2050',
      alignSelf: 'center',
      marginBottom: 5,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
