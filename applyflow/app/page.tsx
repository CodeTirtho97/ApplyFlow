// import { supabase } from "@/lib/supabase/client";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           Welcome to ApplyFlow!
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300">
//           Keep Track of your Application Flow!
//         </p>
//       </div>
//     </main>
//   );
// }

import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors">
      {/* Header with Theme Toggle */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ApplyFlow
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to ApplyFlow 🚀
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Keep track of your application flow!
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                📊 Track Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize all your job applications in one place
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                🤝 Manage Referrals
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep track of networking contacts and referrals
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                📅 Schedule Interviews
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Never miss an interview with built-in scheduling
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                📈 Analytics & Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize your job search progress with charts
              </p>
            </div>
          </div>

          {/* Test Section */}
          <div className="p-8 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🌙 Dark Mode is Working!
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              Click the theme toggle button in the header to switch between
              light and dark modes. Notice how all colors change smoothly!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
