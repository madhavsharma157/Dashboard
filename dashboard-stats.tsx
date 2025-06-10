import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Trophy, Heart, Clock } from "lucide-react"

interface DashboardStatsProps {
  currentStreak: number
  longestStreak: number
  mood: string
  lastCheckin: string
}

export function DashboardStats({ currentStreak, longestStreak, mood, lastCheckin }: DashboardStatsProps) {
  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      amazing: "🤩",
      great: "😊",
      good: "🙂",
      okay: "😐",
      tired: "😴",
      stressed: "😰",
      sad: "😢",
    }
    return moodMap[mood] || "🙂"
  }

  const getMoodColor = (mood: string) => {
    const colorMap: { [key: string]: string } = {
      amazing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      great: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      good: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      okay: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      tired: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      stressed: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      sad: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }
    return colorMap[mood] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const formatLastCheckin = (dateString: string) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    return `${diffDays - 1} days ago`
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Current Streak */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
            {currentStreak}
            <span className="text-sm font-normal text-orange-600 dark:text-orange-400 ml-1">days</span>
          </div>
        </CardContent>
      </Card>

      {/* Best Streak */}
      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Best Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
            {longestStreak}
            <span className="text-sm font-normal text-yellow-600 dark:text-yellow-400 ml-1">days</span>
          </div>
        </CardContent>
      </Card>

      {/* Current Mood */}
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-pink-700 dark:text-pink-300 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Current Mood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-xl">{getMoodEmoji(mood)}</span>
            <Badge variant="secondary" className={getMoodColor(mood)}>
              {mood || "Not set"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Last Check-in */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last Check-in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">{formatLastCheckin(lastCheckin)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
