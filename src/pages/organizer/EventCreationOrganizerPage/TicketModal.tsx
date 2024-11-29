import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ticketNameError, setTicketNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [dateError, setDateError] = useState("");

  // Kiểm tra tên vé có vượt quá 50 ký tự
  const handleTicketNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTicketName(value);

    if (value.length > 50) {
      setTicketNameError("Quá ký tự yêu cầu");
    } else {
      setTicketNameError("");
    }
  };

  // Kiểm tra tổng số lượng vé là số
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value);

    if (isNaN(Number(value)) || Number(value) <= 0) {
      setQuantityError("Số lượng vé phải là số lớn hơn 0");
    } else {
      setQuantityError("");
    }
  };

  // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value);

    if (startDate && new Date(value) <= new Date(startDate)) {
      setDateError("Thời gian kết thúc phải sau thời gian bắt đầu");
    } else {
      setDateError("");
    }
  };

  useEffect(() => {
    // Nếu checkbox "miễn phí" được chọn, giá vé phải là 0
    if (isFree) {
      setPrice("0");
    }
  }, [isFree]);

  if (!isOpen) return null;

  const handleFreeChange = () => {
    setIsFree(!isFree);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container with rounded corners */}
      <div className="bg-gray-800 text-white w-full max-w-7xl rounded-xl shadow-lg text-lg overflow-y-auto max-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-600 sticky top-0 bg-gray-800 z-10 rounded-t-xl">
          <h2 className="text-2xl font-semibold">Tạo loại vé mới</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Tên vé */}
          <div>
            <label className="block font-semibold mb-2">
              <span className="text-red-500">*</span> Tên vé
            </label>
            <input
              type="text"
              placeholder="Tên vé"
              maxLength={50}
              value={ticketName}
              onChange={handleTicketNameChange}
              className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
            />
            <div className="text-right text-sm text-gray-400">
              {ticketName.length} / 50
            </div>
            {ticketNameError && (
              <div className="text-sm text-red-500">{ticketNameError}</div>
            )}
          </div>

          {/* Giá vé */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">
                <span className="text-red-500">*</span> Giá vé
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isFree}
                  className={`w-full p-4 rounded-xl border ${
                    isFree
                      ? "border-gray-600 bg-gray-600 cursor-not-allowed"
                      : "border-gray-500 bg-white text-black"
                  } focus:ring-2 focus:ring-green-500 text-lg`}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="free"
                    checked={isFree}
                    onChange={handleFreeChange}
                    className="mr-2"
                  />
                  <label htmlFor="free" className="text-lg">
                    Miễn phí
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2">
                <span className="text-red-500">*</span> Tổng số lượng vé
              </label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
              />
              {quantityError && (
                <div className="text-sm text-red-500">{quantityError}</div>
              )}
            </div>
          </div>

          {/* Thời gian */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">
                <span className="text-red-500">*</span> Thời gian bắt đầu bán vé
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                <span className="text-red-500">*</span> Thời gian kết thúc bán vé
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={handleEndDateChange}
                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
              />
              {dateError && (
                <div className="text-sm text-red-500">{dateError}</div>
              )}
            </div>
          </div>

          {/* Thông tin vé */}
          <div>
            <label className="block font-semibold mb-2">Thông tin vé</label>
            <textarea
              rows={4}
              maxLength={1000}
              placeholder="Description"
              className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
            />
            <div className="text-right text-sm text-gray-400">0 / 1000</div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-600 rounded-b-xl">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-xl">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
