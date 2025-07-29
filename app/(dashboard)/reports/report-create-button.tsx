'use client';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createReport } from './actions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/icons';

export const ReportCreateButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateClick = () => {
    startTransition(async () => {
      const createdId = await createReport();
      router.push(`/reports/${createdId}`);
    });
  };

  return (
    <div className="relative ml-auto flex items-center gap-2">
      {isPending ? (
        <Spinner />
      ) : (
        <Button size="sm" className="h-8 gap-1 " onClick={handleCreateClick}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add report
          </span>
        </Button>
      )}
    </div>
  );
};
export default ReportCreateButton;
