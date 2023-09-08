import { TerraWebExtensionConnector } from "@terra-money/web-extension-interface";

interface ExtensionInfo {
  name: string;
  identifier: string;
  icon: string;
  connector?: () =>
    | TerraWebExtensionConnector
    | Promise<TerraWebExtensionConnector>;
}

declare global {
  interface Window {
    terraWallets: ExtensionInfo[] | undefined;
  }
}
