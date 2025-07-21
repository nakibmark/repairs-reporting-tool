'use client';
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const PartnerSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
      params.delete('page');
    } else {
      params.delete('query');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 250);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background md:w-[200px] lg:w-[336px]"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};

export default PartnerSearch;
