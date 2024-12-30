import React, { useState, useEffect } from "react";
import NoData from "../components/NoData";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const OrderAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getOrderAll,
      });
      console.log("check", response);
      const { data: responseData } = response;

      if (responseData.success && responseData.data) {
        setOrders(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 font-semibold text-gray-800">
        <h1 className="text-2xl">Orders</h1>
      </div>

      {/* Hiển thị loader khi đang tải */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      )}

      {/* Khi không có dữ liệu */}
      {!loading && !orders.length && (
        <div className="flex justify-center items-center h-64">
          <NoData />
        </div>
      )}

      {/* Hiển thị bảng danh sách đơn hàng */}
      {!loading && orders.length > 0 && (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-700">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Order No</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id + index + "order"}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{order.userId?.name || "N/A"}</td>
                    <td className="py-3 px-4">
                      {order.userId?.email || "N/A"}
                    </td>
                    <td className="py-3 px-4">{order.orderId}</td>
                    <td className="py-3 px-4">{order.product_details.name}</td>
                    <td className="py-3 px-4">
                      <img
                        src={order.product_details.image[0]}
                        alt={order.product_details.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        order.payment_status === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.payment_status === "paid" ? "Paid" : "Pending"}
                    </td>
                    <td className="py-3 px-4 text-green-600 font-semibold">
                      ${order.totalAmt || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hiển thị dạng danh sách trên thiết bị nhỏ */}
          <div className="sm:hidden space-y-4">
            {orders.map((order, index) => (
              <div
                key={order._id + index + "order-mobile"}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <p className="text-sm text-gray-600">
                  <strong>#</strong> {index + 1}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Order No:</strong> {order.orderId}
                </p>
                <p className="text-lg font-medium text-gray-900">
                  {order.product_details.name}
                </p>
                <div className="flex gap-2 items-center">
                  <img
                    src={order.product_details.image[0]}
                    alt={order.product_details.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span
                    className={`text-sm font-semibold ${
                      order.payment_status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.payment_status === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
                <p className="text-green-600 font-semibold">
                  ${order.totalAmt || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAdmin;
