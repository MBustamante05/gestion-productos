import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Table } from "antd";
import type { PopconfirmProps, TableColumnsType } from "antd";
import { DataType } from "../types/dataType";
import { data } from "../mocks/example";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axiosInstance from "../utils/axiosInstance";

const cancel: PopconfirmProps["onCancel"] = (e) => {
  console.log(e);
  message.error("Cancelado");
};
const confirm: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Producto Eliminado");
};

const columns: TableColumnsType<DataType> = [
  {
    title: "ID Producto",
    dataIndex: "_id",
  },
  {
    title: "Producto",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
  },
  {
    title: "Descripción",
    dataIndex: "description",
  },
  {
    title: "Precio",
    dataIndex: "price",
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 2,
    },
  },
  {
    title: "Stock",
    dataIndex: "countInStock",
  },
  {
    title: "Categoría",
    dataIndex: "category",
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    render: () => (
      <div className="actions">
        <Button type="default" icon={<EditOutlined />} size={"large"}>
          Editar
        </Button>
        <Popconfirm
          title="Eliminar producto"
          description="Estás seguro de que quieres eliminar este producto?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Si"
          cancelText="Cancelar"
        >
          <Button type="primary" icon={<DeleteOutlined />} size={"large"} danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];

function Products() {
  const [showModel, setShowModel] = useState(false);
  const [products, setProducts] = useState<DataType[]>(data);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (error) {
        message.error("No se pudo cargar los productos: " + error);
      }
    })();

  },[products])
  return (
    <div>
      <div className="add-product">
        <h1>Productos</h1>
        <Button type="primary" icon={<PlusOutlined />} size={"large"} onClick={() => setShowModel(true)}>
          Agregar Producto
        </Button>
      </div>
      {showModel && <AddProduct  setShowModel={setShowModel} isModalOpen={showModel}/>}
      <Table<DataType>
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px 20px 10px",
          background: "#FFF",
        }}
        columns={columns}
        dataSource={products.map((product, index) => ({ ...product, key: index }))}
      />
    </div>
  );
}

export default Products;
