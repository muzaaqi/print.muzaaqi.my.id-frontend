import Button from "./Button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { HiDocumentMinus } from "react-icons/hi2";
import { HiDocumentText } from "react-icons/hi2";

type ServiceCardProps = {
  serviceName: string;
  serviceSlug: string;
  imageUrl: string;
  remainingStock: number;
  priceOneSide: number;
  priceTwoSides: number;
  priceOneColor: number;
  priceColorTwoSides: number;
  colorSet: {
    card: string;
    text: string;
    type: string;
    btn: string;
  };
};

const ServiceCard = (props: ServiceCardProps) => {
  const {
    serviceName,
    serviceSlug,
    imageUrl,
    remainingStock,
    priceOneSide,
    priceTwoSides,
    priceOneColor,
    priceColorTwoSides,
    colorSet,
  } = props;
  
  return (
    <div className={`border-2 bg-white rounded-lg pb-2 shadow-md items-center ${colorSet.card} hover:shadow-lg hover:scale-105 transition-all duration-300`}>
      <div className="flex justify-center items-center p-4">
        <img
          src={`${imageUrl}`}
          alt="Service"
          className=" h-64 object-cover rounded-md mb-2 hover:scale-110 transition-all duration-500 cursor-pointer"
        />
      </div>
      <div className=" justify-center items-center flex flex-col">
        <h2 className={`text-2xl font-bold ${colorSet.text}`}>{serviceName}</h2>
      </div>
      <div className="flex flex-col items-center p-3">
        <span className="text-sm font-medium text-gray-500">Kertas Tersisa</span>
        <span className={`text-lg font-bold ${colorSet.text} px-2 py-1 justify-self-center rounded-lg mt-1 hover:scale-110 transition-all duration-300 cursor-pointer`}>
          {remainingStock} Lembar
        </span>
      </div>
      <div className={`flex flex-col items-center min-w-[318px] mx-5 text-gray-700 rounded-lg p-3 ${colorSet.type}`}>
        <div className="flex justify-between items-center p-2 w-full hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center">
            <HiDocumentMinus />
            <span className="ml-2 text-sm">B&W</span>
          </div>
          <span className="ml-2 text-sm hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
            Rp.{priceOneSide.toLocaleString()},00/lbr
          </span>
        </div>
        <div className="flex justify-between items-center p-2 w-full hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center">
            <HiDocumentText />
            <span className="ml-2 text-sm"> B&W Dua Sisi</span>
          </div>
          <span className="ml-2 text-sm hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
            Rp.{priceTwoSides.toLocaleString()},00/lbr
          </span>
        </div>
        <div className="flex justify-between items-center p-2 w-full hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center">
            <HiDocumentMinus />
            <span className="ml-2 text-sm hover:bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text hover:text-transparent transition-all duration-500">
              Warna
            </span>
          </div>
          <span className="ml-2 text-sm hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
            Rp.{priceOneColor.toLocaleString()},00/lbr
          </span>
        </div>
        <div className="flex justify-between items-center p-2 w-full hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center">
            <HiDocumentText />
            <span className="ml-2 text-sm hover:bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text hover:text-transparent transition-all duration-500">
              Warna Dua Sisi
            </span>
          </div>
          <span className="ml-2 text-sm hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
            Rp.{priceColorTwoSides.toLocaleString()},00/lbr
          </span>
        </div>
      </div>
      <div className="p-4 mt-2 flex justify-center">
        <Button
          icon={<HiArrowTopRightOnSquare />}
          text="Checkout"
          toDestination={`/checkout/${serviceSlug}`}
          className={`text-white rounded-full px-6 py-2 ${colorSet.btn}`}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
