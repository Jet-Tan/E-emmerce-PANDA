import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });

      if (response.data.success) {
        if (close) close();

        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) close();
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          {user.role === "ADMIN" && (
            <span className="text-medium text-red-600"> (Admin)</span>
          )}
        </span>
        <Link
          to="/dashboard/profile"
          onClick={handleClose}
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <>
            <Link
              to="/dashboard/category"
              onClick={handleClose}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Category
            </Link>
            <Link
              to="/dashboard/subcategory"
              onClick={handleClose}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Sub Category
            </Link>
            <Link
              to="/dashboard/upload-product"
              onClick={handleClose}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Upload Product
            </Link>
            <Link
              to="/dashboard/product"
              onClick={handleClose}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Product
            </Link>
          </>
        )}
        {isAdmin(user.role) && (
          <>
            <Link
              to="/dashboard/user"
              onClick={handleClose}
              className="px-2 hover:bg-orange-200 py-1"
            >
              User
            </Link>
          </>
        )}
        <Link
          to="/dashboard/myorders"
          onClick={handleClose}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          to="/dashboard/address"
          onClick={handleClose}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
