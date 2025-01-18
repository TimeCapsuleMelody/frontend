import * as React from "react"
import { Progress } from "../ui/progress"
import { Card } from "../ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

const Friendinfo = React.forwardRef(({ className, profileImage, progress, name, totalCount, localCount, ...props }, ref) => {
  return (
    <Card className="m-auto w-[90%] p-4 mt-5">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium mb-2">{name}</p>
          <Progress value={progress * 100} className="w-full" />
          <p className="pt-2 text-sm text-muted-foreground">{localCount} / {totalCount}</p>
        </div>
      </div>
    </Card>
  );
})
Friendinfo.displayName = "Friendinfo"

export { Friendinfo }