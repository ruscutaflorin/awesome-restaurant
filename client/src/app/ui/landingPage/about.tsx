import React from "react";
import Card from "./card";
function About() {
  return (
    <div className="carousel carousel-end rounded-box w-full justify-evenly">
      <div className="carousel-item">
        <Card
          title="Effortless Dining Experience"
          description="Say goodbye to long wait times! Our app seamlessly connects your order to the kitchen, ensuring quicker service. For restaurant staff, it's a game-changer, simplifying order management and enhancing customer satisfaction."
        />
      </div>
      <div className="carousel-item">
        <Card
          title="Your Orders, Your Way"
          description="Enjoy a personalized dining experience! Our app links your orders directly to the kitchen, guaranteeing accuracy and speed. For restaurant staff, it's a time-saving tool, streamlining operations and ensuring every dish is served to perfection."
        />
      </div>
      <div className="carousel-item">
        <Card
          title="Swift Service, Happy Customers"
          description="Experience prompt service every time! Our app facilitates instant communication between your order and the kitchen, reducing wait times. For restaurant staff, it's a productivity boost, making order management smooth and efficient."
        />
      </div>
    </div>
  );
}

export default About;
