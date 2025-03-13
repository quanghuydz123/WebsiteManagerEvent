import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TicketType {
  name: string;
  price: string;
  benefits: string[];
}

interface Organizer {
  name: string;
  logo: string;
  description: string;
}

interface Event {
  _id: string;
  title: string;
  photoUrl: string;
  startAt: string;
  location: string;
  description: string;
  tickets: TicketType[];
  organizer: Organizer;
}

// Dữ liệu giả
const fakeEvent: Event = {
  _id: "1",
  title: "Lễ Hội Âm Nhạc Mùa Đông",
  photoUrl: "https://salt.tkbcdn.com/ts/ds/3f/41/7d/eabf9d9a369477a3fb33a90b806aaac6.jpg",
  startAt: "2024-12-25",
  location: "Hà Nội",
  description:
    "Tham gia lễ hội âm nhạc lớn nhất mùa đông với sự góp mặt của nhiều nghệ sĩ nổi tiếng.",
  tickets: [
    { name: "Vé Thường", price: "300.000 VND", benefits: ["Vào cổng", "Ghế ngồi khu thường"] },
    { name: "Vé VIP", price: "1.000.000 VND", benefits: ["Chỗ ngồi VIP", "Gặp mặt nghệ sĩ"] },
  ],
  organizer: {
    name: "Công ty Sự kiện ABC",
    logo: "https://salt.tkbcdn.com/ts/ds/c2/bc/08/bbe62edae0f6566be98d019211294d47.png",
    description: "Chuyên tổ chức sự kiện âm nhạc và giải trí.",
  },
};

const EventDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event: Event = location.state || fakeEvent; // Nếu không có dữ liệu, dùng fakeEvent

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <button
        onClick={() => navigate("/admin/Event")}
        className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4"
      >
        ← Quay lại
      </button>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        {/* Ảnh sự kiện */}
        <div className="w-full flex justify-center">
          <img
            src={event.photoUrl}
            alt={event.title}
            className="w-auto max-w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Thông tin sự kiện */}
        <h1 className="text-3xl font-bold my-4">{event.title}</h1>
        <p className="text-lg">
          <strong>Thời gian:</strong> {event.startAt}
        </p>
        <p className="text-lg">
          <strong>Địa điểm:</strong> {event.location}
        </p>

        {/* Giới thiệu sự kiện */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Giới thiệu</h2>
          <p className="text-gray-700">{event.description}</p>
        </div>

        {/* Các loại vé */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Các loại vé</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {event.tickets.map((ticket, index) => (
              <div
                key={index}
                className="relative bg-green-400 border border-yellow-400 p-4 rounded-xl shadow-lg"
              >
                {/* Đường đứt nét giữa tấm vé */}
                <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-500 border-dashed border-l-2"></div>

                {/* Nội dung vé */}
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{ticket.name}</h3>
                    <p className="text-black">Giá: {ticket.price}</p>
                    <ul className="list-disc list-inside text-black mt-2">
                      {ticket.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Cạnh phải tròn như vé ngoài đời */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full absolute top-0 right-0 -translate-x-1/2"></div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full absolute bottom-0 right-0 -translate-x-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin nhà tổ chức */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Nhà tổ chức</h2>
          <div className="flex items-center gap-4">
            <img
              src={event.organizer.logo}
              alt={event.organizer.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{event.organizer.name}</h3>
              <p className="text-gray-600">{event.organizer.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
