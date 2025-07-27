type StockCardProps = {
  productName: string;
  stockCount: number;
  colorSet: {
    card: string;
    text: string;
    stock: string;
    type: string;
    btn: string;
  };
};

const StockCard = (props: StockCardProps) => {
  const { productName, stockCount, colorSet } = props;
  return (
    <div className={`border-2 flex flex-col w-50 h-50 p-4 rounded-lg justify-center items-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${colorSet.card}`}>
      <h3 className={`text-2xl font-bold ${colorSet.text}`}>{productName}</h3>
      <span className="text-sm mt-3 font-medium text-gray-500">Stok Tersisa:</span>
      <div className={`mt-2 rounded-full self-center p-2 w-1/2 text-center ${colorSet.stock}`}>
        <span className="font-bold">{stockCount}</span>
      </div>
    </div>
  );
}

export default StockCard
