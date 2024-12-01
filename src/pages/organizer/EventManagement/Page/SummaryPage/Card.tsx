import { motion } from "framer-motion";
import { FaDollarSign, FaTicketAlt } from 'react-icons/fa';
import CardItem from "./CardItem";
import { ReactNode } from "react";
interface Props {
  cartItems:{
    title:string,
    value1:number,
    value2:number,
    icon:ReactNode,
    type:'revenue' | 'ticketSold' | 'check-in'
  }[]
}
const   Cards = (props:Props) => {
  const {cartItems} = props
  // Fake Data
  // const cartItems = [
  //   { id: 1, title: "Doanh thu", value1: 0, value2: 330000, icon: <FaDollarSign /> },
  //   { id: 2, title: "Số vé đã bán", value1: 1000, value2: 100000, icon: <FaTicketAlt /> },
  // ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="translate-all flex flex-wrap gap-6 p-6 sm:px-8"  // Điều chỉnh khoảng cách giữa các thẻ
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {cartItems.map((item, index) => (
        <CardItem item={item} key={index} variants={itemVariants} />
      ))}
    </motion.div>
  );
};

export default Cards;
