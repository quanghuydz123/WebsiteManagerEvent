import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

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

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Toàn Đặng",
    phone: "357949625",
    email: "dtoan1612@gmail.com",
    province: "",
    district: "",
    ward: "",
    gender: "Nam",
  });

  const [avatar, setAvatar] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/?depth=1");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
          );
          setDistricts(response.data.districts || []);
          setWards([]);
          setFormData({ ...formData, district: "", ward: "" });
        } catch (error) {
          console.error("Error fetching districts:", error);
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
          const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
          );
          setWards(response.data.wards || []);
          setFormData({ ...formData, ward: "" });
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setFormData({ ...formData, province: provinceCode });
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setFormData({ ...formData, district: districtCode });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-300">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-md p-6 sm:p-8">
        <div className="flex justify-center relative">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={avatar || "https://via.placeholder.com/96x96"}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-4 border-green-500"
            />
            <label
              htmlFor="avatarInput"
              className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer hover:bg-green-600"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.5 13.8V17h3.2l9.4-9.4-3.2-3.2L2.5 13.8zM17.7 6.3a1 1 0 000-1.4l-2.6-2.6a1 1 0 00-1.4 0L12 4.6l3.2 3.2 2.5-2.5z" />
              </svg>
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">Tỉnh/Thành</label>
            <select
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none"
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
            <label className="block text-gray-700 text-sm font-semibold">Quận/Huyện</label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
              className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">Phường/Xã</label>
            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              disabled={!selectedDistrict}
              className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Chọn Phường/Xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">Giới tính</label>
            <div className="flex space-x-4 mt-2">
              {['Nam', 'Nữ', 'Khác'].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="form-radio text-green-500"
                  />
                  <span className="ml-2 text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 text-white text-xl font-semibold rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
          >
            Hoàn thành
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
