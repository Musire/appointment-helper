import { getNotifications } from "@/app/actions/user.actions";
import { $Enums } from "@/generated/prisma";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export type Notification = {
  id: string;
  userId: string;
  createdAt: Date;
  type: $Enums.NotificationType;
  payload: any;
  read: boolean;
} 

export default function useNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)



  // initial fetch (server action)
  useEffect(() => {
    if (!userId) return

    let active = true

    async function load() {
      setLoading(true)
      const { success, data } = await getNotifications()
      if (!success) return;

      setNotifications(data ?? [])
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [userId])

  // realtime listener
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel>

    const setup = async () => {
      const { data: { user }} = await supabase.auth.getUser()
      if (!user) return;

      channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Notification",
          filter: `userId=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => {
            switch (payload.eventType) {
              case "INSERT":
                if (prev.some((n) => n.id === payload.new.id)) return prev
                return [payload.new as Notification, ...prev]

              case "UPDATE":
                return prev.map((n) =>
                  n.id === payload.new.id
                    ? (payload.new as Notification)
                    : n
                )

              case "DELETE":
                return prev.filter((n) => n.id !== payload.old.id)

              default:
                return prev
            }
          })
        }
      )
      .subscribe()
        
    }

    setup()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [userId])


  return {
    notifications,
    loading,
    unreadCount: notifications.filter(n => !n.read).length
  }
}
