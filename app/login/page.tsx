"use client"

import { Input } from "@/components/UI"
import z from "zod"
import { login } from "../actions/auth.actions"
import ActionForm from "@/components/UI/forms/ActionForm"
import { useRouter } from "next/navigation"

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
    <main className=" bg-darkest w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl">Login Form</h2>
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
    </main>
  )
}


