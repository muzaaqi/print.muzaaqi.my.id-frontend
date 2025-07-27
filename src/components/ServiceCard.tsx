import Button from "./Button";

const ServiceCard = () => {
  return (
    <div className="border-2 border-emerald-400 rounded-lg shadow-md h-[60vh] shadow-emerald-400 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div>
        <img
          src="https://www.rainbow-creations.co.uk/images/user/18-100620184837.jpg"
          alt="Service"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Service 1</h2>
        <p className="text-gray-600">Description of Service 1</p>
      </div>
      <div className="p-4">
        <Button text="Checkout" className=" text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"/>
      </div>
    </div>
  );
}

export default ServiceCard
