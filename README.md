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

```
import { useState } from 'React';
import { useWertWidget } from '@wert-io/module-react-component';
import type { StaticOptions, ReactiveOptions } from '@wert-io/module-react-component';

export default function WertWidgetButton () {
    const staticOptions: StaticOptions = {
        partner_id: 'YOUR_PARTNER_ID',
    };
    const [reactiveOptions, setReactiveOptions] = useState<ReactiveOptions>({
        theme: 'dark',
        listeners: {
            'loaded': () => console.log(loaded),
        },
    });

    const { open: openWertWidget } = useWertWidget({ staticOptions, reactiveOptions });

    return <button onClick={() => openWertWidget()}>Make A Purchase</button>
}
```

### Options
The `useWertWidget` function expects the single argument. You can provide the following options within it:  

| Field Name      | Type | Required   | Description |
|-----------------|-----------|------------|-------------|
| staticOptions         | StaticOptions    | required   | Options that can't be changed reactively.
| reactiveOptions       | Reactive Options    | optional   | Options that can be changed reactively. If your reactive options get updated, the hook will handle all the related state changes, such as **updating theme** and **adding/removing listeners**.
| smartContractOptions | SmartContractOptions    | optional   | Smart contract related options (non-reactive). 

You can find the full list of the options that can be passed to the widget [here](https://www.npmjs.com/package/@wert-io/widget-initializer#options).

### Adding smart contract options

We've added `@wert-io/widget-sc-signer` to simplify the data signing process for executing smart contracts. Just pass the `smartContractOptions` object with the following options:

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
import type { StaticOptions, SmartContractOptions } from '@wert-io/module-react-component';

// ...

const staticOptions: StaticOptions = useState<StaticOptions>({
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
const { open } = useWertWidget({staticOptions, smartContractOptions});
```

You can find more information on how the signer works and its' options [here](https://www.npmjs.com/package/@wert-io/widget-sc-signer).

### Methods

The `useWertWidget` hook provides a single method (`open`) for **displaying the widget**.