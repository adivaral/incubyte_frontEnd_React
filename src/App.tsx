// src/App.jsx or src/App.tsx
import React, { useState } from 'react';
import { Button, Input, Form, message, notification } from 'antd';
import { add } from './utils/utils'; // Import your add function
import './App.css'
function App() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async (values:any) => {
    try {
      const result = add(values.numbers.replace("\\n", "\n"));
      // message.success(`Sum is ${result}`);
      api.success({
        message:<span className='status-of-sum'>{`Sum is ${result}`}</span>

      });
    } catch (err:any) {
      // message.error(`Error: ${err.message}`);
      api.error({
        message:<span className='status-of-sum'>{`Error: ${err.message}`}</span>
      });

    }
  };

  return (
    <div className='main-wrapper' style={{ padding: '20px' }}>
      {contextHolder}
      <h1>String Calculator</h1>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="numbers"
          rules={[{ required: true, message: 'Please input numbers!' }]}
        >
          <Input placeholder="Enter numbers" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
