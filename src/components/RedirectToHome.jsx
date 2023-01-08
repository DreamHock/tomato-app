import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
};
