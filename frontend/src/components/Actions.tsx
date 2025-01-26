import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axiosInstance from "../utils/axiosInstance";

interface ActionsProps {
  recordId: string;
  onEdit: (id: string) => void;
}

function Actions({ recordId, onEdit }: ActionsProps) {
  const handleCancel = () => {
    message.error("Cancelado");
  };
  const handleConfirm = () => {
    handleDelete(recordId);
  };
  const handleEdit = (id: string) => {
    onEdit(id);
  }
  const handleDelete = (id: string) => {
    axiosInstance.delete(`/products/delete/${id}`).then(() => {
      message.success("Producto eliminado correctamente");
    }).catch((error) => {
      message.error("No se pudo eliminar el producto: " + error);
    });
  }

  return (
    <div className="actions">
      <Button
        type="default"
        icon={<EditOutlined />}
        size="large"
        onClick={() => handleEdit(recordId)}
      >
        Editar
      </Button>
      <Popconfirm
        title="Eliminar producto"
        description="¿Estás seguro de que quieres eliminar este producto?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        okText="Sí"
        cancelText="Cancelar"
      >
        <Button type="primary" icon={<DeleteOutlined />} size="large" danger>
          Eliminar
        </Button>
      </Popconfirm>
    </div>
  );
};

export default Actions;
