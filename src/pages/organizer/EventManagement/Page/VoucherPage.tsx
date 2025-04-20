import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaTicketAlt, FaTheaterMasks } from "react-icons/fa";
import { PromotionModel } from "../../../../models/PromotionModel";
import { apis } from "../../../../constrants/apis";
import { useSearchParams } from "react-router-dom";
import promotionAPI from "../../../../apis/promotionAPI";
import { SearchComponent } from "../../../../components";
import { convertMoney } from "../../../../utils/convertMoney";
import { DateTime } from "../../../../utils/DateTime";
import CheckboxTree from "react-checkbox-tree";
import { FaRegFolder, FaRegFolderOpen, FaRegFile } from 'react-icons/fa';
import { FaCheckSquare, FaSquare, FaChevronRight, FaChevronDown, FaMinusSquare } from 'react-icons/fa';
import { MdEvent } from "react-icons/md";
import { ShowTimeModel } from "../../../../models/ShowTimeModel";
import eventAPI from "../../../../apis/eventAPI";
import { colors } from "../../../../constrants/color";
import { toast } from "react-toastify";
import { TfiBackRight } from "react-icons/tfi";
interface promotionReq {
  idPromotion?:string
  idEvent:string,
  idsTypeTicket:string[],
  title:string,
  discountType:string,
  discountValue:number,
  startDate:Date,
  endDate:Date,
  type:'create' | 'edit'
}
const VoucherPage = ({ variants }: { variants: any }) => {
  // Fake data for vouchers

  const [searchParams] = useSearchParams(); 
  const idEventParams = searchParams.get('idEvent')
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility for delete
  const [voucherToDelete, setVoucherToDelete] = useState<number | null>(null); // Voucher to delete
  const [isAddVoucherModalOpen, setIsAddVoucherModalOpen] = useState(false); // Add voucher modal visibility
  const [promotions,setPromotions] = useState<PromotionModel[]>([])
  const [nodes,setNodes] = useState<{
    value:string,
    label:string,
    children:{
      value:string,
      label:string,
    }[]
  }[]>([])
  const [expands,setExpands] = useState<string[]>([])
  const [promotionReq,setPromotionReq] = useState<promotionReq>({
    idPromotion:'',
    idEvent:idEventParams ?? '', 
    discountType:'Percentage',
    discountValue:0,
    endDate:new Date(),
    idsTypeTicket:[],
    startDate:new Date(),
    title:'',
    type:'create'
  })
  const [choseDeletePromotion,setChoseDeletePromotion] = useState<{title?:string,idPromotion:string,status: 'NotStarted' | 'Ongoing' | 'Ended' | 'Canceled'}>({
    title:'',
    idPromotion:'',
    status:'NotStarted'
  })
  useEffect(()=>{
    if(idEventParams){
      handleCallAPIGetPromotions(idEventParams)
      handleCallAPIGetShowtimes(idEventParams)
    }
  },[idEventParams])
  const convertToCheckboxTreeNodes = (data:ShowTimeModel[]) => {
    return data.map((item, index) => {
      const startDate = new Date(item.startDate).toLocaleString('vi-VN');
      const endDate = new Date(item.endDate).toLocaleString('vi-VN');
      const showTime = `${startDate} - ${endDate}`;
  
      return {
        value: item._id,
        label: `(${showTime})`,
        children: item.typeTickets.map((ticket) => ({
          value: ticket._id,
          label: ticket.name || 'Vé không tên',
        })),
      };
    });
  };
  const handleCallAPIGetShowtimes = async (idEventParams:string)=>{
    const api = apis.event.getShowTimesEvent({idEvent:idEventParams})
    try {
      const res:any = await eventAPI.HandleEvent(api)
      if(res && res.data && res.status === 200)
      {
        setNodes(convertToCheckboxTreeNodes(res.data))
      }
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại EventPage",errorMessage.statusCode)
    }
  }
  const handleCallAPIGetPromotions = async (idEventParams:string)=>{
    const api = apis.promotion.getByIdEvent({idEvent:idEventParams})
    try {
      const res = await promotionAPI.HandlePromotion(api)
      if(res && res.status === 200 && res.data){
        setPromotions(res.data)
      }
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại EventPage",errorMessage.statusCode)
    }
  }
  // Add new voucher
  const handleClick = async () => {
    setIsAddVoucherModalOpen(false)
    if(promotionReq.type === 'create'){
      const api = apis.promotion.createPromotion()
      try {
        const res = await promotionAPI.HandlePromotion(api,promotionReq,'post')
        if(res && res.status === 200){
          toast.success('Thêm thành công')
          handleCallAPIGetPromotions(idEventParams ?? '')
        }
      } catch (error:any) {
        const errorMessage = JSON.parse(error.message)
        toast.error(`Lỗi: ${errorMessage.message}`)

      }
    }else{
      const api= apis.promotion.updatePromotion()
      try {
        const res = await promotionAPI.HandlePromotion(api,promotionReq,'put')
        if(res && res.status === 200){
          toast.success('Cấp nhập thành công')
          handleCallAPIGetPromotions(idEventParams ?? '')
        }
      } catch (error:any) {
        const errorMessage = JSON.parse(error.message)
        toast.error(`Lỗi: ${errorMessage.message}`)

      }
    }
  };
  const valid = ()=>{
    return !promotionReq.title || promotionReq.idsTypeTicket.length === 0 || promotionReq.discountValue === 0
  }
  
  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleCancelPromotion = async () => {
    const api = apis.promotion.cancelPromotion()
    setIsModalOpen(false)
    try {
      const res = await promotionAPI.HandlePromotion(api,choseDeletePromotion,'put')
      if(res && res.status === 200){
        toast.success('Thành công')
        handleCallAPIGetPromotions(idEventParams ?? '')
      }
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      toast.error(`Lỗi: ${errorMessage.message}`)
    }
  };
  return (
    <div className="min-h-screen p-6 text-[19px] ">
      <h1 className="text-3xl font-bold mb-6 text-white">Danh sách voucher</h1>
      {/* Top Section - Search Bar and Add Voucher Button */}
      <div className="p-4 rounded-xl shadow-lg mb-6 flex justify-between items-center mt-4">
        {/* Search Bar */}
       
        <div className="flex items-center space-x-2 w-2/3">
         <SearchComponent 
          handleSearch={()=>console.log('ok')} 
          value={searchQuery} 
          onSearch={(val)=>setSearchQuery(val)}

         />
        </div>

        {/* Add Voucher Button */}
        <div>
          <button
            onClick={() => {
              setPromotionReq({
                idPromotion:'',
                idEvent:idEventParams ?? '', 
                discountType:'Percentage',
                discountValue:0,
                endDate:new Date(),
                idsTypeTicket:[],
                startDate:new Date(),
                title:'',
                type:'create'
              })
              setIsAddVoucherModalOpen(true)
            }}
            className="bg-green-500 p-2 rounded-md text-white flex items-center space-x-5 text-xl"
          >
            <FaTicketAlt className="mr-2" /> Thêm voucher
          </button>
        </div>
      </div>

      {/* Voucher Table */}
      <motion.div variants={variants} className="p-6  bg-white rounded-xl shadow-lg overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Danh sách voucher</h1>

        {promotions.length === 0 ? (
          <div className="">
            <p className="text-center text-gray-500 text-[19px]">Không có voucher nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="min-w-full text-gray-700 text-[19px]">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Chương trình khuyến mãi</th>
                <th className="px-4 py-2 text-left">Mức giảm</th>
                <th className="px-4 py-2 text-left">Thời gian áp dụng</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion?._id} className="border-b border-slate-200 text-[19px]">
                  <td className="px-4 py-3">
                    {promotion?.title}
                  </td>
                 
                  <td className="px-4 py-3">{promotion?.discountType === 'FixedAmount' ? convertMoney(promotion?.discountValue) : `${promotion?.discountValue} %`}</td>
                  <td className="px-4 py-3">
                   {`${DateTime.GetDate2(new Date(promotion.startDate))} - ${DateTime.GetDate2(new Date(promotion.endDate))}`}
                  </td>
                  <td className="px-4 py-3">{promotion?.status}</td>
                  <td className="px-4 py-3 flex space-x-2">
                  <>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            setPromotionReq({
                              idPromotion:promotion._id,
                              discountType:promotion.discountType,
                              discountValue:promotion.discountValue,
                              endDate:new Date(promotion.endDate),
                              idsTypeTicket:promotion.typeTickets,
                              startDate:new Date(promotion.startDate),
                              title:promotion.title,
                              idEvent:idEventParams ?? '',
                              type:'edit'
                            })
                            setIsAddVoucherModalOpen(true)
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className={promotion.status === 'Canceled' ?  "text-green-500 hover:text-green-700" : "text-red-500 hover:text-red-700"}
                          onClick={() => {
                            setChoseDeletePromotion({
                              title:promotion?.title,
                              idPromotion:promotion._id,
                              status:promotion.status
                            })
                            setIsModalOpen(true)
                          }}
                        >
                          {promotion.status === 'Canceled' ? <TfiBackRight />  : <FaTrashAlt />}
                        </button>
                      </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
        
      </motion.div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Bạn có chắc chắn muốn {choseDeletePromotion.status !== 'Canceled' ? 'Xóa' : 'hoàn tác'} voucher {choseDeletePromotion.title}?</h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeDeleteModal}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleCancelPromotion}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Voucher Modal */}
        {isAddVoucherModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-1/3">
              <h2 className="text-xl font-semibold mb-4 text-black">{promotionReq.type ==='create' ? 'Thêm voucher mới' : 'Cập nhập voucher'}</h2>

              {/* Tên chương trình khuyến mãi */}
              <div className="mb-4">
                <label htmlFor="programName" className="block text-black">Tên chương trình khuyến mãi</label>
                <input
                  id="programName"
                  type="text"
                  className="p-2 text-black border-gray-900 rounded-md w-full"
                  placeholder="Tên chương trình khuyến mãi"
                  value={promotionReq.title}
                  onChange={(e) => setPromotionReq(prev =>{
                    return {
                      ...prev,
                      title:e.target.value
                    }
                  })}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="discount" className="block text-black">Loại khuyến mãi</label>
                <select
                value={promotionReq.discountType}
                onChange={(e) =>{
                    if(e.target.value === 'Percentage'){
                      if(promotionReq.discountValue > 100){
                        setPromotionReq(prev =>{
                          return {
                            ...prev,
                            discountValue:0,
                            discountType:e.target.value
                          }
                        })
                      }else{
                        setPromotionReq(prev =>{
                          return {
                            ...prev,
                            discountType:e.target.value
                          }
                        })
                      }
                    }else{
                      setPromotionReq(prev =>{
                        return {
                          ...prev,
                          discountType:e.target.value
                        }
                      })
                    
                  }
                  
                }}
                className="w-full mt-2 p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black"
              >
                {[{value:'FixedAmount',name:'Theo số tiền'},{value:'Percentage',name:"Theo phần trăm"}].map((discountType) => {
                  return <option value={`${discountType.value}`}>{discountType.name}</option>
                })}
              </select>
              </div>

              {/* Mức giảm */}
              <div className="mb-4">
                <label htmlFor="discount" className="block text-black">Mức giảm {promotionReq.discountType === 'FixedAmount' ? '(VNĐ)' : '(%)'}</label>
                <input
                  id="discount"
                  type="number"
                  className="p-2 text-black border-gray-900 rounded-md w-full"
                  placeholder={`Mức giảm`}
                  value={promotionReq.discountValue}
                  onChange={(e) => {
                    const checkValid = ()=>{
                      if(promotionReq.discountType === 'Percentage' && Number(e.target.value) > 100) {
                        return 100
                      }
                      return Number(e.target.value)
                    }
                    setPromotionReq(prev =>{
                      return {
                        ...prev,
                        discountValue:checkValid()
                      }
                    })
                  }}
                />
              </div>

           
              {/* Ngày bắt đầu và Ngày kết thúc */}
              <div className="mb-4 flex space-x-4">
                {/* Ngày bắt đầu */}
                <div className="flex-1">
                  <label htmlFor="validFrom" className="block text-black">Ngày bắt đầu</label>
                  <input
                    id="validFrom"
                    type="date"
                    className="p-2 border-gray-900 rounded-md w-full text-black"
                    value={new Date(promotionReq.startDate).toISOString().split('T')[0]} // ✅ Đúng format
                    onChange={(e) => {
                      setPromotionReq(prev => {
                        return {
                          ...prev,
                          startDate:new Date(e.target.value)
                        }
                      })
                    }}
                  />
                </div>

                {/* Ngày kết thúc */}
                <div className="flex-1">
                  <label htmlFor="validTo" className="block text-black">Ngày kết thúc</label>
                  <input
                    id="validTo"
                    type="date"
                    className="p-2 border-gray-900 rounded-md w-full text-black"
                    value={new Date(promotionReq.endDate).toISOString().split('T')[0]} // ✅ Đúng format
                    onChange={(e) => {
                      setPromotionReq(prev => {
                        return {
                          ...prev,
                          endDate:new Date(e.target.value)
                        }
                      })
                    }}
                  />
                </div>
              </div>

               <div className="mb-4">
                <label htmlFor="status" className="block text-black">Loại vé áp dụng</label>
                <CheckboxTree
                nodes={nodes}
                checked={promotionReq.idsTypeTicket}
                expanded={expands}
                onCheck={checked => setPromotionReq(prev=>{
                  return {
                    ...prev,
                    idsTypeTicket:checked
                  }
                })}
                onExpand={expanded => setExpands(expanded)}
                icons={{
                  check: <FaCheckSquare />,
                  uncheck: <FaSquare />,
                  halfCheck: <FaMinusSquare />,
                  expandClose: <FaChevronRight />,
                  expandOpen: <FaChevronDown />,
                  parentClose: <MdEvent />,   
                  parentOpen: <MdEvent />,    
                  leaf: <FaTicketAlt />,
                }}
            />
              </div> 

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsAddVoucherModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleClick}
                  disabled={valid()}
                style={{backgroundColor:valid() ? colors.gray : colors.primary}}
                >
                  {promotionReq.type === 'create' ? 'Thêm' : 'Cập nhập'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default VoucherPage;
