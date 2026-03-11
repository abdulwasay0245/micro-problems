import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white overflow-hidden py-24 sm:py-32">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-sm">
            Report, Track, and Solve <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
              Local Issues Together
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed font-light">
            Micro Problems PK empowers communities to pinpoint civic infrastructure issues on the map, upvote critical priorities, and collaboratively bring them to resolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/report"
              className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:bg-indigo-50 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out text-lg"
            >
              Report an Issue
            </Link>
            <Link
              href="/issues"
              className="px-8 py-4 bg-indigo-800/50 backdrop-blur-sm border border-indigo-400/30 text-white font-semibold rounded-full hover:bg-indigo-700/60 transition-all duration-300 ease-in-out text-lg"
            >
              Explore Issues
            </Link>
          </div>
        </div>
      </section>

      {/* Features / How it Works Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl shadow-sm">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to make your community better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Pinpoint on Map</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Spot a pothole, broken streetlight, or garbage dump? Drop a pin on our interactive map exactly where the issue is.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Community Upvoting</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Rally your neighbors. The more upvotes an issue receives, the higher priority it becomes for resolution.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Track Progress</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Stay updated as the status changes from pending, to in-progress, to fully resolved by authorities or volunteers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 bg-indigo-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-indigo-950 mb-6">Ready to improve your neighborhood?</h2>
          <p className="text-lg text-indigo-800/70 mb-10 max-w-2xl mx-auto">
            Join thousands of active citizens who are taking the initiative to report and fix micro problems across Pakistan.
          </p>
          <Link
            href="/issues/new"
            className="inline-block px-10 py-5 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Start Reporting Today
          </Link>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="w-full bg-white border-t border-gray-100 py-8 text-center text-gray-500 text-sm mt-auto">
        <p>&copy; {new Date().getFullYear()} Micro Problems PK. All rights reserved.</p>
      </footer>
    </main>
  );
}