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
import { useState } from 'react';
import { useWertWidget } from '@wert-io/module-react-component';
import type { StaticOptions, ReactiveOptions } from '@wert-io/module-react-component';

export default function WertWidgetButton () {
    const options: StaticOptions = {
        partner_id: 'YOUR_PARTNER_ID',
        // ...
    };
    const [reactiveOptions, setReactiveOptions] = useState<ReactiveOptions>({
        theme: 'dark',
        listeners: {
            'loaded': () => console.log('loaded'),
        },
    });

    const { open: openWertWidget, isWidgetOpen } = useWertWidget(reactiveOptions);

    return <button
        onClick={() => openWertWidget(options)}
    >
        Make A Purchase
    </button>
}
```

### Options
The `useWertWidget` function expects a single optional argument - an object with **reactive** options, such as `listeners` and theme-related parameters (`theme` and `brand_color`).

All **static** options should be passed directly to the `open` method. These include all options from `@wert-io/widget-initializer`, **excluding** listeners and theme-related parameters. You can find the full list of supported options [here](https://www.npmjs.com/package/@wert-io/widget-initializer#options).

### Adding smart contract options

Please generate the signature **on your backend** (you can use the [@wert-io/widget-sc-signer](https://www.npmjs.com/package/@wert-io/widget-sc-signer) package), and then pass the resulting options to the `open` method. Make sure you don't store your private key on the frontend.

```
import { useWertWidget } from '@wert-io/module-react-component';
import type { StaticOptions } from '@wert-io/module-react-component';

// ...

const generalOptions: StaticOptions = {
    partner_id: 'YOUR_PARTNER_ID',
};
const smartContractOptions: Partial<StaticOptions> = {
    address: 'FALLBACK_ADDRESS',
    commodity: 'ETH',
    network: 'goerli',
    commodity_amount: 0.005,
    sc_address: 'SMART_CONTRACT_ADDRESS',
    sc_input_data: 'SMART_CONTRACT_EXECUTION_DATA',
    signature: 'GENERATED_SIGNATURE', // A signature generated beforehand
}
const { open } = useWertWidget();

const openWidget = () => open({ ...generalOptions, ...smartContractOptions });
```
