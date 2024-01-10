import { useCallback, useEffect, useRef, useState } from 'react';
import WertWidget from '@wert-io/widget-initializer';
import type {
  Options,
  SetThemeParameters,
  EventTypes,
} from '@wert-io/widget-initializer/types';

import generateSignedData from './generate-signed-data';
import type { SmartContractOptions } from './generate-signed-data';
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
] as const;
type ReactiveThemeParameters = typeof reactiveThemeParameters[number];
export type StaticOptions = Omit<Options, ReactiveThemeParameters | 'listeners'>
export type ReactiveOptions = Pick<Options, ReactiveThemeParameters | 'listeners'>

export interface WidgetOptions {
  staticOptions: StaticOptions,
  reactiveOptions?: ReactiveOptions,
  smartContractOptions?: SmartContractOptions
}

export function useWertWidget({
  staticOptions,
  reactiveOptions,
  smartContractOptions
}: WidgetOptions) {
  const prevOptions = useRef<ReactiveOptions | undefined>(reactiveOptions);
  const wertWidget = useRef<null | InstanceType<typeof WertWidget>>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const updateTheme = useCallback((newOptions?: ReactiveOptions) => {
    if (!wertWidget.current) return;

    const changedThemeParameters = reactiveThemeParameters.reduce(
      (accum: SetThemeParameters, parameter) => {
        if (prevOptions.current?.[parameter] !== newOptions?.[parameter]) {
          switch (parameter) {
            case 'theme':
              return { ...accum, theme: newOptions?.[parameter] };
            default:
              return {
                ...accum,
                colors: {
                  ...accum.colors,
                  [parameter]: newOptions?.[parameter],
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

  const updateListeners = useCallback((newOptions?: ReactiveOptions) => {
    if (!wertWidget.current) return;

    newOptions?.listeners && wertWidget.current.addEventListeners(newOptions.listeners);

    if (prevOptions.current?.listeners) {
      const newListeners = newOptions?.listeners || {};
      const listenersToRemove = Object.keys(prevOptions.current.listeners).filter(
        (key) => !(key in newListeners)
      );
      listenersToRemove.length &&
        wertWidget.current.removeEventListeners(listenersToRemove as EventTypes[]);
    }
  }, []);

  const updateReactiveOptions = useCallback(
    (options?: ReactiveOptions) => {
      updateTheme(options);
      updateListeners(options);
      prevOptions.current = options;
    },
    []
  );

  useEffect(() => {
    updateReactiveOptions(reactiveOptions);
  }, [reactiveOptions]);

  return {
    open: () => {
      wertWidget.current = new WertWidget({
        ...staticOptions,
        ...reactiveOptions,
        ...(smartContractOptions ? generateSignedData(smartContractOptions) : {}),
      });
      wertWidget.current.open();
      setIsWidgetOpen(true);
    },
    isWidgetOpen
  };
}

export default useWertWidget;
export type { Options, SmartContractOptions };
