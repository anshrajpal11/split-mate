import React from "react";

const steps = [
  {
    id: 1,
    title: "Create or Join a Group",
    desc: "Start a group for your roommates, trip, or event and invite friends.",
  },
  {
    id: 2,
    title: "Add Expenses",
    desc: "Record who paid and how the bill should be split amongst members.",
  },
  {
    id: 3,
    title: "Settle Up",
    desc: "View who owes what and log payments when debts are cleared.",
  },
];

const Working = () => {
  return (
    <section id="working" className="w-full bg-gray-200 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-800 text-white text-sm font-medium">
            How It Works
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-gray-900">
            Splitting expenses has never been easier
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to start tracking and splitting expenses with friends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-lg ring-4 ring-gray-200/60">
                  {s.id}
                </div>
                {/* subtle glow */}
                <span className="absolute inset-0 mx-auto mt-0 w-20 h-20 rounded-full pointer-events-none" style={{ filter: "blur(14px)", background: "rgba(16,185,129,0.08)" }} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;