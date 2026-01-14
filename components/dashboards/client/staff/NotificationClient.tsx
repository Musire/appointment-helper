"use client"

import { useNotifications } from "@/hooks"

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
          <li
            key={n.id}
            className="rounded-md border p-2 text-sm"
          >
            <p className="font-medium">{n.type}</p>
            <p className="text-muted text-xs">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
