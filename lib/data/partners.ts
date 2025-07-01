'use server'
import { cache } from 'react';
import { db } from '../db';
import { partners } from '../schema';


export const getPartners = cache(async () => await db.select().from(partners))