import React from 'react';
import type { Meaning } from '../types/dictionary';

interface MeaningSectionProps {
   meaning: Meaning;
}

const MeaningSection: React.FC<MeaningSectionProps> = ({ meaning }) => {
   return (
      <>
         <div className='flex italic items-center mt-7'>
            <div className='text-2xl font-bold text-neutral-900 pr-2'>{meaning.partOfSpeech}</div>
            <div className='h-[0.3px] w-full bg-neutral-200'></div>
         </div>
         <div className='text-sm font-semibold text-neutral-300 italic flex justify-end'>Examples</div>
         <ul className='ml-10'>
            {meaning.definitions.map((definition, index) => (
               <li key={index} className="mb-2 text-base font-bold italic list-disc marker:text-purple-500 text-neutral-700">
                  {definition.definition}
               </li>
            ))}
         </ul>
      </>
   );
};

export default MeaningSection;
