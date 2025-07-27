import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import CheckoutPage from "./pages/CheckoutPage"


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
