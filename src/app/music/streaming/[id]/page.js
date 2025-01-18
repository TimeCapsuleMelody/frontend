"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import Link from "next/link"

export default function Streaming() {
    const params = useParams()
    const musicId = params.id
    
    const [audioUrl, setAudioUrl] = useState(null)

    const getFile = async () => {
        try {
            const response = await fetch(`https://kubook-exp.shop/music/streaming/${musicId}`)
            
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            setAudioUrl(url)
        } catch (error) {
            console.error("Failed to fetch music file:", error)
        }
    }

    useEffect(() => {
        if (musicId) {
            getFile()
        }

        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl)
            }
        }
    }, [musicId])

    if (!audioUrl) {
        return <div>Loading...</div>
    }

    return (
        <div className="pb-[5%] min-h-screen bg-background bg-[url('/media/sea_background.png')] bg-cover bg-center bg-no-repeat">
            <Link href="/" className="relative flex justify-center pt-5">
                <img src="/media/logo.png" alt="logo" className="m-auto w-70% px-15" />
            </Link>
            <AudioPlayer
                autoPlay={false}
                src={`https://kubook-exp.shop/music/streaming/${musicId}`}
                onPlay={e => console.log("Playing")}
                showSkipControls={false}
                showJumpControls={true}
                showDownloadProgress={true}
                customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                customProgressBarSection={["PROGRESS_BAR", "CURRENT_TIME", "DURATION"]}
            />
        </div>
    )
}