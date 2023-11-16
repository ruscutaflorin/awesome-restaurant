import React from "react";

const Rating = () => {
  return (
    <div className="rating rating-xs p-2 flex flex-col items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          name={`rating-${name}`}
          className="mask mask-star-2 bg-orange-400 mb-1"
          checked={index === 2} // Assuming 2 is the default checked rating
          onChange={() => console.log(`Rating ${index} selected`)} // Add your onChange logic here
        />
      ))}
    </div>
  );
};

export default Rating;
