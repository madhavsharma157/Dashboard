import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Flame, Target, Heart, Zap } from "lucide-react"

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  unlockedAt: string
}

interface AchievementBadgeProps {
  achievement: Achievement
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      trophy: <Trophy className="w-6 h-6" />,
      star: <Star className="w-6 h-6" />,
      flame: <Flame className="w-6 h-6" />,
      target: <Target className="w-6 h-6" />,
      heart: <Heart className="w-6 h-6" />,
      zap: <Zap className="w-6 h-6" />,
    }
    return icons[iconName] || <Trophy className="w-6 h-6" />
  }

  const getIconColor = (iconName: string) => {
    const colors: { [key: string]: string } = {
      trophy: "text-yellow-500",
      star: "text-purple-500",
      flame: "text-orange-500",
      target: "text-blue-500",
      heart: "text-pink-500",
      zap: "text-green-500",
    }
    return colors[iconName] || "text-yellow-500"
  }

  const getBgColor = (iconName: string) => {
    const colors: { [key: string]: string } = {
      trophy: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      star: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      flame: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      target: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      heart: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
      zap: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    }
    return colors[iconName] || "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className={`${getBgColor(achievement.icon)} transition-all hover:scale-105`}>
      <CardContent className="p-3 text-center">
        <div className={`${getIconColor(achievement.icon)} mb-2 flex justify-center`}>{getIcon(achievement.icon)}</div>
        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{achievement.name}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
        <Badge variant="secondary" className="text-xs">
          {formatDate(achievement.unlockedAt)}
        </Badge>
      </CardContent>
    </Card>
  )
}
