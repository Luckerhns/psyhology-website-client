import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { useTypedSelector } from "./hooks/useTypedSelector";
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
