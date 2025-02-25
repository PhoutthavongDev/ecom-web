import React, { useState, useEffect } from "react";
import {
  getListAllUser,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [allUser, setAllUser] = useState([]);

  const hdlGetAllUser = async (token) => {
    try {
      const res = await getListAllUser(token);
      setAllUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(allUser);

  useEffect(() => {
    hdlGetAllUser(token);
  }, []);

  const hdlChangeUserStatus = (userId, useStatus) => {
    const value = {
      id: userId,
      enable: !useStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        toast.success(res.data);
        hdlGetAllUser(token);
      })
      .catch((err) => console.log(err));
  };

  const hdlChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        toast.success(res.data);
        hdlGetAllUser(token);
      })
      .catch((err) => console.log(err));
  };

  const userStatus = (e) => {
    switch (e) {
      case true:
        return "Active";
      case false:
        return "Not Active";
    }
  };

  return (
    <div className="bg-white p-4 container mx-auto shadow-md">
      {/* Header */}
      <div>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr className="border">
              <th>No.</th>
              <th>Email</th>
              <th>Role</th>
              <th>UserStatus</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {allUser?.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.email}</td>

                <td>
                  <select 
                  onChange={(e)=>hdlChangeUserRole(item.id, e.target.value)}
                  value={item.role}>
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>

                <td>{`${userStatus(item.enable)}`}</td>
                <td>
                  <button
                    className="bg-yellow-300 p-1 rounded-md shadow-md"
                    onClick={() => hdlChangeUserStatus(item.id, item.enable)}
                  >
                    {item.enable ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUser;
