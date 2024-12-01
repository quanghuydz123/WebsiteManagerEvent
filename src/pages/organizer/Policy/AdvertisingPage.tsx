import React from 'react';
import myPdf from '../../../assets/pdf/Hang_hoa_dich_vu_cam_quang_cao_BTC_20 12 2023.pdf'; 

const AdvertisingPage: React.FC = () => {
  return (
    <div className="ml-3">
      <h1 className="text-xl font-bold mt-4 mb-3 ">Danh mục hàng hóa, dịch vụ cấm quảng cáo</h1>
      <p className="text-xl font-bold">Thông tin về danh mục hàng hóa, dịch vụ cấm quảng cáo...</p>
      
      {/* Use the imported path */}
      <iframe
          src={myPdf}
          width="1600px"    
          height="2000px" 
          frameBorder="0"
          title="Danh mục hàng hóa cấm quảng cáo"
        ></iframe>
    </div>
  );
};

export default AdvertisingPage;
