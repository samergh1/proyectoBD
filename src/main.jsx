import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeView } from "./views/HomeView/HomeView";
import { LoginView } from "./views/LoginView/LoginView";
import { RegisterView } from "./views/RegisterView/RegisterView";
import { DetailsView } from "./views/DetailsView/DetailsView";
import {
  DetailsViewUrl,
  HomeViewUrl,
  LoginViewUrl,
  RegisterViewUrl,
} from "./constants/url";
import "./index.css";
import { UserContextProvider } from "./contexts/userContext";
import { Layout } from "./views/Layout/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={HomeViewUrl} element={<HomeView />} />
            <Route path={DetailsViewUrl} element={<DetailsView />} />
          </Route>
          <Route path={LoginViewUrl} element={<LoginView />} />
          <Route path={RegisterViewUrl} element={<RegisterView />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserContextProvider>
);
