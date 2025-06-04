import { useState } from "react";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import { inject } from "@vercel/analytics";

inject();

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
  };

  return (
    <>
      {userEmail ? <Dashboard /> : <Landing onEmailSubmit={handleEmailSubmit} />}
    </>
  );
}

export default App;
