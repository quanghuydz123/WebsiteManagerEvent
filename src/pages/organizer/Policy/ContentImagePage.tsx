import React from 'react';
import myPdf from '../../../assets/pdf/ed68c21a99ea30caff3e1d8da88fc7b9.pdf';

const ContentImagePage: React.FC = () => {
  return (
    <div className="ml-3">
      <h1 className="text-xl font-bold mt-4 mb-3 ">Quy định kiểm duyệt nội dung & hình ảnh</h1>
      <p className="text-xl font-bold">Thông tin về quy định kiểm duyệt nội dung và hình ảnh...</p>
      
      {/* Full-screen iframe */}
      <iframe
        src={myPdf}
        width="1600px"    
        height="2000px" 
        frameBorder="0"
        title="Quy định kiểm duyệt nội dung & hình ảnh"
        style={{
          display: 'block',  // Ensures no extra space around iframe
          marginTop: '20px', // Optional: Adjust if you need some spacing
        }}
      ></iframe>
    </div>
  );
};

export default ContentImagePage;
