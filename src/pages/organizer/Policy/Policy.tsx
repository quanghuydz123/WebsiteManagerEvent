import React from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import BusinessPage from '../Policy/BusinessPage';
import AdvertisingPage from '../Policy/AdvertisingPage';
import ContentImagePage from '../Policy/ContentImagePage';
import Header from '../../../components/Header/Header';

interface PolicyItem {
  label: string;
  path: string;
}

const OrganizerTerms: React.FC = () => {
  const location = useLocation(); // Hook to get current location

  const policyItems: PolicyItem[] = [
    { label: "Danh mục hàng hóa, dịch vụ cấm kinh doanh", path: "business" },
    { label: "Danh mục hàng hóa, dịch vụ cấm quảng cáo", path: "advertising" },
    { label: "Quy định kiểm duyệt nội dung & hình ảnh", path: "contentImage" },
  ];

  // Check if the current route is one of the policy page routes
  const isPolicyPage = location.pathname.includes("/organizer/Policy/");

  return (
    <div className="min-h-screen bg-custom-gradient text-white flex flex-col relative">
      
      {/* Header */}
      <div className="absolute top-4 left-4">
        <h2 className="text-3xl font-bold">Điều khoản cho ban tổ chức</h2>
      </div>

      {/* Conditionally render the navigation links */}
      {!isPolicyPage && (
        <div className="flex justify-center items-center flex-1">
          <div className="bg-white text-white rounded-xl shadow-2xl max-w-3xl w-full px-6 py-6">
            <ul className="space-y-4">
              {policyItems.map(({ label, path }, index) => (
                <li key={index} className="text-2xl font-semibold hover:bg-blue-300 hover:text-white px-4 py-2 cursor-pointer rounded-md transition duration-300">
                  <Link to={`/organizer/Policy/${path}`}>{`${index + 1}. ${label}`}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Routed Pages */}
      <div className="mt-10 flex-1 w-full flex justify-center">
        <Routes>
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/advertising" element={<AdvertisingPage />} />
          <Route path="/contentImage" element={<ContentImagePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default OrganizerTerms;
