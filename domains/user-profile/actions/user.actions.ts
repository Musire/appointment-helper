'use server';

import { getCurrentUser } from "@/app/actions/auth.actions";
import { UploadState } from "@/domains/image-validation/actions/image-uploading.actions";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function editUser(
  prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
    const supabase = createSupabaseServerClient()

    const file = formData.get("image") as File | null;

  
    if (!file) {
        return { success: false, message: "Missing file " };
    }
    
    const user = await getCurrentUser()
    if (!user) {
        return { success: false, message: "Missing user ID"}
    }


    // 1. Validation (Keep your existing checks)
    const MAX_SIZE = 2 * 1024 * 1024;
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (file.size > MAX_SIZE) return { success: false, message: "File too large" };
    if (!allowedTypes.includes(file.type)) return { success: false, message: "Invalid file type" };

    try {
        // 2. Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 3. Get the Public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(filePath);

        // 4. Update User in Database with Prisma
        await prisma.user.update({
            where: { id: user.id },
            data: { avatarUrl: publicUrl } // Ensure 'image' matches your Prisma schema
        });

        return {
            success: true,
            message: "User record updated successfully"
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update user"
        };
    }
}
