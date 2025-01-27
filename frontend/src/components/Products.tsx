import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import type { TableColumnsType } from "antd";
import { DataType } from "../types/dataType";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axiosInstance from "../utils/axiosInstance";
import Actions from "./Actions";

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
  },
];

function Products() {
  const [showModel, setShowModel] = useState(false);
  const [products, setProducts] = useState<DataType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (error) {
        message.error("No se pudo cargar los productos: " + error);
      }
    })();
  }, [products]);

  const handleEdit = (id: string) => {
    const product = products.find((product) => product._id === id);
    if (product) {
      setSelectedProduct(product);
      setShowModel(true);
    }
  };

  return (
    <div>
      <div className="add-product">
        <h1>Productos</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size={"large"}
          onClick={() => {
            setSelectedProduct(null);
            setShowModel(true);
          }}
        >
          Agregar Producto
        </Button>
      </div>
      {showModel && (
        <AddProduct
          selectedProduct={selectedProduct}
          setShowModel={setShowModel}
          isModalOpen={showModel}
        />
      )}
      <Table<DataType>
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px 20px 10px",
          background: "#FFF",
        }}
        columns={columns.map((column) =>
          "dataIndex" in column && column.dataIndex === "actions"
            ? {
                ...column,
                render: (_, record) => (
                  <Actions recordId={record._id} onEdit={handleEdit} />
                ),
              }
            : column
        )}
        dataSource={products.map((product, index) => ({
          ...product,
          key: index,
        }))}
      />
    </div>
  );
}

export default Products;
