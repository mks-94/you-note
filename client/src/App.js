import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./components/auth/auth";
import AuthForm from "./components/auth/authForm";

const App = () => {
  const existingToken = localStorage.getItem("token") || "";
  const existingUsername = localStorage.getItem("username") || "";
  const [authToken, setAuthToken] = useState(existingToken);
  const [username, setUsername] = useState(existingUsername);

  const setUserName = (data) => {
    if (!data) {
      localStorage.removeItem("username");
      setUsername();
    } else {
      localStorage.setItem("username", data);
      setUsername(data);
    }
  };

  const setToken = (data) => {
    if (!data) {
      localStorage.removeItem("token");
      setAuthToken();
    } else {
      localStorage.setItem("token", JSON.stringify(authToken));
      setAuthToken(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: setToken,
        username,
        setUserName: setUserName,
      }}
    >
      <Router>
        <div className="App">
          <AuthForm />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
