import { useRef } from "react";
import WertWidget from "@wert-io/widget-initializer";
import generateSignedData from "./generate-signed-data";
import type { SmartContractOptions } from "./generate-signed-data";

type WidgetOptions = ConstructorParameters<typeof WertWidget>[0];
type ThemeOptions = Parameters<WertWidget["setTheme"]>[0];

export function useWertWidget(
  options: WidgetOptions,
  smartContractOptions?: SmartContractOptions
) {
  const wertWidget = useRef<WertWidget | null>(null);

  const initWidget = () => {
    if (wertWidget.current) wertWidget.current.destroy();

    wertWidget.current = new WertWidget({
      ...options,
      ...(smartContractOptions ? generateSignedData(smartContractOptions) : {}),
    });
  };

  return {
    mountWertWidget: () => {
      initWidget();
      wertWidget.current?.mount();
    },
    destroyWertWidget: () => wertWidget.current?.destroy?.(),
    getEmbedCode: () => wertWidget.current?.getEmbedCode(),
    setWertWidgetTheme: (themeOptions: ThemeOptions) =>
      wertWidget.current?.setTheme(themeOptions),
    eventTypes: WertWidget.eventTypes
  };
}

export default useWertWidget;
