import Button from "./Button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { HiDocumentMinus } from "react-icons/hi2";

const ServiceCard = () => {
  return (
    <div className="border-2 border-emerald-400 rounded-lg shadow-md h-[65vh] shadow-emerald-400/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div>
        <img
          src="https://www.rainbow-creations.co.uk/images/user/18-100620184837.jpg"
          alt="Service"
          className="w-full h-64 object-cover rounded-md mb-2"
        />
      </div>
      <div className=" justify-center items-center flex flex-col">
        <h2 className="text-xl font-semibold">Service 1</h2>
      </div>
      <div className="flex flex-col items-center p-4">
        <span className="text-sm text-gray-500">Kertas Tersisa</span>
        <span className="text-lg font-bold text-emerald-400">10</span>
      </div>
      <div className="flex flex-col items-center mx-5 bg-emerald-100 rounded-lg p-3">
        <div className="flex justify-between items-center p-2 w-full">
          <div className="flex items-center">
            <HiDocumentMinus />
            <span className="ml-2 text-sm">B&W</span>
          </div>
          <span className="ml-2 text-sm">Rp.600,00/lbr</span>
        </div>
        <div className="flex justify-between items-center p-2 w-full">
          <div className="flex items-center">
            <HiDocumentMinus />
            <span className="ml-2 text-sm"> B&W Dua Sisi</span>
          </div>
          <span className="ml-2 text-sm">Rp.600,00/lbr</span>
        </div>
        <div className="flex justify-between items-center p-2 w-full">
          <div className="flex items-center">
            <HiDocumentMinus />
            <span className="ml-2 text-sm">Warna </span>
          </div>
          <span className="ml-2 text-sm">Rp.600,00/lbr</span>
        </div>
        <div className="flex justify-between items-center p-2 w-full">
          <div className="flex items-center">
            <HiDocumentMinus />
            <span className="ml-2 text-sm">Warna Dua Sisi</span>
          </div>
          <span className="ml-2 text-sm">Rp.600,00/lbr</span>
        </div>
      </div>
      <div className="p-4 mt-2 flex justify-center">
        <Button
          icon={<HiArrowTopRightOnSquare />}
          text="Checkout"
          className=" text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
