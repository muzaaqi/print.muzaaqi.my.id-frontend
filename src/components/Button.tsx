type ButtonProps = {
  text: string;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button className={`bg-emerald-400 text-white rounded-full cursor-pointer shadow-emerald-400 hover:shadow-lg hover:scale-105 transition-all duration-300 ${props.className}`}>
        {props.text}
      </button>
    </div>
  );
}

export default Button