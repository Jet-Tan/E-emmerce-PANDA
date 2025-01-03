import React, { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import UploadUserModel from "../components/UploadUserModel";
import EditUser from "../components/EditUser";

const UserAdmin = () => {
  const [userData, setUserData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of users per page

  const fetchUserData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getUserAll,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setUserData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteUser,
        data: { _id: userId },
      });
      const { data: responseData } = response;
      if (response.data.success) {
        toast.success(responseData.message);
        setUserData((prevData) =>
          prevData.filter((user) => user._id !== userId)
        );
      }
    } catch (e) {
      AxiosToastError(e);
    }
  };

  const openAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(userData.length / itemsPerPage)) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Slice the data to display only the users for the current page
  const displayedData = userData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User</h1>
        <button
          onClick={openAddUserModal}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add User
        </button>
      </div>
      <div className="overflow-auto w-full max-w-[95vw] p-5">
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
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((user, index) => (
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
                    {user.role || "USER"}
                  </td>
                  <td className="flex border border-gray-300 px-4 py-2 justify-center gap-2 md:gap-4 items-center flex-wrap">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 bg-green-100 rounded-full hover:bg-green-200 hover:text-green-600"
                      aria-label="Edit"
                    >
                      <HiPencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 bg-red-100 rounded-full text-red-500 hover:bg-red-200"
                      aria-label="Delete"
                    >
                      <MdDelete size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render AddUserModal */}
      {isAddUserModalOpen && (
        <UploadUserModel
          close={closeAddUserModal}
          fetchUserData={fetchUserData}
        />
      )}

      {/* Render EditUser Modal */}
      {isEditModalOpen && selectedUser && (
        <EditUser
          close={closeEditModal}
          userData={selectedUser}
          fetchUserData={fetchUserData}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(userData.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(userData.length / itemsPerPage)}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default UserAdmin;
