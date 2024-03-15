import React from "react";
import heroImage from "../../../../public/man-cutting-grilled-salmon-served-with-rice-lula-kebab-lice-tomatoes-wine.jpg";

function HeroSecond() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Connecting Tables to Kitchens, Elevating Every Bite!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Seamlessly link orders to kitchens for swift service. Elevate your
            dining experience with our app - making every meal memorable!
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center dark:bg-accent bg-opacity-75 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 hover:bg-amber-500 dark:focus:ring-gray-800  hover:text-black"
          >
            Speak to Sales
          </a>
          <a
            href="/restaurants"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center dark:bg-accent bg-opacity-75 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 hover:bg-amber-500 dark:focus:ring-gray-800  hover:text-black"
          >
            Satisfy Your Hunger Now
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src={heroImage.src}
            style={{ borderRadius: "100px" }}
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSecond;
