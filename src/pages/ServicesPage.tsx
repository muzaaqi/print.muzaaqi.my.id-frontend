import ServiceCard from "../components/ServiceCard"

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
}
const ServicesPage = (props: ServicesPageProps) => {
  const { services } = props;
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Our Services</h1>
      <p className="text-lg text-center mt-5">
        We offer a variety of printing services to meet your needs.
      </p>
      <div className="mt-10 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {services.map((service) => (
          <ServiceCard
            key={service.serviceId}
            serviceName={service.serviceName}
            serviceSlug={service.serviceName.toLowerCase().replace(/\s+/g, '-')}
            imageUrl={service.imageUrl}
            remainingStock={service.remainingStock}
            priceOneSide={service.priceOneSide}
            priceTwoSides={service.priceTwoSides}
            priceOneColor={service.priceOneColor}
            priceColorTwoSides={service.priceColorTwoSides}
          />
        ))}
      </div>
    </div>
  )
}

export default ServicesPage
