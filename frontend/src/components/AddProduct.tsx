import { Col, Form, Input, InputNumber, message, Modal, Row } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { DataType } from "../types/dataType";

type Props = {
  setShowModel: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  selectedProduct: DataType | null;
};
type FormValues = {
  name: string;
  price: number;
  countInStock: number;
  category: string;
  description: string;
};
function AddProduct({ setShowModel, isModalOpen, selectedProduct }: Props) {
  const [form] = Form.useForm<FormValues>();
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  const handleAddProduct = async (values: FormValues) => {
    try {
      setShowModel(false);
      if (selectedProduct) {
        await axiosInstance.put(`/products/update/${selectedProduct._id}`, {
          name: values.name,
          price: values.price,
          description: values.description,
          category: values.category,
          quantity: values.countInStock,
        });
        message.success("Producto actualizado correctamente!");
      } else {
        await axiosInstance.post("/products/add", {
          name: values.name,
          price: values.price,
          description: values.description,
          category: values.category,
          quantity: values.countInStock,
        });
        message.success("Producto agregado correctamente!");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No fue posible agregar el producto";
      message.error(errorMessage);
    }
  };
  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue({
        name: selectedProduct.name,
        price: selectedProduct.price,
        countInStock: selectedProduct.countInStock,
        category: selectedProduct.category,
        description: selectedProduct.description,
      });
    }else{
      form.resetFields();
    }
  }, [selectedProduct, form]);

  return (
    <div>
      <Modal
        title={selectedProduct ? "Editar Producto" : "Nuevo Producto"}
        open={isModalOpen}
        okText={selectedProduct ? "Actualizar" : "Agregar"}
        cancelText="Cancelar"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleAddProduct} form={form}>
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
          <Form.Item label="Descripción" name="description">
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
