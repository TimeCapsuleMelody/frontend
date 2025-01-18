"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import MusicList from "@/components/ui/musiclist";
import { useParams } from "next/navigation";

export default function byKeyword() {
    const params = useParams()
    const keyword = params.keyword

    const [musicList, setMusicList] = useState([]);
    const getMusicList = async () => {
        const response = await fetch(`https://kubook-exp.shop/music/by-keyword/${keyword}`);
        const data = await response.json();
        console.log(data);
        setMusicList(data);
    }
    useEffect(() => {
        getMusicList();
    }, []);

    return (
        <div className="min-h-screen bg-background bg-[url('/media/time_background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
            <Link href="/" className="relative flex justify-center pt-5">
                <img src="/media/logo.png" alt="logo" className="m-auto w-70% px-15" />
            </Link>
            <div className="grid grid-cols-1 gap-8 mt-8 pr-7 pl-14">
                {musicList.map((period) => (
                    <div key={`${period.year}-${period.month}`} className="space-y-4 overflow-y-auto">
                        <h2 className="text-xl font-bold pl-12">{`${period.year}-${String(period.month).padStart(2, '0')}`}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
                            {period.music.map((music) => (
                                <Link href={`/streaming/${music.musicId}`} key={music.musicId}>
                                    <MusicList image={music.image} title={music.musicTitle} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

