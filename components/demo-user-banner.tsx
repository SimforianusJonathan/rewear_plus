"use client"

import { useDemoUser } from "@/hooks/use-demo-user"
import { resetStorage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { RefreshCw, User2 } from "lucide-react"

export function DemoUserBanner() {
  const { currentUser, allUsers, switchUser } = useDemoUser()

  const handleReset = () => {
    resetStorage()
    window.location.reload()
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
      <div className="container max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-sm">
        <span className="text-amber-700 font-medium flex items-center gap-1 shrink-0">
          <User2 className="h-3.5 w-3.5" />
          Demo:
        </span>
        <div className="flex gap-1.5 flex-wrap flex-1">
          {allUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => switchUser(user.id)}
              className={`px-3 py-0.5 rounded-full text-xs font-medium transition-colors ${
                currentUser.id === user.id
                  ? "bg-amber-500 text-white"
                  : "bg-white border border-amber-300 text-amber-700 hover:bg-amber-100"
              }`}
            >
              {user.name} <span className="opacity-70">({user.role})</span>
            </button>
          ))}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="h-6 text-xs border-amber-300 text-amber-700 hover:bg-amber-100 shrink-0"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset Data
        </Button>
      </div>
    </div>
  )
}
