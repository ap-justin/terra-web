import { useTerra } from "./useTerra";

export default function App() {
  const { state, connect, disconnect } = useTerra();
  return (
    <div>
      <code>{JSON.stringify(state, null, 2)}</code>
      <button type="button" onClick={connect}>
        connect
      </button>
      <button type="button" onClick={disconnect}>
        disconnect
      </button>
    </div>
  );
}
