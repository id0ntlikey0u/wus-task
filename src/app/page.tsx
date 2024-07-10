'use client'

import Image from "next/image";
import { useEffect, useState } from 'react';


export default function Home() {
  // Declare a new state variable, in this case quote
  const [quote, setQuote] = useState('');

  // Generate new quote and throw error if that fails
  const getRandomQuote = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev');
      const data = await response.json();
      setQuote(data.value);
    } catch (error) {
        console.error('Error fetching the quote:', error);
    }
  };

  // Declare a new state variable, in this case count
  const [count, setCount] = useState<number | null>(null);

  // Fetching count from db and incrementing it
  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch('/api/getCount');
      const data = await res.json();
      setCount(data.count);
    };

    const incrementCount = async () => {
      await fetch('/api/incrementCount', { method: 'POST' });
    };

    fetchCount();
    incrementCount();
  }, []);

  return (
    <body>
      <header className="flex justify-between p-10">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="left-0 flex h-20 w-full items-end justify-center dark:via-black lg:static lg:size-auto lg:bg-none">
            <Image
              src="/logo-ws.svg"
              alt="WS"
              width={150}
              height={98}
              priority
            />
          </div>
        </div>
      </header>
      <main className="flex-col justify-center text-center">
        <div>
          <Image
            src="/icon-speaking.png"
            alt="speaking"
            width={200}
            height={200}
            className="dark:invert inline"
          />
          <p className="p-10 w-500">{quote}</p>
          <button onClick={getRandomQuote}>Generate Quote</button>
        </div>
      </main>
      <footer>
        <p>Visitor Count: {count}</p>
      </footer>
    </body>
  );
}