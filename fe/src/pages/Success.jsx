import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

  
    const payload = JSON.parse(atob(token.split(".")[1]));

    const userData = {
      id: payload.id,
      email: payload.email,
    };

    login(userData, token);
    navigate("/", { replace: true });
  }, []);

  return <p>Accesso in corso...</p>;
};

export default Success;