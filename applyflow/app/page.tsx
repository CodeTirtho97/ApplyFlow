import { supabase } from "@/lib/supabase/client";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to ApplyFlow!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Keep Track of your Application Flow!
        </p>
      </div>
    </main>
  );
}
