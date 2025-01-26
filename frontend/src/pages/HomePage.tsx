import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Avatar, Button, Input, message, Spin } from "antd";
import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

import Products from "../components/Products";

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/users/profile");
        const message = res.data.message;
        if (message === "Success!") {
          const { email, name } = res.data.user;
          setUserEmail(email);
          setUserName(name);
          setIsLoading(false);
        } else {
          navigate("/login");
          message.error("Usuario no autenticado");
        }
      } catch (err) {
        setIsLoading(false);
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        message.error(errorMessage);
        navigate("/login");
      }
    })();
  }, [navigate]);

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
  

  if (isLoading) {
    return (
      <Spin
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        tip="Loading"
        size="large"
      >
        <div></div>
      </Spin>
    );
  }
  return (
    <div className="main-container">
      <div className="search-container">
        <h1>
          Code<span className="craft">Craft</span>
        </h1>
        <Input
          style={{
            width: 500,
            border: "none",
            background: "#FFF",
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
          size="large"
          placeholder="Buscar producto..."
          prefix={<SearchOutlined />}
        />
        <div className="user-container" onClick={() => setIsClicked(!isClicked)}>
          <Avatar icon={<UserOutlined />} />
          <div className="user-info">
            <p>{userName}</p>
            <small>{userEmail}</small>
          </div>
          <DownOutlined style={{ color: "#676767" }} />
          <div className="logout">
          <Button className="logout-btn" style={{display: isClicked ? "block" : "none"}} onClick={() => handleLogout()} color="default" variant="solid">Cerrar sesión</Button>
        </div>
        </div>
        
      </div>
      <Products />
    </div>
  );
}

export default HomePage;
