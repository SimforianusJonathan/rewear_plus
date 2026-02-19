"use client"

import { useState, useEffect } from "react"
import { useCalendar } from "@/hooks/use-calendar"
import { useDemoUser } from "@/hooks/use-demo-user"
import { initStorage } from "@/lib/storage"
import { formatPrice } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import type { CalendarEvent } from "@/lib/types"

const DAYS_OF_WEEK = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

const EVENT_TYPE_COLORS: Record<CalendarEvent["type"], string> = {
  transaction: "bg-blue-100 text-blue-800",
  donation: "bg-purple-100 text-purple-800",
  charity_event: "bg-red-100 text-red-800",
  distribution: "bg-green-100 text-green-800",
}

const EVENT_DOT_COLORS: Record<CalendarEvent["type"], string> = {
  transaction: "bg-blue-500",
  donation: "bg-purple-500",
  charity_event: "bg-red-500",
  distribution: "bg-green-500",
}

const EVENT_TYPE_LABELS: Record<CalendarEvent["type"], string> = {
  transaction: "Transaksi",
  donation: "Donasi",
  charity_event: "Event Charity",
  distribution: "Distribusi",
}

export default function CalendarPage() {
  const [initialized, setInitialized] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1))
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const { currentUser } = useDemoUser()
  const { getEventsForDate, getEventsForMonth } = useCalendar()

  useEffect(() => {
    initStorage()
    setInitialized(true)
  }, [])

  if (!initialized) {
    return (
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          Memuat...
        </div>
      </div>
    )
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthEvents = getEventsForMonth(year, month)

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getDayStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []

  const eventsByType = {
    transaction: monthEvents.filter((e) => e.type === "transaction").length,
    donation: monthEvents.filter((e) => e.type === "donation").length,
    charity_event: monthEvents.filter((e) => e.type === "charity_event").length,
    distribution: monthEvents.filter((e) => e.type === "distribution").length,
  }

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <CalendarDays className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Donating Calendar</h1>
          <p className="text-muted-foreground text-sm">
            Riwayat transaksi &amp; event charity tercatat otomatis
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-8">
        Logged in as: <span className="font-medium text-foreground">{currentUser.name}</span>
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar + Selected Day */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {MONTHS[month]} {year}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS_OF_WEEK.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayStr = getDayStr(day)
                  const dayEvents = getEventsForDate(dayStr)
                  const isSelected = selectedDate === dayStr

                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(isSelected ? null : dayStr)
                      }
                      className={`relative rounded-lg p-1 text-sm flex flex-col items-center transition-colors min-h-[3rem] ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span className="font-medium text-sm leading-tight">{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 flex-wrap justify-center mt-0.5">
                          {dayEvents.slice(0, 3).map((e, idx) => (
                            <span
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected
                                  ? "bg-primary-foreground/80"
                                  : EVENT_DOT_COLORS[e.type]
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Events */}
          {selectedDate && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Event pada{" "}
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Tidak ada event pada tanggal ini.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <Badge
                          className={EVENT_TYPE_COLORS[event.type]}
                          variant="secondary"
                        >
                          {EVENT_TYPE_LABELS[event.type]}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.description}
                          </p>
                          {event.amount !== undefined && (
                            <p className="text-xs font-medium text-primary mt-1">
                              {formatPrice(event.amount)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Ringkasan {MONTHS[month]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(
                Object.entries(EVENT_TYPE_LABELS) as [
                  CalendarEvent["type"],
                  string
                ][]
              ).map(([type, label]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${EVENT_DOT_COLORS[type]}`}
                    />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {eventsByType[type]}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-bold">{monthEvents.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Legenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(
                Object.entries(EVENT_TYPE_LABELS) as [
                  CalendarEvent["type"],
                  string
                ][]
              ).map(([type, label]) => (
                <div key={type} className="flex items-center gap-2">
                  <Badge className={EVENT_TYPE_COLORS[type]} variant="secondary">
                    {label}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* All Events List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Semua Event ({monthEvents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-72 overflow-y-auto">
              {monthEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Tidak ada event bulan ini.
                </p>
              ) : (
                monthEvents
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-2 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedDate(event.date)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${EVENT_DOT_COLORS[event.type]}`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date + "T12:00:00").toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short" }
                          )}
                        </span>
                        <Badge
                          className={`${EVENT_TYPE_COLORS[event.type]} text-[10px] ml-auto`}
                          variant="secondary"
                        >
                          {EVENT_TYPE_LABELS[event.type]}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium line-clamp-1 pl-4">
                        {event.title}
                      </p>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
