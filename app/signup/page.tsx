"use client"

import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"staff" | "user">("user")

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          role,
        },
      },
    })



    if (error) {
      alert(error.message)
    } else {
      alert("Check your email")
    }
  }

  return (
    <div>
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setRole(e.target.value as "staff" | "user")}>
        <option value="user">User</option>
        <option value="staff">Staff</option>
      </select>

      <button onClick={handleSignup}>Sign up</button>
    </div>
  )
}
