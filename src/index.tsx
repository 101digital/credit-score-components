import React, { useState, useEffect, useContext } from 'react';
import { CreditCheckComponentProps, CreditCheckStep } from './types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import LoginBankComponent from './components/login-bank-component';
import CheckingScoreComponent from './components/checking-score-component';
import { ThemeContext } from 'react-native-theme-component';

const CreditCheckComponent = (props: CreditCheckComponentProps) => {
  const { Root, LoginBank, CheckScore } = props;
  const {
    onCancel,
    onContinue,
    onStepChange,
    isCreditScoreSupport,
    bankId,
    bankLogo,
    bankName,
  } = Root.props;
  const [step, setStep] = useState<CreditCheckStep>(CreditCheckStep.None);
  const [consentId, setConsentId] = useState<string | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    onStepChange?.(step);
  }, [step]);

  useEffect(() => {
    setStep(isCreditScoreSupport ? CreditCheckStep.LoginBank : CreditCheckStep.CheckingScore);
  }, [isCreditScoreSupport]);

  useEffect(() => {
    if (step === CreditCheckStep.LoginBank && consentId) {
      setStep(CreditCheckStep.CheckingScore);
    }
  }, [consentId]);

  if (step === CreditCheckStep.LoginBank) {
    return (
      <LoginBankComponent
        bankLogo={bankLogo}
        bankName={bankName}
        bankId={bankId}
        style={LoginBank?.style}
        onSuccess={(csId) => {
          setConsentId(csId);
        }}
      />
    );
  }

  if (step === CreditCheckStep.CheckingScore) {
    return (
      <CheckingScoreComponent
        consentId={consentId}
        onCancel={onCancel}
        onContinue={onContinue}
        style={CheckScore?.style}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreditCheckComponent;
