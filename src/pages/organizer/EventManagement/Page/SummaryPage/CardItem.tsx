import { motion } from "framer-motion";

const CardItem = ({ item, variants }: { item: any; variants: any }) => {
  return (
    <motion.div
      variants={variants}
      className="flex w-full sm:w-[700px] flex-col gap-6 rounded-xl bg-gray-800 p-6 dark:bg-gray-700 dark:text-gray-300 sm:flex-1 h-auto min-h-[200px]"  
    >
      <div className="flex items-center gap-3">
        {item.icon}
        <h3 className="font-medium text-gray-100">{item.title}</h3> {/* Tiêu đề */}
      </div>
      <h1 className="text-3xl font-bold text-gray-100">{item.value1} </h1> {/* Giá trị */}
      <h2 className="text-xl font-medium text-gray-300">Tổng: {item.value2} đ</h2> {/* Tổng giá trị */}
    </motion.div>
  );
};

export default CardItem;
