"use client"

import { Friendinfo } from "@/components/ui/friend"
import { useState, useEffect } from "react"
import Link from 'next/link';

export default function Friends() {
  const [friends, setFriends] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch('https://kubook-exp.shop/friend/with-statistic')
        const data = await response.json()
        setFriends(data || [])
      } catch (error) {
        setFriends([])
      } finally {
        setIsLoading(false)
      }
    }
    getFriends()
  }, [])

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background bg-[url('/media/sea_background.png')] bg-cover bg-center bg-no-repeat">
      <Link href="/" className="relative flex justify-center pt-5">
          <img src="/media/logo.png" alt="logo" className="m-auto w-70% px-15" />
      </Link>
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <Link href={`/music/by-friend/${friend.name}`} key={friend.id || Math.random()}>
            <Friendinfo 
              name={friend.name || ''} 
              progress={friend.ratio || 0} 
              profileImage={friend.image || ''} 
              totalCount={friend.totalCount || 0} 
              localCount={friend.localCount || 0} 
            />
          </Link>
        ))
      ) : (
        <div className="p-4">나와 함께한 사람들이 없습니다.</div>
      )}
    </div>
  )
}

