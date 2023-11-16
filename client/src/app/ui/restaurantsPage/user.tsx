import React from "react";
import defaultImage from "../../../../public/default-user.png";
import Image from "next/image";
type UserProps = {
  profilePicture?: HTMLImageElement;
  name: string;
};
const ShowUser = ({ profilePicture, name }: UserProps): JSX.Element => {
  return (
    <main className="flex items-center">
      <div className="avatar mr-4">
        <div className="w-12 mask mask-squircle overflow-hidden">
          {profilePicture ? (
            <Image
              src={profilePicture.src}
              width={50}
              height={50}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={defaultImage.src}
              width={50}
              height={50}
              alt="Default Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{name}</h2>
        <h5>Hello!</h5>
      </div>
    </main>
  );
};

export default ShowUser;
