"use client"

import { useDemoUser } from "@/hooks/use-demo-user"
import { resetStorage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, User2, UserCircle, Store, ShieldCheck, Sparkles } from "lucide-react"

export function DemoUserBanner() {
  const { currentUser, allUsers, switchUser } = useDemoUser()

  const handleReset = () => {
    if (confirm("Reset semua data demo ke kondisi awal?")) {
      resetStorage()
      window.location.reload()
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "buyer":
        return <UserCircle className="h-3.5 w-3.5" />
      case "seller":
        return <Store className="h-3.5 w-3.5" />
      case "admin":
        return <ShieldCheck className="h-3.5 w-3.5" />
      default:
        return <User2 className="h-3.5 w-3.5" />
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "buyer":
        return "Dapat belanja produk & lihat histori"
      case "seller":
        return "Dapat jual item, donasi DoWear/DoWear+"
      case "admin":
        return "Akses penuh: kelola listing, approve/reject"
      default:
        return ""
    }
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-b-2 border-amber-300 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Current User Info */}
          <div className="flex items-center gap-3 flex-1">
            <Badge className="bg-amber-500 text-white px-3 py-1 flex items-center gap-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              MODE DEMO AKTIF
            </Badge>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                {getRoleIcon(currentUser.role)}
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900 leading-tight">{currentUser.name}</p>
                <p className="text-xs text-amber-700">{getRoleDescription(currentUser.role)}</p>
              </div>
            </div>
          </div>

          {/* Switch User Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-amber-700 font-medium hidden sm:inline">Ganti Role:</span>
            <div className="flex gap-1.5">
              {allUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => switchUser(user.id)}
                  disabled={currentUser.id === user.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    currentUser.id === user.id
                      ? "bg-primary text-primary-foreground shadow-md cursor-default"
                      : "bg-white border-2 border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-primary hover:shadow-sm"
                  }`}
                  title={`Login sebagai ${user.name} (${user.role})`}
                >
                  {getRoleIcon(user.role)}
                  <span className="capitalize">{user.role}</span>
                </button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="h-8 text-xs border-2 border-amber-400 bg-white text-amber-800 hover:bg-amber-50 hover:border-red-400 transition-colors"
              title="Reset semua data demo ke kondisi awal"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
