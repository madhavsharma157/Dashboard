"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Heart, Zap, Target, Plus, X, CheckCircle } from "lucide-react"

interface CheckInData {
  mood: string
  energy: number
  productivity: number
  notes: string
  goals: string[]
}

interface CheckInFormProps {
  onSubmit: (data: CheckInData) => void
  isSubmitting: boolean
}

const moodOptions = [
  { value: "amazing", label: "Amazing", emoji: "🤩" },
  { value: "great", label: "Great", emoji: "😊" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "tired", label: "Tired", emoji: "😴" },
  { value: "stressed", label: "Stressed", emoji: "😰" },
  { value: "sad", label: "Sad", emoji: "😢" },
]

export function CheckInForm({ onSubmit, isSubmitting }: CheckInFormProps) {
  const [formData, setFormData] = useState<CheckInData>({
    mood: "",
    energy: 5,
    productivity: 5,
    notes: "",
    goals: [],
  })
  const [newGoal, setNewGoal] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.mood) return

    await onSubmit(formData)
    setSubmitted(true)
  }

  const addGoal = () => {
    if (newGoal.trim() && formData.goals.length < 3) {
      setFormData((prev) => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()],
      }))
      setNewGoal("")
    }
  }

  const removeGoal = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }))
  }

  if (submitted) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Check-in Complete! 🎉</h3>
            <p className="text-green-700 dark:text-green-300">
              Great job staying consistent! You've earned XP and kept your streak alive.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mood Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            How are you feeling?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                type="button"
                variant={formData.mood === mood.value ? "default" : "outline"}
                className="h-12 justify-start"
                onClick={() => setFormData((prev) => ({ ...prev, mood: mood.value }))}
              >
                <span className="mr-2">{mood.emoji}</span>
                {mood.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Energy & Productivity Sliders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Energy & Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Energy Level: {formData.energy}/10</Label>
            <Slider
              value={[formData.energy]}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, energy: value[0] }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Productivity: {formData.productivity}/10</Label>
            <Slider
              value={[formData.productivity]}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, productivity: value[0] }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Today's Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a goal for today..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addGoal())}
              disabled={formData.goals.length >= 3}
            />
            <Button
              type="button"
              onClick={addGoal}
              disabled={!newGoal.trim() || formData.goals.length >= 3}
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.goals.length > 0 && (
            <div className="space-y-2">
              {formData.goals.map((goal, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex-1 justify-between">
                    <span>{goal}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGoal(index)}
                      className="h-auto p-1 ml-2"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Add up to 3 goals for today ({formData.goals.length}/3)
          </p>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="How was your day? Any thoughts or reflections..."
            value={formData.notes}
            onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
        disabled={!formData.mood || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Complete Check-in
          </div>
        )}
      </Button>
    </form>
  )
}
