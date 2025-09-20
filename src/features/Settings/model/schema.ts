import { z } from 'zod';

// Skema untuk form "Add Menu Group"
export const SCH_AddGroup = z.object({
  groupName: z.string().min(3, { message: 'Nama grup minimal 3 karakter' }),
});

// Tipe data TypeScript yang di-infer dari skema Zod
export type AddGroupFormInputs = z.infer<typeof SCH_AddGroup>;

// Skema untuk form "Add Menu Item"
export const SCH_AddMenu = z.object({
  groupId: z.string().min(1, { message: 'Anda harus memilih grup' }),
  menuName: z.string().min(3, { message: 'Nama menu minimal 3 karakter' }),
});

export type AddMenuFormInputs = z.infer<typeof SCH_AddMenu>;
