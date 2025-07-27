import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import CheckoutPage from "./pages/CheckoutPage"

const services = [
  {
    serviceId: "b5-paper",
    serviceName: "Kertas B5",
    imageUrl: "https://imgur.com/7bASFib.png",
    remainingStock: 10,
    priceOneSide: 600,
    priceTwoSides: 1000,
    priceOneColor: 1200,
    priceColorTwoSides: 2000,
  },
  {
    serviceId: "a5-paper",
    serviceName: "Kertas A5",
    imageUrl: "https://imgur.com/UJ4ReCC.png",
    remainingStock: 9,
    priceOneSide: 600,
    priceTwoSides: 1000,
    priceOneColor: 1200,
    priceColorTwoSides: 2000,
  },
  {
    serviceId: "a4-paper",
    serviceName: "Kertas A4",
    imageUrl: "https://imgur.com/IffA4uV.png",
    remainingStock: 15,
    priceOneSide: 600,
    priceTwoSides: 1000,
    priceOneColor: 1200,
    priceColorTwoSides: 2000,
  },
  {
    serviceId: "photo-paper",
    serviceName: "Kertas Photo",
    imageUrl: "https://imgur.com/J18j9oK.png",
    remainingStock: 20,
    priceOneSide: 600,
    priceTwoSides: 1000,
    priceOneColor: 1200,
    priceColorTwoSides: 2000,
  },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage services={services} />} />
      <Route path="/services" element={<ServicesPage services={services}/>} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
