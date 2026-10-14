"use client"

import { Input } from "@/components/ui"
import ActionForm from "@/components/ui/forms/ActionForm"
import { login } from "@/domains/auth/auth.actions"
import { useRouter } from "next/navigation"
import z from "zod"

export default function LoginPage() {
  const router = useRouter()

  const schema = z.object({
    email: z.email(),
    password: z.string().min(1),
  });

  const onSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <main className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Login Form</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
        initialValues={{ email: "", password: ""}}
        actionFn={login}
        schema={schema}
        onSuccess={onSuccess}
      >
        <Input
          label="email" 
          name="email"
        />
        <Input
          label="password" 
          name="password"
          type="password"
        />
      </ActionForm>
      </div>
    </main>
  )
}


