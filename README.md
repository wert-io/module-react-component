# Wert Module React component

This is a wrapped [Wert initializer helper](https://www.npmjs.com/package/@wert-io/widget-initializer) for React projects.

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
        partner_id: 'default',
        listeners: {
            loaded: () => console.log('loaded'),
        },
    };

    const { mountWertWidget } = useWertWidget(options);

    return <button onClick={() => mountWertWidget()}>Make A Purchase</button>
}
```

You can find the full list of the options that can be passed to the widget [here](https://www.npmjs.com/package/@wert-io/widget-initializer#documentation).

### Events

To get the whole list of available events, you can use a static property `eventTypes`:

```
  const { eventTypes } = useWertWidget(wertOptions);
  console.log(eventTypes);
```

You can read the events descriptions [here](https://www.npmjs.com/package/@wert-io/widget-initializer#listeners).


### Methods

| Method                 | Description                   |
|------------------------|-------------------------------|
| **mountWertWidget**    | Mounts module in DOM          |
| **setWertWidgetTheme** | Switches theme without reload |

You can learn how the methods work [here](https://www.npmjs.com/package/@wert-io/widget-initializer#configuration-object-methods).

### Smart Contract Signing Helper

We've added `@wert-io/widget-sc-signer` to simplify the data signing process for executing smart contracts. Just pass the object with the following options as the second argument to the `useWertWidget` function. 

| Field Name      | Data Type | Required   |
|-----------------|-----------|------------|
| address         | string    | required   |
| commodity       | string    | required   |
| commodity_amount| number    | required   |
| network         | string    | optional   |
| sc_address      | string    | required   |
| sc_input_data   | string    | required   |
| private_key     | string    | required   |

```
  const { mountWertWidget } = useWertWidget(wertOptions, smartContractData);
```

You can find more information on how the signer works [here](https://www.npmjs.com/package/@wert-io/widget-sc-signer).
