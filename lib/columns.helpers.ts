import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  updatedAt: timestamp({ withTimezone: true, mode: 'date' })
    .$onUpdate(() => new Date())
    .defaultNow()
    .notNull(),
  createdAt: timestamp({ withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
};
