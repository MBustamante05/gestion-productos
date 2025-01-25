import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance";
import { Avatar, Input } from "antd";
import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import Products from "../components/Products";

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const authentication = async () => {
    try {
      const res = await axiosInstance.get('/users/profile');
      const message = res.data.message;
      setIsLoading(true);
      if (message !== "Success!") {
        navigate('/login');
      }else {
        console.log(res.data);
        const { email, name } = res.data.user;
        setUserEmail(email);
        setUserName(name);
        setIsLoading(false); // Marca como cargado solo si hay token
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    authentication();
  },[]);

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="main-container">
      <div className="search-container">
          <h1>Code<span className="craft">Craft</span></h1>
          <Input style={{ width: 500, border: "none", background: "#FFF", borderRadius: "20px", padding: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"}} size="large" placeholder="Buscar producto..." prefix={<SearchOutlined />}/>
          <div className="user-container">
            <Avatar icon={<UserOutlined />} />
            <div className="user-info">
              <p>{userName}</p>
              <small>{userEmail}</small>
            </div>
            <DownOutlined style={{color: "#676767"}} />
          </div>
      </div>
      <Products/>
    </div>
  )
}

export default HomePage