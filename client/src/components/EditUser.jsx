import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";

const EditUser = ({ close, userData, fetchUserData }) => {
  const [userDetails, setUserDetails] = useState({
    _id: userData._id,
    name: userData.name || "",
    email: userData.email || "",
    password: "",
    avatar: userData.avatar || "",
    mobile: userData.mobile || "",
    role: userData.role || "USER",
  });
  console.log(userDetails);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      const response = await uploadImage(file);
      const { data: ImageResponse } = response;

      setUserDetails((prev) => ({
        ...prev,
        avatar: ImageResponse.data.url,
      }));
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.updateUser,
        data: userDetails,
      });

      const { data } = response;

      if (data.success) {
        toast.success(data.message);
        if (close) close();
        if (fetchUserData) fetchUserData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Edit User</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-3" onSubmit={handleSubmitUser}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus:border-primary-200 rounded"
              required
            />
          </div>

          {/* Email và Password trên một dòng */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="p-3 bg-blue-50 border outline-none focus:border-primary-200 rounded"
                required
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Leave empty to keep current password"
                className="p-3 bg-blue-50 border outline-none focus:border-primary-200 rounded"
              />
            </div>
          </div>

          {/* Role và Mobile trên một dòng */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={userDetails.role}
                onChange={handleChange}
                className="p-3 bg-blue-50 border outline-none focus:border-primary-200 rounded"
                required
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={userDetails.mobile}
                onChange={handleChange}
                className="p-3 bg-blue-50 border outline-none focus:border-primary-200 rounded"
              />
            </div>
          </div>

          <div className="grid gap-1">
            <p>Avatar</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                {!userDetails.avatar ? (
                  <p className="text-sm text-neutral-400">No Image</p>
                ) : (
                  <img
                    alt="User avatar"
                    src={userDetails.avatar}
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadAvatar">
                <div className="px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer">
                  Upload Avatar
                </div>
                <input
                  type="file"
                  id="uploadAvatar"
                  className="hidden"
                  onChange={handleUploadAvatar}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`px-4 py-2 border font-semibold ${
              userDetails.name && userDetails.email && userDetails.role
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-200"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
