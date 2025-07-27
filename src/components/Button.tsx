import type { ReactNode } from "react";
import { Link } from "react-router";

type ButtonProps = {
  icon: ReactNode;
  text: string;
  toDestination: string;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <Link to={`${props.toDestination}`} className="block">
        <button
          className={`text-white flex py-3 justify-center items-center rounded-full cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${props.className}`}
        >
          <span>{props.text}</span>
          <span className="ml-3 text-xl">{props.icon}</span>
        </button>
      </Link>
    </div>
  );
}

export default Button;