import Head from 'next/head'
import { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import { Audio } from  'react-loader-spinner'

export default function Home() {
  const [posts, setPosts] = useState([]);
  
  const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
  const today = new Date();

  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);
  const [likes, setLikes] = useState(new Set());

  let fetchImages = () => {
    let key = 'YkmTmSEo7egiCG0c0fGGRNil8uBZl2CO7aIfkYdM'
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`)
      .then((response) => response.json())
      .then((response) => {
        if(Array.isArray(response)) setPosts(response)
        //wanted to add an alert concerning invalid times, but left it like this in interest of time 
      });
  }

  const handleDateSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const handleLike = (imageDate) => {
    let tempLikes = likes
    if(tempLikes.has(imageDate)) tempLikes.delete(imageDate)
    else tempLikes.add(imageDate)
    setLikes(new Set(tempLikes))
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  useEffect(() => {
    fetchImages()
  }, [startDate, endDate]);

  return (
    <div className="h-100">
      <Head>
        <title>NasaGram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-9/12 flex-col justify-center items-center mx-auto">
        <h1 className="dark:text-white text-6xl text-center py-5">
          Welcome to NasaGram!
        </h1>
        <div className="flex justify-center">
          <p className="text-slate-900 dark:text-white text-base font-medium tracking-tight mr-10">Select date range for results:</p>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleDateSelect}
          />
        </div>
        {posts.length !== 0 ? posts.map((item, i) => 
          <section key={i} className="main mx-auto my-5">
            <div className="bg-white dark:bg-slate-900 rounded-lg ring-1 ring-slate-900/5 shadow-xl">
                <div className="h-14 flex items-center px-5 justify-between">
                  <p className="text-slate-900 dark:text-white text-base font-medium tracking-tight">{item.copyright || "Unknown"}</p>
                </div>
                <img src={item.hdurl} alt={`Post by: ${item.copyright}`} />
                <div className="p-5">
                    <div className="flex">
                      <button 
                        className="bg-black hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-800 hover:border-slate-500 rounded"
                        onClick={() => handleLike(item.date)}
                      >
                        Like
                      </button>
                      <p className="font-bold text-slate-500 dark:text-slate-400 m-2 mx-4">{likes.has(item.date) ? "1 like" : "0 likes"}</p>
                    </div>
                    <p className="description text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {item.explanation}
                    </p>
                    <p className="font-bold text-slate-500 dark:text-slate-400 mt-2 text-sm">{item.date}</p>
                </div>
            </div>
          </section>)
          : <section className="mx-auto my-5 justify-center flex">
            <Audio
              heigth="100"
              width="100"
              color='white'
              ariaLabel='loading'
            />
          </section>
        }
      </main>

      <footer className="dark:bg-slate-600 flex justify-center items-center relative inset-x-0 bottom-0 h-16">
        <a
          href="https://thomasneter.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center font-bold dark:text-white"
        >
          Made by Thomas Neter
          {/* <img src="/vercel.svg" alt="Vercel" className="ml-2" /> */}
        </a>
      </footer>
    </div>
  )
}