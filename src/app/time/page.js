"use client"

import { useState, useEffect } from "react";

export default function Time() {
    const [musicList, setMusicList] = useState([]);
    const getMusicList = async () => {
        const response = await fetch('https://kubook-exp.shop/music/by-period');
        const data = await response.json();
        setMusicList(data);
    }
    useEffect(() => {
        getMusicList();
    }, []);

    return (
        <div>
            <h1>시간</h1>
        </div>
    )
}
