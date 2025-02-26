import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";

const UserManagementPage = () => {
  // Fake data for users
  const [users, setUsers] = useState([
      { id: 1, avatar: "https://i.pravatar.cc/150?img=1", name: "Nguyễn Văn A", email: "nguyenvana@example.com", phone: "0987654321", status: "Active" },
      { id: 2, avatar: "https://i.pravatar.cc/150?img=2", name: "Trần Thị B", email: "tranthib@example.com", phone: "0971234567", status: "Inactive" },
      { id: 3, avatar: "https://i.pravatar.cc/150?img=3", name: "Lê Văn C", email: "levanc@example.com", phone: "0965432178", status: "Active" },
      
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", status: "Active" });
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new user
  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1, avatar: "https://i.pravatar.cc/150?img=" + (users.length + 1) }]);
      setIsAddUserModalOpen(false);
      setNewUser({ name: "", email: "", phone: "", status: "Active" });
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: number | SetStateAction<null>) => {
   // setUserToDelete(id);
    setIsModalOpen(true);
  };

  // Confirm delete
  const deleteUser = () => {
    setUsers(users.filter(user => user.id !== userToDelete));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 text-[19px]">
      <h1 className="text-3xl font-bold mb-6 text-white">Quản lý người dùng</h1>
      
      {/* Search Bar and Add User Button */}
      <div className="p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 w-2/3">
          <FaSearch className="text-white" />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng"
            className="p-2 rounded-md text-black w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-green-500 p-2 rounded-md text-white flex items-center text-xl"
        >
          <FaUserPlus className="mr-2" /> Thêm người dùng
        </button>
      </div>

      {/* User Table */}
      <motion.div  className="p-6 bg-white rounded-xl shadow-lg overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Danh sách người dùng</h1>
        <table className="min-w-full text-gray-700 text-[19px]">
          <thead>
            <tr>
              <div className="px-4 py-2">Avatar</div>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Số điện thoại</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-slate-200">
                <td className="px-4 py-3"><img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" /></td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button className="text-blue-500"><FaEdit /></button>
                  <button className="text-red-500" onClick={() => openDeleteModal(user.id)}><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Thêm người dùng</h2>
            <input type="text" placeholder="Tên" className="p-2 rounded-md w-full mb-2" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            <input type="email" placeholder="Email" className="p-2 rounded-md w-full mb-2" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <input type="text" placeholder="Số điện thoại" className="p-2 rounded-md w-full mb-2" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            <div className="flex justify-between">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setIsAddUserModalOpen(false)}>Hủy</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={addUser}>Thêm</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Bạn có chắc muốn xóa người dùng này?</h2>
            <div className="flex justify-between">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>Hủy</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={deleteUser}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
