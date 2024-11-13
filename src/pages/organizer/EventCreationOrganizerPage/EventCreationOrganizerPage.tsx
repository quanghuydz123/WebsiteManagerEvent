import React, { useState } from 'react';

const EventCreationOrganizerPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [eventLogo, setEventLogo] = useState<File | null>(null);
  const [eventBackground, setEventBackground] = useState<File | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventLogo(e.target.files[0]);
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventBackground(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen text-white bg-gray-800">
      {/* Top Navigation Step Bar */}
      <div className="bg-gray-900/90 px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tạo sự kiện</h1>
        <div className="flex space-x-8">
          <div className="flex items-center">
            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
            <span className="ml-2">Thông tin sự kiện</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
            <span className="ml-2">Thời gian & Loại vé</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center">3</span>
            <span className="ml-2">Cài đặt</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center">4</span>
            <span className="ml-2">Thông tin thanh toán</span>
          </div>
        </div>
        <div className="space-x-4">
          <button className="bg-gray-700 px-4 py-2 rounded-md">Lưu</button>
          <button className="bg-green-600 px-4 py-2 rounded-md">Tiếp tục</button>
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-gray-700/90 p-6 rounded-lg">
            <label className="text-red-500 font-medium">* Upload hình ảnh</label>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Event Logo Upload */}
              <div className="bg-gray-800/70 border border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center text-center h-48 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {eventLogo ? (
                  <img
                    src={URL.createObjectURL(eventLogo)}
                    alt="Event Logo Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <span className="text-green-500">Thêm logo sự kiện</span>
                    <p className="text-gray-400">(720x958)</p>
                  </>
                )}
              </div>

              {/* Event Background Upload */}
              <div className="bg-gray-800/70 border border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center text-center h-48 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {eventBackground ? (
                  <img
                    src={URL.createObjectURL(eventBackground)}
                    alt="Event Background Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <span className="text-green-500">Thêm ảnh nền sự kiện</span>
                    <p className="text-gray-400">(1280x720)</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Event Name */}
          <div className="bg-gray-700/90 p-6 rounded-lg">
            <label className="text-red-500 font-medium">* Tên sự kiện</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
              placeholder="Tên sự kiện"
            />
          </div>

          {/* Event Location */}
          <div className="bg-gray-700/90 p-6 rounded-lg">
            <label className="text-red-500 font-medium">* Địa chỉ sự kiện</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input type="radio" name="eventType" value="Offline" className="form-radio text-green-500 mr-2" />
                Sự kiện Offline
              </label>
              <label className="flex items-center">
                <input type="radio" name="eventType" value="Online" className="form-radio text-green-500 mr-2" />
                Sự kiện Online
              </label>
            </div>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
              placeholder="Tên địa điểm"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                className="w-full p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
                placeholder="Tỉnh/Thành"
              />
              <input
                type="text"
                className="w-full p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
                placeholder="Quận/Huyện"
              />
              <input
                type="text"
                className="w-full p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
                placeholder="Phường/Xã"
              />
              <input
                type="text"
                className="w-full p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
                placeholder="Số nhà, đường"
              />
            </div>
          </div>

          {/* Event Type */}
          <div className="bg-gray-700/90 p-6 rounded-lg">
            <label className="text-red-500 font-medium">* Thể loại sự kiện</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
            >
              <option value="">Vui lòng chọn</option>
              <option value="Conference">Hội thảo</option>
              <option value="Workshop">Workshop</option>
              <option value="Concert">Buổi hòa nhạc</option>
            </select>
          </div>

          {/* Event Description */}
          <div className="bg-gray-700/90 p-6 rounded-lg">
            <label className="text-red-500 font-medium">* Thông tin sự kiện</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-800/70 border border-gray-500 rounded-lg text-white"
              placeholder="Mô tả sự kiện"
              rows={5}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 px-6 py-3 rounded-md font-semibold hover:bg-green-700"
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationOrganizerPage;
