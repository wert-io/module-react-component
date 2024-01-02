# Wert Module React component

This is the wrapped [Wert widget-initializer helper](https://www.npmjs.com/package/@wert-io/widget-initializer) for React projects.

## Installation

```
yarn add @wert-io/module-react-component
```

or

```
npm install @wert-io/module-react-component
```

## Usage example
The `useWertWidget` hook provides a single method for **opening the widget**:

```
import { useState } from 'React';
import { useWertWidget } from '@wert-io/module-react-component';
import type { Options } from '@wert-io/module-react-component';

export default function WertWidgetButton () {
    const [wertOptions, setWertOptions] = useState<Options>({
        partner_id: 'YOUR_PARTNER_ID',
        theme: 'dark',
        listeners: {
            'loaded': () => console.log(loaded),
        },
    });

    const { open: openWertWidget } = useWertWidget(wertOptions);

    return <button onClick={() => openWertWidget()}>Make A Purchase</button>
}
```

You should provide the reactive options to the `useWertWidget` function. If your state gets updated, the hook will handle all the related state changes, such as **updating theme** and **adding/removing listeners**.

You can find the full list of the options that can be passed to the widget [here](https://www.npmjs.com/package/@wert-io/widget-initializer#options).

### Smart Contract Signing Helper

We've added `@wert-io/widget-sc-signer` to simplify the data signing process for executing smart contracts. Just pass the object with the following options as the separate second argument to the `useWertWidget` function. 

| Field Name      | Data Type | Required   |
|-----------------|-----------|------------|
| address         | string    | required   |
| commodity       | string    | required   |
| commodity_amount| number    | required   |
| network         | string    | required   |
| sc_address      | string    | required   |
| sc_input_data   | string    | required   |
| private_key     | string    | required   |

```
import type { Options, SmartContractOptions } from '@wert-io/module-react-component';

// ...

const [wertOptions, setWertOptions] = useState<Options>({
    partner_id: 'YOUR_PARTNER_ID',
})
const smartContractOptions: SmartContractOptions = {
    address: 'FALLBACK_ADDRESS',
    commodity: 'ETH',
    network: 'goerli',
    commodity_amount: 0.005,
    sc_address: 'SMART_CONTRACT_ADDRESS',
    sc_input_data: 'SMART_CONTRACT_EXECUTION_DATA',
    private_key: 'YOUR_PRIVATE_KEY', // We advise you not to store the private key on the frontend
}
const { open } = useWertWidget(wertOptions, smartContractOptions);
```

You can find more information on how the signer works and its' options [here](https://www.npmjs.com/package/@wert-io/widget-sc-signer).
