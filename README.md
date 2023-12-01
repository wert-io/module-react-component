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
import { useWertWidget } from '@wert-io/module-react-component';

export default function WidgetButton () {
    const options = {
        partner_id: 'YOUR_PARTNER_ID',
        listeners: {
            loaded: () => console.log('loaded'),
        },
    };

    const { open: openWertWidget } = useWertWidget(options);

    return <button onClick={() => openWertWidget()}>Make A Purchase</button>
}
```

You can find the full list of the options that can be passed to the widget [here](https://www.npmjs.com/package/@wert-io/widget-initializer#documentation).


### Methods

| Method                   | Description                               |
|--------------------------|-------------------------------------------|
| **open**                 | Mounts module in DOM and makes it visible |
| **updateTheme**          | Switches the theme without reload         |
| **addEventListeners**    | Adds event listeners                      |
| **removeEventListeners** | Removes event listeners                   |


You can learn how the methods work [here](https://www.npmjs.com/package/@wert-io/widget-initializer#configuration-object-methods).

### Smart Contract Signing Helper

We've added `@wert-io/widget-sc-signer` to simplify the data signing process for executing smart contracts. Just pass the object with the following options as the second argument to the `useWertWidget` function. 

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
  const { open } = useWertWidget(wertOptions, smartContractData);
```

You can find more information on how the signer works [here](https://www.npmjs.com/package/@wert-io/widget-sc-signer).
