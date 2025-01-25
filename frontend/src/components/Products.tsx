import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Table } from "antd"
import type { TableColumnsType, TableProps } from 'antd';
import { DataType } from "../types/dataType";
import { data } from "../mocks/example";

const columns: TableColumnsType<DataType> = [
  {
    title: 'ID Producto',
    dataIndex: 'productId',
  },
  {
    title: 'Producto',
    dataIndex: 'name',
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
  },
  {
    title: 'Precio',
    dataIndex: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'countInStock',
  },
  {
    title: 'Categoría',
    dataIndex: 'category',
  },
  {
    title: 'Acciones',
    dataIndex: 'actions',
    render: () => (
      <div>
        <Button type="default" icon={<EditOutlined />} size={"large"}>
          Editar
        </Button>
      </div>
    ),
  }
];



const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

function Products() {
  return (
    <div>
      <div className="add-product">
        <h1>Productos</h1>
        <Button type="primary" icon={<PlusOutlined />} size={"large"}>
            Agregar Producto
          </Button>
      </div>
      <Table<DataType>
        style={{borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', background: '#FFF'}}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default Products