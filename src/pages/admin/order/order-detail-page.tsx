import Header from "@/components/header";
import Loader from "@/components/loader";
import OrderStatus from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { formatCurrencyVND } from "@/lib/currency";
import { formatDateTime } from "@/lib/datetime";
import OrderNotfound from "@/pages/error/order-not-found";
import useOrderStore from "@/stores/use-order-store";
import { HandCoins, MapPin } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const OrderDetailPage = () => {
  const orderStore = useOrderStore();
  const { orderId } = useParams();
  useEffect(() => {
    if (orderId) {
      orderStore.fetchOrder(parseInt(orderId));
    }
  }, []);

  if (orderId == null) {
    return <OrderNotfound />;
  }
  if (!orderStore.loading && orderStore.order == null) {
    return <OrderNotfound />;
  }
  const subtotal =
    orderStore.order?.orderItems.reduce(
      (accumlator, currentValue) =>
        accumlator + currentValue.price * currentValue.quantity,
      0
    ) ?? 0;
  const total = subtotal + 0;
  const copyToClipboard = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast("Đã sao chép!", {
          description: value,
        });
      })
      .catch((_) => {
        toast("Không thể sao chép!");
      });
  };
  if (orderStore.loading) return <Loader />;
  if (orderStore.order == undefined) return;
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Danh sách đơn hàng"
        href="/order"
        currentPage="Chi tiết đơn hàng"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="my-3 p-3 rounded bg-white drop-shadow">
          <h1 className="text-xl font-semibold text-center pb-3">
            Thông tin đơn hàng
          </h1>
          <hr />
          <OrderStatus status={orderStore.order.orderStatus} />
          <hr />
          <div className="p-3">
            <div className="flex justify-between text-lg font-semibold">
              <p>Mã đơn hàng:</p>
              <p>
                {orderStore.order.orderNumber}{" "}
                <button
                  className="ms-3 text-blue-500 bg-blue-50 px-3 rounded"
                  onClick={() => {
                    copyToClipboard(orderStore.order!.orderNumber);
                  }}
                >
                  Sao chép
                </button>
              </p>
            </div>
            <div className="flex justify-between text-gray-500">
              <p>Thời gian đặt hàng:</p>
              <p>{formatDateTime(new Date(orderStore.order.orderDate))}</p>
            </div>
            {/* <div className="flex justify-between text-gray-500">
            <p>Thời gian thanh toán:</p>
            {order.paymentDate ? (
              <p>{formatDateTime(new Date(order.paymentDate))}</p>
            ) : (
              <p>--:-- --/--/----</p>
            )}
          </div> */}
            {/* <div className="flex justify-between text-gray-500">
            <p>Thời gian giao hàng cho vận chuyển:</p>
            {order.shippingDate ? (
              <p>{formatDateTime(new Date(order.shippingDate))}</p>
            ) : (
              <p>--:-- --/--/----</p>
            )}
          </div> */}
            {/* <div className="flex justify-between text-gray-500">
            <p>Thời gian hoàn thành:</p>
            {order.deliveryDate ? (
              <p>{formatDateTime(new Date(order.deliveryDate))}</p>
            ) : (
              <p>--:-- --/--/----</p>
            )}
          </div> */}
          </div>
          <hr />
          <div className="flex gap-3 py-3">
            <MapPin className="mt-1" />
            <div className="flex-1">
              <div className="flex">
                <p className="flex-1 font-semibold text-lg">
                  Địa chỉ nhận hàng
                </p>
                <button
                  className="text-blue-500 bg-blue-50 px-3 rounded font-semibold"
                  onClick={() => {
                    copyToClipboard(
                      `${orderStore.order!.accountFullName}; ${
                        orderStore.order!.shippingAddress
                      }`
                    );
                  }}
                >
                  Sao chép
                </button>
              </div>
              <div className="text-gray-500">
                <p>{orderStore.order!.accountFullName}</p>
                {/* <p>{order.phone}</p> */}
                <p>{orderStore.order!.shippingAddress}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-3">
            {orderStore.order.orderItems.map((item, i: number) => {
              return (
                <div
                  key={i}
                  className="flex justify-between gap-3 p-3 border-y"
                >
                  <img
                    src={item.images[0].imageURL}
                    alt="product image"
                    width={75}
                    height={75}
                    className="object-cover"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${item.productId}`}>
                      <div>{item.name}</div>
                    </Link>
                    <div className="text-gray-500">
                      Phân loại: {item.category.name}
                    </div>
                    <div>Số lượng: {item.quantity}</div>
                    <p className="font-semibold">
                      {formatCurrencyVND(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="font-semibold p-3">
            <div className="flex justify-between text-gray-500">
              <p>Tổng tiền hàng:</p>
              <p>{formatCurrencyVND(subtotal)}</p>
            </div>
            <div className="flex justify-between  text-gray-500">
              <p>Phí vận chuyển:</p>
              {/* <p>{formatCurrencyVND(order.shippingFee)}</p> */}
              <p>Miễn phí</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Thành tiền:</p>
              <p className="text-orange-500">{formatCurrencyVND(total)}</p>
            </div>
          </div>
          <hr />
          <div className="flex gap-3 py-3">
            <HandCoins className="mt-1" />
            <div>
              <p className="text-lg font-semibold">Phương thức thanh toán</p>
              <p className="text-gray-500">Thanh toán online</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mb-3">
          <Button variant={"outline"}>Hủy đơn hàng</Button>
          {/* <Button>Mua lại</Button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
