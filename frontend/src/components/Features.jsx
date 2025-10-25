
import React from 'react'

const features = [
  {
    title: 'Group Expenses',
    desc: 'Create groups for roommates, trips, or events to keep expenses organized.',
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    title: 'Smart Settlements',
    desc: 'Algorithm minimises the number of payments when settling up.',
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8c-3 0-4 1-5 3s-1 4 1 6 5 2 7 1 3-3 3-5-1-5-6-5z" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: 'Expense Analytics',
    desc: 'Track spending patterns and discover insights about shared costs.',
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 14l3-3 4 4 5-7" />
      </svg>
    ),
  },
  {
    title: 'Payment Reminders',
    desc: 'Automated reminders for pending debts and insights on spending patterns.',
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    title: 'Multiple Split Types',
    desc: 'Split equally, by percentage, or by exact amounts to fit any scenario.',
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Real-time Sync',
    desc: 'See new expenses and updates the moment they happen.',
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12A9 9 0 113 12" />
      </svg>
    ),
  },
]

const Features = () => {
  return (
    <section  id="features" className="w-full bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
            Features
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
            Everything you need to split expenses
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to handle shared expenses with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <article
              key={f.title}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-gray-50 p-3 rounded-lg ring-1 ring-gray-100">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
