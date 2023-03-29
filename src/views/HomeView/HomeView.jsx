import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginViewUrl } from "../../constants/url";
import { logout } from "../../firebase/authentication/authentication";

export function HomeView() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(LoginViewUrl);
  };
  return (
    <div>
      HomeView
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
