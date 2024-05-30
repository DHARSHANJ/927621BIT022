import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redirect component
const RedirectComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/edit");
  }, [navigate]);

  return null;
};

export default RedirectComponent;
