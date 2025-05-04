import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { FaLock, FaDollarSign } from 'react-icons/fa'; // Import icons for lock and dollar
import {
  TypeTicket,
  TypeTicketSoldAndtotalRevenue,
} from '../../../../../models/SalesSumary';
import { convertMoney } from '../../../../../utils/convertMoney';
import {
  PromotionModel,
  TypeTicketModel,
} from '../../../../../models/TypeTicketModel';
interface Props {
  TypeTicketSoldAndtotalRevenue: TypeTicketSoldAndtotalRevenue[];
}
const TicketTable = (props: Props) => {
  const { TypeTicketSoldAndtotalRevenue } = props;
  // Fake data for ticket types
  // const [ticketData, setTicketData] = useState<any[]>([
  //   { type: "Vé hạng A", price: 300000, sold: 50, total: 100,sellRatio: 50 },
  //   { type: "Vé hạng B", price: 200000, sold: 40, total: 100,  sellRatio: 40 },
  //   { type: "Vé hạng C", price: 100000, sold: 30, total: 100,sellRatio: 30 },
  //   { type: "Vé VIP", price: 500000, sold: 20, total: 50,  sellRatio: 40 },
  //   { type: "Vé thường", price: 150000, sold: 60, total: 150, sellRatio: 40 },
  // ]);

  // Function to get progress bar color based on sell ratio
  const getProgressBarColor = (ratio: number) => {
    if (ratio >= 75) return 'bg-green-500'; // High sell ratio: Green
    if (ratio >= 50) return 'bg-yellow-500'; // Medium sell ratio: Yellow
    return 'bg-red-500'; // Low sell ratio: Red
  };
  const renderSellRatio = (totalTicketSold: number, TotalTicke: number) => {
    if (TotalTicke === 0) {
      return 0;
    }
    let percentage = (totalTicketSold / TotalTicke) * 100;
    return parseFloat(percentage.toFixed(2));
  };
  const returnMonney = (typeTicket: TypeTicket, promotion?: PromotionModel) => {
    if (promotion) {
      if (promotion.status === 'Ongoing') {
        if (promotion.discountType === 'Percentage') {
          return (typeTicket.price * (100 - promotion.discountValue)) / 100;
        } else {
          if (typeTicket.price - promotion.discountValue < 0) {
            return 0;
          } else {
            return typeTicket.price - promotion.discountValue;
          }
        }
      }
    }
    return typeTicket.price;
  };
  return (
    <motion.div className="flex-1 rounded-xl p-5 dark:bg-slate-600 ">
      <table className="min-w-full text-[19px]">
        <thead>
          <tr className=" md:text-base text-[19px]">
            <th className="px-4 py-2 text-left text-[19px] ">Loại vé</th>
            <th className="px-4 py-2 text-left text-[19px] ">Giá bán</th>
            <th className="px-4 py-2 text-left text-[19px] ">Đã bán</th>
            {/* <th className="px-4 py-2 text-left text-[19px] ">Khóa</th> */}
            <th className="px-4 py-2 text-left text-[19px] ">Tỉ lệ bán</th>
          </tr>
        </thead>
        <tbody>
          {TypeTicketSoldAndtotalRevenue &&
            TypeTicketSoldAndtotalRevenue.length > 0 &&
            TypeTicketSoldAndtotalRevenue.map((item, index) => (
              <tr
                className="border-b border-slate-200 text-sm md:text-base"
                key={index}
              >
                <td className="px-4 py-3 font-medium text-[19px]">
                  {item?.typeTicket?.name ?? ''}
                </td>
                <td className="px-4 py-3 font-medium flex items-center text-[19px]">
                  {/* <FaDollarSign className="mr-2 text-green-500 " /> */}
                  <span>
                    {convertMoney(
                      returnMonney(item.typeTicket, item?.promotion) ?? 0
                    )}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium text-[19px]">
                  {item?.totalSold} /{' '}
                  {item?.totalSold + item?.typeTicket?.amount}
                </td>
                {/* <td className="px-4 py-3 font-medium flex items-center text-[19px]">
                {item.locked} <FaLock className="ml-1 text-red-500" />
              </td> */}
                <td className="px-4 py-3 font-medium text-[19px]">
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getProgressBarColor(
                        renderSellRatio(
                          item.totalSold,
                          item.totalSold + item?.typeTicket?.amount
                        )
                      )}`}
                      style={{
                        width: `${renderSellRatio(
                          item.totalSold,
                          item.totalSold + item?.typeTicket?.amount
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2">
                    {renderSellRatio(
                      item.totalSold,
                      item.totalSold + item?.typeTicket?.amount
                    )}
                    %
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default TicketTable;
