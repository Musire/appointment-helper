'use client';

import { Form, Input } from "@/components/UI";
import { supabase } from "@/lib/supabase/client";
import { AdminWelcomeSchema, AdminWelcomeType } from "@/validation/AdminWelcome.schema";
import { useRouter } from 'next/navigation';


export default function AdminWelcome () {
  const router = useRouter()

  const onSubmit = async (formData: AdminWelcomeType) => {
    if (formData.password !== formData.confirm) return;

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) throw error;

      router.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="page-layout">
        <div className="display-layout">
            <h1 className="">admin welcome</h1>
            <Form
                schema={AdminWelcomeSchema}
                onSubmit={onSubmit}
                initialValues={{
                    password: '',
                    confirm: ''
                }}
            >
                <Input 
                    label="password"
                    name="password"
                    type='password'
                />
                <Input 
                    label='confirm password'
                    name='confirm'
                    type='password'
                />
            </Form>
        </div>
    </div>
  );
}