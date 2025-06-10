"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Star, Flame, Trophy, Zap } from "lucide-react"

interface MotivationalPopupProps {
  isOpen: boolean
  onClose: () => void
  streak: number
  level: number
}

const motivationalMessages = [
  {
    title: "You're on fire! 🔥",
    message: "Your consistency is paying off. Keep up the amazing work!",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "Level up! ⭐",
    message: "You're growing stronger every day. Your dedication shows!",
    icon: <Star className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Streak master! 🏆",
    message: "Your commitment is inspiring. You're building great habits!",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Unstoppable! ⚡",
    message: "You're crushing your goals. Nothing can stop you now!",
    icon: <Zap className="w-8 h-8 text-green-500" />,
  },
]

export function MotivationalPopup({ isOpen, onClose, streak, level }: MotivationalPopupProps) {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    if (isOpen) {
      // Select message based on streak or level
      let messageIndex = 0
      if (streak >= 30) messageIndex = 3
      else if (streak >= 20) messageIndex = 2
      else if (level >= 5) messageIndex = 1
      else messageIndex = 0

      setCurrentMessage(messageIndex)
    }
  }, [isOpen, streak, level])

  if (!isOpen) return null

  const message = motivationalMessages[currentMessage]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 animate-in zoom-in-95 duration-200">
        <CardContent className="p-6 text-center space-y-4 relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>

          <div className="space-y-4">
            <div className="flex justify-center">{message.icon}</div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{message.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{message.message}</p>
            </div>

            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border">
                <div className="font-semibold text-orange-600 dark:text-orange-400">{streak} Day Streak</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border">
                <div className="font-semibold text-purple-600 dark:text-purple-400">Level {level}</div>
              </div>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Keep Going! 💪
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
