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
}

const ServiceCard = (props: ServiceCardProps) => {
  const { serviceName, serviceSlug, imageUrl, remainingStock, priceOneSide, priceTwoSides, priceOneColor, priceColorTwoSides } = props;
  return (
    <div className="border-2 bg-white border-emerald-400 rounded-lg shadow-md h-[69vh] shadow-emerald-400/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex justify-center items-center p-4">
        <img
          src={`${imageUrl}`}
          alt="Service"
          className=" h-64 object-cover rounded-md mb-2 hover:scale-110 transition-all duration-500 cursor-pointer"
        />
      </div>
      <div className=" justify-center items-center flex flex-col">
        <h2 className="text-2xl font-bold text-emerald-400">{serviceName}</h2>
      </div>
      <div className="flex flex-col items-center p-3">
        <span className="text-sm text-gray-500">Kertas Tersisa</span>
        <span className="text-lg font-bold text-red-400 px-2 py-1 justify-self-center rounded-lg mt-1 hover:scale-110 transition-all duration-300 cursor-pointer">
          {remainingStock} Lembar
        </span>
      </div>
      <div className="flex flex-col items-center mx-5 bg-emerald-100/50 text-gray-700 rounded-lg p-3">
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
          className="text-white rounded-full px-6 py-2"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
