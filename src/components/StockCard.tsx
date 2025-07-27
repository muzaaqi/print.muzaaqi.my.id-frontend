type StockCardProps = {
  productName: string;
  stockCount: number;
};

const StockCard = (props: StockCardProps) => {
  const { productName, stockCount } = props;
  return (
    <div className="border-2 flex flex-col border-emerald-400 w-50 h-50 p-4 rounded-lg justify-center items-center shadow-emerald-400 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold">{productName}</h3>
      <div className="mt-5 rounded-full bg-emerald-100 self-center  p-2 w-1/2 text-center">
        <span className="text-emerald-400 font-bold ">{stockCount}</span>
      </div>
    </div>
  );
}

export default StockCard
