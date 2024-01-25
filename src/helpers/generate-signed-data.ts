import { signSmartContractData } from '@wert-io/widget-sc-signer';
type SignSmartContractDataParameters = Parameters<
  typeof signSmartContractData
>[0];

export type SmartContractOptions = SignSmartContractDataParameters & {
  private_key: string;
};

export const generateSignedData = (
  smartContractOptions: SmartContractOptions
) => {
  if (!smartContractOptions) return {};

  const { private_key, ...rest } = smartContractOptions;

  return signSmartContractData(
    rest as SignSmartContractDataParameters,
    private_key
  );
};
