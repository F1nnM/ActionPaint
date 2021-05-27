import { useState } from "react";
import AdminPanel from "./AdminPanel";
import Website from "./Website";

function App() {
  const [adminMode, setAdminMode] = useState(false);

  if (adminMode) return <AdminPanel switchToWeb={(_) => setAdminMode(false)} />;
  else return <Website switchToAdmin={(_) => setAdminMode(true)} />;
}

export default App;
