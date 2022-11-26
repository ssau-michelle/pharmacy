import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/medicaments" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
