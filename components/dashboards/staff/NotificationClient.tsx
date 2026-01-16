"use client"

import { Notification } from "@/generated/prisma"
import InviteNotification from "./InviteNotification"

type Props = {
  notifications: Notification[]
}

export default function NotificationsClient({ notifications }: Props) {

  return (
    <section className="space-y-2 absolute left-6 top-20 overflow-y-scroll bg-darkest scrollbar-none h-[85dvh] w-[calc(100%-3rem)]">
      <ul className="space-y-1">
        {notifications.map((n) => (
          <InviteNotification key={n.id} notification={n} />
        ))}
      </ul>
    </section>
  )
}
