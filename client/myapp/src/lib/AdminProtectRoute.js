import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("admin");
  return isAdminLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;
