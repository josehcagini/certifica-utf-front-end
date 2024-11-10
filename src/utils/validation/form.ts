import { z } from 'zod'

export const formSchema = z.object({
  ra: z
    .string({ message: 'Ra é obrigatorio' })
    .min(8, 'Ra deve ter no maximo 8 caracteres')
    .max(8, 'Ra deve ter no maximo 8 caracteres'),
  password: z
    .string({ message: 'Senha é obrigatorio' })
    .min(1, 'Senha é obrigatorio'),
})

export type FormSchema = z.infer<typeof formSchema>
