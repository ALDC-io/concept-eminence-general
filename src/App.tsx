import Dashboard from "./Dashboard";
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <>
      <Dashboard />
      <Analytics />
    </>
  );
}

export default App;
