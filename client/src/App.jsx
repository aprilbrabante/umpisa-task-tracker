import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import AppNavbar from "./components/AppNavbar";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const setNewToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => !!token;

  return (

    <UserProvider
      value={{
        token,
        setNewToken,
        clearToken,
        isAuthenticated
      }}
    >

      <Router>
      {token && <AppNavbar />}
        <AppRoutes isAuthenticated={isAuthenticated()} />

      </Router>

    </UserProvider>
  );
}

export default App;