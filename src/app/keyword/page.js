"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Keyword() {
    const [keywords, setKeywords] = useState([]);
    const getKeywords = async () => {
        const response = await fetch('https://kubook-exp.shop/information/@me');
        const data = await response.json();
        setKeywords(data.tags || []);
    }
    useEffect(() => {
        getKeywords();
    }, []);

    return (
        <div className="min-h-screen relative">
            <div className="fixed inset-0 bg-background bg-[url('/media/keyword_background.png')] bg-cover bg-bottom bg-no-repeat" />
            <Link href="/" className="relative flex justify-center mt-5">
                <img src="/media/logo.png" alt="logo" className="m-auto w-70% px-15" />
            </Link>
            <div className="relative container mx-auto px-8 py-8">
                <div className="grid grid-cols-2 gap-4">
                    {keywords.map((keyword, index) => (
                        <Link href={`/music/by-keyword/${keyword}`} key={index}>
                            <div
                                key={index}
                            className="h-40 flex items-center justify-center bg-[url('/media/bubble_background.png')] bg-contain bg-bottom bg-no-repeat"
                        >
                            <span className="text-lg font-medium">{keyword}</span>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}