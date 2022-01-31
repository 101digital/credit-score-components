import { CreditService } from '../service/credit-service';
import React, { useCallback, useMemo, useState } from 'react';
import { BankingConsentData, Score } from '../types';

const creditService = CreditService.instance();

export interface CreditContextData {
  getConsent: (bankId: string) => void;
  isLoadingConsent: boolean;
  errorLoadConsent?: Error;
  consentData?: BankingConsentData;
  clearConsentData: () => void;
  confirmConsent: (
    bankId: string,
    accountRequestId: string,
    code: string
  ) => Promise<string | undefined>;
  isConfirmingConsent: boolean;
  errorConfirmConsent?: Error;
  checkCreditScore: (consentId?: string) => void;
  creditScore?: Score;
  isCheckingScore: boolean;
  checkScoreError?: Error;
  clearCreditScore: () => void;
  clearErrors: () => void;
}

export const creditContextDefaultValue: CreditContextData = {
  getConsent: () => null,
  isLoadingConsent: false,
  clearConsentData: () => null,
  confirmConsent: async () => undefined,
  isConfirmingConsent: false,
  checkCreditScore: () => null,
  isCheckingScore: false,
  clearErrors: () => null,
  clearCreditScore: () => null,
};

export const CreditContext = React.createContext<CreditContextData>(creditContextDefaultValue);

export function useCreditContextValue(): CreditContextData {
  const [_isLoadingConsent, setLoadingConsent] = useState(false);
  const [_errorLoadConsent, setErrorLoadConsent] = useState<Error | undefined>(undefined);
  const [_consentData, setConsentData] = useState<BankingConsentData | undefined>(undefined);
  const [_isConfirmingConsent, setConfirmingConsent] = useState(false);
  const [_errorConfirmConsent, setErrorConfirmConsent] = useState<Error | undefined>(undefined);
  const [_creditScore, setCreditScore] = useState<any | undefined>(undefined);
  const [_isCheckingScore, setCheckingScore] = useState(false);
  const [_errorCheckScore, setErrorCheckScore] = useState<Error | undefined>(undefined);

  const getConsent = useCallback(async (bankId: string) => {
    try {
      setLoadingConsent(true);
      const { data } = await creditService.requestConsent(bankId);
      setConsentData(data);
      setLoadingConsent(false);
    } catch (error) {
      setLoadingConsent(false);
      setErrorLoadConsent(error as Error);
    }
  }, []);

  const clearConsentData = useCallback(() => {
    setConsentData(undefined);
  }, []);

  const confirmConsent = useCallback(async (bankId: string, requestId: string, code: string) => {
    try {
      setConfirmingConsent(true);
      const { data } = await creditService.confirmConsent(bankId, requestId, code);
      setConfirmingConsent(false);
      return data.accountConsentId;
    } catch (error) {
      setConfirmingConsent(false);
      setErrorConfirmConsent(error as Error);
      return undefined;
    }
  }, []);

  const checkCreditScore = useCallback(async (consentId?: string) => {
    try {
      setCheckingScore(true);
      const { data } = await creditService.checkCredit(consentId);
      setCreditScore(data);
      setCheckingScore(false);
    } catch (error) {
      setCheckingScore(false);
      setErrorCheckScore(error as Error);
    }
  }, []);

  const clearCreditScore = useCallback(() => {
    setCreditScore(undefined);
  }, []);

  const clearErrors = useCallback(() => {
    setErrorCheckScore(undefined);
    setErrorLoadConsent(undefined);
    setErrorConfirmConsent(undefined);
  }, []);

  return useMemo(
    () => ({
      getConsent,
      confirmConsent,
      clearConsentData,
      clearErrors,
      checkCreditScore,
      clearCreditScore,
      isLoadingConsent: _isLoadingConsent,
      errorLoadConsent: _errorLoadConsent,
      consentData: _consentData,
      isConfirmingConsent: _isConfirmingConsent,
      errorConfirmConsent: _errorConfirmConsent,
      creditScore: _creditScore,
      isCheckingScore: _isCheckingScore,
      checkScoreError: _errorCheckScore,
    }),
    [
      _consentData,
      _errorLoadConsent,
      _isLoadingConsent,
      _isConfirmingConsent,
      _errorConfirmConsent,
      _creditScore,
      _isCheckingScore,
      _errorCheckScore,
    ]
  );
}
