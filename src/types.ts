import { CheckingScoreComponentStyle } from './components/checking-score-component';
import { LoginBankComponentStyle } from './components/login-bank-component';

export type CreditCheckComponentProps = {
  Root: {
    props: {
      bankId: string;
      bankName: string;
      bankLogo: string;
      isCreditScoreSupport: boolean;
      onStepChange?: (step: CreditCheckStep) => void;
      onCancel: () => void;
      onContinue: () => void;
    };
  };
  LoginBank?: {
    style?: LoginBankComponentStyle;
  };
  CheckScore?: {
    style?: CheckingScoreComponentStyle;
  };
};

export enum CreditCheckStep {
  LoginBank = 'login-bank',
  CheckingScore = 'checking-score',
  None = 'none',
}

export interface BankingConsentData {
  bankId: string;
  accountConsentId: string;
  accountRequestId: string;
  loginUrl: string;
  redirectUrl: string;
  idToken: string;
}

export interface Score {
  ficoScore: number;
  ficoRange: string;
  date: string;
}
