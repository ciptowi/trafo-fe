import { z } from "zod";

export function requiredString(label: string) {
  return z.string().min(1, `The ${label} field is required`);
}

export function requiredNumber(label: string) {
  return z.union([z.number(), z.null()]).refine((val) => val !== null, {
    message: `The ${label} field is required`,
  });
}

export function requiredEmail() {
  return z
    .string()
    .min(1, "The email field is required")
    .email("Please enter a valid email");
}

export function requiredComboMultiple(label: string) {
  return z
    .array(z.object({ id: z.string(), nama: z.string() }))
    .min(1, `The ${label} field is required`);
}
