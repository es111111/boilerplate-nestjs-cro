import z from 'zod';
const stringToNumber = z.string().transform((val, ctx) => {
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid number',
    });
    return z.NEVER;
  }
  return parsed;
});
const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'production', 'development']),
  API_PORT: stringToNumber,
});

export type Env = z.infer<typeof envSchema>;
export const env = (() => {
  // eslint-disable-next-line no-process-env
  const r = envSchema.safeParse(process.env);
  if (r.success === true) return r.data;
  throw new Error(
    `env validation 오류가 생겼습니다. ${r.error.errors.map((e) => `${e.path[0]}: ${e?.['received'] ?? e.code}`).join(', ')}`,
  );
})();
