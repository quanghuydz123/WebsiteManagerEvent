import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaLock, FaDollarSign } from "react-icons/fa"; // Import icons for lock and dollar

const TicketTable = ({ variants }: { variants: any }) => {
  // Fake data for ticket types
  const [ticketData, setTicketData] = useState<any[]>([
    { type: "Vé hạng A", price: 300000, sold: 50, total: 100, locked: 0, sellRatio: 50 },
    { type: "Vé hạng B", price: 200000, sold: 40, total: 100, locked: 10, sellRatio: 40 },
    { type: "Vé hạng C", price: 100000, sold: 30, total: 100, locked: 5, sellRatio: 30 },
    { type: "Vé VIP", price: 500000, sold: 20, total: 50, locked: 2, sellRatio: 40 },
    { type: "Vé thường", price: 150000, sold: 60, total: 150, locked: 0, sellRatio: 40 },
  ]);

 

  // Function to get progress bar color based on sell ratio
  const getProgressBarColor = (ratio: number) => {
    if (ratio >= 75) return "bg-green-500";  // High sell ratio: Green
    if (ratio >= 50) return "bg-yellow-500"; // Medium sell ratio: Yellow
    return "bg-red-500"; // Low sell ratio: Red
  };

  return (
    <motion.div variants={variants} className="flex-1 rounded-xl p-5 dark:bg-slate-600 ">
      <table className="min-w-full text-[19px]">
        <thead>
          <tr className=" md:text-base text-[19px]">
            <th className="px-4 py-2 text-left text-[19px] ">Loại vé</th>
            <th className="px-4 py-2 text-left text-[19px] ">Giá bán</th>
            <th className="px-4 py-2 text-left text-[19px] ">Đã bán</th>
            <th className="px-4 py-2 text-left text-[19px] ">Khóa</th>
            <th className="px-4 py-2 text-left text-[19px] ">Tỉ lệ bán</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((item, index) => (
            <tr className="border-b border-slate-200 text-sm md:text-base" key={index}>
              <td className="px-4 py-3 font-medium text-[19px]">{item.type}</td>
              <td className="px-4 py-3 font-medium flex items-center text-[19px]">
                <FaDollarSign className="mr-2 text-green-500 " />
                <span>{item.price.toLocaleString()} đ</span>
            </td>

              <td className="px-4 py-3 font-medium text-[19px]">
                {item.sold} / {item.total}
              </td>
              <td className="px-4 py-3 font-medium flex items-center text-[19px]">
                {item.locked} <FaLock className="ml-1 text-red-500" />
              </td>
              <td className="px-4 py-3 font-medium text-[19px]">
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getProgressBarColor(item.sellRatio)}`}
                    style={{ width: `${item.sellRatio}%` }}
                  ></div>
                </div>
                <span className="ml-2">{item.sellRatio}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default TicketTable;
