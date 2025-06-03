import Dashboard from "./Dashboard";
import { inject } from "@vercel/analytics";

inject();

function App() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
