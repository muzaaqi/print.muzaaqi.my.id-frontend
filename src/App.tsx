import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import CheckoutPage from "./pages/CheckoutPage"
import AxiosInstance from "./lib/AxiosInstance";
import useSWR from "swr";
import AdminPages from "./pages/AdminPages";

// const services = [
//   {
//     serviceName: "Kertas B5",
//     imageUrl: "https://imgur.com/7bASFib.png",
//     remainingStock: 10,
//     priceOneSide: 600,
//     priceTwoSides: 1000,
//     priceOneColor: 1200,
//     priceColorTwoSides: 2000,
//   },
//   {
//     serviceName: "Kertas A5",
//     remainingStock: 9,
//     priceOneSide: 600,
//     priceTwoSides: 1000,
//     priceOneColor: 1200,
//     priceColorTwoSides: 2000,
//     imageUrl: "https://imgur.com/UJ4ReCC.png",
//   },
//   {
//     serviceName: "Kertas A4",
//     remainingStock: 15,
//     priceOneSide: 600,
//     priceTwoSides: 1000,
//     priceOneColor: 1200,
//     priceColorTwoSides: 2000,
//     imageUrl: "https://imgur.com/IffA4uV.png",
//   },
//   {
//     serviceName: "Kertas Photo",
//     remainingStock: 20,
//     priceOneSide: 600,
//     priceTwoSides: 1000,
//     priceOneColor: 1200,
//     priceColorTwoSides: 2000,
//     imageUrl: "https://imgur.com/J18j9oK.png",
//   },
// ];

function App() {
  const fetchServices = async () => {
    const response = await AxiosInstance.get("/services");
    return response.data;
  };

  const { data } = useSWR('services', fetchServices, {
    refreshInterval: 10000, // Refresh every 10 seconds
    revalidateOnFocus: true, // Revalidate when the window is focused
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage services={data} />} />
      <Route path="/services" element={<ServicesPage services={data} />} />
      <Route path="/checkout/:serviceId" element={<CheckoutPage />} />
      <Route path="/admin/" element={<AdminPages />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
