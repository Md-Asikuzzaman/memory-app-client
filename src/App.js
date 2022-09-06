import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const App = () => {
  // offline online

  useEffect(() => {
    window.addEventListener("offline", () => {
      localStorage.setItem("offline", "off");
      localStorage.removeItem("online");
    });

    if (localStorage.getItem("offline")) {
      document.querySelector("body").style.display = "none";
    }

    window.addEventListener("online", () => {
      localStorage.removeItem("offline");
      localStorage.setItem("online", "on");
    });

    if (localStorage.getItem("online")) {
      document.querySelector("body").style.display = "block";
    }
  }, []);
  // offline online

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/auth" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
