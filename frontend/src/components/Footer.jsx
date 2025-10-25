import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      
      <section className="w-full bg-gradient-to-r from-gray-300 to-gray-400 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100/30 text-gray-50 text-sm font-medium">
            Ready
          </span>

          <h2 className="mt-6 text-3xl md:text-5xl font-extrabold text-white italic leading-tight">
            Ready to simplify expense sharing?
          </h2>

          <p className="mt-4 text-lg md:text-xl text-gray-100/90 max-w-3xl mx-auto">
            Join thousands of users who have made splitting expenses stress-free.
          </p>

          <div className="mt-8">
            <button
              className="inline-flex items-center gap-3 bg-black/80 hover:bg-black/90 text-white font-semibold px-6 py-3 rounded-md shadow-2xl transition-all duration-300 ease-in-out"
              aria-label="Get Started"
            >
              Get Started <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

     

        <div className="border-t border-gray-300">
          <div className="max-w-6xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
            © {year} SplitMate. All rights reserved.
          </div>
        </div>

    </>
  );
};

export default Footer;
