import { useState } from "react";
import AdminPanel from "./AdminPanel";
import Website from "./Website";

function App() {
  const [adminMode, setAdminMode] = useState(false);

  const allowedKeysForAdmin = ["-"]; // allows to set keys for admin access, only prototype, should not be used in prod mode!

  document.addEventListener("keydown", (e) => {
    if (adminMode === false) {
      if (allowedKeysForAdmin.includes(e.key)) {
        e.preventDefault();
        setAdminMode(true);
      }
    }
  });

  if (adminMode) return <AdminPanel switchToWeb={(_) => setAdminMode(false)} />;
  else return <Website switchToAdmin={(_) => setAdminMode(true)} />;
}

export default App;
