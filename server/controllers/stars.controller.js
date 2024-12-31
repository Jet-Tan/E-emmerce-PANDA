import CategoryModel from "../models/category.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export const getStarsTotal = async (request, response) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalCategories = await CategoryModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();

    response.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getStarsChart = async (request, response) => {
  try {
    const { type = "daily" } = request.query; // 'daily' hoặc 'monthly'

    // Quy định nhóm theo ngày hoặc tháng
    const dateGroup =
      type === "daily"
        ? { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        : { $dateToString: { format: "%Y-%m", date: "$createdAt" } };

    // Thống kê người dùng theo ngày hoặc tháng
    const userStats = await UserModel.aggregate([
      { $group: { _id: dateGroup, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Thống kê đơn hàng theo ngày hoặc tháng
    const orderStats = await OrderModel.aggregate([
      {
        $group: {
          _id: dateGroup,
          count: { $sum: 1 },
          revenue: { $sum: "$totalAmount" }, // Kiểm tra trường totalAmount có tồn tại không
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Trả về kết quả
    response.json({
      success: true,
      data: {
        userStats,
        orderStats,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
