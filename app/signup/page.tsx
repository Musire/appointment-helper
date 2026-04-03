"use client"

import { ControlledInput, Input } from "@/components/UI"
import { DropdownButton } from "@/components/UI/buttons"
import ActionForm from "@/components/UI/forms/ActionForm"
import z from "zod"
import { signup } from "../actions/auth.actions"

export default function SignupPage() {

  const schema = z.object({
    email: z.email(),
    password: z.string().min(1, 'you need to send password'),
    fullName: z.string().min(1, 'you need fullname'),
    role: z.string().min(1, 'you need to select role')
  })

  return (
    <main className=" bg-darkest w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl">Signup Form</h2>
      <ActionForm 
        initialValues={{ email: "", password: "TONY", fullName: '', role: 'USER'}}
        actionFn={signup}
        schema={schema}
      >
        <Input 
          label="email"
          name="email"
        />
        <Input 
          label="full name"
          name="fullName"
        />
        <Input 
          label="password"
          name="password"
          type="password"
        />
        <ControlledInput
          name="role"
          label="role"
          children={(field) => (
            <DropdownButton 
              options={['USER', 'STAFF']}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </ActionForm>
    </main>
  )
}


