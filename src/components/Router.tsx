import Home from "../Routes/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../Routes/Auth";
import { useState } from "react";
import Navigation from "./Navigation";
import Profile from "../Routes/Profile";

interface AppRouterProps {
  isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn = false }: AppRouterProps) => {
  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />}></Route>
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
