import { useRef, useState } from "react";
import _extension from "./terra";
import type { Extension } from "@terra-money/terra.js";

type Connected = { status: "connected"; chainId: string; address: string };
type Disconnected = { status: "disconnected" };
type Loading = { status: "loading" };

type State = Connected | Disconnected | Loading;

const id = "station";

type OnConnectPayload = {
  address: string;
  chainId: string;
  addresses: Record<string, string>;
};

export function useTerra() {
  const [state, setState] = useState<State>({ status: "disconnected" });
  const extensionRef = useRef<Extension>();
  async function connect() {
    try {
      const injectedExtension = window.terraWallets?.find(
        (w) => w.identifier === id
      );
      if (!injectedExtension) throw new Error("not installed");

      const extension = _extension(id);
      extensionRef.current = extension;

      setState({ status: "loading" });
      extension.connect();
      extension.on("onConnect", (payload: OnConnectPayload) => {
        console.log(payload);
        const terraEntry = Object.entries(payload.addresses).find(
          ([, address]) => address === payload.address
        );
        if (!terraEntry) return setState({ status: "disconnected" });
        setState({
          address: payload.address,
          chainId: terraEntry[0],
          status: "connected",
        });
      });
    } catch (err) {
      console.log("catched error");
      console.log({ err });
    } finally {
      console.log("done");
    }
  }

  function disconnect() {
    console.log(extensionRef.current);
    extensionRef.current?.destroy();
    //reload page to remove pool
    window.location.reload();
  }

  return { connect, state, disconnect };
}
