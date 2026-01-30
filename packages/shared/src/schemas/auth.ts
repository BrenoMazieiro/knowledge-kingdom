import { z } from 'zod';

export const signInInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpInputSchema = z.object({
  name: z.string().min(2).max(100),
  gameName: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const validateEmailInputSchema = z.object({
  token: z.string().uuid(),
});

export const changePasswordInputSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8).max(128),
});

export const bmSignInInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const inviteBMInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  permissionLevel: z.enum(['VIEWER', 'EDITOR', 'ADMIN']),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
export type SignUpInput = z.infer<typeof signUpInputSchema>;
export type ValidateEmailInput = z.infer<typeof validateEmailInputSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;
export type BMSignInInput = z.infer<typeof bmSignInInputSchema>;
export type InviteBMInput = z.infer<typeof inviteBMInputSchema>;
