import { Link } from "react-router";
import Button from "../components/Button";
import { HiMiniHome } from "react-icons/hi2";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-center mt-10 tracking-widest">
        <span className="text-emerald-400">4</span>0
        <span className="text-emerald-500">4</span>
      </h1>
      <h2 className="text-4xl font-bold text-center mt-5 mb-10">Not Found</h2>
      <Link to="/">
        <Button icon={<HiMiniHome />} text="Go Home" className="bg-emerald-400 p-6 shadow-emerald-400/50 hover:shadow-lg" type="button" toDestination="/"/>
      </Link>
    </div>
  );
};

export default NotFoundPage;