import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05060f] via-[#222965] to-[#05060f] flex items-center justify-center">
      <div className="text-center">
        
        {/* Icon */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">

            <div className="absolute inset-0 border-8 border-red-200/30 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-transparent border-t-red-500 rounded-full animate-spin"></div>

            {/* Center */}
            <div className="absolute inset-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-12.728 12.728M6.343 6.343l11.314 11.314"
                />
              </svg>
            </div>

          </div>
        </div>

        <div className="">
          <div className="text-4xl font-bold text-red-600 flex items-center justify-center">
            <span className="text-5xl">Unauthorized Access</span>
          </div>
          <p className="text-red-200">
            You don’t have permission to view this page
          </p>
          <button
           onClick={() => window.history.back()}
           className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default UnauthorizedPage;