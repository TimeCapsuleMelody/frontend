"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasVisited', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background bg-[url('/media/start_page.png')] bg-contain bg-center bg-no-repeat bg-[#E6E6FA]">
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background bg-[url('/media/sea_background.png')] bg-cover bg-center bg-no-repeat">
      <Link href="/" className="relative flex justify-center pt-5">
          <img src="/media/logo.png" alt="logo" className="m-auto w-70% px-15" />
      </Link>
      <div className="flex justify-center items-center min-h-[500px] px-5 py-3">
        <div className="grid grid-cols-2 gap-4 w-[80vw]">
          <Link href="/record">
            <button className="h-40 text-lg w-full bg-[url('/media/time_capsule.png')] bg-contain bg-center bg-no-repeat text-black">노래<br />추가하기</button>
          </Link>
          <Link href="/music/by-period">
            <button className="h-40 text-lg w-full bg-[url('/media/time_capsule.png')] bg-contain bg-center bg-no-repeat text-black">노래<br />모아보기</button>
          </Link>
          <Link href="/friends">
            <button className="h-40 text-lg w-full bg-[url('/media/time_capsule.png')] bg-contain bg-center bg-no-repeat text-black">나와 함께한<br />사람들</button>
          </Link>
          <Link href="/keyword">
            <button className="h-40 text-lg w-full bg-[url('/media/time_capsule.png')] bg-contain bg-center bg-no-repeat text-black">키워드로<br />모아보기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
