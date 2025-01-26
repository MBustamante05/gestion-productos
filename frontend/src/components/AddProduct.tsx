import { Col, Form, Input, InputNumber, message, Modal, Row } from "antd";
import { Dispatch, SetStateAction } from "react";
import axiosInstance from "../utils/axiosInstance";

type Props = {
  setShowModel: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
};
type FormValues = {
  name: string;
  price: number;
  countInStock: number;
  category: string;
  description: string;
};
function AddProduct({ setShowModel, isModalOpen }: Props) {
  const [form] = Form.useForm<FormValues>();
  const handleOk = () => {
    form.submit();
    setShowModel(false);
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  const handleAddProduct = async (values: FormValues) => {
    try {
      await axiosInstance.post("/products/add", {
        name: values.name,
        price: values.price,
        description: values.description,
        category: values.category,
        quantity: values.countInStock
      });
      message.success("Producto agregado correctamente!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "No fue posible agregar el producto";
      message.error(errorMessage);
    }
  };

  return (
    <div>
      <Modal
        title="Nuevo Producto"
        open={isModalOpen}
        okText="Agregar"
        cancelText="Cancelar"
        onOk={handleOk} // Llama a form.submit() aquí
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={handleAddProduct} // Maneja el envío del formulario
          form={form} // Conecta la instancia del formulario
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa el nombre del producto",
                  },
                ]}
              >
                <Input placeholder="Ingresa el nombre del producto" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Precio"
                name="price"
                rules={[
                  { required: true, message: "Por favor, ingresa el precio" },
                  {
                    type: "number",
                    min: 1,
                    message: "El precio debe ser mayor a 0",
                  },
                ]}
              >
                <InputNumber
                  className="specialInput"
                  placeholder="Ingresa el precio del producto"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Stock"
                name="countInStock"
                rules={[
                  { required: true, message: "Por favor, ingresa el stock" },
                  {
                    type: "number",
                    min: 0,
                    message: "El stock no puede ser negativo",
                  },
                ]}
              >
                <InputNumber
                  className="specialInput"
                  placeholder="Ingresa el stock del producto"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Categoría"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa la categoría",
                  },
                ]}
              >
                <Input placeholder="Ingresa la categoría del producto" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Descripción"
            name="description"
          >
            <Input.TextArea
              placeholder="Ingresa la descripción del producto"
              showCount
              maxLength={100}
              style={{ height: 80, resize: "none" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddProduct;
