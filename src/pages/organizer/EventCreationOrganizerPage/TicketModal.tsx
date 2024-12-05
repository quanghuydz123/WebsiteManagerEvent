import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Style,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5';
import { initTypeTicket, TypeTicketModel } from "../../../models/TypeTicketModel";
import { DateTime } from "../../../utils/DateTime";
import { SpaceComponent } from "../../../components";
import { ShowTimeModel } from "../../../models/ShowTimeModel";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type:'create' | 'update',
  onSubmit:(val:TypeTicketModel)=>void,
  value:TypeTicketModel,
  showTimeSelected:ShowTimeModel
}

const TicketModal: React.FC<ModalProps> = ({ isOpen, onClose,onSubmit ,type,value,showTimeSelected}) => {
  const editorConfig: any = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'findAndReplace',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'removeFormat',
        '|',
        'specialCharacters',
        'link',
        'mediaEmbed',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Mention,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Style,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo
    ],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage'
      ],


    },

    initialData: '',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ]
        }
      ]
    },
    placeholder: 'Nhập thông tin vé...',
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category']
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title']
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle']
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box']
        },
        {
          name: 'Side quote',
          element: 'blockquote',
          classes: ['side-quote']
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker']
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler']
        },
        {
          name: 'Code (dark)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-dark']
        },
        {
          name: 'Code (bright)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-bright']
        }
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
  };
  const [isFree, setIsFree] = useState(false);
  // const [price, setPrice] = useState("");
  // const [ticketName, setTicketName] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [ticketNameError, setTicketNameError] = useState("");
  // const [quantityError, setQuantityError] = useState("");
  // const [dateError, setDateError] = useState("");
  const [typeTicket,setTypeTicket] = useState<TypeTicketModel>(initTypeTicket)
  const [errorMessage,setErrorMessage] = useState('')
  useEffect(()=>{
    if(type==='update'){
      setTypeTicket(value)
    }else{
      setTypeTicket(initTypeTicket)
    }
  },[value,isOpen])
  // Kiểm tra tên vé có vượt quá 50 ký tự
  // const handleTicketNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setTicketName(value);

  //   // if (value.length > 50) {
  //   //   setTicketNameError("Quá ký tự yêu cầu");
  //   // } else {
  //   //   setTicketNameError("");
  //   // }
  // };

  // // Kiểm tra tổng số lượng vé là số
  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuantity(value);

  //   // if (isNaN(Number(value)) || Number(value) <= 0) {
  //   //   setQuantityError("Số lượng vé phải là số lớn hơn 0");
  //   // } else {
  //   //   setQuantityError("");
  //   // }
  // };

  // // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
  // const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setEndDate(value);

  //   // if (startDate && new Date(value) <= new Date(startDate)) {
  //   //   setDateError("Thời gian kết thúc phải sau thời gian bắt đầu");
  //   // } else {
  //   //   setDateError("");
  //   // }
  // };

  useEffect(() => {
    // Nếu checkbox "miễn phí" được chọn, giá vé phải là 0
    if (isFree) {
      setTypeTicket(prev => {
        return {
          ...prev,
          price:0,
          type:'Free'
        }
      })
    }
  }, [isFree]);

  if (!isOpen) return null;

  const handleFreeChange = () => {
    setIsFree(!isFree);
  };
 
  const handleSubmit = ()=>{
    let error = ''
    if(new Date(typeTicket.startSaleTime) > new Date(typeTicket.endSaleTime)){
      error = 'Thời gian kết thúc bán phải lớn hơn thời gian bắt đầu bán !!!'
    }else{
      if(new Date(showTimeSelected.startDate) < new Date(typeTicket.endSaleTime)){
        error = 'Thời gian kết thúc bán vé phải nhỏ hơn thời gian bắt đầu của suất diễn'
      }
    }
    if(typeTicket.name === ''){
      error = 'Hãy nhập tên vé !!!'

    }
    setErrorMessage(error)
    if(error === ''){
        setTypeTicket(initTypeTicket)
        onSubmit(typeTicket)

        onClose()
    }
   
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container with rounded corners */}
      <div className="bg-gray-800 text-white w-full max-w-7xl rounded-xl shadow-lg text-lg overflow-y-auto max-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-600 sticky top-0 bg-gray-800 z-10 rounded-t-xl">
          <h2 className="text-2xl font-semibold">Tạo loại vé mới</h2>
          <button
            onClick={()=>{
              setTypeTicket(initTypeTicket)
              setErrorMessage('')
              onClose()
            }}
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
              value={typeTicket.name}
              onChange={(e)=>{
                setTypeTicket(prev => {
                  return {
                    ...prev,
                    name:e.target.value
                  }
                })
              }}
              className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
            />
            {/* <div className="text-right text-sm text-gray-400">
              {ticketName.length} / 50
            </div>
            {ticketNameError && (
              <div className="text-sm text-red-500">{ticketNameError}</div>
            )} */}
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
                  value={typeTicket.price}
                  onChange={(e) => {
                    setTypeTicket(prev => {
                      return {
                        ...prev,
                        price:Number(e.target.value)
                      }
                    })
                  }}
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
                value={typeTicket.amount}
                onChange={(e)=>{
                  setTypeTicket(prev =>{
                    return {
                      ...prev,
                      amount:Number(e.target.value)
                    }
                  })
                }}
                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
              />
              {/* {quantityError && (
                <div className="text-sm text-red-500">{quantityError}</div>
              )} */}
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
                value={DateTime.formatLocalDateTime(typeTicket.startSaleTime)}
                onChange={(e) => {
                  setTypeTicket(prev =>{
                    return {
                      ...prev,
                      startSaleTime:new Date(e.target.value)
                    }
                  })
                }}
                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                <span className="text-red-500">*</span> Thời gian kết thúc bán vé
              </label>
              <input
                type="datetime-local"
                value={DateTime.formatLocalDateTime(typeTicket.endSaleTime)}
                onChange={(e) => {
                  setTypeTicket(prev =>{
                    return {
                      ...prev,
                      endSaleTime:new Date(e.target.value)
                    }
                  })
                }}
                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
              />
              {/* {dateError && (
                <div className="text-sm text-red-500">{dateError}</div>
              )} */}
            </div>
          </div>

          {/* Thông tin vé */}
          <div>
            <label className="block font-semibold mb-2">Thông tin vé</label>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={typeTicket.description}
                onChange={(event, editor) => {
                  setTypeTicket(prev =>{
                    return {
                      ...prev,
                      description:editor.getData()
                    }
                  })
                }}

              />
            {/* <div className="text-right text-sm text-gray-400">0 / 1000</div> */}
          </div>
        </div>
        {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}
        <SpaceComponent height={8}/>
        {/* Footer */}
        <div className="p-6 border-t border-gray-600 rounded-b-xl">
          <button onClick={()=>handleSubmit()} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-xl">
            {type==='create' ? 'Thêm' : 'Cập nhập'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
