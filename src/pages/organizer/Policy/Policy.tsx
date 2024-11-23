import React from "react";

const OrganizerTerms = () => {
  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded mb-4">
      <h1 className="text-xl font-bold">
          Điều khoản cho Ban tổ chức
        </h1>
      </div>

      {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-300">
            {[
                { label: "Danh mục hàng hóa, dịch vụ cấm kinh doanh", path: "business" },
                { label: "Danh mục hàng hóa, dịch vụ cấm quảng cáo", path: "advertising" },
                { label: "Quy định kiểm duyệt nội dung & hình ảnh", path: "contentImage" },
            ].map(({ label, path }, index) => (
                <li
                key={index}
                className="flex justify-between items-center px-6 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300"
                onClick={() => window.open(`/organizer/Policy/${path}`, "_blank")}
                >
                <span className="text-base font-medium">{`${index + 1}. ${label}`}</span>
                <span className="text-gray-500 text-lg">&gt;</span>
                </li>
            ))}
            </ul>
        </div>
        </div>


    </div>
  );
};

export default OrganizerTerms;
