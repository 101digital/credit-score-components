import React, { ReactNode } from 'react';
import { useCreditContextValue, CreditContext } from './credit-context';

export type CreditProviderProps = {
  children: ReactNode;
};

const CreditProvider = (props: CreditProviderProps) => {
  const { children } = props;
  const creditContextData = useCreditContextValue();

  return <CreditContext.Provider value={creditContextData}>{children}</CreditContext.Provider>;
};

export default CreditProvider;
