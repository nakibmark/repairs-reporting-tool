'use server'
import { cache } from 'react'
import { db } from '../db'
import { brands } from '../schema'
import { eq } from 'drizzle-orm'

export const getBrandName = cache(async (id: number): Promise<string> => {
  const result = await db.query.brands.findFirst({
    where: eq(brands.id, id),
    columns: { name: true },
  })
  return result?.name || 'Unknown'
})

export const getBrands = cache(async () => await db.select().from(brands))
