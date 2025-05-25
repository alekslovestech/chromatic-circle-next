"use client";

import Link from "next/link";

export default function AdvancedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Chromatic Circle
          </h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-white text-xl mb-8">
              Welcome to the Advanced view
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Switch to Default View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
