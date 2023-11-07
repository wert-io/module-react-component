import { signSmartContractData } from "@wert-io/widget-sc-signer";
type SignSmartContractDataParameters = Parameters<
  typeof signSmartContractData
>[0];
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CorrectSmartContractOptions = PartialBy<
  SignSmartContractDataParameters,
  "network"
>;

export type SmartContractOptions = CorrectSmartContractOptions & {
  private_key: string;
};

export default function generateSignedData(
  smartContractOptions: SmartContractOptions
) {
  if (!smartContractOptions) return {};

  const { private_key, ...rest } = smartContractOptions;

  return signSmartContractData(
    rest as SignSmartContractDataParameters,
    private_key
  );
}
