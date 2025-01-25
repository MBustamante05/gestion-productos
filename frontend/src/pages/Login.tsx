import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import axiosInstance from '../utils/axiosInstance';

type FormValues = {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (values: FormValues) => {
    console.log('Received values of form: ', values);
    try {
      const response = await axiosInstance.post('/users/login', values);
      navigate('/');
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='auth-container'>
      <div>
        <h1>Bienvenido/a de nuevo!</h1>
        <p>Gestiona tus productos de la mejor manera</p>
      </div>
      <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Por favor ingrese su correo electrónico!' }]}
      >
        <Input prefix={<UserOutlined />} type='email' placeholder="Correo Electrónico" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Iniciar Sesión
        </Button>
        o <Link to="/register">Registrese!</Link>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Login