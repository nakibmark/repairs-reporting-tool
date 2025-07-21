import { SearchParams } from 'next/dist/server/request/search-params';

export const flattenSearchParams = (params: SearchParams) =>
  Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Array.isArray(value) ? value.pop() : value,
    }),
    {} as { [key: string]: string | undefined }
  );
