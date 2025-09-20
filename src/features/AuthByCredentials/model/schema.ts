import { z } from 'zod';

export const SCH_Login = z.object({
  username: z
    .string()
    .min(1, { message: 'Username diperlukan.' })
    .regex(
      /^[a-zA-Z0-9\s]*$/,
      'Username tidak boleh mengandung karakter khusus'
    )
    .refine((value) => value?.trim() === value, {
      message: 'Username tidak boleh diawali atau diakhiri dengan spasi',
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export type LoginFormInputs = z.infer<typeof SCH_Login>;
