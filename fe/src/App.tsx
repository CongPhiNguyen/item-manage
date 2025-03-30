import { useEffect, useState } from 'react'
import './App.css'
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Space, Table, PopConfirm, Popconfirm } from 'antd'
import * as itemApi from './api/item.api'
import { NAME_REGEX, URL_REGEX } from './common/const';
import { Item } from './common/type';

function App() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState<Item[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => `${text}` // Format price
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => {
        return <Space>
          <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={() => deleteItem(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button onClick={() => getDetailItem(id)}>Edit</Button>
        </Space>
      }
    },
  ]

  useEffect(() => {
    fetchListItem(pagination.current, pagination.pageSize)
  }, [pagination.current, pagination.pageSize])

  const fetchListItem = async (page: number, size: number) => {
    const response = await itemApi.fetchListItem(page, size)
    const { status, data } = response
    if (status.success) {
      setData(data.data)
      setPagination({
        ...pagination,
        total: data.total
      })
    } else {
      messageApi.error("Can't get data.")
    }
  }

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination
    })
  }

  const addItem = async (value: any) => {
    const response = await itemApi.fetchAddItem(value)
    const { status } = response
    if (status.success) {
      messageApi.success("Add item success")
      form.resetFields();
      setIsOpenModal(false)
      fetchListItem(1,10)
    } else {
      messageApi.error("Can't add data.")
    }
  }

  const getDetailItem = async (id: string) => {
    const response = await itemApi.fetchDetailItem(id);
    const { status, data } = response
    if (status.success) {
      setSelectedItem(data);
      setIsOpenModal(true)
      form.setFieldsValue(data)
    } else {
      messageApi.error("Can't get data detail.")
    }
  }

  const deleteItem = async (id: string) => {
    const response = await itemApi.fetchDeleteItem(id);
    const { status } = response
    console.log(response)
    if (status.success) {
      messageApi.success('Delete item success')
      fetchListItem(1,10);
    } else {
      messageApi.error("Can't delete data.")
    }
  }

  const editItem = async (value: any) => {
    const response = await itemApi.fetchEditItem(selectedItem?.id as string, value);
    const { status} = response
    if (status.success) {
      messageApi.success('Edit item success')
      form.resetFields()
      setSelectedItem(null)
      setIsOpenModal(false)
      fetchListItem(1,10);
      
    } else {
      messageApi.error("Can't edit data.")
    }
  }

  // useEffect(() => {
  //   fetchListItem()
  // }, [pagination.page, pagination.size])

  // useEffect(() => {
  //   fetchListItem()
  // }, [])

  const onFinish = (value: any) => {
    if (!selectedItem) {
      addItem(value)
    } else {
      editItem(value)
    }
  }

  return (
    <div className='w-[100%] px-4 max-w-[1200px] mx-auto mt-[20px]'>
      {contextHolder}
      <div className='flex justify-end'>
        <Button type='primary' onClick={() => { setIsOpenModal(true) }}>Add item</Button>
      </div>
      <div className='mt-[20px]'>
        <Table
          dataSource={data}
          columns={columns}
          pagination={pagination}
          rowKey='id'
          onChange={handleTableChange}
        />
        <Modal
          title= {!selectedItem ? "Add item" : "Edit item"}
          visible={isOpenModal}
          onCancel={() => { setIsOpenModal(false) }}
          maskClosable={false}
          footer={<div>
            <Button onClick={() => setIsOpenModal(false)} className='mr-[20px]'>Cancel</Button>
            <Button type="primary" onClick={() => { form.submit() }}>
              {!selectedItem ? "Add" : "Edit"}
            </Button>
          </div>}
          width={"60%"}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please input the name!' },
                    { pattern: NAME_REGEX, message: 'Name can only contain letters and numbers!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[
                    { required: true, message: 'Please input the type!' },
                    { pattern: NAME_REGEX, message: 'Type can only contain letters and numbers!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: 'Please input the category!' },
                    { pattern: NAME_REGEX, message: 'Category can only contain letters and numbers!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: 'Please input the price!' },
                    { type: 'number', min: 0, message: 'Price must be a positive number!' },
                  ]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Stock"
                  name="stock"
                  rules={[
                    { required: true, message: 'Please input the stock!' },
                    { type: 'number', min: 0, message: 'Stock must be a positive number!' },
                  ]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input the description!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Image URL"
                  name="imageUrl"
                  rules={[
                    { required: true, message: 'Please input the image URL!' },
                    { pattern: URL_REGEX, message: 'Image URL must be a valid URL!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default App
