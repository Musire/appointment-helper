"use client"

import { Input, Theme } from "@/components/UI"
import ActionForm from "@/components/UI/forms/ActionForm"
import { useRouter } from "next/navigation"
import z from "zod"
import { login } from "../../domains/identity/actions/auth.actions"

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
      <Theme />
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


