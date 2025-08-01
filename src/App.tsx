import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import CheckoutPage from "./pages/CheckoutPage"
import AxiosInstance from "./lib/AxiosInstance";
import useSWR from "swr";
import AdminPages from "./pages/AdminPages";
import NotFoundPage from "./pages/NotFoundPage";

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
      <Route path="/:serviceId/checkout" element={<CheckoutPage />} />
      <Route path="/admin/" element={<AdminPages />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
