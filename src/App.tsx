import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { Firebase, authService } from "./Firebase";

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  console.log(init);

  useEffect(() => {
    setInit(true);
    onAuthStateChanged(authService, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, []);

  return (
    <>{!init ? <div>Loading...</div> : <AppRouter isLoggedIn={isLoggedIn} />}</>
  );
}

export default App;
