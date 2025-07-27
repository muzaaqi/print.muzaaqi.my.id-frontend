import type { ReactNode } from "react";

type ButtonProps = {
  icon: ReactNode;
  text: string;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        className={`bg-emerald-400 text-white flex py-3 justify-center items-center rounded-full cursor-pointer shadow-emerald-400/50 hover:shadow-lg hover:scale-105 transition-all duration-300 ${props.className}`}
      >
        <span>{props.text}</span>
        <span className="ml-3 text-xl">{props.icon}</span>
      </button>
    </div>
  );
}

export default Button