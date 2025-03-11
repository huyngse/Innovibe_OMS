const NotFoundPage = ({ url = "/" }: { url?: string }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl">Không tìm thấy trang.</p>
        <p className="mt-2 text-gray-600">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <a
          href={url}
          className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Quay lại Trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
