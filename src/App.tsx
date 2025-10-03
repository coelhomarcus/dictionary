import { useEffect, useState, useRef } from 'react'
import type { FormEvent } from 'react'

import type { DictionaryResponse } from "./types/dictionary"
import MeaningSection from './components/MeaningSection'
import LoadingScreen from './components/LoadingScreen'
import NotFoundScreen from './components/NotFoundScreen'

import { FaPlay } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const App = () => {
   const [data, setData] = useState<DictionaryResponse | null>(null);
   const [searchWord, setSearchWord] = useState<string>('type');
   const [inputValue, setInputValue] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isError, setIsError] = useState<boolean>(false);
   const audioRef = useRef<HTMLAudioElement>(null);

   const fetchData = async (word: string) => {
      setIsLoading(true);
      setIsError(false);
      setData(null);

      try {
         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const result = await response.json();
         setData(result);
      } catch (error) {
         console.log(error);
         setIsError(true);
         setData(null);
      } finally {
         setIsLoading(false);
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

   return (
      <div className='mt-6 max-w-[800px] flex flex-col mx-5 md:mx-auto'>
         <header className='flex mb-6 justify-center items-center'>
            <h1 className='text-2xl font-black flex gap-2 items-center'>Dictionary</h1>
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

         {isLoading && <LoadingScreen />}

         {isError && !isLoading && <NotFoundScreen searchedWord={searchWord} />}

         {data && data[0] && !isLoading && !isError && (
            <>
               <div className='flex gap-2 items-center my-3'>
                  <h1 className='text-4xl sm:text-6xl font-black wrap-anywhere'>{data[0].word}</h1>
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
               {data[0].phonetic && <h3 className='text-xl sm:text-2xl font-black text-purple-500'>{data[0].phonetic}</h3>}

               {data[0].meanings.map((meaning, index) => (
                  <MeaningSection key={index} meaning={meaning} />
               ))}

               <footer className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                  by <a href="https://coelhomarcus.com" target="_blank" className="text-purple-500 hover:text-purple-600 font-medium pb-4">@coelhomarcus</a>
               </footer>
            </>
         )}

      </div>
   )
}

export default App
