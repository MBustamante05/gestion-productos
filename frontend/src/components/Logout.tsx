import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

type Props = {
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
};
function Logout({ isClicked, setIsClicked }: Props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      message.error(errorMessage);
    } finally {
      setIsClicked(false);
    }
  };
  return (
    <div className="logout">
      <Button
        className="logout-btn"
        style={{ display: isClicked ? "block" : "none" }}
        onClick={() => handleLogout()}
        color="default"
        variant="solid"
      >
        Cerrar sesión
      </Button>
    </div>
  );
}

export default Logout;
