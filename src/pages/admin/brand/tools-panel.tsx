import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Modal, Form, Input as AntdInput } from "antd"; 
import { createBrand } from "@/lib/api/brand-api";
import useBrandStore from "@/stores/use-brand-store";

const ToolsPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [form] = Form.useForm(); 
  const fetchBrands = useBrandStore((state) => state.fetchBrands);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); 
  };

  const handleSubmit = async (values: { name: string; description: string }) => {
    const result = await createBrand(values);
    if (result.error === null) {
      setIsModalOpen(false); 
      form.resetFields(); 
      await fetchBrands();
    }
  };

  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input placeholder="Nhập để tìm kiếm" />
        <Button>
          <Search />
        </Button>
      </div>
      <div className="col-span-3"></div>
      <div className="col-span-3"></div>
      <div className="col-span-2 flex">
        <Button className="w-full flex gap-3 items-center" onClick={showModal}>
          <Plus />
          Tạo mới
        </Button>
      </div>

      <Modal
        title="Tạo mới thương hiệu" 
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} 
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name: "", description: "" }}
        >
          <Form.Item
            label="Tên thương hiệu" 
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu!" }]} 
          >
            <AntdInput placeholder="Nhập tên thương hiệu" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]} 
          >
            <AntdInput placeholder="Nhập mô tả" />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-3 justify-end">
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Tạo
              </Button> 
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ToolsPanel;