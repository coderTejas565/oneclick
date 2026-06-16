export const EMAIL_STATUS = {
  PENDING: "pending",
  REPLIED: "replied",
  DONE: "done",
} as const;

export type EmailStatus =
  (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS];