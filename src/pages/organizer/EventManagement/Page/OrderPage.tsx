import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaDollarSign, FaCheckCircle, FaSearch } from "react-icons/fa"; // Additional icons
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShowTimeModel } from "../../../../models/ShowTimeModel";
import { apis } from "../../../../constrants/apis";
import eventAPI from "../../../../apis/eventAPI";
import { DateTime } from "../../../../utils/DateTime";
import { InvoiceDetailsModel, TicketsPurchase } from "../../../../models/InvoiceDetailsModel";
import ticketAPI from "../../../../apis/ticketAPI";
import { convertMoney } from "../../../../utils/convertMoney";
import LoadingModal from "../../../../modals/LoadingModal";
import { PaginationComponent, RowComponent, SpaceComponent } from "../../../../components";

const OrderPage = ({ variants }: { variants: any }) => {
  const [searchParams] = useSearchParams(); // Hook để làm việc với query string
  const navigate = useNavigate()
  const idEventParams = searchParams.get('idEvent')
  const idShowTimeParams = searchParams.get('idShowTime')
  const [idShowTime,setIdShowTime] = useState('')
  const [allShowTime,setAllShowTime] = useState<ShowTimeModel[]>([])
  const [isLoading,setIsLoading] =  useState(false)
  const [invoices,setInvoices] = useState<InvoiceDetailsModel[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1)

  // const [orderData, setOrderData] = useState<any[]>([
  //   { orderId: "ORD123", ticketType: "Vé hạng A", total: 300000 },
  //   { orderId: "ORD124", ticketType: "Vé hạng B", total: 200000 },
  // ]);

  const [ticketCustomerData, setTicketCustomerData] = useState<any[]>([
    { name: "Nguyễn Văn ", email: "a@gmail.com", phone: "0123456789", paymentMethod: "Cash", ticketType: "Vé hạng A", price: 300000, amount: 300000, paymentStatus: "Paid" },
    { name: "Trần Thị B", email: "b@gmail.com", phone: "0123456789", paymentMethod: "Credit Card", ticketType: "Vé hạng B", price: 200000, amount: 200000, paymentStatus: "Pending" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  // const [showOrders, setShowOrders] = useState(false); // Track which table to show
  useEffect(() => {
    if(idShowTimeParams){
      setIdShowTime(idShowTimeParams)
    }
    if(idEventParams){
      handleCallAPIGetAllShowTimeByIdEvent()
    }
  }, [idShowTimeParams])
  useEffect(()=>{
    if(idShowTime){
      handleCallAPIGetAllInvoices()
    }
  },[idShowTime,currentPage])
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCallAPIGetAllInvoices = async ()=>{
    const api = apis.ticket.getByIdShowTime({idShowTime:idShowTime ?? '',limit:'4',page:currentPage.toString()})
    setIsLoading(true)
    try {
      const res:any = await ticketAPI.HandleTicket(api)
      if(res && res.data && res.status === 200){
        setInvoices(res.data)
        setTotalPages(res.pagination.totalPages)

      }
      setIsLoading(false)

    } catch (error:any) {
      setIsLoading(false)

      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại OrderPage",errorMessage.statusCode)
    }
  }
  console.log(invoices)
  const handleCallAPIGetAllShowTimeByIdEvent = async ()=>{
    const api = apis.event.getShowTimesEventForOrganizer({idEvent:idEventParams ?? ''})
    try {
      const res:any = await eventAPI.HandleEvent(api)
      if(res && res.data && res.status === 200){
        setAllShowTime(res.data)
      }
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại OrderPage",errorMessage.statusCode)
    }
  }
  // Function to get progress bar color based on sell ratio
  // const getProgressBarColor = (ratio: number) => {
  //   if (ratio >= 75) return "bg-green-500";  // High sell ratio: Green
  //   if (ratio >= 50) return "bg-yellow-500"; // Medium sell ratio: Yellow
  //   return "bg-red-500"; // Low sell ratio: Red
  // };

  // Filter ticket customer data based on search query
  const filteredCustomerData = ticketCustomerData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderTextTypeTicket = (typeTickets: TicketsPurchase[]) => {
    if (typeTickets && typeTickets?.length > 0) {
      const groupedByTypeTicket = typeTickets?.reduce((acc: any, ticket) => {
        const { typeTicketDetails } = ticket;
        if (!acc[typeTicketDetails._id]) {
          acc[typeTicketDetails._id] = [];
        }
        acc[typeTicketDetails._id].push(ticket);
        return acc;
      }, {});
  
      const renderedTickets = []; // Lưu trữ các JSX components
  
      for (const typeTicket in groupedByTypeTicket) {
        const tickets: TicketsPurchase[] = groupedByTypeTicket[typeTicket];
        renderedTickets.push(
          <RowComponent key={typeTicket} styles={{paddingBottom:8}}>
            <p>{tickets[0].typeTicketDetails.name}</p>
            <SpaceComponent width={2} />
            <p className="text-green-500">{`x${tickets.length}`}</p>
          </RowComponent>
        );
      }
  
      return <>{renderedTickets}</>;
    }
    return null;
  };
  return (
    <div className="min-h-screen bg-custom-gradient text-black p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold mb-6 text-white">Danh sách đơn hàng</h1>
    <motion.div variants={variants} className="flex flex-col p-4 bg-white rounded-xl mt-12">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Đơn hàng</h1>

     {/* Performance and Date Selection */}
    <div className="mb-6">
    <div className="flex space-x-4 mb-4">
        {/* Label for the dropdown */}
        <h3 className="text-lg font-semibold text-[20px] text-black mt-3">Suất diễn:</h3>

        {/* Dropdown for selecting performance */}
        <div className="w-1/3">
        <select 
        value={idShowTime}
        onChange={(e)=>setIdShowTime(e.target.value)}
        className="w-full p-2 rounded-md text-[19px] mt-2 border-2 border-gray-600 focus:border-gray-600">
            {
              allShowTime.map((showTime)=>{
                return <option value={showTime._id}>{`${DateTime.GetTime(showTime.startDate)} : ${DateTime.GetTime(showTime.endDate)} ${DateTime.GetDateNew1(showTime.startDate,showTime.endDate)}`}</option>
              })
            }
        </select>
        </div>
    </div>
    </div>


      {/* Buttons for Orders and Tickets */}
      {/* <div className="flex space-x-4 mb-6">
        <button
          className="flex-1 bg-blue-500 p-2 text-black rounded-md text-[19px] font-bold"
          onClick={() => setShowOrders(true)} // Show Orders table
        >
          Đơn Hàng
        </button>
        <button
          className="flex-1 bg-green-500 p-2 text-black rounded-md text-[19px] font-bold"
          onClick={() => setShowOrders(false)} // Show Tickets table
        >
          Vé
        </button>
      </div> */}

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <FaSearch className="text-gray-900" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          className="p-2 rounded-md border-gray-800 text-black placeholder-gray-600 text-[19px]"
          value={searchQuery}
          style={{}}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Conditionally Render Orders or Tickets Table */}
      {/* {showOrders ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-[20px]">Bảng Đơn Hàng</h3>
          {orderData.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">No data</p>
          ) : (
            <table className="min-w-full text-[19px]">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Check</th>
                  <th className="px-4 py-2 text-left">Đơn hàng</th>
                  <th className="px-4 py-2 text-left">Vé</th>
                  <th className="px-4 py-2 text-left">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={index} className="border-b border-slate-200 text-sm text-[19px]">
                    <td className="px-4 py-3 "><input type="checkbox" /></td>
                    <td className="px-4 py-3 text-[19px]">{order.orderId}</td>
                    <td className="px-4 py-3 text-[19px]">{order.ticketType}</td>
                    <td className="px-4 py-3 text-[19px]">{order.total.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) :  */}
      
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[20px]">Danh sách đơn hàng</h3>
          {filteredCustomerData.length === 0 ? (
            <p className="text-center text-gray-500 text-[19px]">No data</p>
          ) : (
            <table className="min-w-full text-[19px]">
              <thead>
                <tr>
                <th className="px-4 py-2 text-center">Mã đơn hàng</th>
                  <th className="px-4 py-2 text-center">Họ và tên</th>
                  <th className="px-4 py-2 text-center">Email</th>
                  <th className="px-4 py-2 text-center">Điện thoại</th>
                  <th className="px-4 py-2 text-center">Thời gian thanh toán</th>
                  <th className="px-4 py-2 text-center">Loại vé</th>
                  <th className="px-4 py-2 text-center">Tổng tiền</th>
                  <th className="px-4 py-2 text-center">Trạng thái thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {(invoices && invoices.length > 0) && invoices.map((invoice, index) => (
                  <tr key={index} className="border-b border-slate-200 text-[19px] ">
                    <td className="px-1 py-3 text-center">{invoice.invoiceDetails.invoiceCode}</td>
                    <td className="px-1 py-3 text-center">{invoice.invoiceDetails.fullname}</td>
                    <td className="px-1 py-3 text-center">{invoice.invoiceDetails.email}</td>
                    <td className="px-1 py-3 text-center">{invoice.invoiceDetails.phoneNumber}</td>
                    <td className="px-1 py-3 text-center">{`${DateTime.GetTime(invoice.invoiceDetails.createdAt)} ${DateTime.GetDate2(invoice.invoiceDetails.createdAt)}`}</td>
                    <td className="px-1 py-3 text-center">
                     {renderTextTypeTicket(invoice.ticketsPurchase)}
                    </td>
                    <td className="px-4 py-3 text-center">{convertMoney(invoice.invoiceDetails.totalPrice ?? 0)}</td>
                    <td className="px-4 py-3 text-center">
                    <span className="text-green-500">Thành công</span>
                      {/* {customer.paymentStatus === "Paid" ? (
                        <span className="text-green-500">Thành công</span>
                      ) : (
                        <span className="text-yellow-500">Pending</span>
                      )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
              

            </table>
            
          )}
          {invoices && invoices.length === 0 && <div style={{height:300,width:'100%'}} className="flex justify-center items-center">
                <h5>Không có đơn hàng nào</h5>
          </div>}
        </div>
        <SpaceComponent height={30}/>
        <PaginationComponent  currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}  />
      <LoadingModal visible={isLoading}/>
    </motion.div>
    </div>
  );
};

export default OrderPage;
