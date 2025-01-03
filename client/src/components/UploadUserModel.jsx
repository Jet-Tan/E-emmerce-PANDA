import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const UploadUserModel = ({ close, fetchUserData }) => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createUser,
        data: userData,
      });

      const { data } = response;
      if (data.success) {
        toast.success(data.message);
        if (close) {
          close();
        }
        if (fetchUserData) {
          fetchUserData(); // Làm mới danh sách người dùng
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Create User</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-3" onSubmit={handleSubmitUser}>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="p-2 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button
            type="submit"
            className={`px-4 py-2 border
                            ${
                              userData.email &&
                              userData.name &&
                              userData.password &&
                              userData.role
                                ? "bg-primary-200 hover:bg-primary-100"
                                : "bg-gray-200"
                            } 
                            font-semibold`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadUserModel;
