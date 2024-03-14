import React from "react";
import Image from "next/image";

type Props = {
  src: string;
};
const RestaurantHeaderImage: React.FC<Props> = (
  imageSrc: Props
): JSX.Element => {
  return (
    <div>
      <Image
        className="rounded-full"
        src={imageSrc.src}
        alt={"restaurant header image"}
        width={350}
        height={350}
      />
    </div>
  );
};

export default RestaurantHeaderImage;
