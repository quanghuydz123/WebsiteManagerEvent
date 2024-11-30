import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaDollarSign, FaCheckCircle, FaSearch } from "react-icons/fa"; // Additional icons

const OrderPage = ({ variants }: { variants: any }) => {
  // Fake data for ticket types
  const [ticketData, setTicketData] = useState<any[]>([
    { type: "Vé hạng A", price: 300000, sold: 50, total: 100, locked: 0, sellRatio: 50 },
    { type: "Vé hạng B", price: 200000, sold: 40, total: 100, locked: 10, sellRatio: 40 },
    { type: "Vé hạng C", price: 100000, sold: 30, total: 100, locked: 5, sellRatio: 30 },
    { type: "Vé VIP", price: 500000, sold: 20, total: 50, locked: 2, sellRatio: 40 },
    { type: "Vé thường", price: 150000, sold: 60, total: 150, locked: 0, sellRatio: 40 },
  ]);

  const [orderData, setOrderData] = useState<any[]>([
    { orderId: "ORD123", ticketType: "Vé hạng A", total: 300000 },
    { orderId: "ORD124", ticketType: "Vé hạng B", total: 200000 },
  ]);

  const [ticketCustomerData, setTicketCustomerData] = useState<any[]>([
    { name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123456789", paymentMethod: "Cash", ticketType: "Vé hạng A", price: 300000, amount: 300000, paymentStatus: "Paid" },
    { name: "Trần Thị B", email: "b@gmail.com", phone: "0123456789", paymentMethod: "Credit Card", ticketType: "Vé hạng B", price: 200000, amount: 200000, paymentStatus: "Pending" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showOrders, setShowOrders] = useState(true); // Track which table to show

  // Function to get progress bar color based on sell ratio
  const getProgressBarColor = (ratio: number) => {
    if (ratio >= 75) return "bg-green-500";  // High sell ratio: Green
    if (ratio >= 50) return "bg-yellow-500"; // Medium sell ratio: Yellow
    return "bg-red-500"; // Low sell ratio: Red
  };

  // Filter ticket customer data based on search query
  const filteredCustomerData = ticketCustomerData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-custom-gradient text-black p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold mb-6 text-white">Danh sách đơn hàng</h1>
    <motion.div variants={variants} className="flex flex-col p-5 bg-white rounded-xl mt-12">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Bảng Đơn Hàng Và Vé</h1>

     {/* Performance and Date Selection */}
    <div className="mb-6">
    <div className="flex space-x-4 mb-4">
        {/* Label for the dropdown */}
        <h3 className="text-lg font-semibold text-[20px] text-black mt-3">Danh sách buổi biểu diễn:</h3>

        {/* Dropdown for selecting performance */}
        <div className="w-1/3">
        <select className="w-full p-2 rounded-md text-[19px] mt-2 border-2 border-gray-600 focus:border-gray-600">
            <option value="performance1">Buổi biểu diễn 1</option>
            <option value="performance2">Buổi biểu diễn 2</option>
            <option value="performance3">Buổi biểu diễn 3</option>
        </select>
        </div>
    </div>
    </div>


      {/* Buttons for Orders and Tickets */}
      <div className="flex space-x-4 mb-6">
        <button
          className="flex-1 bg-blue-500 p-2 text-black rounded-md text-[19px] font-bold"
          onClick={() => setShowOrders(true)} // Show Orders table
        >
          Đơn Hàng
        </button>
        <button
          className="flex-1 bg-green-500 p-2 text-black rounded-md text-[19px] font-bold"
          onClick={() => setShowOrders(false)} // Show Tickets table
        >
          Vé
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <FaSearch className="text-gray-900" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          className="p-2 rounded-md border-gray-800 text-black placeholder-gray-600 text-[19px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Conditionally Render Orders or Tickets Table */}
      {showOrders ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-[20px]">Bảng Đơn Hàng</h3>
          {orderData.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">No data</p>
          ) : (
            <table className="min-w-full text-[19px]">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Check</th>
                  <th className="px-4 py-2 text-left">Đơn hàng</th>
                  <th className="px-4 py-2 text-left">Vé</th>
                  <th className="px-4 py-2 text-left">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={index} className="border-b border-slate-200 text-sm text-[19px]">
                    <td className="px-4 py-3 "><input type="checkbox" /></td>
                    <td className="px-4 py-3 text-[19px]">{order.orderId}</td>
                    <td className="px-4 py-3 text-[19px]">{order.ticketType}</td>
                    <td className="px-4 py-3 text-[19px]">{order.total.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[20px]">Bảng Vé</h3>
          {filteredCustomerData.length === 0 ? (
            <p className="text-center text-gray-500 text-[19px]">No data</p>
          ) : (
            <table className="min-w-full text-[19px]">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Họ và tên</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Điện thoại</th>
                  <th className="px-4 py-2 text-left">Hình thức thanh toán</th>
                  <th className="px-4 py-2 text-left">Loại vé</th>
                  <th className="px-4 py-2 text-left">Giá</th>
                  <th className="px-4 py-2 text-left">Số tiền</th>
                  <th className="px-4 py-2 text-left">Trạng thái thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomerData.map((customer, index) => (
                  <tr key={index} className="border-b border-slate-200 text-[19px] ">
                    <td className="px-4 py-3">{customer.name}</td>
                    <td className="px-4 py-3">{customer.email}</td>
                    <td className="px-4 py-3">{customer.phone}</td>
                    <td className="px-4 py-3">{customer.paymentMethod}</td>
                    <td className="px-4 py-3">{customer.ticketType}</td>
                    <td className="px-4 py-3">{customer.price.toLocaleString()} đ</td>
                    <td className="px-4 py-3">{customer.amount.toLocaleString()} đ</td>
                    <td className="px-4 py-3">
                      {customer.paymentStatus === "Paid" ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <span className="text-yellow-500">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </motion.div>
    </div>
  );
};

export default OrderPage;
