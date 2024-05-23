import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  width?: string;
  hover?: string;
};

const PurpleButton = ({
  text,
  width,
  hover,
  ...props
}: ButtonProps): JSX.Element => {
  const buttonClasses = clsx(
    "text-white",
    "bg-darkPurple",
    hover ? "hover:bg-mediumGrey" : "",
    "rounded-lg",
    "px-4 py-2",
    { "w-full": width }
  );

  return (
    <button {...props} style={{ width }} className={buttonClasses}>
      {text}
    </button>
  );
};

export default PurpleButton;
