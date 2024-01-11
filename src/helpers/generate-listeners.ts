import { Options } from '@wert-io/widget-initializer/types';

interface Props {
  widgetCallback?: (...args: any[]) => any;
  listeners?: Options['listeners'];
}

export default function generateListeners({
  widgetCallback,
  listeners,
}: Props) {
  return {
    ...(listeners ? listeners : {}),
    close: () => {
      widgetCallback && widgetCallback();
      listeners?.close && listeners.close();
    },
  };
}
