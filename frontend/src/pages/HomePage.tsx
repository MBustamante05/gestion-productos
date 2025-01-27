import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Avatar, message, Spin } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import Products from "../components/Products";
import Logout from "../components/Logout";

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
          Gestion<span className="craft">Products</span>
        </h1>
        <div
          className="user-container"
          onClick={() => setIsClicked(!isClicked)}
        >
          <Avatar icon={<UserOutlined />} />
          <div className="user-info">
            <p>{userName}</p>
            <small>{userEmail}</small>
          </div>
          <DownOutlined style={{ color: "#676767" }} />
          <Logout isClicked={isClicked} setIsClicked={setIsClicked} />
        </div>
      </div>
      <Products />
    </div>
  );
}

export default HomePage;
