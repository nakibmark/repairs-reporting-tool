import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function useFilter(filterName: string, filterValue: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  if (filterValue === '__clear') {
    // hacky workaround for radix-ui not allowing "" as a select value as of 2025-07-21
    // https://github.com/radix-ui/primitives/issues/2706
    const params = new URLSearchParams(searchParams);
    params.delete(filterName);
  } else {
    params.set(filterName, filterValue);
  }
  replace(`${pathname}?${params.toString()}`, { scroll: false });
}
