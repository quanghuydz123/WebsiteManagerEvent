import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
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
import EventCreationTimePage from '../../EventCreationOrganizerPage/EventCreationTimePage';
import categoryAPI from '../../../../apis/categoryAPI';
import { apis } from '../../../../constrants/apis';
import { CategoryModel } from '../../../../models/CategoryModel';
import { DataEventCreate } from '../../EventCreationOrganizerPage/EventCreationOrganizerPage';

interface Province {
  code: number;
  name: string;
}

interface District {
  code: number;
  name: string;
}

interface Ward {
  code: number;
  name: string;
}

const EditPage: React.FC = () => {
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
    placeholder: 'Type or paste your content here!',
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentStep = new URLSearchParams(location.search).get('step') || '1';
  const isStep1 = currentStep === '1';
  const isStep2 = currentStep === '2';

  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [eventBackground, setEventBackground] = useState<File | null>(null);


  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [dataEventCreate, setDataEventCreate] = useState<DataEventCreate>({
    idUser:'',
    event:{
      addressDetails:{
        districts:{
          code:0,
          name:''
        },
        province:{
          code:0,
          name:''
        },
        ward:{
          code:0,
          name:''
        },
        houseNumberAndStreet:''
      },
      category:'',
      description:"<p><strong>Giới thiệu sự kiện:</strong></p><p>[Tóm tắt ngắn gọn về sự kiện: Nội dung chính của sự kiện, điểm đặc sắc nhất và lý do khiến người tham gia không nên bỏ lỡ]</p><p><strong>Chi tiết sự kiện:</strong></p><ul><li><strong>Chương trình chính:</strong> [Liệt kê những hoạt động nổi bật trong sự kiện: các phần trình diễn, khách mời đặc biệt, lịch trình các tiết mục cụ thể nếu có.]</li><li><strong>Khách mời:</strong> [Thông tin về các khách mời đặc biệt, nghệ sĩ, diễn giả sẽ tham gia sự kiện. Có thể bao gồm phần mô tả ngắn gọn về họ và những gì họ sẽ mang lại cho sự kiện.]</li><li><strong>Trải nghiệm đặc biệt:</strong> [Nếu có các hoạt động đặc biệt khác như workshop, khu trải nghiệm, photo booth, khu vực check-in hay các phần quà/ưu đãi dành riêng cho người tham dự.]</li></ul><p><strong>Điều khoản và điều kiện:</strong></p><p>[TnC] sự kiện</p><p>Lưu ý về điều khoản trẻ em</p><p>Lưu ý về điều khoản VAT</p>",
      Location:'',
      photoUrl:'',
      position:{
        lat:0,
        lng:0
      },
      title:''
    },
    showTimes:[]
  })
  // Tiến hành chuyển sang Bước 2 khi nhấn nút "Tiếp tục"
  const [categories,setCategories] = useState<CategoryModel[]>([])
  const handleNextStep = () => {
    if (isStep1) {
      navigate('/organizer/EventPage/:idEvent/Edit?step=2'); // Go to Step 2
    }
  };
  const handleStepClick = (step: number) => {
    navigate(`/organizer/EventPage/:idEvent/Edit?step=${step}`);
  };


  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
    handleCallAPIGetCategories()
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
          setDistricts(response.data.districts || []);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
          setWards(response.data.wards || []);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateImageDimensions(file, 1280, 720, (isValid) => {
        if (isValid) {
          setEventBackground(file);

        } else {
          setEventBackground(null);
          alert('Ảnh nền phải có kích thước 1280x720 pixel.');
        }
      });
    }
  };
  const handleCallAPIGetCategories = async ()=>{
    const api = apis.category.getAll()
    try {
      const res = await categoryAPI.HandleCategory(api)
      if(res && res.data && res.status === 200){
        setCategories(res.data)
      }
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi gi get category",errorMessage.statusCode)
    }
  }
  const validateImageDimensions = (
    file: File,
    width: number,
    height: number,
    callback: (isValid: boolean) => void
  ) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width === width && img.height === height) {
        callback(true);
      } else {
        callback(false);
      }
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (

    <div className="min-h-screen bg-custom-gradient text-white">

      {/* Navigation Step Bar */}
      <div className="px-4 py-2 flex flex-wrap justify-between items-center  text-white">
        <div>
          <h1 className="text-lg md:text-3xl font-semibold">Tạo sự kiện</h1>
        </div>
        {/* Step Bar */}
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mt-2 md:mt-0 text-xl">
          {[
            { step: 1, label: "Thông tin sự kiện" },
            { step: 2, label: "Thời gian & Loại vé" },

          ].map(({ step, label }) => (
            <div
              key={step}
              onClick={() => handleStepClick(step)}
              className={`flex items-center ${step !== +currentStep ? "hidden md:flex" : "flex"
                }`}
            >
              <span
                className={`${step === +currentStep ? "bg-green-500" : "bg-gray-700"
                  } text-white rounded-full w-8 h-8 flex items-center justify-center`}
              >
                {step}
              </span>
              <span className="ml-2 text-xl ">{label}</span>
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="flex space-x-2 md:space-x-4 mt-2 md:mt-0">
          <button className="bg-gray-700 text-white px-2 md:px-4 py-2 rounded-md text-xl">
            Lưu
          </button>
          <button onClick={handleNextStep}
            className={`bg-green-600 text-white px-2 md:px-4 py-2 rounded-md text-xl ${isStep2 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isStep2} >
            Tiếp tục
          </button>
        </div>
      </div>


      {/* Step 1: Event Information */}
      {isStep1 && (
        <div className="p-4 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
            {/* Image Upload Section */}
            <div className="bg-customGray p-4 md:p-6 rounded-lg flex flex-col justify-center">
              <label className="font-medium text-white">
                <span className="text-red-500">*</span> Upload hình ảnh
              </label>
              <section className="flex justify-center">
                {/* Event Background Upload */}
                <div className="bg-customGray2 border border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center text-center w-full h-52 md:w-[900px] md:h-[400px] relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {eventBackground ? (
                    <img
                      src={URL.createObjectURL(eventBackground)}
                      alt="Event Background Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <span className="text-white font-bold">Thêm ảnh nền sự kiện</span>
                      <p className="text-white font-bold">(1280x720)</p>
                    </>
                  )}
                </div>
              </section>
            </div>

            {/* Event Name */}
            <div className="bg-customGray p-4 md:p-6 rounded-lg">
              <label className="font-medium text-white">
                <span className="text-red-500">*</span> Tên sự kiện
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full mt-2 p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black"
                placeholder="Tên sự kiện"
              />
            </div>

            {/* Event Location */}
            <div className="bg-customGray p-4 md:p-6 rounded-lg space-y-4">
              <label className="font-medium text-white block mb-2">
                <span className="text-red-600">*</span> Địa chỉ sự kiện:
              </label>
              <div className="mb-4">
                <label className="font-medium text-white block mb-2">
                  <span className="text-red-500">*</span> Tên địa điểm
                </label>
                <input
                  type="text"
                  className="w-full p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black"
                  placeholder="Tên địa điểm"
                  maxLength={80}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Tỉnh/Thành</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setSelectedDistrict('');
                    }}
                    className="w-full p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black"
                  >
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Quận/Huyện</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedProvince}
                    className="w-full p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black disabled:bg-gray-600"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Phường/Xã</label>
                  <select
                    disabled={!selectedDistrict}
                    className="w-full p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black disabled:bg-gray-600"
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="block mb-1">* Số nhà, đường</label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 md:p-3 bg-white border border-gray-500 rounded-lg text-black"
                    placeholder="Số nhà, đường"
                    maxLength={90}
                  />
                  <div
                    className={`absolute bottom-1 right-2 text-sm ${inputValue.length > 90 ? 'text-red-500' : 'text-gray-400'
                      }`}
                  >
                    {inputValue.length} / 90
                  </div>
                </div>
              </div>
            </div>

            {/* Event Type */}
            <div className="bg-customGray p-4 md:p-6 rounded-lg">
              <label className="font-medium text-white">
                <span className="text-red-500">*</span> Thể loại sự kiện
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full mt-2 p-2 md:p-3 bg-white bg-gray-800/70 border border-gray-500 rounded-lg text-black"
              >
                <option value="">Vui lòng chọn</option>
                {categories.map((category)=>{
                  return <option value={`${category._id}`}>{category.name}</option>
                })}
              </select>
            </div>

            {/* Event Description */}
            <div className="bg-customGray p-4 md:p-6 rounded-lg">
              <label className="font-medium text-white">
                <span className="text-red-500">*</span> Mô tả sự kiện
              </label>
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={"<p><strong>Giới thiệu sự kiện:</strong></p><p>[Tóm tắt ngắn gọn về sự kiện: Nội dung chính của sự kiện, điểm đặc sắc nhất và lý do khiến người tham gia không nên bỏ lỡ]</p><p><strong>Chi tiết sự kiện:</strong></p><ul><li><strong>Chương trình chính:</strong> [Liệt kê những hoạt động nổi bật trong sự kiện: các phần trình diễn, khách mời đặc biệt, lịch trình các tiết mục cụ thể nếu có.]</li><li><strong>Khách mời:</strong> [Thông tin về các khách mời đặc biệt, nghệ sĩ, diễn giả sẽ tham gia sự kiện. Có thể bao gồm phần mô tả ngắn gọn về họ và những gì họ sẽ mang lại cho sự kiện.]</li><li><strong>Trải nghiệm đặc biệt:</strong> [Nếu có các hoạt động đặc biệt khác như workshop, khu trải nghiệm, photo booth, khu vực check-in hay các phần quà/ưu đãi dành riêng cho người tham dự.]</li></ul><p><strong>Điều khoản và điều kiện:</strong></p><p>[TnC] sự kiện</p><p>Lưu ý về điều khoản trẻ em</p><p>Lưu ý về điều khoản VAT</p>"}
                onChange={(event, editor) => {
                  console.log(editor.getData())
                }}

              />
            </div>

            {/* Submit Button */}
              {/* <div className="text-right">
                <button
                  type="submit"
                className="bg-green-600 px-4 md:px-6 py-3 rounded-md font-semibold hover:bg-green-700"
              >
                Tiếp tục
              </button>
            </div> */}
          </form>
        </div>
      )}
      {/* Step 2: Time & Ticket Type */}
      {isStep2 && (
        <EventCreationTimePage
          dataEventCreate={dataEventCreate}
          setDataEventCreate={setDataEventCreate}
        />
      )}
    </div>

  );

};

export default EditPage;
