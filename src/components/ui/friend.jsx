import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const Friendinfo = React.forwardRef(({ className, profileImage, progress, name, totalCount, localCount, ...props }, ref) => {
  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium mb-2">{name}</p>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">{localCount} / {totalCount}</p>
        </div>
      </div>
    </Card>
  );
})
Friendinfo.displayName = "Friendinfo"

export { Friendinfo }