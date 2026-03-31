import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import Users from "../components_jsx/Users"
import ItemsContext from "../context/ItemsContext";
import {
  addUser,
  deleteUser,
  updateUser,
  getUsers,
} from "../services/userService";

export default function User() {
  const [data, setData] = useState([]);

  const imgHeading = "Welcome to Study Hub";
  const imgSpam =
    "An Admin can Get Users,Add User, Update User,Delete User";
  const regulation = false;


  const title = "User";

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setData(res.data.data);
    };
    fetchUsers();
  }, []);

  const addData = async (user) => {
    const res = await addUser(user);
    setData((prev) => [...prev, res.data.data]);
  };

  const deleteData = async (id) => {
    const res = await deleteUser(id);
    setData((prev) =>
      prev.filter((item) => item.id !== res.data.data.id)
    );
  };

  const updateData = async (id,user) => {
    const res = await updateUser(id,user);
    setData((prev) =>
      prev.map((item) =>
        item.id === res.data.data.id ? res.data.data : item
      )
    );
  };

  const description = (name) => {
    return (
      <div className="text-sm text-gray-600 mt-2">
        {`Administrative panel to manage users of the ${name} batch. Allows creation, modification, and deletion of user accounts.`}
      </div>
    );
  };

  return (
    <ItemsContext.Provider
      value={{
        addData,
        deleteData,
        updateData,
        description,
        title,
        regulation,
        data,
        imgHeading,
        imgSpam,
      
      }}
    >
      <Body />
      <Users />
    </ItemsContext.Provider>
  );
}
