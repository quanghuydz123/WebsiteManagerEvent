import { motion, Variants } from "framer-motion";

// Định nghĩa kiểu dữ liệu cho item (sự kiện)
interface EventItemType {
  title: string;
  image: string;
  date: string;
  location: string;
}

// Định nghĩa kiểu dữ liệu cho mỗi hành động
interface EventActionType {
  label: string;
  onClick: () => void;
}

// Định nghĩa kiểu dữ liệu cho props của EventItem
interface EventItemProps {
  item: EventItemType;  // Thông tin sự kiện
  variants: Variants;    // Các variants animation
  eventActions: EventActionType[];  // Mảng các hành động
}

const EventItem: React.FC<EventItemProps> = ({ item, variants, eventActions }) => {
  return (
    <motion.div
      variants={variants}
      className="flex flex-col sm:flex-row gap-6 rounded-xl bg-white p-6 dark:bg-slate-600 dark:text-slate-300"
    >
      {/* Cột ảnh */}
      <div className="w-full sm:w-1/2">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Cột thông tin sự kiện */}
      <div className="w-full sm:w-1/2 flex flex-col justify-between">
        <h3 className="font-medium text-xl">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.date}</p>
        <p className="text-sm text-gray-500">{item.location}</p>

        {/* Render các nút chức năng */}
        <div className="flex gap-2 mt-4">
          {eventActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EventItem;
