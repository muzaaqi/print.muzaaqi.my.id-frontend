

const StockCard = () => {
  return (
    <div className="border-2 flex flex-col border-emerald-400 backdrop-blur-xs w-50 h-50 p-4 rounded-lg shadow-emerald-400 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold">Product Name</h3>
      <p className="text-gray-600">Product Description</p>
      <div className="mt-2 rounded-full bg-emerald-100 self-center  p-2 w-1/2 text-center">
        <span className="text-emerald-400 font-bold ">10</span>
      </div>
    </div>
  );
}

export default StockCard
