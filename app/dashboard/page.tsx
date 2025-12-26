"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [router])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Logged in as: <strong>{user.email}</strong>
      </p>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
