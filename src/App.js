import "./App.css";
import { Signin } from "./logins/signin";
import { Signup } from "./logins/signup";
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import {Main} from "./pages/main"
import { Profile } from "./components/profile";
import { AppProvider, useAppContext  } from "./appContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const ok = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
        console.log(user.uid);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      ok();
    };
  }, []);

  return (
    <div className="App">
      <Router>
      <AppProvider>
        <Routes>
          {user ? (
            <>
              <Route path="/main" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/main" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
        </AppProvider>
      </Router>
    </div>
  );
}
export default App;
