import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <h3 className="text-3xl font-bold">Pasta Cosi</h3>
        <p className="text-center">
          Pasta Cosi is specialized in Pasta with Parmigiano, Risotto, Salads &
          Raclette
        </p>
        <div className="social-links mt-4">
          <a
            href="https://www.facebook.com/pastacositn/"
            className="facebook mr-4"
          >
            <i className="bx bxl-facebook text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/pastacositn/"
            className="instagram"
          >
            <i className="bx bxl-instagram text-2xl" />
          </a>
        </div>
        <div className="copyright mt-6">
          © Copyright{" "}
          <strong className="text-gray-300">
            <span>Pasta Cosi</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits mt-2">
          Designed by
          <a
            href="https://github.com/ahmed-aouinti"
            target="_blank"
            className="text-blue-500 ml-1"
          >
            Aouinti_Ahmed
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
