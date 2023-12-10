import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  width?: string;
  hover?: string;
};

const DarkButton = ({
  text,
  width,
  hover,
  ...props
}: ButtonProps): JSX.Element => {
  const buttonClasses = clsx(
    "btn",
    "btn-default",
    "bg-zinc-800",
    "hover:bg-zinc-500",
    "text-white",
    { "w-full": width },
    { hover: hover }
  );

  return (
    <button {...props} style={{ width }} className={buttonClasses}>
      {text}
    </button>
  );
};

export default DarkButton;
