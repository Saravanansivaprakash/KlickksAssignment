import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "./api";

const ProtectedRoute = () => {
  const [isAuth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const fetchingData = async () => {
    try {
      let response = await api.get("/auth/me");

      if (response.status === 200) {
        setAuth(true);
        setUser(response.data);
      } else {
        setAuth(false);
      }
    } catch (err) {
      setAuth(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  if (isAuth === null) {
    return (
      <div className="text-center vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuth ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
