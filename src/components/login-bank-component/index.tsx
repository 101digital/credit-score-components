import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Image, Button, ThemeContext } from 'react-native-theme-component';
import { images, WarningIcon } from '../../assets/images';
import useMergeStyles from './theme';
import { CreditContext } from '../../context/credit-context';
import WebView, { WebViewNavigation } from 'react-native-webview';

export type LoginBankComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  bankLogoStyle?: StyleProp<ImageStyle>;
  bankNameTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  creditScoreImageStyle?: StyleProp<ImageStyle>;
  applyContainerStyle?: StyleProp<ViewStyle>;
  warningContainerStyle?: StyleProp<ViewStyle>;
  warningMessageWrapStyle?: StyleProp<ViewStyle>;
  warningMessageTextStyle?: StyleProp<TextStyle>;
  loadingWrap?: StyleProp<ViewStyle>;
};

export type LoginBankComponentProps = {
  bankLogo: string;
  bankName: string;
  bankId: string;
  onSuccess: (consentId: string) => void;
  onFailed?: () => void;
  style?: LoginBankComponentStyle;
};

const LoginBankComponent = (props: LoginBankComponentProps) => {
  const { bankLogo, bankName, style, bankId, onSuccess, onFailed } = props;
  const { i18n, colors } = useContext(ThemeContext);
  const {
    consentData,
    isLoadingConsent,
    confirmConsent,
    getConsent,
    clearConsentData,
    clearErrors,
  } = useContext(CreditContext);
  const [step, setStep] = useState(0);
  const styles: LoginBankComponentStyle = useMergeStyles(style);

  useEffect(() => {
    return () => {
      clearConsentData();
      clearErrors();
    };
  }, []);

  const getUrlParameter = (url: string, name: string) => {
    name = name.replace(/\\[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&#]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const handleOnShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const { url } = event;
    if (consentData && url.startsWith(consentData.redirectUrl)) {
      const code = getUrlParameter(url, 'code');
      confirmConsent(bankId, consentData.accountRequestId, code)
        .then((consentId) => {
          if (consentId) {
            onSuccess(consentId);
          } else {
            onFailed?.();
          }
        })
        .catch((_) => onFailed?.());
      return false;
    }
    return true;
  };

  if (step === 1) {
    if (isLoadingConsent || !consentData) {
      return (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.primaryColor} />
        </View>
      );
    }
    return (
      <View style={styles.containerStyle}>
        <WebView
          scalesPageToFit
          incognito
          startInLoadingState
          javaScriptEnabled
          onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
          source={{ uri: consentData.loginUrl }}
        />
      </View>
    );
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <Image
          style={styles.bankLogoStyle}
          source={{ uri: bankLogo }}
          fallbackImage={images.bank}
          resizeMode='contain'
        />
        <Text style={styles.bankNameTextStyle}>
          {i18n?.t('credit_check.lbl_login_account')?.replace('%s', bankName) ??
            `Login to your ${bankName} account`}
        </Text>
        <Text style={styles.messageTextStyle}>
          {i18n?.t('credit_check.msg_permission_access')?.replace('%s', bankName) ??
            `We need permission to access the Credit Score at the ${bankName} bank. Doing so, helps us to perform the preliminary assesment of your eligibiliity.`}
        </Text>
        <Image
          style={styles.creditScoreImageStyle}
          source={images.creditScore}
          fallbackImage={images.creditScore}
          resizeMode='contain'
        />
      </View>
      <View style={styles.warningContainerStyle}>
        <WarningIcon width={20} height={20} color='#FFBB05' />
        <View style={styles.warningMessageWrapStyle}>
          <Text style={styles.warningMessageTextStyle}>
            {i18n?.t('credit_check.msg_warning_login') ??
              'By continuing you will be redirected to your bank provider to allow access to your credit score'}
          </Text>
        </View>
      </View>
      <View style={styles.applyContainerStyle}>
        <Button
          label={i18n?.t('credit_check.btn_continue') ?? 'Continue'}
          onPress={() => {
            getConsent(bankId);
            setStep(1);
          }}
        />
      </View>
    </View>
  );
};

export default LoginBankComponent;
