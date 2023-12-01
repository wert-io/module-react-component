import WertWidget from '@wert-io/widget-initializer';
import type {
  Options,
  SetThemeParameters,
  EventTypes,
} from '@wert-io/widget-initializer/types';

import generateSignedData from './generate-signed-data';
import type { SmartContractOptions } from './generate-signed-data';

type RemoveEventListenersParameters =
  | EventTypes
  | Array<EventTypes>
  | undefined;

export function useWertWidget(
  options: Options,
  smartContractOptions?: SmartContractOptions
) {
  const wertWidget = new WertWidget({
    ...options,
    ...(smartContractOptions ? generateSignedData(smartContractOptions) : {}),
  });
  return {
    open: () => {
      wertWidget.open();
    },
    addEventListeners: (listeners: Options['listeners']) => {
      wertWidget.addEventListeners(listeners);
    },
    removeEventListeners: (types: RemoveEventListenersParameters) => {
      const isEventTypesArray = (
        types: RemoveEventListenersParameters
      ): types is Array<EventTypes> => Array.isArray(types);

      if (types === undefined) {
        wertWidget.removeEventListeners();
      } else if (isEventTypesArray(types)) {
        wertWidget.removeEventListeners(types);
      } else {
        wertWidget.removeEventListeners(types);
      }
    },
    updateTheme: (theme: SetThemeParameters) => {
      wertWidget.updateTheme(theme);
    },
  };
}

export default useWertWidget;
