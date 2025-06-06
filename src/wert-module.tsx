import { useEffect, useRef, useState } from 'react';
import WertWidget from '@wert-io/widget-initializer';
import type {
  Options
} from '@wert-io/widget-initializer/types';

import { generateListeners } from './helpers/generate-listeners';

import { updateReactiveOptions } from './helpers/update-reactive-options';
import type { ReactiveOptions, ReactiveThemeParameters } from './helpers/update-reactive-options';

type StaticOptions = Omit<
  Options,
  ReactiveThemeParameters | 'listeners'
>;

export const useWertWidget = (reactiveOptions: ReactiveOptions) => {
  const prevOptions = useRef<ReactiveOptions | undefined>(reactiveOptions);
  const wertWidget = useRef<InstanceType<typeof WertWidget> | undefined>();
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  useEffect(() => {
    updateReactiveOptions({
      widget: wertWidget.current,
      widgetCallback: () => setIsWidgetOpen(false),
      options: reactiveOptions,
      prevOptions
    });
  }, [reactiveOptions]);

  return {
    open: (options: StaticOptions) => {
      if (isWidgetOpen) {
        console.error('The Wert widget is already open');
        return;
      }

      wertWidget.current = new WertWidget({
        ...options,
        ...reactiveOptions,
        listeners: generateListeners({
          listeners: reactiveOptions?.listeners,
          widgetCallback: () => setIsWidgetOpen(false)
        }),
      });
      wertWidget.current.open();

      setIsWidgetOpen(true);
    },
    close: () => {
      if (!isWidgetOpen) {
        console.error('The Wert widget is already closed');
        return;
      }
      wertWidget.current?.close();
      setIsWidgetOpen(false);
    },
    isWidgetOpen,
  };
};

export type { StaticOptions, ReactiveOptions };
