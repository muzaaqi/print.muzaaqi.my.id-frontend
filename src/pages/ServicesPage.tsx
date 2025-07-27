import ServiceCard from "../components/ServiceCard";

type ServicesPageProps = {
  services: {
    serviceId: string;
    serviceName: string;
    imageUrl: string;
    remainingStock: number;
    priceOneSide: number;
    priceTwoSides: number;
    priceOneColor: number;
    priceColorTwoSides: number;
  }[];
};
const ServicesPage = (props: ServicesPageProps) => {
  const { services } = props;
  return (
    <div className="min-h-screen pb-20 items-center">
      <h1 className="text-4xl font-bold text-center mt-10">Our Services</h1>
      <p className="text-lg text-center mt-5">
        We offer a variety of printing services to meet your needs.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-20">
        {services.map((service) => (
          <ServiceCard
            key={service.serviceId}
            serviceName={service.serviceName}
            serviceSlug={service.serviceName.toLowerCase().replace(/\s+/g, "-")}
            imageUrl={service.imageUrl}
            remainingStock={service.remainingStock}
            priceOneSide={service.priceOneSide}
            priceTwoSides={service.priceTwoSides}
            priceOneColor={service.priceOneColor}
            priceColorTwoSides={service.priceColorTwoSides}
            colorSet={{
              card: service.remainingStock < 10
                ? "border-red-400/50 shadow-red-400/50"
                : "border-emerald-400 shadow-emerald-400",
              text: service.remainingStock < 10
                ? "text-red-400"
                : "text-emerald-400",
              type: service.remainingStock < 10
                ? "bg-red-100/50"
                : "bg-emerald-100/50",
              btn: service.remainingStock < 10
                ? "bg-red-400 shadow-red-400/50 hover:bg-red-500"
                : "bg-emerald-400 shadow-emerald-400/50 hover:bg-emerald-500"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
