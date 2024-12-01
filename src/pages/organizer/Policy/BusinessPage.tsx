import React from 'react';
import myPdf from '../../../assets/pdf/Danh_muc_hang_hoa_dich_cam_kinh_doanh_va_kinh_doanh_co_dieu_kien_19 12 2023.pdf'; 

const BusinessPage: React.FC = () => {
  return (
    <div className="ml-3">
      <h1 className="text-xl font-bold mt-4 mb-3 ">Danh mục hàng hóa, dịch vụ cấm kinh doanh</h1>
      <p className="text-xl font-bold">Thông tin về danh mục hàng hóa, dịch vụ cấm kinh doanh...</p>
    
      <iframe
        src={myPdf}
        width="1600px"    
        height="2000px" 
        frameBorder="0"
        title="Danh mục hàng hóa cấm kinh doanh"
      ></iframe>
    </div>
  );
};

export default BusinessPage;
