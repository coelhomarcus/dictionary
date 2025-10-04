import React from 'react';

interface NotFoundScreenProps {
   searchedWord: string;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ searchedWord }) => {
   return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
         <div>
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800">
               Word Not Found
            </h2>
         </div>

         <div className="mb-4">
            <p className="text-gray-600 mb-4">
               Sorry, we couldn't find the definition for:
            </p>
            <span className="text-xl font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-lg">
               "{searchedWord}"
            </span>
         </div>
      </div>
   );
};

export default NotFoundScreen;
