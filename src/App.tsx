import { useEffect, useState, useRef } from 'react'
import type { FormEvent } from 'react'

import type { DictionaryResponse } from "./types/dictionary"
import MeaningSection from './components/MeaningSection'

import { FaPlay } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const App = () => {
   const [data, setData] = useState<DictionaryResponse | null>(null);
   const [searchWord, setSearchWord] = useState<string>('key');
   const [inputValue, setInputValue] = useState<string>('');
   const audioRef = useRef<HTMLAudioElement>(null);

   const fetchData = async (word: string) => {
      try {
         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const result = await response.json();
         setData(result);
      } catch (error) {
         console.log(error);
         setData(null);
      }
   };

   const handleSearch = (e: FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
         setSearchWord(inputValue.trim());
      }
   };

   const playAudio = () => {

      if (audioRef.current) {
         audioRef.current.volume = 0.25;
         audioRef.current.play().catch((error) => {
            console.error('Erro ao reproduzir áudio:', error);
         });
      }
   };

   useEffect(() => {
      fetchData(searchWord);
   }, [searchWord])

   if (!data) return <div>Não existe</div>

   return (
      <div className='mt-10 max-w-[800px] flex flex-col mx-5 md:mx-auto'>
         <header className='flex mb-6 justify-between items-center'>
            <h1 className='text-2xl font-black'>Dictionary</h1>
            <a href='https://coelhomarcus.com' target='_blank' className='hover:text-purple-500 font-black'>@coelhomarcus</a>
         </header>

         <form onSubmit={handleSearch} className="mb-6 flex gap-2">
            <input
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               placeholder="Type a word..."
               className="w-full px-4 py-2 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button onSubmit={handleSearch} className='bg-purple-500 hover:bg-purple-600 hover:text-neutral-50 active:bg-purple-500 px-3
            rounded-full text-white italic font-medium cursor-pointer'><IoSearch className='size-5' /></button>
         </form>

         <div className='flex gap-2 items-center my-3'>
            {<h1 className='text-6xl font-black'>{data[0].word}</h1>}
            <div className='flex items-end gap-3'>
               {data[0].phonetics[0] && data[0].phonetics[0].audio != "" && (
                  <>
                     <audio ref={audioRef} src={data[0].phonetics[0].audio} preload="auto"></audio>
                     <button
                        onClick={playAudio}
                        className='size-7.5 mt-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full cursor-pointer transition-colors flex items-center justify-center'
                     ><FaPlay className='size-4' /></button>
                  </>
               )}
            </div>
         </div>
         {data[0].phonetic && <h3 className='text-2   xl font-black text-purple-500'>{data[0].phonetic}</h3>}

         {data[0].meanings.map((meaning, index) => (
            <MeaningSection key={index} meaning={meaning} />
         ))}

      </div>
   )
}

export default App
