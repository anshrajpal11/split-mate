import React from "react";

const testimonials = [
  {
    name: "Babu Rao",
    role: "Rental Property Manager",
    quote:
      "Ye babu rao ka style hai! With Splitr, I finally stopped getting confused about who paid for what!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Raju",
    role: "Stock Market Expert",
    quote:
      "Splitr's calculations are so accurate, they're even better than my scheme to double money in 25 days!",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Shyam",
    role: "Job Searcher",
    quote:
      "If that I have Splitr, Raju won't get away with selling my shoes and coat! I'll add to his debt!",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-gray-50 text-gray-700 text-sm font-medium">
          Testimonials
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
          What our users are saying
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">
              “{t.quote}”
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                />
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-full"
                  style={{ boxShadow: "0 12px 30px rgba(16,24,40,0.04)" }}
                />
              </div>

              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
