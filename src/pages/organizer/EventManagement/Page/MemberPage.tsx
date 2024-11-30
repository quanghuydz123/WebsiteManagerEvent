import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaUserPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const MemberPage = ({ variants }: { variants: any }) => {
  // Fake data for members
  const [membersData, setMembersData] = useState<any[]>([
    { id: 1, name: "Nguyễn Văn A", role: "Admin" },
    { id: 2, name: "Trần Thị B", role: "Editor" },
    { id: 3, name: "Lê Thị C", role: "Viewer" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Viewer");
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track which member is being edited
  const [editName, setEditName] = useState<string>("");
  const [editRole, setEditRole] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null); // Member to be deleted
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false); // Add member modal visibility

  // Filter members based on search query
  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new member
  const addMember = () => {
    if (newMemberName) {
      const newMember = {
        id: membersData.length + 1,
        name: newMemberName,
        role: newMemberRole,
      };
      setMembersData([...membersData, newMember]);
      setNewMemberName("");
      setNewMemberRole("Viewer"); // Reset role to default
      setIsAddMemberModalOpen(false); // Close modal after adding member
    }
  };

  // Start editing a member
  const startEditing = (member: any) => {
    setIsEditing(member.id);
    setEditName(member.name);
    setEditRole(member.role);
  };

  // Save edited member
  const saveEdit = () => {
    const updatedMembers = membersData.map((member) =>
      member.id === isEditing ? { ...member, name: editName, role: editRole } : member
    );
    setMembersData(updatedMembers);
    setIsEditing(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(null);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: number) => {
    setMemberToDelete(id);
    setIsModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setMemberToDelete(null);
  };

  // Confirm delete
  const deleteMember = () => {
    setMembersData(membersData.filter((member) => member.id !== memberToDelete));
    closeDeleteModal();
  };

  return (
    <div className="min-h-screen p-6 text-[19px]">
      <h1 className="text-3xl font-bold mb-6 text-white">Danh sách thành viên</h1>
      {/* Top Section - Search Bar and Add Member Button */}
      <div className=" p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center mt-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-2 w-2/3">
          <FaSearch className="text-white" />
          <input
            type="text"
            placeholder="Tìm kiếm thành viên"
            className="p-2 rounded-md border-gray-800 text-black placeholder-gray-800 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add Member Button */}
        <div className="ml-4">
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="bg-green-500 p-2 rounded-md text-white flex items-center space-x-3 text-xl"
          >
            <FaUserPlus className="mr-2" /> Thêm thành viên
          </button>
        </div>
      </div>

      {/* Bottom Section - Member Table */}
      <motion.div variants={variants} className="p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Danh sách thành viên</h1>

        {filteredMembers.length === 0 ? (
          <p className="text-center text-gray-500 text-[19px]">Không có thành viên nào</p>
        ) : (
          <table className="min-w-full text-gray-700 text-[19px]">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Thành viên</th>
                <th className="px-4 py-2 text-left">Vai trò</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b border-slate-200 text-[19px]">
                  <td className="px-4 py-3">
                    {isEditing === member.id ? (
                      <input
                        type="text"
                        className="p-2 border-gray-800 rounded-md"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing === member.id ? (
                      <input
                        type="text"
                        className="p-2 border-gray-800 rounded-md"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                      />
                    ) : (
                      member.role
                    )}
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    {isEditing === member.id ? (
                      <>
                        <button
                          className="text-green-500"
                          onClick={saveEdit}
                        >
                          Lưu
                        </button>
                        <button
                          className="text-gray-500"
                          onClick={cancelEdit}
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => startEditing(member)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteModal(member.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Bạn có chắc chắn muốn xóa thành viên này?</h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeDeleteModal}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={deleteMember}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Thêm thành viên mới</h2>
            <div className="mb-4 border-2 border-gray-600 focus:border-gray-600">
              <input
                type="text"
                className="p-2 border-gray-900 rounded-md w-full text-black "
                placeholder="Tên thành viên"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <select
                className="p-2 border-gray-800 rounded-md w-full text-black"
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsAddMemberModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={addMember}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
