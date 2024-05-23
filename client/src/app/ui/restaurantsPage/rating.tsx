import React from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";

type RatingProps = {
  stars: number;
};

const Rating: React.FC<RatingProps> = ({ stars }) => {
  return (
    <div className="rating rating-xs p-2 flex flex-row items-center mb-3">
      {[1, 2, 3, 4, 5].map((index) => (
        <StarFilledIcon
          key={index}
          className={`h-5 w-5 ${
            index <= stars ? "text-orange-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;
