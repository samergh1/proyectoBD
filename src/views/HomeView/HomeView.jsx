import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginViewUrl } from "../../constants/url";
import { useUserContext } from "../../contexts/userContext";
import { logout } from "../../firebase/authentication/authentication";

export function HomeView() {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUserContext();

  const handleLogout = async () => {
    logout();
    navigate(LoginViewUrl);
  };
  return (
    <div>
      {!isLoadingUser && !!user ? (
        <div>
          HomeView
          <h2>{user.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </div>
  );
}
