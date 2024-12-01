import { motion } from "framer-motion";
import { CircularOrogressComponent, RowComponent } from "../../../../../components";
import { ReactNode } from "react";
import { convertMoney } from "../../../../../utils/convertMoney";

const CardItem = ({ item, variants }: { item: {
  title:string,
  value1:number,
  value2:number,
  icon:ReactNode,
  type:'revenue' | 'ticketSold' | 'check-in'
}; variants: any }) => {
  const renderTextValue2 = (type:'revenue' | 'ticketSold' | 'check-in',value2:number)=>{
    if(type==='revenue'){
      return `Tổng: ${convertMoney(value2)}`
    }else if(type==='check-in'){
      return `Đã bán: ${value2} vé`
    }else if(type==='ticketSold'){
      return `Tổng: ${value2} vé`
    }
  }
  const renderpercentage = (value1:number,value2:number)=>{
    if(value2 === 0 ){
      return 0
    }
    else if( value1 === 0 && value2 === 0)
    {
      return 0
    }
    return (item.value1 / item.value2)*100
  }
  return (
    <motion.div
      variants={variants}
      className="flex w-full sm:w-[700px] flex-col gap-6 rounded-xl bg-gray-800 p-6 dark:bg-gray-700 dark:text-gray-300 sm:flex-1 h-auto min-h-[200px]"
    >
      <RowComponent styles={{ justifyContent: 'space-between' }}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            {item.icon}
            <h3 className="font-medium text-gray-100">{item.title}</h3> {/* Tiêu đề */}
          </div>
          <h2 className="text-2xl	 font-bold text-gray-100">{item.type==='revenue' ? convertMoney(item.value1) : `${item.value1} vé`} </h2> {/* Giá trị */}
          <h2 className="text-lg font-medium text-gray-300">{renderTextValue2(item.type,item.value2)}</h2> {/* Tổng giá trị */}
        </div>
        <CircularOrogressComponent percentage={renderpercentage(item.value1 ,item.value2)}/>

      </RowComponent>
    </motion.div>
  );
};

export default CardItem;
