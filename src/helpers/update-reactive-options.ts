import { MutableRefObject } from 'react';

import WertWidget from '@wert-io/widget-initializer';
import type {
  Options,
  SetThemeParameters,
  EventTypes,
} from '@wert-io/widget-initializer/types';

import generateListeners from './generate-listeners';

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
export type ReactiveThemeParameters = (typeof reactiveThemeParameters)[number];
export type ReactiveOptions = Pick<
  Options,
  ReactiveThemeParameters | 'listeners'
>;

interface ThemeFunctionProps {
  widget?: InstanceType<typeof WertWidget>;
  options?: ReactiveOptions;
  prevOptions: MutableRefObject<ReactiveOptions | undefined>;
  widgetCallback?: (...args: any[]) => any;
}

export const updateTheme = ({
  widget,
  options,
  prevOptions,
}: ThemeFunctionProps) => {
  if (!widget) return;

  const changedThemeParameters = reactiveThemeParameters.reduce(
    (accum: SetThemeParameters, parameter) => {
      if (prevOptions.current?.[parameter] !== options?.[parameter]) {
        switch (parameter) {
          case 'theme':
            return { ...accum, theme: options?.[parameter] };
          default:
            return {
              ...accum,
              colors: {
                ...accum.colors,
                [parameter]: options?.[parameter],
              },
            };
        }
      }
      return accum;
    },
    {}
  );
  if (Object.keys(changedThemeParameters).length) {
    widget.updateTheme(changedThemeParameters);
  }
};

export const updateListeners = ({
  widget,
  options,
  prevOptions,
  widgetCallback,
}: ThemeFunctionProps) => {
  if (!widget) return;

  if (prevOptions.current?.listeners) {
    const newListeners = options?.listeners || {};
    const listenersToRemove = Object.keys(prevOptions.current.listeners).filter(
      (key) => !(key in newListeners)
    );
    listenersToRemove.length &&
      widget.removeEventListeners(listenersToRemove as EventTypes[]);
  }

  const listeners = generateListeners({
    listeners: options?.listeners,
    widgetCallback
  });
  widget.addEventListeners(listeners);
};

export const updateReactiveOptions = ({
  widget,
  options,
  prevOptions,
  widgetCallback,
}: ThemeFunctionProps) => {
  updateTheme({ widget, options, prevOptions });
  updateListeners({ widget, options, prevOptions, widgetCallback });
  prevOptions.current = options;
};
