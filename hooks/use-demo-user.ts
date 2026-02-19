"use client"

import { useState, useEffect, useCallback } from "react"
import type { DemoUser } from "@/lib/types"
import { DEMO_USERS, readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage"

export function useDemoUser() {
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_USERS[0])

  useEffect(() => {
    const user = readStorage<DemoUser>(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0])
    setCurrentUser(user)
  }, [])

  const switchUser = useCallback((userId: string) => {
    const user = DEMO_USERS.find((u) => u.id === userId) ?? DEMO_USERS[0]
    writeStorage(STORAGE_KEYS.CURRENT_USER, user)
    setCurrentUser(user)
  }, [])

  return { currentUser, allUsers: DEMO_USERS, switchUser }
}
