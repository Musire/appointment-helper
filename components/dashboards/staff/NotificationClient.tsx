"use client"

import { useNotifications } from "@/hooks"
import InviteNotification from "./InviteNotification"

type Props = {
  userId: string | null
}

export default function NotificationsClient({ userId }: Props) {
  const { notifications, loading, unreadCount } =
    useNotifications(userId)

  if (!userId) return null

  return (
    <section className="space-y-2">
      <div className="text-sm font-medium">
        Notifications ({unreadCount})
      </div>

      {loading && <p className="text-muted">Loading…</p>}

      <ul className="space-y-1">
        {notifications.map((n) => (
          <InviteNotification key={n.id} notification={n} />
        ))}
      </ul>
    </section>
  )
}
