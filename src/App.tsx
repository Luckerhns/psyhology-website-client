import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/ru/MainPage";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { PublicRoutesEnum } from "./utils/consts";

function App() {
  const isAdmin = Boolean(localStorage.getItem("isAdmin"));
  // localStorage.clear()
  return (
    <BrowserRouter>
      <Routes>
        {isAdmin
          ? privateRoutes.map((e) => (
              <Route path={e.path} key={e.path} element={<e.element />} />
            ))
          : publicRoutes.map((e) => (
              <Route path={e.path} key={e.path} element={<e.element />} />
            ))}
        <Route path="*" element={<Navigate to={PublicRoutesEnum.MainPath} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
