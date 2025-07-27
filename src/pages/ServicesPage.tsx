import ServiceCard from "../components/ServiceCard"

const ServicesPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Our Services</h1>
      <p className="text-lg text-center mt-5">
        We offer a variety of printing services to meet your needs.
      </p>
      <div className="mt-10 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  )
}

export default ServicesPage
