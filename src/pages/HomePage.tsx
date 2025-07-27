import SplitText from "../components/SplitText";
import StockCard from "../components/StockCard";
import Button from "../components/Button";
// import background from "../assets/bg.jpg";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

type HomePageProps = {
  services: {
    serviceId: string;
    serviceName: string;
    remainingStock: number;
  }[];
};

const HomePage = (props: HomePageProps) => {
  const { services } = props;
  return (
    <div className="relative flex flex-col items-center ">
      {/* Background Image */}
      {/* <div className="fixed inset-0 z-0">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pb-10">
        <div className="text-sm font-semibold mt-40 bg-emerald-400 text-white px-4 py-2 rounded-full">
          <p className="tracking-widest">PRINT.MUZAAQI.MY.ID</p>
        </div>
        <div className="mt-5">
          <SplitText
            text="Solusi Males Ngeprint Keluar!"
            className="text-7xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            // onLetterAnimationComplete={handleAnimationComplete}
          />
          <p className="text-lg font-semibold text-center mt-2">
            MUDAH - CEPAT - EFISIEN
          </p>
        </div>
        <div>
          <h3 className="text-3xl underline relative font-bold text-center mt-20 mb-10">
            Infomations
          </h3>
          <div className="flex flex-wrap justify-center gap-10">
            {services.map((service) => (
              <StockCard
                key={service.serviceId}
                productName={service.serviceName}
                stockCount={service.remainingStock}
                colorSet={{
                  card:
                    service.remainingStock < 10
                      ? "border-red-400/50 shadow-red-400/50"
                      : "border-emerald-400 shadow-emerald-400",
                  text:
                    service.remainingStock < 10
                      ? "text-red-400"
                      : "text-emerald-400",
                  stock:
                    service.remainingStock < 10
                      ? "text-red-400 bg-red-200/50"
                      : "text-emerald-400 bg-emerald-200/50",
                  type:
                    service.remainingStock < 10
                      ? "bg-red-100/50"
                      : "bg-emerald-100/50",
                  btn:
                    service.remainingStock < 10
                      ? "bg-red-400 shadow-red-400/50 hover:bg-red-500"
                      : "bg-emerald-400 shadow-emerald-400/50 hover:bg-emerald-500",
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-20">
          <Button
            icon={<HiOutlineArrowSmallRight />} // Replace with an actual icon component
            text="Let's Print It!"
            toDestination="/services"
            className="bg-emerald-400 shadow-emerald-400/50 hover:bg-emerald-500 font-semibold text-2xl px-8 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
