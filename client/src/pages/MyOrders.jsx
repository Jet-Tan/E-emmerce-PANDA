import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  console.log("order Items", orders);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 font-semibold text-gray-800">
        <h1 className="text-2xl">My Orders</h1>
      </div>

      {/* Khi không có dữ liệu */}
      {!orders.length && (
        <div className="flex justify-center items-center h-64">
          <NoData />
        </div>
      )}

      {/* Hiển thị danh sách đơn hàng */}
      <div className="p-4 space-y-4">
        {orders.map((order, index) => (
          <div
            key={order._id + index + "order"}
            className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
          >
            {/* Hình ảnh sản phẩm */}
            <img
              src={order.product_details.image[0]}
              alt={order.product_details.name}
              className="w-16 h-16 object-cover rounded"
            />

            {/* Thông tin đơn hàng */}
            <div className="flex-1">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">Order No:</span>{" "}
                {order?.orderId}
              </p>
              <p className="text-lg font-medium mt-1">
                {order.product_details.name}
              </p>
            </div>

            {/* Tổng quan giá tiền (nếu có thêm) */}
            <div className="text-right">
              <p className="text-gray-600 text-sm">Total Price</p>
              <p className="text-green-600 font-semibold text-lg">
                ${order?.totalAmt || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
