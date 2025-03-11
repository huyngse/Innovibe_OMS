const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <p className="mt-4 text-xl">Truy cập trái phép</p>
        <p className="mt-2 text-gray-600">Bạn không có quyền xem trang này.</p>
        <a
          href="/log-in"
          className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Quay lại Đăng nhập
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
