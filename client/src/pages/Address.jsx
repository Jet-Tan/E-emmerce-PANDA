import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id,
        },
      });
      if (response.data.success) {
        toast.success("Address Removed");
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Header */}
      <div className="bg-white shadow-md px-4 py-3 flex justify-between items-center rounded-lg">
        <h2 className="text-lg font-bold text-gray-700">Address Book</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          + Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="mt-6 space-y-4">
        {addressList.map((address, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition ${
              !address.status && "hidden"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-800">
                  {address.address_line}
                </p>
                <p className="text-gray-600">
                  {address.city}, {address.state}
                </p>
                <p className="text-gray-600">
                  {address.country} - {address.pincode}
                </p>
                <p className="text-gray-600">Mobile: {address.mobile}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-600 hover:text-white transition duration-200"
                >
                  <MdEdit size={18} />
                </button>
                <button
                  onClick={() => handleDisableAddress(address._id)}
                  className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-200"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Address Placeholder */}
        <div
          onClick={() => setOpenAddress(true)}
          className="flex justify-center items-center h-16 bg-blue-100 border-2 border-dashed border-blue-300 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-200 transition duration-200"
        >
          + Add Address
        </div>
      </div>

      {/* Modals */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default Address;
