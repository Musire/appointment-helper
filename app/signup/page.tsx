"use client"

import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<"STAFF" | "USER">("USER")

  async function handleSignup() {
    console.log({email, password, fullName, role})
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          role,
          full_name: fullName
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
        placeholder="full name"
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setRole(e.target.value as "STAFF" | "USER")}>
        <option value="USER">User</option>
        <option value="STAFF">Staff</option>
      </select>

      <button onClick={handleSignup}>Sign up</button>
    </div>
  )
}
