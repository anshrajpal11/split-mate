import React from 'react';

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-20 bg-gray-200 relative">
      {/* Tagline */}
      <div className="mb-4">
        <span className="px-4 py-1 rounded-full bg-gray-800 text-gray-200 text-sm font-medium">
          Split expenses. Simplify life.
        </span>
      </div>
      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 text-center leading-tight mb-6">
        The smartest way to split<br className="hidden md:block" />
        expenses with friends
      </h1>
      {/* Subheading */}
      <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mb-8">
        Track shared expenses, split bills effortlessly, and settle up quickly. Never worry about who owes who again.
      </p>
      {/* Buttons */}
      <div className="flex gap-4">
        <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-md shadow transition-colors duration-200">
          Get Started <span className="ml-2">&rarr;</span>
        </button>
        <button className="border border-gray-700 text-gray-600  font-semibold px-6 py-3 rounded-md transition-colors duration-200">
          See How It Works
        </button>
      </div>
      {/* Optional: Add a user image at the bottom right if needed */}
      {/* <img src="/path/to/user-image.jpg" alt="User" className="absolute bottom-0 right-0 w-32 h-32 rounded-full border-4 border-black shadow-lg" /> */}
    </section>
  );
};

export default Hero;  