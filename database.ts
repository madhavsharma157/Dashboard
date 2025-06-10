// Mock database functions - replace with your actual database implementation
// This could be Supabase, Neon, or any other database

interface User {
  id: number
  username: string
  xp: number
  level: number
  currentStreak: number
  longestStreak: number
  mood: string
  lastCheckin: string
  createdAt: string
}

interface CheckIn {
  id: number
  userId: number
  mood: string
  energy: number
  productivity: number
  notes: string
  goals: string
  createdAt: string
}

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  unlockedAt: string
}

// Mock data storage (replace with actual database)
const mockUser: User = {
  id: 1,
  username: "Alex",
  xp: 150,
  level: 2,
  currentStreak: 7,
  longestStreak: 12,
  mood: "great",
  lastCheckin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
  createdAt: new Date().toISOString(),
}

const mockCheckIns: CheckIn[] = []
const mockAchievements: Achievement[] = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first check-in",
    icon: "star",
    unlockedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "7-day check-in streak",
    icon: "flame",
    unlockedAt: new Date().toISOString(),
  },
]

export async function getUserData(userId: number) {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    ...mockUser,
    achievements: mockAchievements,
  }
}

export async function createCheckIn(data: Omit<CheckIn, "id" | "createdAt">) {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newCheckIn: CheckIn = {
    id: mockCheckIns.length + 1,
    ...data,
    createdAt: new Date().toISOString(),
  }

  mockCheckIns.push(newCheckIn)
  return newCheckIn.id
}

export async function updateUserStats(userId: number) {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const today = new Date().toDateString()
  const lastCheckinDate = new Date(mockUser.lastCheckin).toDateString()

  // Update streak
  if (lastCheckinDate !== today) {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

    if (lastCheckinDate === yesterday) {
      // Continue streak
      mockUser.currentStreak += 1
    } else {
      // Reset streak
      mockUser.currentStreak = 1
    }

    // Update longest streak
    if (mockUser.currentStreak > mockUser.longestStreak) {
      mockUser.longestStreak = mockUser.currentStreak
    }
  }

  // Add XP
  mockUser.xp += 25

  // Calculate level
  mockUser.level = Math.floor(mockUser.xp / 100) + 1

  // Update last check-in
  mockUser.lastCheckin = new Date().toISOString()

  return mockUser
}

export async function getUserAchievements(userId: number) {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockAchievements
}

export async function checkAndUnlockAchievements(userId: number) {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newAchievements: Achievement[] = []

  // Check for streak achievements
  if (mockUser.currentStreak >= 30 && !mockAchievements.find((a) => a.name === "Month Master")) {
    const achievement = {
      id: mockAchievements.length + 1,
      name: "Month Master",
      description: "30-day check-in streak",
      icon: "trophy",
      unlockedAt: new Date().toISOString(),
    }
    mockAchievements.push(achievement)
    newAchievements.push(achievement)
  }

  // Check for level achievements
  if (mockUser.level >= 5 && !mockAchievements.find((a) => a.name === "Level 5 Hero")) {
    const achievement = {
      id: mockAchievements.length + 1,
      name: "Level 5 Hero",
      description: "Reach level 5",
      icon: "zap",
      unlockedAt: new Date().toISOString(),
    }
    mockAchievements.push(achievement)
    newAchievements.push(achievement)
  }

  return newAchievements
}
