import z from "zod";

export const InviteNotificationPayloadSchema = z.object({
  inviteId: z.string(),
  inviteStatus: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'REVOKED'])
})
