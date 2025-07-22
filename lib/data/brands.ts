import 'server-only';
import { db } from '../db';
import { brands } from '../schema';

const preparedGetBrands = db.select().from(brands).prepare('get_brands');

export const getBrands = async () => await preparedGetBrands.execute();
