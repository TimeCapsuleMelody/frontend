"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Streaming() {
    const params = useParams()
    const musicId = params.id
    
    const [file, setFile] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioElement, setAudioElement] = useState(null)

    const getFile = async () => {
        try {
            const response = await fetch(`https://kubook-exp.shop/music/by-id/${musicId}`)
            const data = await response.json()
            setFile(data)
            if (data.fileUrl) {
                const audio = new Audio(data.fileUrl)
                setAudioElement(audio)
            }
        } catch (error) {
            console.error("Failed to fetch music file:", error)
        }
    }

    const handlePlayPause = () => {
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause()
            } else {
                audioElement.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        if (musicId) {
            getFile()
        }
        
        return () => {
            if (audioElement) {
                audioElement.pause()
                setAudioElement(null)
            }
        }
    }, [musicId])

    if (!file) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{file.title || "Streaming"}</h1>
            <Button 
                onClick={handlePlayPause}
                className="px-8 py-2"
            >
                {isPlaying ? "Pause" : "Play"}
            </Button>
        </div>
    )
} 