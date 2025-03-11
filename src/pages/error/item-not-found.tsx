const ItemNotFound = ({
  title = "Product Not Found",
  description = "We're sorry, but the product you're looking for does not exist.",
  returnUrl = "/",
}: {
  title?: string;
  description?: string;
  returnUrl?: string;
}) => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">{title}</h1>
          <p className="mt-4 text-lg text-gray-700">{description}</p>
          <a
            href={returnUrl}
            className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Quay về
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemNotFound;
