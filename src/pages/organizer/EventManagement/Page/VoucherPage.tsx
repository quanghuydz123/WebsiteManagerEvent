import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaTicketAlt } from "react-icons/fa";

const VoucherPage = ({ variants }: { variants: any }) => {
  // Fake data for vouchers
  const [vouchersData, setVouchersData] = useState<any[]>([
    { id: 1, programName: "Giảm giá mùa hè", voucherCode: "SUMMER20", discount: "20%", totalTickets: 100, usedTickets: 30, validFrom: "2024-06-01", validTo: "2024-06-30", status: "Active" },
    { id: 2, programName: "Giảm giá Black Friday", voucherCode: "BF50", discount: "50%", totalTickets: 50, usedTickets: 10, validFrom: "2024-11-01", validTo: "2024-11-30", status: "Inactive" },
    { id: 3, programName: "Giảm giá Tết", voucherCode: "TET25", discount: "25%", totalTickets: 200, usedTickets: 50, validFrom: "2024-01-01", validTo: "2024-01-31", status: "Active" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newVoucherProgramName, setNewVoucherProgramName] = useState("");
  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newTotalTickets, setNewTotalTickets] = useState(0);
  const [newUsedTickets, setNewUsedTickets] = useState(0);
  const [newValidFrom, setNewValidFrom] = useState("");
  const [newValidTo, setNewValidTo] = useState("");
  const [newStatus, setNewStatus] = useState("Active");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editVoucherData, setEditVoucherData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility for delete
  const [voucherToDelete, setVoucherToDelete] = useState<number | null>(null); // Voucher to delete
  const [isAddVoucherModalOpen, setIsAddVoucherModalOpen] = useState(false); // Add voucher modal visibility

  // Filter vouchers based on search query
  const filteredVouchers = vouchersData.filter((voucher) =>
    voucher.programName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new voucher
  const addVoucher = () => {
    if (newVoucherProgramName && newVoucherCode) {
      const newVoucher = {
        id: vouchersData.length + 1,
        programName: newVoucherProgramName,
        voucherCode: newVoucherCode,
        discount: newDiscount,
        totalTickets: newTotalTickets,
        usedTickets: newUsedTickets,
        validFrom: newValidFrom,
        validTo: newValidTo,
        status: newStatus,
      };
      setVouchersData([...vouchersData, newVoucher]);
      setIsAddVoucherModalOpen(false); // Close modal after adding voucher
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setNewVoucherProgramName("");
    setNewVoucherCode("");
    setNewDiscount("");
    setNewTotalTickets(0);
    setNewUsedTickets(0);
    setNewValidFrom("");
    setNewValidTo("");
    setNewStatus("Active");
  };

  // Start editing a voucher
  const startEditing = (voucher: any) => {
    setIsEditing(voucher.id);
    setEditVoucherData({ ...voucher });
  };

  // Save edited voucher
  const saveEdit = () => {
    const updatedVouchers = vouchersData.map((voucher) =>
      voucher.id === isEditing ? { ...voucher, ...editVoucherData } : voucher
    );
    setVouchersData(updatedVouchers);
    setIsEditing(null);
    setEditVoucherData(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(null);
    setEditVoucherData(null);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: number) => {
    setVoucherToDelete(id);
    setIsModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setVoucherToDelete(null);
  };

  // Confirm delete
  const deleteVoucher = () => {
    setVouchersData(vouchersData.filter((voucher) => voucher.id !== voucherToDelete));
    closeDeleteModal();
  };

  return (
    <div className="min-h-screen p-6 text-[19px] ">
      <h1 className="text-3xl font-bold mb-6 text-white">Danh sách voucher</h1>
      {/* Top Section - Search Bar and Add Voucher Button */}
      <div className="p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center mt-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-2 w-2/3">
          <FaSearch className="text-white" />
          <input
            type="text"
            placeholder="Tìm kiếm voucher"
            className="p-2 rounded-md border-gray-800 text-black placeholder-gray-800 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add Voucher Button */}
        <div>
          <button
            onClick={() => setIsAddVoucherModalOpen(true)}
            className="bg-green-500 p-2 rounded-md text-white flex items-center space-x-5 text-xl"
          >
            <FaTicketAlt className="mr-2" /> Thêm voucher
          </button>
        </div>
      </div>

      {/* Voucher Table */}
      <motion.div variants={variants} className="p-6 bg-white rounded-xl shadow-lg overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Danh sách voucher</h1>

        {filteredVouchers.length === 0 ? (
          <p className="text-center text-gray-500 text-[19px]">Không có voucher nào</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="min-w-full text-gray-700 text-[19px]">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Chương trình khuyến mãi</th>
                <th className="px-4 py-2 text-left">Mã voucher</th>
                <th className="px-4 py-2 text-left">Mức giảm</th>
                <th className="px-4 py-2 text-left">Số vé</th>
                <th className="px-4 py-2 text-left">Thời gian áp dụng</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.id} className="border-b border-slate-200 text-[19px]">
                  <td className="px-4 py-3">
                    {isEditing === voucher.id ? (
                      <input
                        type="text"
                        className="p-2 border-gray-800 rounded-md"
                        value={editVoucherData?.programName}
                        onChange={(e) => setEditVoucherData({ ...editVoucherData, programName: e.target.value })}
                      />
                    ) : (
                      voucher.programName
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing === voucher.id ? (
                      <input
                        type="text"
                        className="p-2 border-gray-800 rounded-md"
                        value={editVoucherData?.voucherCode}
                        onChange={(e) => setEditVoucherData({ ...editVoucherData, voucherCode: e.target.value })}
                      />
                    ) : (
                      voucher.voucherCode
                    )}
                  </td>
                  <td className="px-4 py-3">{voucher.discount}</td>
                  <td className="px-4 py-3">{voucher.totalTickets} / {voucher.usedTickets}</td>
                  <td className="px-4 py-3">
                    {voucher.validFrom} - {voucher.validTo}
                  </td>
                  <td className="px-4 py-3">{voucher.status}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    {isEditing === voucher.id ? (
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
                          onClick={() => startEditing(voucher)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteModal(voucher.id)}
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
          </div>
        )}
        
      </motion.div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Bạn có chắc chắn muốn xóa voucher này?</h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeDeleteModal}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={deleteVoucher}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Voucher Modal */}
        {isAddVoucherModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-1/3">
              <h2 className="text-xl font-semibold mb-4 text-black">Thêm voucher mới</h2>

              {/* Tên chương trình khuyến mãi */}
              <div className="mb-4">
                <label htmlFor="programName" className="block text-black">Tên chương trình khuyến mãi</label>
                <input
                  id="programName"
                  type="text"
                  className="p-2 border-gray-900 rounded-md w-full"
                  placeholder="Tên chương trình khuyến mãi"
                  value={newVoucherProgramName}
                  onChange={(e) => setNewVoucherProgramName(e.target.value)}
                />
              </div>

              {/* Mã voucher */}
              <div className="mb-4">
                <label htmlFor="voucherCode" className="block text-black">Mã voucher</label>
                <input
                  id="voucherCode"
                  type="text"
                  className="p-2 border-gray-900 rounded-md w-full"
                  placeholder="Mã voucher"
                  value={newVoucherCode}
                  onChange={(e) => setNewVoucherCode(e.target.value)}
                />
              </div>

              {/* Mức giảm */}
              <div className="mb-4">
                <label htmlFor="discount" className="block text-black">Mức giảm</label>
                <input
                  id="discount"
                  type="text"
                  className="p-2 border-gray-900 rounded-md w-full"
                  placeholder="Mức giảm"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                />
              </div>

              {/* Tổng số vé và Số vé đã dùng */}
              <div className="mb-4 flex space-x-4">
                {/* Tổng số vé */}
                <div className="flex-1">
                  <label htmlFor="totalTickets" className="block text-black">Tổng số vé</label>
                  <input
                    id="totalTickets"
                    type="number"
                    className="p-2 border-gray-900 rounded-md w-full text-black"
                    placeholder="Tổng số vé"
                    value={newTotalTickets}
                    onChange={(e) => setNewTotalTickets(Number(e.target.value))}
                  />
                </div>

                {/* Số vé đã dùng */}
                <div className="flex-1">
                  <label htmlFor="usedTickets" className="block text-black">Số vé đã dùng</label>
                  <input
                    id="usedTickets"
                    type="number"
                    className="p-2 border-gray-900 rounded-md w-full text-black"
                    placeholder="Số vé đã dùng"
                    value={newUsedTickets}
                    onChange={(e) => setNewUsedTickets(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Ngày bắt đầu và Ngày kết thúc */}
              <div className="mb-4 flex space-x-4">
                {/* Ngày bắt đầu */}
                <div className="flex-1">
                  <label htmlFor="validFrom" className="block text-black">Ngày bắt đầu</label>
                  <input
                    id="validFrom"
                    type="date"
                    className="p-2 border-gray-900 rounded-md w-full text-black"
                    value={newValidFrom}
                    onChange={(e) => setNewValidFrom(e.target.value)}
                  />
                </div>

                {/* Ngày kết thúc */}
                <div className="flex-1">
                  <label htmlFor="validTo" className="block text-black">Ngày kết thúc</label>
                  <input
                    id="validTo"
                    type="date"
                    className="p-2 border-gray-900 rounded-md w-full text-black"
                    value={newValidTo}
                    onChange={(e) => setNewValidTo(e.target.value)}
                  />
                </div>
              </div>

              {/* Trạng thái */}
              <div className="mb-4">
                <label htmlFor="status" className="block text-black">Trạng thái</label>
                <select
                  id="status"
                  className="p-2 border-gray-800 rounded-md w-full text-black"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Active">Hoạt động</option>
                  <option value="Inactive">Không hoạt động</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsAddVoucherModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={addVoucher}
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

export default VoucherPage;
