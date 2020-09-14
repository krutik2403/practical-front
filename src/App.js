import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import { Transfer, Form, Input, Button, PageHeader } from "antd";
import { Layout } from "./components";
import axios from "axios";
import { config } from "./common";
import { toast, ToastContainer } from "react-toastify";
import { toastFormErrors } from "./utils/helpers";

const App = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getItems() {
      await axios.get(`${config.apiUrl}/items`).then((res) => {
        setItems(res.data.data);
      });
    }
    getItems();
  }, [loading]);

  const addItem = (values) => {
    axios
      .post(`${config.apiUrl}/items`, values)
      .then((res) => {
        setLoading(!loading);
        form.resetFields();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toastFormErrors(error.response.data.errors);
      });
  };

  return (
    <Layout>
      <ToastContainer autoClose={3000} hideProgressBar={true} />
      <PageHeader title="Items Management Page" />
      <div className="items-container">
        <div className="mb-4">
          <Form
            form={form}
            layout="inline"
            onFinish={(values) => addItem(values)}
          >
            <Form.Item name="title">
              <Input type="text" name="title" placeholder="Enter Item Name" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Item
              </Button>
            </Form.Item>
          </Form>
        </div>
        {items !== null && (
          <Transfer
            showSelectAll={false}
            dataSource={items.all_items}
            titles={["Source", "Selected"]}
            targetKeys={items.selected}
            selectedKeys={selected}
            onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
              if (
                sourceSelectedKeys.length > 1 &&
                targetSelectedKeys.length > 1
              ) {
                setSelected([
                  sourceSelectedKeys[sourceSelectedKeys.length - 1],
                  targetSelectedKeys[targetSelectedKeys.length - 1],
                ]);
              } else if (sourceSelectedKeys.length > 1) {
                setSelected([
                  sourceSelectedKeys[sourceSelectedKeys.length - 1],
                  ...targetSelectedKeys,
                ]);
              } else if (targetSelectedKeys.length > 1) {
                setSelected([
                  ...sourceSelectedKeys,
                  targetSelectedKeys[targetSelectedKeys.length - 1],
                ]);
              } else {
                setSelected([...sourceSelectedKeys, ...targetSelectedKeys]);
              }
            }}
            onChange={(targetKeys, direction, moveKeys) => {
              if (direction === "right") {
                axios
                  .post(`${config.apiUrl}/items/${moveKeys[0]}/selected`)
                  .then((res) => {
                    setLoading(!loading);
                    toast.success(res.data.message);
                  })
                  .catch((error) => {
                    toast.error(error.response.data.message);
                  });
              } else {
                axios
                  .post(`${config.apiUrl}/items/${moveKeys[0]}/deselected`)
                  .then((res) => {
                    setLoading(!loading);
                    toast.success(res.data.message);
                  })
                  .catch((error) => {
                    toast.error(error.response.data.message);
                  });
              }
            }}
            render={(item) => item.title}
            style={{ marginBottom: 16 }}
            listStyle={{
              width: 250,
              height: 300,
            }}
            showSearch
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
