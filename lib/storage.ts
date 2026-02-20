import type {
  DemoUser,
  ChatMessage,
  ChatConversation,
  CartItem,
  WishlistItem,
  Review,
  Transaction,
  CalendarEvent,
} from "./types"

export const STORAGE_KEYS = {
  CURRENT_USER: "rw_current_user",
  MESSAGES: "rw_messages",
  CONVERSATIONS: "rw_conversations",
  CART: "rw_cart",
  WISHLIST: "rw_wishlist",
  REVIEWS: "rw_reviews",
  TRANSACTIONS: "rw_transactions",
  CALENDAR_EVENTS: "rw_calendar_events",
  SEEDED: "rw_seeded",
} as const

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "u1",
    name: "Anisa Rahmawati",
    email: "anisa@email.com",
    avatar: "/young-indonesian-woman-smiling-profile-photo.jpg",
    role: "buyer",
    badges: ["Impact Donor", "Eco Warrior"],
    joinedAt: "2025-06-15",
  },
  {
    id: "u2",
    name: "Budi Santoso",
    email: "budi@email.com",
    avatar: "/placeholder.svg",
    role: "seller",
    badges: ["Top Seller"],
    joinedAt: "2025-08-01",
  },
  {
    id: "u3",
    name: "Maya Putri",
    email: "maya@email.com",
    avatar: "/placeholder.svg",
    role: "seller",
    badges: ["Trusted Seller"],
    joinedAt: "2025-09-10",
  },
  {
    id: "u4",
    name: "Rina Pratama",
    email: "admin@rewear.com",
    avatar: "/placeholder.svg",
    role: "admin",
    badges: ["Platform Admin"],
    joinedAt: "2025-01-01",
  },
]

