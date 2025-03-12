import { useNavigate } from "react-router-dom";

const OrderNotfound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-20 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Không tìm thấy đơn hàng
        </h1>
        <p className="mt-4 text-gray-600">
          Rất tiếc, chúng tôi không tìm thấy đơn hàng bạn đang tìm kiếm.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            navigate(-1);
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default OrderNotfound;
