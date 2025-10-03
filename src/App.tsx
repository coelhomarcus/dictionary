import React from 'react'

import type { DictionaryResponse } from "./types/dictionary"

const App = () => {
   const [data, setData] = React.useState<DictionaryResponse | null>(null);

   React.useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/apple');
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
         } catch (error) {
            console.log(error)
         } finally {
            console.log("finally")
         }
      };

      fetchData();
   }, [])

   return (
      <div className='mx-40'>
         <div className='flex justify-between items-center my-5'>
            {data && <h1 className='text-6xl font-black'>{data[0].word}</h1>}
            {data && data[0].phonetic && <h3 className='text-3xl font-black text-purple-500'>{data[0].phonetic}</h3>}
         </div>

         <div className='flex italic items-center mb-3'>
            <div className='text-2xl font-bold'>{data && data[0].meanings[0].partOfSpeech}</div>
            <div className='h-[0.3px] w-full bg-neutral-200'></div>
         </div>

         <ul>
            {data && data[0].meanings[0] && data[0].meanings[0].definitions.map((el, index) => (
               <li key={index} className="mb-2 text-base font-bold italic list-disc marker:text-purple-500">{el.definition}</li>
            ))}
         </ul>

         <div className='flex italic items-center mb-3'>
            <div className='text-2xl font-bold'>{data && data[0].meanings[1] && data[0].meanings[1].partOfSpeech}</div>
            <div className='h-[0.3px] w-full bg-neutral-200'></div>
         </div>

         <ul>
            {data && data[0].meanings[1] && data[0].meanings[1].definitions.map((el, index) => (
               <li key={index} className="mb-2 text-base font-bold italic list-disc marker:text-purple-500">{el.definition}</li>
            ))}
         </ul>

         {data && data[0].meanings[2] && <div className='flex italic items-center mb-3'>
            <div className='text-2xl font-bold'>{data[0].meanings[2].partOfSpeech}</div>
            <div className='h-[0.3px] w-full bg-neutral-200'></div>
         </div>}

         {data && data[0].meanings[2] && <ul>
            {data[0].meanings[2].definitions.map((el, index) => (
               <li key={index} className="mb-2 text-base font-bold italic list-disc marker:text-purple-500">{el.definition}</li>
            ))}
         </ul>}

      </div>
   )
}

export default App
