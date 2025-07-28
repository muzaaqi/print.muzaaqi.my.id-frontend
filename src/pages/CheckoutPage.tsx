import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen md:px-15">
      {/* <div className="p-5">
        <h1 className="text-4xl font-bold text-center mt-10">Checkout</h1>
        <p className="text-lg text-center mt-5">
          Please review your order details below.
        </p>
      </div> */}
      <div className="mt-10 flex bg-emerald-200/50 rounded-lg shadow-emerald-400/50 shadow-lg">
        <CheckoutForm/>
        <div className="w-1/2 justify-center py-20 px-15 xl:px-30 hidden lg:flex">
          <div className="w-full p-5 border-3 bg-white border-emerald-400 rounded-lg shadow-md">
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
