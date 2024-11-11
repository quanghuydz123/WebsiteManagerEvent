import React from 'react';

const EventPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-purple-900 text-white p-4">
      <div className="flex items-center justify-between bg-gray-900 p-4 rounded mb-4">
  <h1 className="text-xl font-bold">Sự kiện đã tạo</h1>
  <div className="flex-1 flex justify-end">
    <input
      type="text"
      placeholder="Tìm kiếm sự kiện"
      className="p-2 rounded w-1/3 bg-white text-black"
    />
  </div>
</div>

      <div className="flex items-center space-x-2 mb-4">
        <button className="px-4 py-2 rounded bg-green-700 hover:bg-green-600">Tất cả</button>
        <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-400">Sắp diễn ra</button>
        <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Đã qua</button>
        <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Chờ duyệt</button>
        <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Nháp</button>
      </div>
      <div className="flex justify-center items-center min-h-[50vh]">
        {/* Biểu tượng hoặc nội dung */}
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4" />
          <p className="text-gray-300">Chưa có sự kiện nào được tạo</p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
