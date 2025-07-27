
const CheckoutPage = () => {
  return (
    <div>
      <div className="p-5">
        <h1 className="text-4xl font-bold text-center mt-10">Checkout</h1>
        <p className="text-lg text-center mt-5">Please review your order details below.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="w-full h-[60vh] p-5 border-2 border-emerald-400 shadow-emerald-400/50 hover:shadow-lg rounded-lg shadow-md">
          <form>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 w-full" />
          </form>
        </div>
        <div className="mt-10 flex justify-center">

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
