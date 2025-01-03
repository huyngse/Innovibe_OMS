import Header from "@/components/header";

const OrderDetailPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Danh sách đơn hàng" href="/order" currentPage="Chi tiết đơn hàng" />
      <div className="p-5 flex-1 overflow-auto">
      </div>
    </div>
  );
};

export default OrderDetailPage;
