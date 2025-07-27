import SplitText from "../components/SplitText";
import StockCard from "../components/StockCard";
import Button from "../components/Button";
import background from "../assets/bg.jpg";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pb-10">
        <div className="text-sm font-semibold mt-40 bg-emerald-400 text-white px-4 py-2 rounded-full">
          <p>AYO NGEPRINT!</p>
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
            Infomation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <StockCard />
            <StockCard />
            <StockCard />
            <StockCard />
          </div>
        </div>
        <div className="mt-20">
          <Link to="/services">
            <Button
              icon={<HiOutlineArrowSmallRight />} // Replace with an actual icon component
              text="Let's Print It!"
              className="font-semibold text-2xl px-8 py-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
