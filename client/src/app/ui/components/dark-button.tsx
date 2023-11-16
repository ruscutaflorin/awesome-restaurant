import React, { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};
const DarkButton = ({ text, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className="btn btn-default bg-zinc-800 hover:bg-zinc-500 text-white"
    >
      {text}
    </button>
  );
};

export default DarkButton;
