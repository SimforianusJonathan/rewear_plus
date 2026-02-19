"use client"

import { useState, useEffect, useCallback } from "react"
import type { CalendarEvent, Transaction } from "@/lib/types"
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage"

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const loadEvents = useCallback(() => {
    setEvents(readStorage<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS, []))
  }, [])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  const addEvent = useCallback(
    (event: Omit<CalendarEvent, "id">) => {
      const newEvent: CalendarEvent = { ...event, id: `ce-${Date.now()}` }
      const allEvents = readStorage<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS, [])
      writeStorage(STORAGE_KEYS.CALENDAR_EVENTS, [...allEvents, newEvent])
      loadEvents()
    },
    [loadEvents]
  )

  const recordTransaction = useCallback(
    (transaction: Transaction) => {
      const allEvents = readStorage<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS, [])
      const exists = allEvents.some(
        (e) => e.type === "transaction" && e.productId === transaction.productId
      )
      if (!exists) {
        const newEvent: CalendarEvent = {
          id: `ce-${Date.now()}`,
          date: transaction.date,
          type: "transaction",
          title: `Transaksi: ${transaction.productTitle}`,
          description: `Pembelian dari ${transaction.sellerName}`,
          amount: transaction.total,
          productId: transaction.productId,
          color: "bg-blue-100 text-blue-800",
        }
        writeStorage(STORAGE_KEYS.CALENDAR_EVENTS, [...allEvents, newEvent])
        loadEvents()
      }
    },
    [loadEvents]
  )

  const getEventsForDate = useCallback(
    (dateStr: string) => events.filter((e) => e.date === dateStr),
    [events]
  )

  const getEventsForMonth = useCallback(
    (year: number, month: number) =>
      events.filter((e) => {
        const d = new Date(e.date)
        return d.getFullYear() === year && d.getMonth() === month
      }),
    [events]
  )

  return { events, addEvent, recordTransaction, getEventsForDate, getEventsForMonth }
}
