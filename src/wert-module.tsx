import { useCallback, useEffect, useRef } from 'react';
import WertWidget from '@wert-io/widget-initializer';
import type {
  Options,
  SetThemeParameters,
  EventTypes,
} from '@wert-io/widget-initializer/types';

import generateSignedData from './generate-signed-data';
import type { SmartContractOptions } from './generate-signed-data';

export function useWertWidget(
  options: Options,
  smartContractOptions?: SmartContractOptions
) {
  const prevOptions = useRef<Options>(options);
  const wertWidget = useRef(
    new WertWidget({
      ...options,
      ...(smartContractOptions ? generateSignedData(smartContractOptions) : {}),
    })
  );

  const updateTheme = useCallback((newOptions: Options) => {
    const reactiveThemeParameters = [
      'theme',
      'color_background',
      'color_buttons',
      'color_buttons_text',
      'color_secondary_buttons',
      'color_secondary_buttons_text',
      'color_main_text',
      'color_secondary_text',
      'color_icons',
      'color_links',
      'color_success',
      'color_warning',
      'color_error',
    ];
    const changedThemeParameters = reactiveThemeParameters.reduce(
      (accum: SetThemeParameters, parameter) => {
        if (prevOptions.current[parameter] !== newOptions[parameter]) {
          switch (parameter) {
            case 'theme':
              return { ...accum, theme: newOptions[parameter] };
            default:
              return {
                ...accum,
                colors: {
                  ...accum.colors,
                  [parameter]: newOptions[parameter],
                },
              };
          }
        }
        return accum;
      },
      {}
    );
    if (Object.keys(changedThemeParameters).length) {
      wertWidget.current.updateTheme(changedThemeParameters);
    }
  }, []);

  const updateListeners = useCallback((newOptions: Options) => {
    newOptions.listeners && wertWidget.current.addEventListeners(newOptions.listeners);

    if (prevOptions.current.listeners) {
      const newListeners = newOptions.listeners || {};
      const listenersToRemove = Object.keys(prevOptions.current.listeners).filter(
        (key) => !(key in newListeners)
      );
      listenersToRemove.length &&
        wertWidget.current.removeEventListeners(listenersToRemove as EventTypes[]);
    }
  }, []);

  const updateReactiveOptions = useCallback(
    (options: Options) => {
      updateTheme(options);
      updateListeners(options);
      prevOptions.current = options;
    },
    []
  );

  useEffect(() => {
    updateReactiveOptions(options);
  }, [options]);

  return {
    open: () => {
      wertWidget.current.open();
    },
  };
}

export default useWertWidget;
export type { Options, SmartContractOptions };
