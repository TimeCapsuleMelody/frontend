import { Friendinfo } from "@/components/ui/friend"

export default function Friends() {
  const [friends, setFriends] = useState([])
  const getFriends = async () => {
    const response = await fetch('https://kubook-exp.shop/api/friends/with-statistic')
    const data = await response.json()
    setFriends(data)
  }
  useEffect(() => {
    getFriends()
  }, [])

  return (
    <div>
      {friends.map((friend) => (
        <Friendinfo key={friend.id} name={friend.name} progress={friend.ratio} profileImage={friend.image} totalCount={friend.totalCount} localCount={friend.localCount} />
      ))}
    </div>
  )
}

