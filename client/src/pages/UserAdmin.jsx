import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const UserAdmin = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getUserAll,
      });
      const { data: responseData } = response;

      console.log("product page ", responseData);
      if (responseData.success) {
        setUserData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // Thực hiện logic sửa (ví dụ: mở modal để chỉnh sửa thông tin người dùng)
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
    // Thực hiện logic xóa (ví dụ: gọi API để xóa người dùng theo `userId`)
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Address
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Verify Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user, index) => (
                <tr key={user.email || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.address_details?.length > 0
                      ? user.address_details.join(", ")
                      : "No address"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.status || "Inactive"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.verify_email ? (
                      <span className="text-green-600 font-semibold">TRUE</span>
                    ) : (
                      <span className="text-red-600 font-semibold">FALSE</span>
                    )}
                  </td>
                  <td className="flex border border-gray-300 px-4 py-2 justify-center gap-2 md:gap-4 items-center flex-wrap">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 bg-green-100 rounded-full hover:bg-green-200 hover:text-green-600 transition-colors duration-200 ease-in-out"
                      aria-label="Edit"
                    >
                      <HiPencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 bg-red-100 rounded-full text-red-500 hover:bg-red-200 hover:text-red-600 transition-colors duration-200 ease-in-out"
                      aria-label="Delete"
                    >
                      <MdDelete size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdmin;