function seedData(): void {
  const transactions: Transaction[] = [
    {
      id: "t1",
      productId: "1",
      productTitle: "Vintage Batik Tulis Solo",
      productImage: "/vintage-batik-tulis-solo-traditional-indonesian-fa.jpg",
      buyerId: "u1",
      buyerName: "Anisa Rahmawati",
      sellerId: "u2",
      sellerName: "Budi Santoso",
      price: 85000,
      shippingFee: 15000,
      total: 100000,
      status: "completed",
      date: "2026-01-12",
      reviewed: false,
    },
    {
      id: "t2",
      productId: "4",
      productTitle: "Oversized Denim Jacket",
      productImage: "/oversized-denim-jacket-vintage-streetwear.jpg",
      buyerId: "u1",
      buyerName: "Anisa Rahmawati",
      sellerId: "u3",
      sellerName: "Maya Putri",
      price: 65000,
      shippingFee: 15000,
      total: 80000,
      status: "completed",
      date: "2026-01-08",
      reviewed: false,
    },
    {
      id: "t3",
      productId: "7",
      productTitle: "Batik Mega Mendung",
      productImage: "/batik-mega-mendung-cirebon-cloud-pattern.jpg",
      buyerId: "u1",
      buyerName: "Anisa Rahmawati",
      sellerId: "u2",
      sellerName: "Budi Santoso",
      price: 90000,
      shippingFee: 15000,
      total: 105000,
      status: "shipped",
      date: "2026-01-14",
      reviewed: false,
    },
  ]

  const reviews: Review[] = [
    {
      id: "r1",
      transactionId: "t1",
      productId: "1",
      productTitle: "Vintage Batik Tulis Solo",
      reviewerId: "u3",
      reviewerName: "Maya Putri",
      reviewerAvatar: "/placeholder.svg",
      sellerId: "u2",
      rating: 5,
      comment: "Kain batiknya sangat cantik! Kondisi persis seperti deskripsi. Penjual sangat responsif.",
      createdAt: "2026-01-13",
    },
  ]

  const conversations: ChatConversation[] = [
    {
      id: "c1",
      productId: "1",
      productTitle: "Vintage Batik Tulis Solo",
      productImage: "/vintage-batik-tulis-solo-traditional-indonesian-fa.jpg",
      buyerId: "u1",
      buyerName: "Anisa Rahmawati",
      sellerId: "u2",
      sellerName: "Budi Santoso",
      lastMessage: "Terima kasih sudah beli kak!",
      lastTimestamp: "2026-01-12T10:30:00",
      unreadCount: 0,
    },
    {
      id: "c2",
      productId: "3",
      productTitle: "Silk Selendang Songket",
      productImage: "/silk-selendang-songket-indonesian-traditional-scar.jpg",
      buyerId: "u1",
      buyerName: "Anisa Rahmawati",
      sellerId: "u3",
      sellerName: "Maya Putri",
      lastMessage: "Masih tersedia? Mau tanya ukurannya kak",
      lastTimestamp: "2026-01-16T14:15:00",
      unreadCount: 1,
    },
  ]

  const messages: ChatMessage[] = [
    {
      id: "m1",
      conversationId: "c1",
      senderId: "u1",
      senderName: "Anisa Rahmawati",
      text: "Halo kak, batiknya masih ada?",
      timestamp: "2026-01-10T09:00:00",
      read: true,
    },
    {
      id: "m2",
      conversationId: "c1",
      senderId: "u2",
      senderName: "Budi Santoso",
      text: "Masih ada kak! Kondisinya masih bagus banget.",
      timestamp: "2026-01-10T09:15:00",
      read: true,
    },
    {
      id: "m3",
      conversationId: "c1",
      senderId: "u1",
      senderName: "Anisa Rahmawati",
      text: "Oke siap kak, langsung order ya!",
      timestamp: "2026-01-10T09:20:00",
      read: true,
    },
    {
      id: "m4",
      conversationId: "c1",
      senderId: "u2",
      senderName: "Budi Santoso",
      text: "Terima kasih sudah beli kak!",
      timestamp: "2026-01-12T10:30:00",
      read: true,
    },
    {
      id: "m5",
      conversationId: "c2",
      senderId: "u1",
      senderName: "Anisa Rahmawati",
      text: "Masih tersedia? Mau tanya ukurannya kak",
      timestamp: "2026-01-16T14:15:00",
      read: false,
    },
  ]

  const cart: CartItem[] = [
    {
      id: "ci1",
      productId: "2",
      title: "Modern Kebaya Kutubaru",
      image: "/modern-kebaya-kutubaru-indonesian-traditional-dres.jpg",
      price: 75000,
      size: "S",
      condition: "good",
      mode: "rewear",
      sellerId: "u3",
      sellerName: "Maya Putri",
      quantity: 1,
      addedAt: "2026-01-16T10:00:00",
    },
  ]

  const wishlist: WishlistItem[] = [
    {
      id: "wi1",
      productId: "3",
      title: "Silk Selendang Songket",
      image: "/silk-selendang-songket-indonesian-traditional-scar.jpg",
      price: 95000,
      size: "Free Size",
      condition: "like-new",
      mode: "rewear",
      sellerId: "u3",
      sellerName: "Dewi Ayu",
      addedAt: "2026-01-15T08:00:00",
    },
    {
      id: "wi2",
      productId: "7",
      title: "Batik Mega Mendung",
      image: "/batik-mega-mendung-cirebon-cloud-pattern.jpg",
      price: 90000,
      size: "L",
      condition: "like-new",
      mode: "rewear",
      sellerId: "u2",
      sellerName: "Budi Santoso",
      addedAt: "2026-01-14T15:00:00",
    },
  ]

  const calendarEvents: CalendarEvent[] = [
    {
      id: "ce1",
      date: "2026-01-12",
      type: "transaction",
      title: "Pembelian: Batik Tulis Solo",
      description: "Transaksi selesai dengan Budi Santoso",
      amount: 100000,
      productId: "1",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "ce2",
      date: "2026-01-08",
      type: "transaction",
      title: "Pembelian: Denim Jacket",
      description: "Transaksi selesai dengan Maya Putri",
      amount: 80000,
      productId: "4",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "ce3",
      date: "2026-01-01",
      type: "charity_event",
      title: "Flood Relief - Central Java",
      description: "Kampanye donasi bencana banjir Jawa Tengah dimulai",
      eventId: "1",
      color: "bg-red-100 text-red-800",
    },
    {
      id: "ce4",
      date: "2026-01-15",
      type: "distribution",
      title: "Distribusi Pakaian",
      description: "250 pakaian didistribusikan ke 3 desa Jawa Tengah",
      amount: 1500000,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "ce5",
      date: "2026-01-13",
      type: "donation",
      title: "Donasi: Warm Winter Sweater",
      description: "Donasi fisik diterima untuk disaster relief",
      productId: "6",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "ce6",
      date: "2026-01-15",
      type: "charity_event",
      title: "Back to School Campaign",
      description: "Kampanye seragam sekolah untuk siswa kurang mampu",
      eventId: "2",
      color: "bg-red-100 text-red-800",
    },
  ]

  writeStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
  writeStorage(STORAGE_KEYS.REVIEWS, reviews)
  writeStorage(STORAGE_KEYS.CONVERSATIONS, conversations)
  writeStorage(STORAGE_KEYS.MESSAGES, messages)
  writeStorage(STORAGE_KEYS.CART, cart)
  writeStorage(STORAGE_KEYS.WISHLIST, wishlist)
  writeStorage(STORAGE_KEYS.CALENDAR_EVENTS, calendarEvents)
}

export function initStorage(): void {
  if (typeof window === "undefined") return
  const seeded = readStorage<boolean>(STORAGE_KEYS.SEEDED, false)
  if (!seeded) {
    seedData()
    writeStorage(STORAGE_KEYS.SEEDED, true)
  }
  const currentUser = readStorage<DemoUser | null>(STORAGE_KEYS.CURRENT_USER, null)
  if (!currentUser) {
    writeStorage(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0])
  }
}

export function resetStorage(): void {
  if (typeof window === "undefined") return
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
  seedData()
  writeStorage(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0])
  writeStorage(STORAGE_KEYS.SEEDED, true)
}
