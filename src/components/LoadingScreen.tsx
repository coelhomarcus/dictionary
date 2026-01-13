import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-6 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Searching...
        </h2>
        <p className="text-gray-500">Looking up the word for you</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
