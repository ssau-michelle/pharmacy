import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import MedicinePage from "./pages/MedicinePage";
import RemindersPage from "./pages/RemindersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/medicaments" element={<SearchPage />} />
      <Route path="/medicaments/:id" element={<MedicinePage />} />
      <Route path="/reminders/" element={<RemindersPage />} />
    </Routes>
  );
}

export default App;
