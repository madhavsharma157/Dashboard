"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckInForm } from "@/components/check-in-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Calendar, Heart, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CheckInData {
  mood: string
  energy: number
  productivity: number
  notes: string
  goals: string[]
}

export default function CheckInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastCheckin, setLastCheckin] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchLastCheckin()
  }, [])

  const fetchLastCheckin = async () => {
    try {
      const response = await fetch("/api/user")
      const data = await response.json()
      setLastCheckin(data.lastCheckin)
    } catch (error) {
      console.error("Failed to fetch last check-in:", error)
    }
  }

  const handleCheckIn = async (data: CheckInData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()

        // Show success message and redirect
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        throw new Error("Failed to submit check-in")
      }
    } catch (error) {
      console.error("Check-in failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canCheckIn = () => {
    if (!lastCheckin) return true
    const lastDate = new Date(lastCheckin).toDateString()
    const today = new Date().toDateString()
    return lastDate !== today
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Check-In</h1>
              <p className="text-gray-600 dark:text-gray-400">How are you feeling today?</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Check-in Status */}
        <Card
          className={`border-2 ${canCheckIn() ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-orange-200 bg-orange-50 dark:bg-orange-900/20"}`}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${canCheckIn() ? "bg-green-500" : "bg-orange-500"}`}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {canCheckIn() ? "Ready for today's check-in!" : "Already checked in today"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lastCheckin ? `Last check-in: ${new Date(lastCheckin).toLocaleDateString()}` : "First check-in"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-in Form */}
        {canCheckIn() ? (
          <CheckInForm onSubmit={handleCheckIn} isSubmitting={isSubmitting} />
        ) : (
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">You're all set for today!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Come back tomorrow for your next check-in and keep your streak going! 🔥
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Target className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
