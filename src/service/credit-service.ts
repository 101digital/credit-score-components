type CreditClient = {
  creditAssessmentClient: any;
  openBankAuthClient: any;
};

export class CreditService {
  private static _instance: CreditService = new CreditService();

  private _openBankAuthClient?: any;
  private _creditAssessmentClient?: any;

  constructor() {
    if (CreditService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use CreditService.getInstance() instead of new.'
      );
    }
    CreditService._instance = this;
  }

  public static instance(): CreditService {
    return CreditService._instance;
  }

  public initClients = (clients: CreditClient) => {
    this._openBankAuthClient = clients.openBankAuthClient;
    this._creditAssessmentClient = clients.creditAssessmentClient;
  };

  requestConsent = async (bankId: string) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.post(`account-access-consents/${bankId}`);
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  confirmConsent = async (bankId: string, accountRequestId: string, consentCode: string) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.post(
        `account-access-consents/${bankId}/consents`,
        {
          code: consentCode,
          accountRequestId,
        }
      );
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  checkCredit = async (consentId?: string) => {
    if (this._creditAssessmentClient) {
      const response = await this._creditAssessmentClient.post('credit-check', {
        consentId,
      });
      return response.data;
    } else {
      throw new Error('Credit Assessment is not registered');
    }
  };
}
